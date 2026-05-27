import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { User } from "@/model/User"; // আপনার ইউজার মডেলটি ইমপোর্ট করুন
import { auth } from "@/lib/auth";

// 📡 সব ইউজারের লিস্ট গেট করা
export async function GET() {
  try {
    await connectDB();
    const session = await auth();

    // 🔐 শুধুমাত্র ADMIN রোল থাকলে এক্সেস পাবে
    if (!session || (session.user as any).role !== "ADMIN") {
      return NextResponse.json({ success: false, error: "Unauthorized access." }, { status: 401 });
    }

    // পাসওয়ার্ড বাদে সব ইউজার অবজেক্ট লেটেস্ট ডেট অনুযায়ী ফেচ হবে
    const users = await User.find({}).select("-password").sort({ createdAt: -1 });

    return NextResponse.json({ success: true, data: users }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}