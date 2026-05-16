"use client";

import { motion } from "framer-motion";
import { Trophy, Calendar, Sparkles, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface PublicContestCardProps {
  contest: {
    _id: string;
    title: string;
    category: string;
    difficulty: string;
    prize: string;
    startDate: string;
    endDate: string;
    banner?: string; 
  };
}

export default function PublicContestCard({ contest }: PublicContestCardProps) {
  
  // ডেট ফরম্যাটিং ফাংশন
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 15 }}
      className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-sm transition-all hover:shadow-xl hover:border-slate-300 min-h-[420px]"
    >
      <div>
        {/* 🖼️ কন্টেস্ট ব্যানার ইমেজ সেকশন */}
        <div className="relative h-48 w-full overflow-hidden bg-slate-100">
          {contest.banner ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={contest.banner}
              alt={contest.title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            // যদি ব্যানার ইমেজ না থাকে তবে ক্যাটাগরি টেক্সট সহ ফলব্যাক ডিজাইন
            <div className="flex h-full w-full items-center justify-center bg-slate-900 text-white font-bold uppercase tracking-wider">
              {contest.category}
            </div>
          )}
          
          {/* ক্যাটাগরি ব্যাজ (হোমপেজের ক্যাটাগরি অনুযায়ী শাইন করবে) */}
          <span className="absolute top-4 left-4 text-[11px] font-extrabold uppercase tracking-wider bg-white/90 backdrop-blur-md text-slate-900 px-3 py-1.5 rounded-xl shadow-sm">
            {contest.category}
          </span>
        </div>

        {/* কন্টেন্ট বডি */}
        <div className="p-6">
          <h3 className="text-xl font-bold tracking-tight text-slate-800 line-clamp-2 min-h-[56px] group-hover:text-primary transition-colors">
            {contest.title}
          </h3>

          {/* ইনফো গ্রিড */}
          <div className="space-y-3 my-4 text-sm font-medium text-slate-500">
            {/* প্রাইজ পুল */}
            <div className="flex items-center gap-2.5 bg-emerald-50/60 p-2.5 rounded-xl border border-emerald-100/50">
              <Trophy className="w-4 h-4 text-emerald-600" />
              <span className="text-emerald-700 font-bold">{contest.prize}</span>
            </div>
            
            {/* টাইমলাইন বা ডেট */}
            <div className="flex items-center gap-2.5 text-slate-600 px-1">
              <Calendar className="w-4 h-4 text-slate-400" />
              <span className="text-xs font-semibold">{formatDate(contest.startDate)} - {formatDate(contest.endDate)}</span>
            </div>

            {/* ডিফিকাল্টি লেভেল */}
            <div className="flex items-center gap-2.5 px-1">
              <Sparkles className="w-4 h-4 text-slate-400" />
              <span className={cn(
                "text-[11px] px-2.5 py-0.5 rounded-md font-extrabold uppercase tracking-wide",
                contest.difficulty === "Advanced" && "bg-rose-50 text-rose-600 border border-rose-100",
                contest.difficulty === "Intermediate" && "bg-blue-50 text-blue-600 border border-blue-100",
                contest.difficulty === "Beginner" && "bg-slate-100 text-slate-600"
              )}>
                {contest.difficulty}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* অ্যাকশন বাটন */}
      <div className="p-6 pt-0">
        <Link
          href={`/contest/${contest._id}`}
          className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-slate-950 text-white text-sm font-bold shadow-md hover:bg-slate-800 transition"
        >
          View Details
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>
    </motion.div>
  );
}