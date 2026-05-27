"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AlertTriangle, RotateCcw, Home, Terminal } from "lucide-react";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalErrorPage({ error, reset }: ErrorPageProps) {
  const router = useRouter();

  useEffect(() => {
    // 🪵 প্রোডাকশনে এরর ট্র্যাকিং বা লগিং করার জন্য
    console.error("Runtime Application Error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex items-center justify-center p-6 relative overflow-hidden">
      
      {/* 🌌 ব্যাকগ্রাউন্ড এরর গ্লো (রোস/লালচে প্রিমিয়াম ইফেক্ট) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-rose-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-md w-full text-center space-y-8 relative z-10">
        
        {/* 🚨 গ্লিচ-স্টাইল কাস্টম আইকন */}
        <div className="relative w-20 h-20 mx-auto flex items-center justify-center bg-rose-50 border border-rose-100 rounded-3xl shadow-sm group">
          <div className="absolute inset-0 bg-rose-500/10 rounded-3xl blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
          <AlertTriangle className="w-10 h-10 text-rose-600 animate-bounce" />
        </div>

        {/* 📝 টেক্সট ও মেসেজ সেকশন */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 text-white text-[10px] font-bold tracking-widest uppercase shadow-xs">
            <Terminal className="w-3 h-3" /> Exception Caught
          </div>
          <h1 className="text-3xl font-black text-slate-950 tracking-tight">
            System Node Interrupted
          </h1>
          <p className="text-slate-500 text-sm font-medium leading-relaxed">
            An unexpected error occurred within the application layer. Don&apos;t worry, your data session remains safe.
          </p>
          
          {/* 🪵 এরর ডেসক্রিপশন বক্স (ডেভেলপমেন্ট ফ্রেন্ডলি) */}
          <div className="bg-slate-100 border border-slate-200/80 p-3 rounded-xl max-h-24 overflow-y-auto text-left">
            <code className="text-xs font-mono text-rose-600 break-all">
              {error.message || "An unknown execution error broke the layout tree."}
            </code>
          </div>
        </div>

        {/* 🛠️ অ্যাকশন বাটনসমূহ */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
          {/* আবার চেষ্টা করার বাটন */}
          <button
            onClick={() => reset()}
            className="w-full sm:w-auto px-5 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm rounded-xl shadow-md shadow-slate-900/10 transition flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-4 h-4" /> Try Again
          </button>

          {/* হোমপেজে ফেরার বাটন */}
          <button
            onClick={() => router.push("/")}
            className="w-full sm:w-auto px-5 py-3 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-sm rounded-xl transition flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" /> Go to Home
          </button>
        </div>

        {/* 💬 ছোট সিকিউরিটি ফুটনোট */}
        <p className="text-[11px] font-medium text-slate-400">
          Error Digest ID: <span className="font-mono">{error.digest || "SYS-NODE-ERR"}</span>
        </p>

      </div>
    </div>
  );
}