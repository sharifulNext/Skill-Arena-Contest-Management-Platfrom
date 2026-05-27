import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Contest } from "@/model/Contest";
import Submission from "@/model/Submission"; // 🎯 ডিফল্ট ইমপোর্ট ফিক্স সহ সাবমিশন মডেল
import { auth } from "@/lib/auth";

type RouteParams = {
  params: Promise<{ id: string }>;
};

// ==========================================
// 🔓 ১. GET — কন্টেস্ট ডিটেইলস (With Active Registration & Deadline Check)
// ==========================================
export async function GET(req: Request, { params }: RouteParams) {
  try {
    await connectDB();
    const { id } = await params;

    if (!id) {
      return NextResponse.json({ success: false, message: "Contest ID is required" }, { status: 400 });
    }

    // ডাটাবেজ থেকে আইডি অনুযায়ী কনটেস্ট খোঁজা
    const contest = await Contest.findById(id);

    if (!contest) {
      return NextResponse.json({ success: false, message: "Contest not found" }, { status: 404 });
    }

    // 🔐 কারেন্ট ইউজারের সেশন চেক (যদি লগইন থাকে)
    const session = await auth();
    const userId = (session?.user as any)?.id;

    // 📊 রিয়েল-টাইম কন্ডিশনাল চেকিং লজিক
    const isRegistered = userId ? contest.participants.includes(userId) : false;
    const isEnded = new Date() > new Date(contest.endDate);

    // 🎯 মঙ্গোডিবি ডকুমেন্টের সাথে ডাইনামিক ফ্ল্যাগগুলো মার্জ করে পাঠানো
    const responseData = {
      ...contest.toObject(), // Mongoose Document কে প্লেইন জাভাস্ক্রিপ্ট অবজেক্টে রূপান্তর
      isRegistered,
      isEnded,
    };

    return NextResponse.json({ success: true, data: responseData }, { status: 200 });
  } catch (error: any) {
    console.error("GET Public API Error:", error.message);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

// ==========================================
// 🔒 ২. POST — পার্টিসিপেন্ট কর্তৃক কোড সাবমিশন (ডাটাবেজ সেভিং অ্যাক্টিভেটেড 🚀)
// ==========================================
export async function POST(req: Request, { params }: RouteParams) {
  try {
    await connectDB();
    const session = await auth();
    
    // ১. ইউজার অথেনটিকেশন চেক
    if (!session || !session.user) {
      return NextResponse.json({ success: false, message: "Please log in to submit your solution." }, { status: 401 });
    }

    const userId = (session.user as any).id;
    const { id: contestId } = await params;
    const { repositoryUrl, liveLink, notes } = await req.json();

    // ২. রিকোয়েস্ট বডি ভ্যালিডেশন
    if (!repositoryUrl) {
      return NextResponse.json({ success: false, message: "Repository URL is strictly required." }, { status: 400 });
    }

    // ৩. চেক করা যে কন্টেস্টটি আসলেই ডাটাবেজে এক্সিস্ট করে কিনা
    const contest = await Contest.findById(contestId);
    if (!contest) {
      return NextResponse.json({ success: false, message: "Contest target node not found." }, { status: 404 });
    }

    // ৪. ইউজার এই কন্টেস্টে রেজিস্টার্ড কিনা তা নিশ্চিত করা
    const isRegistered = contest.participants.includes(userId);
    if (!isRegistered) {
      return NextResponse.json({ success: false, message: "Access denied. You are not registered for this arena." }, { status: 403 });
    }

    // ৫. কন্টেস্টের ডেডライン শেষ হয়ে গেছে কিনা চেক করা
    const isEnded = new Date() > new Date(contest.endDate);
    if (isEnded) {
      return NextResponse.json({ success: false, message: "Submission rejected. Arena execution deadline has passed." }, { status: 400 });
    }

    // 💾 ৬. আপনার নতুন সাবমিশন মডেলে ডেটা সেভ করা হচ্ছে
    const newSubmission = new Submission({
      contestId,
      participantName: session.user.name || "Anonymous Developer",
      participantEmail: session.user.email,
      repoUrl: repositoryUrl, // ফ্রন্টএন্ড এর repositoryUrl -> মডেল এর repoUrl
      liveUrl: liveLink || "", // ফ্রন্টএন্ড এর liveLink -> মডেল এর liveUrl
      notes: notes || "",
      aiScore: 0, // ডিফল্ট বা স্টার্টিং পজিশন
      aiFeedback: "AI Agent is currently queuing repository tree structure for code audit.",
      status: "Pending",
    });

    // মঙ্গোডিবি ট্র্যাকার এক্সিকিউশন
    await newSubmission.save();

    return NextResponse.json({ 
      success: true, 
      message: "Your code architecture payload has been securely saved to the database!" 
    }, { status: 200 });

  } catch (error: any) {
    console.error("POST Submission API Error:", error.message);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

// ==========================================
// 🔒 ৩. PUT — অর্গানাইজার কর্তৃক কনটেস্ট আপডেট (সুরক্ষিত)
// ==========================================
export async function PUT(req: Request, { params }: RouteParams) {
  try {
    await connectDB();
    const session = await auth();
    
    if (!session || (session.user as any).role !== "ORGANIZER") {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await req.json();

    // চেক করা যে এই কনটেস্টটি আসলেই এই অর্গানাইজারের কিনা
    const contest = await Contest.findOne({ _id: id, createdBy: (session.user as any).id });
    if (!contest) {
      return NextResponse.json({ success: false, message: "Contest not found or unauthorized" }, { status: 404 });
    }

    // ডেটা আপডেট করা
    const updatedContest = await Contest.findByIdAndUpdate(
      id, 
      { $set: body }, 
      { new: true, runValidators: true }
    );
    
    return NextResponse.json({ success: true, data: updatedContest }, { status: 200 });
  } catch (error: any) {
    console.error("PUT API Error:", error.message);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

// ==========================================
// 🔒 ৪. DELETE — অর্গানাইজার কর্তৃক কনটেস্ট ডিলিট (সুরক্ষিত)
// ==========================================
export async function DELETE(req: Request, { params }: RouteParams) {
  try {
    await connectDB();
    const session = await auth();
    
    if (!session || (session.user as any).role !== "ORGANIZER") {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    // চেক করা যে এই কনটেস্টটি আসলেই এই অর্গানাইজারের কিনা
    const contest = await Contest.findOne({ _id: id, createdBy: (session.user as any).id });
    if (!contest) {
      return NextResponse.json({ success: false, message: "Contest not found or unauthorized" }, { status: 404 });
    }

    await Contest.findByIdAndDelete(id);
    return NextResponse.json({ success: true, message: "Contest deleted successfully" }, { status: 200 });
  } catch (error: any) {
    console.error("DELETE API Error:", error.message);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}