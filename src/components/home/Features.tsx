"use client";

import { motion } from "framer-motion";
import { 
  Cpu, 
  Trophy, 
  Timer, 
  Users2, 
  ShieldCheck, 
  BarChart3 
} from "lucide-react";

const features = [
  {
    title: "AI Evaluation",
    description: "Get instant, AI-driven feedback and automated scoring for non-coding and creative contests.",
    icon: <Cpu className="w-6 h-6" />,
    gradient: "from-violet-500 to-purple-500",
  },
  {
    title: "Real-time Leaderboard",
    description: "Watch the rankings shift instantly as participants submit their work with live updates.",
    icon: <Trophy className="w-6 h-6" />,
    gradient: "from-amber-400 to-orange-500",
  },
  {
    title: "Live Timer",
    description: "Synced server-side timers ensure fair play and create an intense competitive atmosphere.",
    icon: <Timer className="w-6 h-6" />,
    gradient: "from-rose-500 to-red-600",
  },
  {
    title: "Team Contests",
    description: "Collaborate with teammates in real-time. Manage roles, shared code, and joint submissions.",
    icon: <Users2 className="w-6 h-6" />,
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    title: "Judge Panel",
    description: "Sophisticated dashboard for moderators to review, flag, and manually override scores if needed.",
    icon: <ShieldCheck className="w-6 h-6" />,
    gradient: "from-emerald-500 to-teal-600",
  },
  {
    title: "In-depth Analytics",
    description: "Comprehensive performance charts for participants and detailed engagement metrics for hosts.",
    icon: <BarChart3 className="w-6 h-6" />,
    gradient: "from-indigo-500 to-blue-600",
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-900/50">
      <div className="container mx-auto px-6">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-primary font-bold tracking-widest uppercase text-sm"
          >
            Core Capabilities
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-heading font-extrabold text-slate-900 dark:text-white mt-4"
          >
            Built for Scale, Powered by <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">Intelligence.</span>
          </motion.h2>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="group p-8 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-xl transition-all"
            >
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${feature.gradient} flex items-center justify-center text-white mb-6 shadow-lg group-hover:rotate-6 transition-transform`}>
                {feature.icon}
              </div>
              
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                {feature.title}
              </h3>
              
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
                {feature.description}
              </p>

              {/* Progress-like decorative bar */}
              <div className="mt-6 w-full h-1 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: "40%" }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className={`h-full bg-gradient-to-r ${feature.gradient}`}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}