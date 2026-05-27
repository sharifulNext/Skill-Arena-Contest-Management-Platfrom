"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CheckCircle2, Loader2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PaymentSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const contestId = searchParams?.get("contestId");
  const sessionId = searchParams?.get("session_id");

  const [verifying, setVerifying] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!contestId || !sessionId) return;

    const completeRegistration = async () => {
      try {
        // আমাদের তৈরি করা পূর্বের রেজিস্ট্রেশন API-টি কল হবে
        const response = await fetch(`/api/contest/${contestId}/register`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        });

        const data = await response.json();

        if (data.success) {
          setVerifying(false);
        } else {
          setError(data.error || "Payment verified but registration failed.");
          setVerifying(false);
        }
      } catch (err) {
        console.error(err);
        setError("Network error during registration.");
        setVerifying(false);
      }
    };

    completeRegistration();
  }, [contestId, sessionId]);

  if (verifying) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white">
        <Loader2 className="w-10 h-10 text-emerald-500 animate-spin" />
        <p className="text-slate-500 text-sm font-bold mt-3">Verifying payment & securing your slot...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="max-w-md w-full bg-white rounded-[2.5rem] border border-slate-200/80 shadow-xl p-8 text-center space-y-6">
        {error ? (
          <>
            <div className="mx-auto w-16 h-16 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold">!</span>
            </div>
            <h2 className="text-2xl font-black text-slate-900">Verification Error</h2>
            <p className="text-slate-500 text-sm font-medium">{error}</p>
            <Button onClick={() => router.push("/")} className="w-full bg-slate-900 text-white rounded-xl">Back to Home</Button>
          </>
        ) : (
          <>
            <div className="mx-auto w-16 h-16 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-black text-slate-900">Payment Successful!</h2>
              <p className="text-slate-500 text-sm font-medium">
                Stripe confirmed your transaction. You are now officially registered for this contest challenge.
              </p>
            </div>
            <Button
              onClick={() => router.push(`/contest/${contestId}`)}
              className="w-full py-6 rounded-2xl font-black text-xs bg-blue-600 hover:bg-blue-500 text-white tracking-wider uppercase shadow-md flex items-center justify-center gap-2"
            >
              Go to Contest Arena <ArrowRight className="w-4 h-4" />
            </Button>
          </>
        )}
      </div>
    </div>
  );
}