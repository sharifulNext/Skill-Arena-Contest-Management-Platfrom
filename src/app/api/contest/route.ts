// src/app/api/contest/route.ts
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Contest } from "@/model/Contest";
import { auth } from "@/lib/auth";
import { uploadToCloudinary } from "@/lib/cloudinary";


// ১. নতুন কন্টেস্ট তৈরি করার API (POST)
export async function POST(req: Request) {
  try {
    await connectDB();

    // সেশন ভ্যালিডেশন
    const session = await auth(); 
    if (!session || (session.user as any).role !== "ORGANIZER") {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }

    const body = await req.json();
    const { title, description, category, difficulty, prize, startDate, endDate, rules, banner } = body;

    // ভ্যালিডেশন চেক
    if (!banner) {
      return NextResponse.json({ error: "Contest banner image is required" }, { status: 400 });
    }

    let uploadedImageUrl = "";

    // 🚀 ক্লাউডিনারিতে আপলোড প্রোসেস (যদি ইমেজটি Base64 ফরম্যাটে থাকে)
    if (banner.startsWith("data:image")) {
      uploadedImageUrl = await uploadToCloudinary(banner); // আমাদের তৈরি করা হেল্পার ফাংশন কল
    } else {
      uploadedImageUrl = banner;
    }

    // ডাটাবেজে ডাটা সেভ
    const newContest = new Contest({
      title,
      description,
      category,
      difficulty,
      prize,
      startDate,
      endDate,
      rules,
      banner: uploadedImageUrl, // 👈 এখন ডাটাবেজে শুধু CDN URL সেভ হবে
      createdBy: (session.user as any).id,
      status: "Draft"
    });

    await newContest.save();
    return NextResponse.json({ success: true, data: newContest }, { status: 201 });

  } catch (error: any) {
    console.error("POST API Error:", error.message);
    return NextResponse.json({ error: error.message || "Server Error" }, { status: 500 });
  }
}

// ২. অর্গানাইজারের নিজের তৈরি করা সব কন্টেস্ট রিড করার API (GET)
// লিস্ট পেজ ফাস্ট করার জন্য এখানে '.select("-banner")' ব্যবহার করা যেতে পারে, তবে আপাতত পুরোটা রাখলাম
export async function GET() {
  try {
    await connectDB();

    const session = await auth(); 
    if (!session || (session.user as any).role !== "ORGANIZER") {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }

    const contests = await Contest.find({ createdBy: (session.user as any).id }).sort({ createdAt: -1 });
    
    return NextResponse.json({ success: true, data: contests });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to fetch contests" }, { status: 500 });
  }
}