"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { 
  Trophy, Zap, Target, Percent, Clock, ChevronRight, 
  Sparkles, ArrowUpRight, Code, Medal, Loader2 
} from "lucide-react";
import Link from "next/link";

interface DashboardData {
  analytics: {
    totalContests: string;
    currentRank: string;
    xpPoints: string;
    winRate: string;
  };
  activeContests: Array<{
    id: string;
    title: string;
    organizer: string;
    endsIn: string;
    difficulty: string;
  }>;
  leaderboard: Array<{
    rank: number;
    name: string;
    xp: string;
    avatar: string;
  }>;
}

export default function ParticipantDashboard() {
  const { data: session } = useSession();
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardPayload = async () => {
      try {
        const res = await fetch(`/api/participant?t=${Date.now()}`);
        if (res.ok) {
          const payload = await res.json();
          if (payload.success) {
            setData(payload);
          }
        }
      } catch (err) {
        console.error("Failed to stream pipeline nodes into dashboard grid:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardPayload();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 gap-2">
        <Loader2 className="w-10 h-10 text-indigo-600 animate-spin" />
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Synchronizing Metrics...</p>
      </div>
    );
  }

  // ডেটা ফেচিং ফেইল করলে ফলব্যাক স্ট্রাকচার
  const stats = data?.analytics || { totalContests: "0", currentRank: "N/A", xpPoints: "0", winRate: "0%" };
  const activeContests = data?.activeContests || [];
  const leaderboard = data?.leaderboard || [];

  const analyticsCards = [
    { title: "Total Contests", value: stats.totalContests, icon: Target, text: "text-blue-600", bg: "bg-blue-50" },
    { title: "Current Rank", value: stats.currentRank, icon: Medal, text: "text-amber-600", bg: "bg-amber-50", suffix: "Global" },
    { title: "XP Points", value: stats.xpPoints, icon: Zap, text: "text-purple-600", bg: "bg-purple-50" },
    { title: "Win Rate", value: stats.winRate, icon: Percent, text: "text-emerald-600", bg: "bg-emerald-50" },
  ];

  return (
    <div className="p-4 sm:p-6 md:p-10 space-y-8 bg-slate-50 min-h-screen">
      
      {/* 👑 ১. Welcome Hero Section (NextAuth সেশন কানেক্টেড) */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-950 p-6 sm:p-8 shadow-xl border border-slate-800">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.15),transparent_50%)]" />
        <div className="relative z-10 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
              Welcome Back, {session?.user?.name || "Participant"} 👋
            </h1>
            <p className="text-indigo-200 text-xs sm:text-sm font-medium">
              Ecosystem metrics synchronized. You are ranked <span className="text-amber-400 font-bold">{stats.currentRank}</span> this week. Keep sprinting!
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-md border border-white/10 px-4 py-2.5 rounded-2xl flex items-center gap-2.5 w-fit shrink-0">
            <Trophy className="w-5 h-5 text-amber-400 animate-bounce" />
            <span className="text-white text-xs font-black uppercase tracking-wider">Top 2% Elite Tier</span>
          </div>
        </div>
      </div>

      {/* 📊 ২. Analytics Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {analyticsCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div 
              key={idx} 
              className="group bg-white/80 backdrop-blur-xl border border-slate-200/60 p-4 sm:p-5 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex items-center justify-between gap-3"
            >
              <div className="space-y-1 sm:space-y-2">
                <span className="text-slate-400 text-[11px] sm:text-xs font-bold block tracking-tight group-hover:text-slate-600 transition-colors">
                  {card.title}
                </span>
                <div className="flex items-baseline gap-1">
                  <span className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">{card.value}</span>
                  {card.suffix && <span className="text-[10px] text-slate-400 font-bold">{card.suffix}</span>}
                </div>
              </div>
              <div className={`p-2.5 sm:p-3 rounded-xl ${card.bg} ${card.text} transition-transform duration-300 group-hover:scale-110 shrink-0`}>
                <Icon className="w-4 h-4 sm:w-5 h-5" />
              </div>
            </div>
          );
        })}
      </div>

      {/* 🏢 ৩. ডুয়াল-কলাম মিডল ড্যাশবোর্ড গ্রিড */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* বাম পাশের কলাম: একটিভ কন্টেস্ট */}
        <div className="lg:col-span-2 space-y-8">
          <div className="space-y-4">
            <div className="flex justify-between items-center px-1">
              <h3 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
                <Code className="w-4 h-4 text-indigo-600" /> Active Battle Arenas
              </h3>
              <Link href="/dashboard/participant/contests" className="text-xs font-bold text-indigo-600 hover:underline flex items-center gap-0.5">
                View All <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            {activeContests.length === 0 ? (
              <div className="p-8 text-center bg-white border border-slate-200/60 rounded-2xl text-xs font-bold text-slate-400">
                🚀 You have no active running battle arenas. Register for a contest to kick off your sprint!
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {activeContests.map((contest) => (
                  <div key={contest.id} className="bg-white border border-slate-200/60 p-5 rounded-2xl shadow-sm flex flex-col justify-between gap-4 hover:border-slate-300 transition-all">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-bold text-slate-400">Hosted by {contest.organizer}</span>
                        <span className={`px-2 py-0.5 rounded text-[9px] font-black tracking-wider uppercase ${
                          contest.difficulty === "Advanced" || contest.difficulty === "Hard" ? "bg-rose-50 text-rose-600 border border-rose-100" : "bg-amber-50 text-amber-600 border border-amber-100"
                        }`}>
                          {contest.difficulty}
                        </span>
                      </div>
                      <h4 className="font-bold text-slate-900 text-sm leading-snug">{contest.title}</h4>
                    </div>
                    
                    <div className="flex items-center justify-between pt-2 border-t border-slate-50 text-xs">
                      <span className="text-slate-400 font-semibold flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-rose-500" /> Date: <span className="text-slate-700 font-bold">{contest.endsIn}</span>
                      </span>
                      <Link href={`/dashboard/participant/contests`} className="px-3 py-1.5 bg-slate-900 hover:bg-indigo-600 text-white font-bold text-[11px] rounded-lg transition-all flex items-center gap-1">
                        Enter <ArrowUpRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ডান পাশের কলাম: লিডারবোর্ড প্রিভিউ এবং এআই ইনসাইটস */}
        <div className="space-y-8">
          
          {/* 🏆 Leaderboard Preview */}
          <div className="space-y-4">
            <h3 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2 px-1">
              <Trophy className="w-4 h-4 text-amber-500" /> Arena Leaderboard Preview
            </h3>

            <div className="bg-white border border-slate-200/60 p-4 rounded-2xl shadow-sm space-y-3">
              {leaderboard.map((user) => (
                <div key={user.rank} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50/50 border border-slate-100 hover:bg-slate-50 transition-colors gap-3">
                  <div className="flex items-center gap-3">
                    <span className="text-base shrink-0">{user.avatar}</span>
                    <span className="text-xs font-bold text-slate-800 tracking-tight">{user.name}</span>
                  </div>
                  <span className="text-[11px] font-mono font-black text-indigo-600 bg-indigo-50/70 border border-indigo-100/50 px-2 py-0.5 rounded-md">
                    {user.xp}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* 🤖 AI Insights Section */}
          <div className="space-y-4">
            <h3 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2 px-1">
              <Sparkles className="w-4 h-4 text-purple-600 animate-pulse" /> AI Engine Insights
            </h3>

            <div className="bg-gradient-to-br from-indigo-900 via-indigo-950 to-purple-950 p-5 rounded-2xl shadow-md border border-indigo-800 space-y-3 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/10 rounded-full blur-xl pointer-events-none" />
              <div className="flex items-center gap-2 text-[10px] font-black text-indigo-300 uppercase tracking-wider bg-white/10 px-2.5 py-1 rounded-md w-fit border border-white/5">
                Next.js Code Audit
              </div>
              <p className="text-xs text-indigo-100/90 leading-relaxed font-medium">
                "Your last optimization on <span className="text-amber-300 font-bold">Bundle Size</span> boosted performance metrics by <span className="text-emerald-400 font-black">+14%</span>. Focus on component decoupling in the upcoming sprint to bypass the middleware bottleneck."
              </p>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}