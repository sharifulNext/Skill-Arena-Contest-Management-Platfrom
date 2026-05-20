import { NextRequest, NextResponse } from "next/server";
import Submission from "@/model/Submission";
import { connectDB } from "@/lib/db";

// 📋 ১. অর্গানাইজার প্যানেলের সব সাবমিশন ফেচ করা
export async function GET() {
  try {
    await connectDB();

    // ডাটাবেজের সব সাবমিশন লেটেস্ট অনুযায়ী নিয়ে আসবে
    const submissions = await Submission.find({}).sort({ createdAt: -1 });
    
    return NextResponse.json({ success: true, data: submissions }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// 🚀 ২. ডামি ডেটা সাবমিট করে টেস্ট করার জন্য POST API
export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();

    // মঙ্গোডিবি অবজেক্ট আইডি জেনারেট করার জন্য ডামি আইডি (আপনার আসল কন্টেস্ট আইডি থাকলে সেটি বসাবেন)
    const mockContestId = body.contestId || "664f1234567890abcdef1234";

    const newSubmission = await Submission.create({
      contestId: mockContestId,
      participantName: body.participantName || "Cyber Ninja",
      participantEmail: body.participantEmail || "ninja@skillarena.com",
      repoUrl: body.repoUrl || "https://github.com/test/arena-repo",
      liveUrl: body.liveUrl || "https://arena-live.vercel.app",
      notes: "Injected directly into organizer submissions lane.",
      aiScore: Math.floor(Math.random() * (100 - 70 + 1)) + 70, // ৭০ থেকে ১০০ এর মধ্যে র্যান্ডম স্কোর
      status: "Evaluated",
      aiFeedback: "Excellent structural layout and clean standard modules.",
    });

    return NextResponse.json({ success: true, data: newSubmission }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}