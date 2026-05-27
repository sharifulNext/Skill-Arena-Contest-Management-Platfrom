import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Contest } from "@/model/Contest";
import "@/model/User";
import { auth } from "@/lib/auth";

type RouteParams = { params: Promise<{ id: string }> };

// 🔄 কন্টেস্ট পাবলিশ বা ফিচারড টগল করার মেথড
export async function PUT(req: Request, { params }: RouteParams) {
  try {
    await connectDB();
    const session = await auth();

    if (!session || (session.user as any).role !== "ADMIN") {
      return NextResponse.json({ success: false, error: "Unauthorized access." }, { status: 401 });
    }

    const { id } = await params;
    const body = await req.json();

    // 🛡️ পেলোড ফিল্টারিং (হোয়াইটলিস্টিং)
    const updatePayload: Record<string, any> = {};
    if (body.status !== undefined) updatePayload.status = body.status;
    if (body.isFeatured !== undefined) updatePayload.isFeatured = body.isFeatured;

    if (Object.keys(updatePayload).length === 0) {
      return NextResponse.json({ success: false, error: "No assignable fields provided." }, { status: 400 });
    }

    const updatedContest = await Contest.findByIdAndUpdate(
      id,
      { $set: updatePayload },
      { returnDocument: 'after', runValidators: true }
    ).populate("createdBy", "name");

    if (!updatedContest) {
      return NextResponse.json({ success: false, error: "Contest node not found." }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: updatedContest }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// 🗑️ কন্টেস্ট পার্মানেন্টলি ডিলিট করার মেথড
export async function DELETE(req: Request, { params }: RouteParams) {
  try {
    await connectDB();
    const session = await auth();

    if (!session || (session.user as any).role !== "ADMIN") {
      return NextResponse.json({ success: false, error: "Unauthorized access." }, { status: 401 });
    }

    const { id } = await params;
    const deletedContest = await Contest.findByIdAndDelete(id);

    if (!deletedContest) {
      return NextResponse.json({ success: false, error: "Contest not found or already purged." }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Arena purged successfully." }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}