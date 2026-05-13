"use client";

import { motion } from "framer-motion";
import { UserPlus, Upload, BrainCircuit, Trophy, PartyPopper } from "lucide-react";

const steps = [
  {
    title: "Join Contest",
    desc: "Browse through various categories and register for your favorite contest.",
    icon: <UserPlus className="w-8 h-8" />,
    color: "bg-blue-500",
  },
  {
    title: "Submit Work",
    desc: "Upload your code, design, or writing before the live timer runs out.",
    icon: <Upload className="w-8 h-8" />,
    color: "bg-purple-500",
  },
  {
    title: "AI/Judges Evaluate",
    desc: "Our advanced AI and expert judges analyze your work with precision.",
    icon: <BrainCircuit className="w-8 h-8" />,
    color: "bg-emerald-500",
  },
  {
    title: "Leaderboard Updates",
    desc: "Watch your ranking climb in real-time as scores are published.",
    icon: <Trophy className="w-8 h-8" />,
    color: "bg-amber-500",
  },
  {
    title: "Winners Announced",
    desc: "Celebrate success! Winners are declared and rewards are distributed.",
    icon: <PartyPopper className="w-8 h-8" />,
    color: "bg-rose-500",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-900/30 overflow-hidden">
      <div className="container mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-heading font-extrabold text-slate-900 dark:text-white mb-4"
          >
            How SkillArena <span className="text-primary">Works</span>
          </motion.h2>
          <p className="text-lg text-slate-500 dark:text-slate-400">
            From registration to victory—all in five simple steps.
          </p>
        </div>

        {/* Steps Container */}
        <div className="relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-slate-200 dark:bg-slate-800 -translate-y-1/2 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 relative z-10">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group flex flex-col items-center text-center"
              >
                {/* Icon Circle */}
                <motion.div 
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className={`${step.color} w-20 h-20 rounded-full flex items-center justify-center text-white shadow-xl mb-6 relative`}
                >
                  {/* Step Number Badge */}
                  <span className="absolute -top-1 -right-1 w-7 h-7 bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-full text-xs font-black flex items-center justify-center border-2 border-slate-100 dark:border-slate-800">
                    {index + 1}
                  </span>
                  {step.icon}
                </motion.div>

                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-primary transition-colors">
                  {step.title}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed px-4">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-20 text-center"
        >
          <p className="text-slate-600 dark:text-slate-400 italic">
            Ready to show your skills? 
            <span className="ml-2 font-bold text-primary cursor-pointer hover:underline">Get started now!</span>
          </p>
        </motion.div>

      </div>
    </section>
  );
}