"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import CreateContestForm from "@/components/dashboard/CreateContestForm";

export default function CreateContestPage() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto space-y-6"
    >
      {/* Top Interactive Banner */}
      <div className="relative p-8 rounded-3xl overflow-hidden bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white shadow-xl shadow-indigo-950/10">
        {/* Subtle Background Grid Line Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        
        <div className="relative z-10 flex items-center gap-4">
          <div className="p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10">
            <Sparkles className="h-7 w-7 text-indigo-400 animate-pulse" />
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-tight">Launch a New Arena</h1>
            <p className="text-indigo-200/80 text-sm font-medium">Draft criteria, dates, and set up the AI-Judging model seamlessly.</p>
          </div>
        </div>
      </div>

      {/* Form Component Inject */}
      <CreateContestForm />
    </motion.div>
  );
}