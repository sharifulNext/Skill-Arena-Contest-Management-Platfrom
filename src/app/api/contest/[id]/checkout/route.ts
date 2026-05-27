import { NextResponse } from "next/server";
import Stripe from "stripe";
import { connectDB } from "@/lib/db";
import { Contest } from "@/model/Contest";
import { auth } from "@/lib/auth";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

type RouteParams = {
  params: Promise<{ id: string }>;
};

export async function POST(req: Request, { params }: RouteParams) {
  try {
    await connectDB();
    const session = await auth();

    if (!session || !(session.user as any)?.id) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const userId = (session.user as any).id;
    const userEmail = session.user?.email || "";

    const contest = await Contest.findById(id);
    if (!contest) {
      return NextResponse.json({ success: false, error: "Contest not found" }, { status: 404 });
    }

    if (contest.participants.includes(userId)) {
      return NextResponse.json({ success: false, error: "Already registered" }, { status: 400 });
    }

    const origin = req.headers.get("origin");

    // 🚨 ডাটাবেজে entryFee না থাকলে সাময়িক টেস্ট করার জন্য ২০ ডলার ধরে নিবে
    const rawFee = contest.entryFee !== undefined ? Number(contest.entryFee) : 20; 

    const checkoutSession = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      customer_email: userEmail,
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: contest.title,
              description: `Entry fee for ${contest.category} challenge`,
              images: contest.banner && !contest.banner.startsWith("data:") ? [contest.banner] : [],
            },
            unit_amount: Math.round(rawFee * 100), // সেন্টে কনভার্ট হচ্ছে
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      // ফিক্সড USD মেইনটেইন করার জন্য ব্ল্যাঙ্ক কারেন্সি অপশনস রিমুভ করা হয়েছে
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}&contestId=${id}`,
      cancel_url: `${origin}/contest/${id}`,
      metadata: {
        contestId: id,
        userId: userId,
      },
    });

    return NextResponse.json({ success: true, url: checkoutSession.url });

  } catch (error: any) {
    console.error("Stripe Session Error:", error.message);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}