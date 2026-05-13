"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
// Lucide React Icons
import { 
  Trophy, 
  Search, 
  GraduationCap, 
  Medal, 
  Crown, 
  Award,
  TrendingUp 
} from "lucide-react";

// Mock Data
const LEADERBOARD_DATA = [
  { id: 1, name: "Ariful Islam", points: 4520, university: "DU", avatar: "https://i.pravatar.cc/150?u=1", badge: "Grandmaster" },
  { id: 2, name: "Sadia Rahman", points: 4100, university: "BUET", avatar: "https://i.pravatar.cc/150?u=2", badge: "Master" },
  { id: 3, name: "Tanvir Ahmed", points: 3850, university: "SUST", avatar: "https://i.pravatar.cc/150?u=3", badge: "Expert" },
  { id: 4, name: "Mahim Hossain", points: 3200, university: "NSU", avatar: "https://i.pravatar.cc/150?u=4", badge: "Professional" },
  { id: 5, name: "Nusrat Jahan", points: 2900, university: "KUET", avatar: "https://i.pravatar.cc/150?u=5", badge: "Rising Star" },
];

export default function LeaderboardPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = LEADERBOARD_DATA.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.university.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen py-10 px-4 md:px-8 max-w-7xl mx-auto">
      
      {/* 1. Header Section */}
      <header className="text-center mb-16">
        <motion.div 
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full mb-4">
            <TrendingUp size={16} />
            <span className="text-xs font-bold uppercase tracking-wider">Top Performers</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-4">
            SkillArena <span className="text-primary italic">Leaderboard</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto text-sm md:text-base">
            Where talent meets recognition. Competitors are ranked based on their total points earned in various contests.
          </p>
        </motion.div>
      </header>

      {/* 2. Top 3 Podium (Visual Highlight) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 items-end px-4">
        {/* 2nd Place */}
        <div className="order-2 md:order-1 flex flex-col items-center">
          <div className="relative mb-4">
            <div className="w-24 h-24 rounded-full border-4 border-slate-200 dark:border-slate-800 overflow-hidden shadow-lg">
              <Image src={LEADERBOARD_DATA[1].avatar} alt="2nd" width={100} height={100} />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-slate-400 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold shadow-md">2</div>
          </div>
          <p className="font-bold text-slate-900 dark:text-white">{LEADERBOARD_DATA[1].name}</p>
          <p className="text-xs font-medium text-slate-500">{LEADERBOARD_DATA[1].points} pts</p>
        </div>

        {/* 1st Place - The Champion */}
        <div className="order-1 md:order-2 flex flex-col items-center scale-110 mb-8 md:mb-0">
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 3 }}
          >
            <Trophy className="text-amber-500 mb-2" size={48} strokeWidth={1.5} />
          </motion.div>
          <div className="relative mb-4">
            <div className="w-32 h-32 rounded-full border-4 border-amber-400 overflow-hidden shadow-2xl shadow-amber-400/20 ring-4 ring-amber-400/10">
              <Image src={LEADERBOARD_DATA[0].avatar} alt="1st" width={150} height={150} />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-amber-400 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg ring-4 ring-white dark:ring-slate-950">1</div>
          </div>
          <p className="font-black text-2xl text-slate-900 dark:text-white leading-tight">{LEADERBOARD_DATA[0].name}</p>
          <p className="text-sm text-primary font-black uppercase tracking-widest">{LEADERBOARD_DATA[0].points} points</p>
        </div>

        {/* 3rd Place */}
        <div className="order-3 flex flex-col items-center">
          <div className="relative mb-4">
            <div className="w-24 h-24 rounded-full border-4 border-orange-200 dark:border-orange-900/30 overflow-hidden shadow-lg">
              <Image src={LEADERBOARD_DATA[2].avatar} alt="3rd" width={100} height={100} />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-orange-400/80 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold shadow-md">3</div>
          </div>
          <p className="font-bold text-slate-900 dark:text-white">{LEADERBOARD_DATA[2].name}</p>
          <p className="text-xs font-medium text-slate-500">{LEADERBOARD_DATA[2].points} pts</p>
        </div>
      </div>

      {/* 3. Table Section */}
      <div className="bg-white dark:bg-slate-900/50 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-2xl shadow-slate-200/50 dark:shadow-none overflow-hidden backdrop-blur-sm">
        
        {/* Table Search & Actions */}
        <div className="p-6 md:p-8 border-b border-slate-100 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search by name or university..." 
              className="w-full pl-12 pr-4 py-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl outline-none border border-transparent focus:border-primary/50 transition-all text-sm font-medium"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
            <Award size={14} className="text-primary" />
            Last Updated: Just now
          </div>
        </div>

        {/* Ranking List Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 dark:bg-slate-800/30 text-slate-500 text-[10px] md:text-xs uppercase tracking-[0.2em] font-black">
                <th className="px-8 py-6">Rank</th>
                <th className="px-8 py-6">User / Athlete</th>
                <th className="px-8 py-6 hidden md:table-cell">University</th>
                <th className="px-8 py-6 text-center">Badge</th>
                <th className="px-8 py-6 text-right">Total Score</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-800/50">
              <AnimatePresence mode="popLayout">
                {filteredData.map((user, index) => (
                  <motion.tr 
                    layout
                    key={user.id} 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-all group"
                  >
                    <td className="px-8 py-6">
                      <span className="font-mono font-black text-slate-300 dark:text-slate-700 group-hover:text-primary transition-colors text-lg">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="relative w-11 h-11 rounded-full overflow-hidden ring-2 ring-transparent group-hover:ring-primary/20 transition-all">
                          <Image src={user.avatar} alt={user.name} fill className="object-cover" />
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 dark:text-white text-sm md:text-base leading-none mb-1">{user.name}</p>
                          <p className="text-[10px] md:hidden text-slate-500 font-medium">{user.university}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6 hidden md:table-cell">
                      <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 font-medium text-sm">
                        <GraduationCap size={16} strokeWidth={2.5} />
                        {user.university}
                      </div>
                    </td>
                    <td className="px-8 py-6 text-center">
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[10px] font-black uppercase rounded-lg tracking-tighter group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                        <Crown size={12} strokeWidth={2.5} />
                        {user.badge}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <span className="font-mono font-black text-slate-900 dark:text-white text-base">
                        {user.points.toLocaleString()}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {filteredData.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-slate-500 font-medium">No results found for "{searchTerm}"</p>
          </div>
        )}
      </div>
    </div>
  );
}