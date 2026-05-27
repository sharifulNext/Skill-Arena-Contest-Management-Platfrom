import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Contest } from "@/model/Contest";
import { User } from "@/model/User";
import { auth } from "@/lib/auth";
import mongoose from "mongoose";

export async function GET() {
  try {
    await connectDB();
    const session = await auth();

    if (!session || !session.user) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const userIdStr = (session.user as any).id || (session.user as any)._id;
    let userObjectId: mongoose.Types.ObjectId | null = null;

    if (userIdStr && mongoose.Types.ObjectId.isValid(userIdStr)) {
      userObjectId = new mongoose.Types.ObjectId(userIdStr);
    } else if (session.user.email) {
      const dbUser = await User.findOne({ email: session.user.email }).lean();
      if (dbUser) userObjectId = dbUser._id as mongoose.Types.ObjectId;
    }

    if (!userObjectId) {
      return NextResponse.json({ success: false, error: "User profile context not found" }, { status: 400 });
    }

    // 📊 ১. অ্যানালিটিক্স ডেটা প্রসেসিং (Real Database Document Aggregation)
    const totalContestsCount = await Contest.countDocuments({ 
      participants: userObjectId,
      status: { $ne: "Draft" }
    });

    // গ্লোবাল র‍্যাঙ্ক ক্যালকুলেশন (XP এর ওপর ভিত্তি করে ইউজারদের সর্ট করে র‍্যাঙ্ক নির্ধারণ)
    const allUsersSortedByXp = await User.find({}).sort({ xp: -1 }).select("_id").lean();
    const currentRankIdx = allUsersSortedByXp.findIndex(u => u._id.toString() === userObjectId?.toString());
    const finalRank = currentRankIdx !== -1 ? currentRankIdx + 1 : "N/A";

    const currentUserData = await User.findById(userObjectId).select("xp").lean();
    const userXp = currentUserData?.xp || 0;

    // 🔥 ২. একটিভ ব্যাটেল এরিনা (যেসব কন্টেস্টে ইউজার অলরেডি রেজিস্টার্ড এবং রানিং আছে)
    const activeArenas = await Contest.find({
      participants: userObjectId,
      status: "Published",
      endDate: { $gt: new Date() } // শেষ সময় পার হয়নি
    }).select("title endDate difficulty category").limit(4).lean();

    // 🏆 ৩. লিডারবোর্ড প্রিভিউ (টপ ৩ গ্লোবাল ইউজার)
    const topPerformers = await User.find({})
      .sort({ xp: -1 })
      .limit(3)
      .select("name xp")
      .lean();

    const leaderboardPreview = topPerformers.map((user, index) => {
      const avatars = ["🥇", "🥈", "🥉"];
      return {
        rank: index + 1,
        name: user.name,
        xp: `${user.xp || 0} XP`,
        avatar: avatars[index] || "🏅"
      };
    });

    return NextResponse.json({
      success: true,
      analytics: {
        totalContests: totalContestsCount.toString(),
        currentRank: `#${finalRank}`,
        xpPoints: userXp.toLocaleString(),
        winRate: "70%" // আপনার সাবমিশন স্কিমা অনুযায়ী পরে ডাইনামিক করতে পারবেন
      },
      activeContests: activeArenas.map((c: any) => ({
        id: c._id.toString(),
        title: c.title,
        organizer: "SkillArena Partner",
        endsIn: new Date(c.endDate).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
        difficulty: c.difficulty
      })),
      leaderboard: leaderboardPreview
    }, { status: 200 });

  } catch (error: any) {
    console.error("💥 PARTICIPANT DASHBOARD CORE API ERROR:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}