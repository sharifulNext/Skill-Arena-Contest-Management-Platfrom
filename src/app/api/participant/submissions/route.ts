// src/app/api/participant/submissions/route.ts ফাইলে এটি রিপ্লেস করুন

import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Submission from "@/model/Submission"; // ডিফল্ট ইমপোর্ট এরর ফিক্সড
import { Contest } from "@/model/Contest";
import { auth } from "@/lib/auth";

export async function GET() {
  try {
    await connectDB();
    const session = await auth();

    if (!session || !session.user || !session.user.email) {
      return NextResponse.json({ success: false, message: "Unauthorized node access." }, { status: 401 });
    }

    const userEmail = session.user.email;

    // 🎯 ইউজার আইডি-র বদলে ইউজারের ইউনিক ইমেইল দিয়ে ফিল্টার করা হচ্ছে
    const rawSubmissions = await Submission.find({ participantEmail: userEmail })
      .populate("contestId", "title")
      .sort({ createdAt: -1 });

    // 🎯 আপনার স্কিমার ফিল্ডগুলোর সাথে ফ্রন্টএন্ড UI-এর ডেটা ম্যাপিং
    const formattedSubmissions = rawSubmissions.map((sub: any) => ({
      id: sub._id.toString(),
      contest: sub.contestId?.title || "Unknown Contest Arena",
      // UI-তে যাতে কালার ব্রেক না করে: "Evaluated" হলে আমরা "Accepted" দেখাবো
      status: sub.status === "Evaluated" ? "Accepted" : sub.status, 
      score: sub.status === "Evaluated" ? `${sub.aiScore}/100` : "Reviewing",
      submittedAt: new Date(sub.createdAt).toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }),
      aiScore: sub.status === "Evaluated" ? `${sub.aiScore}%` : "Processing",
      repoUrl: sub.repoUrl ? sub.repoUrl.replace(/^https?:\/\//, "") : "N/A",
      aiFeedback: sub.aiFeedback || "AI evaluation in progress...",
    }));

    return NextResponse.json({ success: true, data: formattedSubmissions }, { status: 200 });
  } catch (error: any) {
    console.error("Submission History Fetch Failure:", error.message);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}