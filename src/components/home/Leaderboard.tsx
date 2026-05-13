"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Medal, Crown, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

const leaderboardData = [
  { rank: 1, name: "Arif Dev", score: 980, contest: "Next.js Hackathon", color: "text-yellow-500" },
  { rank: 2, name: "Sara Khan", score: 945, contest: "UI/UX Battle", color: "text-slate-400" },
  { rank: 3, name: "Tanvir R.", score: 910, contest: "Code Sprint 2026", color: "text-amber-600" },
  { rank: 4, name: "Mahim Ahmed", score: 890, contest: "Algo Masters", color: "text-blue-500" },
  { rank: 5, name: "Nitu Das", score: 875, contest: "Cyber Security Quiz", color: "text-emerald-500" },
];

export default function MiniLeaderboard() {
  return (
    <section className="py-24 bg-white dark:bg-slate-950">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Side: Content */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-wider">
              <TrendingUp size={14} />
              <span>Real-time Rankings</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-heading font-extrabold text-slate-900 dark:text-white">
              Stay Ahead of the <br />
              <span className="text-primary">Competition.</span>
            </h2>
            <p className="text-lg text-slate-500 dark:text-slate-400 leading-relaxed">
              Our leaderboard updates every second. Track your performance and check your position in the global rankings.
            </p>
          </motion.div>

          {/* Right Side: Animated Leaderboard Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative group"
          >
            {/* Background Glow */}
            <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-[2.5rem] blur-xl opacity-20 group-hover:opacity-40 transition duration-1000"></div>
            
            <div className="relative bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2rem] p-8 shadow-2xl">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <Trophy className="text-yellow-500 animate-bounce" />
                  Top Participants
                </h3>
                <span className="text-xs font-medium text-slate-400 bg-slate-50 dark:bg-slate-800 px-3 py-1 rounded-full">
                  Live Updates
                </span>
              </div>

              <div className="space-y-4">
                <AnimatePresence>
                  {leaderboardData.map((user, index) => (
                    <motion.div
                      key={user.name}
                      initial={{ x: -20, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.02, x: 5 }}
                      className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-transparent hover:border-blue-500/30 hover:bg-white dark:hover:bg-slate-800 transition-all cursor-pointer"
                    >
                      <div className="flex items-center gap-4">
                        <div className={cn(
                          "w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg",
                          index === 0 ? "bg-yellow-100 text-yellow-600" : "bg-white dark:bg-slate-700 text-slate-500"
                        )}>
                          {index === 0 ? <Crown size={20} /> : user.rank}
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 dark:text-white text-sm md:text-base">
                            {user.name}
                          </p>
                          <p className="text-xs text-slate-400">
                            {user.contest}
                          </p>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <p className="font-mono font-black text-primary text-lg">
                          {user.score}
                        </p>
                        <p className="text-[10px] uppercase font-bold text-slate-400 tracking-tighter">
                          Points
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Bottom Decorative Element */}
              <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 flex justify-center">
                <button className="text-sm font-bold text-slate-400 hover:text-primary transition-colors">
                  View Full Leaderboard →
                </button>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}