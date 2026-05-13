"use client";

import Image from "next/image";
import { FaRegClock, FaUsers, FaTrophy } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ContestCard({ contest }: any) {
  if (!contest) return null;

  return (
    <div className="group bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl overflow-hidden transition-all hover:shadow-2xl hover:shadow-primary/10">
      
      {/* Contest Image Section */}
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={contest.image || "https://images.unsplash.com/photo-1550751827-4bd374c3f58b"} 
          alt={contest.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {/* Overlay Badge */}
        <div className="absolute top-4 left-4">
          <span className="bg-white/90 dark:bg-slate-950/90 backdrop-blur-sm text-[10px] font-bold uppercase tracking-widest text-primary px-3 py-1 rounded-lg shadow-sm">
            {contest.category}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white line-clamp-1 group-hover:text-primary transition-colors">
            {contest.title}
          </h3>
        </div>

        {/* Stats Row */}
        <div className="flex items-center gap-4 mb-6 text-sm text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-1.5">
            <FaUsers className="text-primary" />
            <span>{contest.participants} Joined</span>
          </div>
          <div className="flex items-center gap-1.5">
            <FaTrophy className="text-amber-500" />
            <span className="font-bold text-slate-700 dark:text-slate-200">{contest.prize}</span>
          </div>
        </div>

        {/* Timer Box */}
        <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-2xl flex justify-between items-center mb-6 border border-slate-100/50 dark:border-slate-700/50">
          <div className="flex items-center gap-2 text-slate-500 text-xs font-medium">
            <FaRegClock />
            <span>Time Left:</span>
          </div>
          <span className="font-mono font-bold text-sm text-slate-900 dark:text-white tracking-tight">
            02d : 14h : 45m
          </span>
        </div>

        {/* Action Button */}
        <Link href={`/contest/${contest.id}`} className="w-full rounded-xl font-bold py-6 group/btn">
          View Details
        </Link>
      </div>
    </div>
  );
}