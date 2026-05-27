import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { User } from "@/model/User";
import { auth } from "@/lib/auth";

type RouteParams = { params: Promise<{ id: string }> };

// 🔄 রোল সোয়াপ, ভেরিফাই এবং ব্যান হ্যান্ডেল করার সিঙ্গেল এপিআই
export async function PUT(req: Request, { params }: RouteParams) {
  try {
    await connectDB();
    const session = await auth();

    if (!session || (session.user as any).role !== "ADMIN") {
      return NextResponse.json({ success: false, error: "Unauthorized." }, { status: 401 });
    }

    const { id } = await params;
    const body = await req.json(); // ফ্রন্টএন্ড থেকে { role } বা { status } পাঠানো হবে

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true, runValidators: true }
    ).select("-password");

    if (!updatedUser) {
      return NextResponse.json({ success: false, error: "User matrix not found." }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: updatedUser }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// 🗑️ পার্মানেন্ট পার্জ/ডিলিট মেথড
export async function DELETE(req: Request, { params }: RouteParams) {
  try {
    await connectDB();
    const session = await auth();

    if (!session || (session.user as any).role !== "ADMIN") {
      return NextResponse.json({ success: false, error: "Unauthorized." }, { status: 401 });
    }

    const { id } = await params;
    await User.findByIdAndDelete(id);

    return NextResponse.json({ success: true, message: "User purged successfully." }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}