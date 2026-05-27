"use client";

import React from "react";
import { Loader2, Terminal } from "lucide-react";

export default function GlobalLoading() {
  return (
    <div className="fixed inset-0 z-[9999] min-h-screen bg-slate-50/80 backdrop-blur-md flex flex-col items-center justify-center gap-4 animate-fade-in">
      
      {/* 🌌 ব্যাকগ্রাউন্ড গ্লো ইফেক্ট */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* 📦 মেইন লোডার কন্টেইনার */}
      <div className="relative flex items-center justify-center">
        {/* আউটার স্পিনিং রিং */}
        <div className="w-16 h-16 rounded-full border-4 border-slate-200 border-t-slate-900 animate-spin" />
        
        {/* ইনার পালসিং এআই/কোড আইকন */}
        <div className="absolute flex items-center justify-center w-10 h-10 bg-white rounded-xl shadow-md border border-slate-100">
          <Terminal className="w-5 h-5 text-slate-800 animate-pulse" />
        </div>
      </div>

      {/* 🏷️ টেক্সট সেকশন */}
      <div className="text-center space-y-1 relative z-10">
        <h3 className="text-sm font-bold text-slate-900 tracking-tight">
          Loading SkillArena Engine
        </h3>
        <p className="text-[10px] font-bold text-slate-400 tracking-widest uppercase animate-pulse">
          Optimizing node server assets...
        </p>
      </div>

    </div>
  );
}