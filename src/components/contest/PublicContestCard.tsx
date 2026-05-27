"use client";

import { motion } from "framer-motion";
import { Trophy, Calendar, Sparkles, ArrowUpRight, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react"; 

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
  const router = useRouter();
  const { data: session } = useSession(); 
  
  // Date Formated
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  //  Navigation Guard Handler
  const handleNavigation = () => {
    if (!session) {
      router.push(`/login?callbackUrl=/contest/${contest._id}`);
    } else {
      router.push(`/contest/${contest._id}`);
    }
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
        <div className="relative h-48 w-full overflow-hidden bg-slate-100">
          {contest.banner ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={contest.banner}
              alt={contest.title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-slate-900 text-white font-bold uppercase tracking-wider">
              {contest.category}
            </div>
          )}
          
          <span className="absolute top-4 left-4 text-[11px] font-extrabold uppercase tracking-wider bg-white/90 backdrop-blur-md text-slate-900 px-3 py-1.5 rounded-xl shadow-sm">
            {contest.category}
          </span>
        </div>

        <div className="p-6">
          <h3 className="text-xl font-bold tracking-tight text-slate-800 line-clamp-2 min-h-[56px] group-hover:text-primary transition-colors">
            {contest.title}
          </h3>

          <div className="space-y-3 my-4 text-sm font-medium text-slate-500">
            <div className="flex items-center gap-2.5 bg-emerald-50/60 p-2.5 rounded-xl border border-emerald-100/50">
              <Trophy className="w-4 h-4 text-emerald-600" />
              <span className="text-emerald-700 font-bold">{contest.prize}</span>
            </div>
            
            <div className="flex items-center gap-2.5 text-slate-600 px-1">
              <Calendar className="w-4 h-4 text-slate-400" />
              <span className="text-xs font-semibold">{formatDate(contest.startDate)} - {formatDate(contest.endDate)}</span>
            </div>

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
      
      <div className="p-6 pt-0">
        <button
          onClick={handleNavigation}
          className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-slate-950 text-white text-sm font-bold shadow-md hover:bg-slate-800 transition active:scale-[0.98]"
        >
          {!session && <Lock className="w-4 h-4 opacity-70" />}
          <span>View Details</span>
          <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
}