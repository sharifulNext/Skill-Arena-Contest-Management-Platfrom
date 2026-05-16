import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Contest } from "@/model/Contest";
import { auth } from "@/lib/auth";

type RouteParams = {
  params: Promise<{ id: string }>;
};

// 🔓 ১. পাবলিক GET মেথড (যেকোনো ভিজিটর এই ডেটা দেখতে পারবে)
export async function GET(req: Request, { params }: RouteParams) {
  try {
    await connectDB();
    
    // Next.js 15+ স্ট্যান্ডার্ড অনুযায়ী params await করা হলো
    const { id } = await params;

    if (!id) {
      return NextResponse.json({ success: false, error: "Contest ID is required" }, { status: 400 });
    }

    // ডাটাবেজ থেকে আইডি অনুযায়ী কনটেস্ট খোঁজা
    const contest = await Contest.findById(id);

    if (!contest) {
      return NextResponse.json({ success: false, error: "Contest not found" }, { status: 404 });
    }

    // ফ্রন্টএন্ডে সাকসেস রেসপন্স পাঠানো
    return NextResponse.json({ success: true, data: contest }, { status: 200 });
  } catch (error: any) {
    console.error("GET Public API Error:", error.message);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// 🔒 ২. অর্গানাইজার PUT মেথড (সুরক্ষিত)
export async function PUT(req: Request, { params }: RouteParams) {
  try {
    await connectDB();
    const session = await auth();
    
    if (!session || (session.user as any).role !== "ORGANIZER") {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await req.json();

    // চেক করা যে এই কনটেস্টটি আসলেই এই অর্গানাইজারের কিনা
    const contest = await Contest.findOne({ _id: id, createdBy: (session.user as any).id });
    if (!contest) {
      return NextResponse.json({ success: false, error: "Contest not found or unauthorized" }, { status: 404 });
    }

    const updatedContest = await Contest.findByIdAndUpdate(
      id, 
      { $set: body }, 
      { new: true, runValidators: true }
    );
    
    return NextResponse.json({ success: true, data: updatedContest });
  } catch (error: any) {
    console.error("PUT API Error:", error.message);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// 🔒 ৩. অর্গানাইজার DELETE মেথড (সুরক্ষিত)
export async function DELETE(req: Request, { params }: RouteParams) {
  try {
    await connectDB();
    const session = await auth();
    
    if (!session || (session.user as any).role !== "ORGANIZER") {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    const contest = await Contest.findOne({ _id: id, createdBy: (session.user as any).id });
    if (!contest) {
      return NextResponse.json({ success: false, error: "Contest not found or unauthorized" }, { status: 404 });
    }

    await Contest.findByIdAndDelete(id);
    return NextResponse.json({ success: true, message: "Contest deleted successfully" });
  } catch (error: any) {
    console.error("DELETE API Error:", error.message);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}