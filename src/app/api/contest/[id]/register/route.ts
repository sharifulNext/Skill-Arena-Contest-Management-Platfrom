// src/app/api/contest/[id]/register/route.ts

import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Contest } from "@/model/Contest";
import { auth } from "@/lib/auth";
import mongoose from "mongoose";

type RouteParams = { params: Promise<{ id: string }> };

export async function POST(req: Request, { params }: RouteParams) {
  try {
    await connectDB();
    const session = await auth();

    // 🔐 ১. অথেনটিকেশন চেক
    if (!session || !session.user) {
      return NextResponse.json(
        { success: false, error: "Authentication required. Please log in." }, 
        { status: 401 }
      );
    }

    // 🆔 ২. ইউজারের অবজেক্ট আইডি (ObjectId) বের করা
    // আপনার NextAuth কনফিগারেশন অনুযায়ী সেশনে 'id' বা '_id' যে নামে পাস করা হোক, সেটা ধরবে
    const userIdStr = (session.user as any).id || (session.user as any)._id;

    if (!userIdStr) {
      return NextResponse.json(
        { success: false, error: "User identity clear-text ID is missing from session. Please re-authenticate." }, 
        { status: 400 }
      );
    }

    // মঙ্গুজের ভ্যালিড ObjectId-তে কনভার্ট করা (টাইপ ক্র্যাশ প্রোটেকশন)
    if (!mongoose.Types.ObjectId.isValid(userIdStr)) {
      return NextResponse.json(
        { success: false, error: "Invalid User Object ID structure." }, 
        { status: 400 }
      );
    }
    const userObjectId = new mongoose.Types.ObjectId(userIdStr);

    const { id } = await params; // কন্টেস্ট আইডি
    
    // 🔍 ৩. কন্টেস্টের অস্তিত্ব ও লাইফসাইকেল ভেরিফিকেশন
    const contest = await Contest.findById(id);
    if (!contest) {
      return NextResponse.json(
        { success: false, error: "The targeted contest arena does not exist." }, 
        { status: 404 }
      );
    }

    // যদি ড্রাফট থাকে, তাহলে ইউজাররা রেজিস্টার করতে পারবে না
    if (contest.status !== "Published") {
      return NextResponse.json(
        { success: false, error: "Registration is not open for this contest yet." }, 
        { status: 400 }
      );
    }

    // 👥 ৪. অলরেডি রেজিস্টার্ড কিনা চেক (Mongoose ObjectId.equals() দিয়ে চেক করা নিরাপদ)
    const isAlreadyRegistered = contest.participants?.some((pId: any) => 
      pId.toString() === userObjectId.toString()
    );

    if (isAlreadyRegistered) {
      return NextResponse.json(
        { success: false, error: "You are already a registered participant in this arena." }, 
        { status: 400 }
      );
    }

    // 📥 🔋 ৫. $addToSet ব্যবহার করে এটমিক্যালি ডাটাবেজ আপডেট (রেস কন্ডিশন এবং ক্র্যাশ প্রুফ)
    await Contest.findByIdAndUpdate(
      id,
      { $addToSet: { participants: userObjectId } },
      { returnDocument: "after", runValidators: true }
    );

    return NextResponse.json(
      { success: true, message: "Arena nodes synced successfully! You are now registered. 🚀" }, 
      { status: 200 }
    );

  } catch (error: any) {
    console.error("💥 CRITICAL CRASH INSIDE CONTEST REGISTRATION PIPELINE:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Internal Registration Cluster Error." }, 
      { status: 500 }
    );
  }
}