import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Contest } from "@/model/Contest";
import { auth } from "@/lib/auth";
import { uploadToCloudinary } from "@/lib/cloudinary";

// POST — নতুন contest তৈরি
export async function POST(req: Request) {
  try {
    await connectDB();
    const session = await auth();

    if (!session || (session.user as any).role !== "ORGANIZER") {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }

    const body = await req.json();
    const { title, description, category, difficulty, prize,entryFee, startDate, endDate, rules, banner } = body;

    if (!banner) {
      return NextResponse.json({ error: "Contest banner image is required" }, { status: 400 });
    }

    // Base64 হলে Cloudinary তে upload করো
    const uploadedImageUrl = banner.startsWith("data:image")
      ? await uploadToCloudinary(banner)
      : banner;

    const newContest = new Contest({
      title, 
      description,
      category, 
      difficulty,
      prize,
      entryFee:Number(entryFee),
      startDate,
      endDate,
      rules,
      banner: uploadedImageUrl,
      createdBy: (session.user as any).id,
      status: "Draft",
    });

    await newContest.save();
    return NextResponse.json({ success: true, data: newContest }, { status: 201 });

  } catch (error: any) {
    console.error("POST API Error:", error.message);
    return NextResponse.json({ error: error.message || "Server Error" }, { status: 500 });
  }
}

// GET — Organizer এর সব contest
export async function GET() {
  try {
    await connectDB();
    const session = await auth();

    if (!session || (session.user as any).role !== "ORGANIZER") {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }

    const contests = await Contest.find({ createdBy: (session.user as any).id })
      .sort({ createdAt: -1 });

    return NextResponse.json({ success: true, data: contests });

  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to fetch contests" }, { status: 500 });
  }
}