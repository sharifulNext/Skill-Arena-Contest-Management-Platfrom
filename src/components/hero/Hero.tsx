"use client";

import { Button } from "@/components/ui/button";
import { Trophy, Rocket, Sparkles } from "lucide-react";
import { motion } from "framer-motion"; // ১. ইমপোর্ট করুন

export default function Hero() {
  // অ্যানিমেশন ভেরিয়েন্ট
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    visible: { transition: { staggerChildren: 0.2 } }
  };

  return (
    <section className="relative w-full overflow-hidden bg-white pt-10 pb-20 md:pt-16 lg:pt-24">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* --- LEFT SIDE: CONTENT --- */}
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="flex flex-col space-y-8 text-left"
          >
            {/* AI Badge Motion */}
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-semibold w-fit">
              <Sparkles className="h-3 w-3 text-yellow-500" />
              <span>AI-Powered Platform for Creators</span>
            </motion.div>

            <div className="space-y-4">
              <motion.h1 variants={fadeInUp} className="text-5xl md:text-6xl lg:text-7xl font-heading font-extrabold tracking-tight text-slate-900 leading-[1.1]">
                Compete. Create. <br />
                <span className="text-black underline decoration-primary/30">Conquer.</span>
              </motion.h1>
              
              <motion.p variants={fadeInUp} className="text-xl md:text-2xl font-sans font-bold text-slate-700">
                The AI Powered Multi-Contest Platform
              </motion.p>
              
              <motion.p variants={fadeInUp} className="max-w-[540px] text-lg text-slate-500 font-sans leading-relaxed">
                Host coding, quiz, writing, design, and hackathon contests in one place.
              </motion.p>
            </div>

            <motion.div variants={fadeInUp} className="flex flex-wrap gap-4 pt-4">
              <Button size="lg" className="h-14 px-8 text-lg rounded-full shadow-lg hover:shadow-xl transition-all group bg-black text-white">
                Join Contest 
                <Trophy className="ml-2 h-5 w-5 group-hover:scale-110 transition-transform" />
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-full border-2">
                Create Contest
                <Rocket className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          </motion.div>

          {/* --- RIGHT SIDE: ANIMATED PREVIEW --- */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, x: 50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="relative group lg:ml-10"
          >
            {/* Floating Animation for the Dashboard */}
            <motion.div 
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="relative bg-white border border-slate-200 rounded-[1.5rem] shadow-2xl overflow-hidden"
            >
              {/* Fake Browser Header */}
              <div className="bg-slate-50 border-b border-slate-200 px-4 py-3 flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
              </div>

              {/* Dashboard Content Mockup */}
              <div className="p-6 bg-slate-50/50 space-y-4">
                <div className="flex gap-4">
                    <motion.div initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ delay: 1, duration: 1 }} className="h-24 bg-white rounded-xl border border-slate-100 shadow-sm flex-1" />
                    <motion.div initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ delay: 1.2, duration: 1 }} className="h-24 bg-white rounded-xl border border-slate-100 shadow-sm flex-1" />
                </div>
                <div className="h-40 bg-white rounded-xl border border-slate-100 shadow-sm p-4">
                  <motion.div 
                    animate={{ opacity: [0.5, 1, 0.5] }} 
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="w-1/3 h-4 bg-slate-200 rounded mb-4" 
                  />
                  <div className="space-y-2">
                    <div className="w-full h-2 bg-slate-100 rounded" />
                    <div className="w-4/5 h-2 bg-slate-100 rounded" />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Floating Prize Badge */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.5 }}
              className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl border border-slate-100"
            >
              <div className="flex items-center gap-3">
                <div className="bg-green-100 p-2 rounded-lg text-green-600">
                  <Trophy size={20} />
                </div>
                <p className="text-sm font-bold">New Winner: $500</p>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}