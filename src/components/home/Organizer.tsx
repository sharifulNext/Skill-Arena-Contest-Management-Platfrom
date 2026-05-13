"use client";

import { motion } from "framer-motion";
import { PlusCircle, Users, BarChart3, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const organizerFeatures = [
  {
    title: "Create Contests",
    desc: "Set up coding, quiz, or design contests with custom rules and AI parameters in minutes.",
    icon: <PlusCircle className="w-5 h-5 text-blue-500" />,
  },
  {
    title: "Manage Submissions",
    desc: "A centralized dashboard to review work, manage participant queries, and oversee judging.",
    icon: <Users className="w-5 h-5 text-purple-500" />,
  },
  {
    title: "View Analytics",
    desc: "Get deep insights into participant performance, engagement rates, and leaderboard trends.",
    icon: <BarChart3 className="w-5 h-5 text-emerald-500" />,
  },
];

export default function OrganizerSection() {
  return (
    <section className="py-24 bg-white dark:bg-slate-950 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* --- LEFT SIDE: MOCKUP --- */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Background Decorative Circles */}
            <div className="absolute -top-10 -left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-pulse" />
            
            {/* Main Mockup Card */}
            <div className="relative z-10 bg-slate-900 rounded-[2rem] border border-slate-800 p-2 shadow-2xl shadow-primary/10 overflow-hidden">
              {/* Fake Sidebar/Header UI */}
              <div className="bg-slate-800/50 p-4 border-b border-slate-700 flex justify-between items-center">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/50" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                  <div className="w-3 h-3 rounded-full bg-green-500/50" />
                </div>
                <div className="text-[10px] text-slate-400 font-mono tracking-widest uppercase">Admin Dashboard</div>
              </div>

              {/* Mockup Content: Mini Analytics Chart */}
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-800/30 rounded-xl border border-slate-700/50">
                    <p className="text-[10px] text-slate-500 uppercase font-bold">Total Participants</p>
                    <p className="text-2xl font-black text-white">2,480</p>
                    <div className="mt-2 h-1 w-full bg-slate-700 rounded-full overflow-hidden">
                      <motion.div initial={{ width: 0 }} whileInView={{ width: '70%' }} className="h-full bg-blue-500" />
                    </div>
                  </div>
                  <div className="p-4 bg-slate-800/30 rounded-xl border border-slate-700/50">
                    <p className="text-[10px] text-slate-500 uppercase font-bold">Submissions</p>
                    <p className="text-2xl font-black text-white">1,120</p>
                    <div className="mt-2 h-1 w-full bg-slate-700 rounded-full overflow-hidden">
                      <motion.div initial={{ width: 0 }} whileInView={{ width: '45%' }} className="h-full bg-purple-500" />
                    </div>
                  </div>
                </div>
                {/* List Mockup */}
                <div className="space-y-3">
                  {[1, 2].map((i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg border border-slate-700/30">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-700 animate-pulse" />
                        <div className="h-2 w-24 bg-slate-700 rounded" />
                      </div>
                      <div className="h-2 w-10 bg-emerald-500/20 border border-emerald-500/30 rounded px-2 py-3 flex items-center justify-center">
                         <CheckCircle2 size={12} className="text-emerald-500" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating Badge */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4 }}
              className="absolute -bottom-6 -right-6 bg-white dark:bg-slate-900 p-4 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-800 z-20"
            >
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg text-blue-600">
                  <PlusCircle size={20} />
                </div>
                <p className="text-xs font-bold dark:text-white">New Contest Created!</p>
              </div>
            </motion.div>
          </motion.div>

          {/* --- RIGHT SIDE: CONTENT --- */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col space-y-8"
          >
            <div>
              <h2 className="text-4xl md:text-5xl font-heading font-extrabold text-slate-900 dark:text-white leading-[1.2]">
                Are you an <span className="text-primary italic">Organizer?</span>
              </h2>
              <p className="mt-4 text-lg text-slate-500 dark:text-slate-400">
                Empower your institution or community with our advanced tools to host world-class competitions.
              </p>
            </div>

            <div className="space-y-6">
              {organizerFeatures.map((feature, index) => (
                <div key={index} className="flex gap-4 group">
                  <div className="mt-1 bg-slate-50 dark:bg-slate-900 p-2 rounded-lg border border-slate-100 dark:border-slate-800 group-hover:scale-110 transition-transform">
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">{feature.title}</h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <Button size="lg" className="h-14 px-10 rounded-full font-bold shadow-xl shadow-primary/20 bg-primary hover:bg-primary/90 text-white">
                Become a Host
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}