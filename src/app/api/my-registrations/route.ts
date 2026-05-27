// src/app/api/my-registrations/route.ts

import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Contest } from "@/model/Contest";
import { User } from "@/model/User"; 
import { auth } from "@/lib/auth";
import mongoose from "mongoose";

export async function GET(request: Request) {
  try {
    await connectDB();
    
    const session = await auth();
    if (!session || !session.user) {
      return NextResponse.json({ 
        success: false, 
        data: [], 
        message: "You must be logged in to view your registrations."
      }, { status: 401 });
    }

    let userIdStr = (session.user as any).id || (session.user as any)._id;
    
    if (!userIdStr && session.user.email) {
      const dbUser = await User.findOne({ email: session.user.email }).select("_id").lean();
      if (dbUser) {
        userIdStr = dbUser._id.toString();
      }
    }

    if (!userIdStr || !mongoose.Types.ObjectId.isValid(userIdStr)) {
      return NextResponse.json({ 
        success: false, 
        data: [], 
        message: "Could not bind your profile with database context nodes." 
      }, { status: 400 });
    }

    const targetUserObjectId = new mongoose.Types.ObjectId(userIdStr);

    // ইউজার যে কন্টেস্টে রেজিস্টার্ড (participants অ্যারেতে আছে) এবং পাবলিশড
    const userContests = await Contest.find({
      status: "Published",
      participants: targetUserObjectId
    })
    .sort({ createdAt: -1 })
    .lean();

    const sanitizedContests = userContests.map((contest: any) => ({
      ...contest,
      _id: contest._id.toString(),
      id: contest._id.toString(),
      startDate: contest.startDate ? new Date(contest.startDate).toISOString() : null,
      endDate: contest.endDate ? new Date(contest.endDate).toISOString() : null,
    }));

    return NextResponse.json({ success: true, data: sanitizedContests }, { status: 200 });

  } catch (error: any) {
    console.error("💥 CRITICAL CRASH IN MY-REGISTRATIONS CORE ROUTE:", error);
    return NextResponse.json({ 
      success: false, 
      data: [], 
      error: error.message 
    }, { status: 500 });
  }
}