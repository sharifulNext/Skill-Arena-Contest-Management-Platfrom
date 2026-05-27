"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { HelpCircle, ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="w-20 h-20 mx-auto bg-indigo-50 border border-indigo-100 rounded-3xl flex items-center justify-center shadow-xs">
          <HelpCircle className="w-10 h-10 text-indigo-600 animate-pulse" />
        </div>
        <div className="space-y-2">
          <h1 className="text-4xl font-black text-slate-950 tracking-tight">404 - Page Not Found</h1>
          <p className="text-slate-500 text-sm font-medium">The endpoint you are trying to access does not exist or has been shifted dynamically.</p>
        </div>
        <div className="flex gap-3 justify-center">
          <button onClick={() => router.back()} className="px-5 py-2.5 bg-slate-900 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-sm">
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          <button onClick={() => router.push("/")} className="px-5 py-2.5 bg-white border border-slate-200 text-slate-700 text-xs font-bold rounded-xl flex items-center gap-1.5">
            <Home className="w-4 h-4" /> Home
          </button>
        </div>
      </div>
    </div>
  );
}