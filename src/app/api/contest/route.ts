import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Contest } from "@/model/Contest";
import { auth } from "@/lib/auth";
import { uploadToCloudinary } from "@/lib/cloudinary";

// New API route for handling contests (POST for creating, GET for fetching)
export async function POST(req: Request) {
  try {
    await connectDB();
    const session = await auth();

    //Only organizers can create contests
    if (!session || (session.user as any).role !== "ORGANIZER") {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }

    const body = await req.json();
    const { title, description, category, difficulty, prize, entryFee, startDate, endDate, rules, banner } = body;

    if (!banner) {
      return NextResponse.json({ error: "Contest banner image is required" }, { status: 400 });
    }

    //Based on the banner value, decide whether to upload or use existing URL
    const uploadedImageUrl = banner.startsWith("data:image")
      ? await uploadToCloudinary(banner)
      : banner;

    const newContest = new Contest({
      title, 
      description,
      category, 
      difficulty,
      prize,
      entryFee: Number(entryFee),
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

// GET API route to fetch contests with two views: public and organizer-specific
export async function GET(req: Request) {
  try {
    await connectDB();
  
    const { searchParams } = new URL(req.url);
    const view = searchParams.get("view") || "public"; 
    if (view === "public") {
      const publicContests = await Contest.find({ status: { $ne: "Draft" } }) 
        .sort({ createdAt: -1 });

      return NextResponse.json({ success: true, data: publicContests }, { status: 200 });
    }

    // Private proteccted
    if (view === "organizer") {
      const session = await auth();

      if (!session || (session.user as any).role !== "ORGANIZER") {
        return NextResponse.json({ error: "Unauthorized. Organizers only." }, { status: 401 });
      }
      const organizerContests = await Contest.find({ createdBy: (session.user as any).id })
        .sort({ createdAt: -1 });

      return NextResponse.json({ success: true, data: organizerContests }, { status: 200 });
    }

    return NextResponse.json({ error: "Invalid view parameter" }, { status: 400 });

  } catch (error: any) {
    console.error("GET API Error:", error.message);
    return NextResponse.json({ error: error.message || "Failed to fetch contests" }, { status: 500 });
  }
}