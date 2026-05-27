import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Submission from "@/model/Submission";
import { auth } from "@/lib/auth";

// 📋 ১. ডাটাবেজ থেকে রিয়েল ডাটা তুলে আনা (No More Tricks)
export async function GET() {
  try {
    await connectDB();
    
    const session = await auth();
    if (!session || (session.user as any)?.role !== "ORGANIZER") {
      return NextResponse.json({ success: false, message: "Unauthorized." }, { status: 401 });
    }

    // ডাটাবেজের আসল ডাটা সরাসরি চলে যাবে ফ্রন্টএন্ডে
    const submissions = await Submission.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: submissions }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

// 🎯 ২. অর্গানাইজার কর্তৃক স্ট্যাটাস ও স্কোর আপডেট করার PATCH API
export async function PATCH(req: NextRequest) {
  try {
    await connectDB();
    
    const session = await auth();
    if (!session || (session.user as any)?.role !== "ORGANIZER") {
      return NextResponse.json({ success: false, message: "Unauthorized Node Access." }, { status: 401 });
    }

    const body = await req.json();
    const { submissionId, status, aiScore, aiFeedback } = body;

    if (!submissionId) {
      return NextResponse.json({ success: false, message: "Submission ID is required." }, { status: 400 });
    }

    // ডাটাবেজে খুঁজে ওই সাবমিশনটি আপডেট করা
    const updatedSubmission = await Submission.findByIdAndUpdate(
      submissionId,
      { 
        status, 
        aiScore: Number(aiScore), 
        aiFeedback: aiFeedback || "Reviewed manually by Organizer." 
      },
      { new: true } // আপডেটেড ডাটা রিটার্ন করবে
    );

    if (!updatedSubmission) {
      return NextResponse.json({ success: false, message: "Submission not found." }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: updatedSubmission }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}