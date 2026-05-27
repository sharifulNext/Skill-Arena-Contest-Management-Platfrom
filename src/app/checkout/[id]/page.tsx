"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Loader2, CreditCard, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CheckoutPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push(`/login?callbackUrl=/checkout/${id}`);
    }
  }, [status, id, router]);

  const handleStripePayment = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/contest/${id}/checkout`, { method: "POST" });
      const data = await res.json();

      if (data.success && data.url) {
        // 🚀 ইউজারকে স্ট্রাইপের সিকিউর পেমেন্ট পেজে রিডাইরেক্ট করে দেওয়া হচ্ছে
        window.location.href = data.url;
      } else {
        alert(data.error || "Failed to initiate Stripe gateway");
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="max-w-md w-full bg-white rounded-[2.5rem] border border-slate-200/80 shadow-xl p-8 text-center space-y-6">
        <div className="mx-auto w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
          <CreditCard className="w-7 h-7" />
        </div>
        <div className="space-y-1">
          <h2 className="text-2xl font-black text-slate-900">Secure Stripe Checkout</h2>
          <p className="text-slate-400 text-sm font-medium">You are transferring to Stripe official secure gateway.</p>
        </div>

        <Button
          onClick={handleStripePayment}
          disabled={loading}
          className="w-full py-6 rounded-2xl font-black text-xs bg-blue-600 hover:bg-blue-500 text-white tracking-wider uppercase shadow-md transition-all"
        >
          {loading ? (
            <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Redirecting to Stripe...</>
          ) : (
            "Proceed to Stripe Payment"
          )}
        </Button>

        <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4 text-emerald-500" /> PCI-DSS Compliant Secure Portal
        </div>
      </div>
    </div>
  );
}