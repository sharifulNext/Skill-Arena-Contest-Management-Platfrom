import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Contest } from "@/model/Contest";
import "@/model/User"; // মঙ্গোডিবি পপুলেশন ক্র্যাশ প্রোটেকশন লক
import { auth } from "@/lib/auth";

// 📡 সব কন্টেস্ট ডাটাবেজ থেকে রিড করার মেথড
export async function GET() {
  try {
    await connectDB();
    const session = await auth();

    // 🔐 শুধুমাত্র ADMIN রোল গেটকিপার চেক
    if (!session || (session.user as any).role !== "ADMIN") {
      return NextResponse.json({ success: false, error: "Unauthorized access." }, { status: 401 });
    }

    // ডাটাবেজ থেকে ক্রিয়েটরের নামসহ সব কনটেস্ট সর্ট করে আনা
    const contests = await Contest.find({})
      .populate("createdBy", "name")
      .sort({ createdAt: -1 });

    return NextResponse.json({ success: true, data: contests }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}