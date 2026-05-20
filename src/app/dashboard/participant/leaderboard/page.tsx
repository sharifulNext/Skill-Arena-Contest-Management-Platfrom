"use client";

import { useState } from "react";
import { 
  Trophy, Medal, Zap, Award, Target, Flame, 
  Search, SlidersHorizontal, ChevronRight, ArrowUpRight 
} from "lucide-react";

// 📋 ডামি লিডারবোর্ড ডেটাসেট (ফিল্টার সুইচের সাথে সিঙ্কড)
const leaderboardData = {
  Weekly: [
    { rank: 1, name: "Tamim Iqbal", xp: 2450, wins: 4, avatar: "👨‍💻", current: false },
    { rank: 2, name: "Shariful Islam", xp: 2310, wins: 3, avatar: "⚡", current: true }, // Current active user
    { rank: 3, name: "Nigar Sultana", xp: 2180, wins: 3, avatar: "👩‍💻", current: false },
    { rank: 4, name: "Siam Hossain", xp: 1950, wins: 2, avatar: "🚀", current: false },
    { rank: 5, name: "Anik Rahman", xp: 1820, wins: 2, avatar: "🛡️", current: false },
  ],
  Monthly: [
    { rank: 1, name: "Nigar Sultana", xp: 9800, wins: 12, avatar: "👩‍💻", current: false },
    { rank: 2, name: "Tamim Iqbal", xp: 9450, wins: 10, avatar: "👨‍💻", current: false },
    { rank: 3, name: "Siam Hossain", xp: 8900, wins: 9, avatar: "🚀", current: false },
    { rank: 4, name: "Shariful Islam", xp: 8540, wins: 8, avatar: "⚡", current: true },
    { rank: 5, name: "Anik Rahman", xp: 7200, wins: 6, avatar: "🛡️", current: false },
  ],
  Contest_Specific: [
    { rank: 1, name: "Siam Hossain", xp: 1000, wins: 1, avatar: "🚀", current: false },
    { rank: 2, name: "Shariful Islam", xp: 960, wins: 1, avatar: "⚡", current: true },
    { rank: 3, name: "Tamim Iqbal", xp: 920, wins: 1, avatar: "👨‍💻", current: false },
    { rank: 4, name: "Nigar Sultana", xp: 850, wins: 0, avatar: "👩‍💻", current: false },
  ]
};

export default function Leaderboard() {
  // 🔘 টাইমলাইন ফিল্টার স্টেট (Weekly | Monthly | Contest Specific)
  const [timeline, setTimeline] = useState<"Weekly" | "Monthly" | "Contest_Specific">("Weekly");
  const [searchQuery, setSearchQuery] = useState("");

  const activeList = leaderboardData[timeline];

  // 🥇 পোডিয়ামের জন্য প্রথম ৩ জন মেম্বার সেপারেট করা
  const top1 = activeList.find(u => u.rank === 1);
  const top2 = activeList.find(u => u.rank === 2);
  const top3 = activeList.find(u => u.rank === 3);

  // 📋 বাকি মেম্বারদের নিচের টেবিলে পুশ করা
  const tableUsers = activeList.filter(u => u.rank > 3 && u.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="p-4 sm:p-6 md:p-10 space-y-10 bg-slate-50 min-h-screen">
      
      {/* 👑 হেডার ট্র্যাকার */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-5">
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
            <Trophy className="w-7 h-7 sm:w-8 h-8 text-amber-500 shrink-0 animate-pulse" /> Hall of Elite Codex
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm font-medium pl-1">
            Track algorithmic tier rank alterations, review community XP distributions, and claim arena dominance.
          </p>
        </div>

        {/* ⏱️ এক্সট্রা ফিচার: গ্লোবাল টাইমলাইন ফিল্টার হাব */}
        <div className="flex bg-slate-200/70 p-1 rounded-xl w-full sm:w-auto text-[11px] font-black tracking-wide border border-slate-300/30">
          {(["Weekly", "Monthly", "Contest_Specific"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTimeline(t)}
              className={`flex-1 sm:flex-none px-4 py-2 rounded-lg transition-all capitalize ${
                timeline === t 
                  ? "bg-white text-slate-900 shadow-sm font-black" 
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              {t.replace("_", " ")}
            </button>
          ))}
        </div>
      </div>

      {/* 🏛️ ১. BIG PODIUM LAYOUT (🥇 | 🥈 | 🥉) */}
      <div className="flex flex-col items-center justify-center pt-8 max-w-2xl mx-auto">
        <div className="flex items-end justify-center w-full gap-3 sm:gap-6 text-center">
          
          {/* 🥈 2nd Place Podium */}
          {top2 && (
            <div className="flex flex-col items-center w-24 sm:w-32 group animate-in fade-in slide-in-from-bottom-6 duration-500">
              <span className="text-3xl mb-1 group-hover:scale-110 transition-transform">{top2.avatar}</span>
              <span className="text-xs font-bold text-slate-700 truncate w-full px-1">{top2.name}</span>
              <span className="text-[10px] font-mono font-bold text-indigo-600 mb-2">{top2.xp} XP</span>
              <div className="w-full h-24 sm:h-28 bg-gradient-to-t from-slate-200 to-slate-100 rounded-t-2xl border-t border-x border-slate-300/60 shadow-sm flex flex-col items-center justify-center p-2">
                <span className="text-2xl sm:text-3xl font-black text-slate-400">2</span>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">🥈 Silver</span>
              </div>
            </div>
          )}

          {/* 🥇 1st Place Podium */}
          {top1 && (
            <div className="flex flex-col items-center w-28 sm:w-36 group animate-in fade-in slide-in-from-bottom-10 duration-700 relative -top-3">
              <div className="absolute -top-7 text-amber-500 animate-bounce">
                <Award className="w-6 h-6 fill-amber-400" />
              </div>
              <span className="text-4xl mb-1 group-hover:scale-110 transition-transform">{top1.avatar}</span>
              <span className="text-xs sm:text-sm font-extrabold text-slate-900 truncate w-full px-1">{top1.name}</span>
              <span className="text-[10px] sm:text-xs font-mono font-black text-amber-600 mb-2">{top1.xp} XP</span>
              <div className="w-full h-32 sm:h-36 bg-gradient-to-t from-amber-100/80 via-amber-50/50 to-white rounded-t-2xl border-t-2 border-x border-amber-300 shadow-md flex flex-col items-center justify-center p-2 relative">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.1),transparent_60%)]" />
                <span className="text-3xl sm:text-4xl font-black text-amber-500">1</span>
                <span className="text-[10px] font-black text-amber-600 uppercase tracking-wider">🥇 Supreme</span>
              </div>
            </div>
          )}

          {/* 🥉 3rd Place Podium */}
          {top3 && (
            <div className="flex flex-col items-center w-24 sm:w-32 group animate-in fade-in slide-in-from-bottom-4 duration-300">
              <span className="text-3xl mb-1 group-hover:scale-110 transition-transform">{top3.avatar}</span>
              <span className="text-xs font-bold text-slate-700 truncate w-full px-1">{top3.name}</span>
              <span className="text-[10px] font-mono font-bold text-indigo-600 mb-2">{top3.xp} XP</span>
              <div className="w-full h-20 sm:h-24 bg-gradient-to-t from-slate-200 to-slate-100 rounded-t-2xl border-t border-x border-slate-300/60 shadow-sm flex flex-col items-center justify-center p-2">
                <span className="text-xl sm:text-2xl font-black text-orange-700/60">3</span>
                <span className="text-[10px] font-black text-orange-700/50 uppercase tracking-wider">🥉 Bronze</span>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* 📊 ২. RANK TABLE & LIST SEARCH */}
      <div className="space-y-4">
        
        {/* টেবিল সার্চ ফিল্টার */}
        <div className="relative max-w-xs bg-white/80 backdrop-blur-md rounded-xl border border-slate-200/60 shadow-sm">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input 
            type="text" 
            placeholder="Search down-rank index..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-transparent text-xs font-semibold focus:outline-none focus:border-transparent"
          />
        </div>

        {/* র‍্যাঙ্ক টেবিল */}
        <div className="bg-white border border-slate-200/60 rounded-3xl overflow-hidden shadow-sm p-3">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 text-xs font-bold uppercase tracking-wider">
                  <th className="p-4 w-20">Rank</th>
                  <th className="p-4">User Architect</th>
                  <th className="p-4">Experience Metrics</th>
                  <th className="p-4 text-right">Arena Wins</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 text-xs font-semibold text-slate-700">
                {/* ১, ২, ৩ পোডিয়াম মেম্বারদেরও টেবিলে হাইলাইট ফর্মে রি-লিস্ট করা হলো বেটার ইউএক্সের জন্য */}
                {activeList.map((user) => {
                  if (searchQuery && !user.name.toLowerCase().includes(searchQuery.toLowerCase())) return null;
                  
                  return (
                    <tr 
                      key={user.rank} 
                      className={`transition-all duration-300 ${
                        user.current 
                          ? "bg-indigo-50/60 hover:bg-indigo-50 border-y border-indigo-100/60 text-indigo-950 font-bold" 
                          : "hover:bg-slate-50/50"
                      }`}
                    >
                      {/* র‍্যাঙ্ক আইকন/নাম্বার */}
                      <td className="p-4 font-mono font-black text-sm">
                        {user.rank === 1 && "🥇"}
                        {user.rank === 2 && "🥈"}
                        {user.rank === 3 && "🥉"}
                        {user.rank > 3 && `#${user.rank}`}
                      </td>
                      
                      {/* ইউজার ডেসক্রিপশন */}
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <span className="text-lg bg-slate-100 p-1 rounded-lg shrink-0">{user.avatar}</span>
                          <div>
                            <span className="font-extrabold text-slate-900 block">{user.name}</span>
                            {user.current && (
                              <span className="text-[9px] font-black text-indigo-600 bg-indigo-100/60 px-1.5 py-0.5 rounded-md uppercase tracking-wider block mt-0.5 w-fit">
                                You Are Here ⚡
                              </span>
                            )}
                          </div>
                        </div>
                      </td>
                      
                      {/* এক্সপি পয়েন্ট */}
                      <td className="p-4">
                        <span className="inline-flex items-center gap-1 font-mono font-bold text-slate-800 bg-slate-100/80 px-2.5 py-1 rounded-lg border border-slate-200/50">
                          <Zap className="w-3.5 h-3.5 text-purple-500 fill-purple-400 shrink-0" /> {user.xp.toLocaleString()} XP
                        </span>
                      </td>

                      {/* উইন রেট কাউন্টার */}
                      <td className="p-4 text-right font-mono font-black text-slate-800 pr-6">
                        {user.wins} Arena Matches
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

    </div>
  );
}