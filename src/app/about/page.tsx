"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Brain, Trophy, Users, ShieldCheck, ArrowLeft, Code2, Sparkles, Terminal } from "lucide-react";

export default function AboutPage() {
  const router = useRouter();

  // 📊 প্ল্যাটফর্মের স্ট্যাটস ডেটা
  const stats = [
    { id: 1, label: "Active Developers", value: "10K+", icon: Users },
    { id: 2, label: "Automated AI Audits", value: "25K+", icon: Brain },
    { id: 3, label: "Hackathons Hosted", value: "150+", icon: Trophy },
  ];

  // 🛠️ কোর ফিচারসমূহ
  const coreFeatures = [
    {
      title: "AI-Powered Code Audit",
      description: "Our proprietary LLM pipeline evaluates structural layouts, compliance standard modules, and optimizes performance indexing within seconds.",
      icon: Code2,
      color: "text-indigo-600 bg-indigo-50 border-indigo-100",
    },
    {
      title: "Tamper-Proof Sandboxing",
      description: "Every repository link undergoes rigorous validation vectors to ensure absolute fairness and transparency for global organizers.",
      icon: ShieldCheck,
      color: "text-emerald-600 bg-emerald-50 border-emerald-100",
    },
    {
      title: "Real-time Leaderboards",
      description: "As soon as data points match the evaluation criteria, results instantly stream onto dynamic glassmorphic dashboards.",
      icon: Sparkles,
      color: "text-amber-600 bg-amber-50 border-amber-100",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-slate-900 selection:text-white">
      
      {/* 🌌 ব্যাকগ্রাউন্ড ডেকোরেটিভ গ্রাফিক্স (প্রিমিয়াম গ্লো ইফেক্ট) */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-emerald-100/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 sm:px-10 py-8 relative z-10 space-y-16">
        
        {/* 🔙 নেভিগেশন বাটন */}
        <button 
          onClick={() => router.back()} 
          className="flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-900 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" /> Back
        </button>

        {/* 🚀 হিরো সেকশন */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 text-white text-xs font-semibold tracking-wider uppercase shadow-sm">
            <Terminal className="w-3.5 h-3.5" /> Next-Gen Evaluation Engine
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-950 tracking-tight leading-none">
            Bridging the gap between <span className="bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-800">Talent and Tech</span>
          </h1>
          <p className="text-slate-500 text-base sm:text-lg font-medium leading-relaxed">
            We build real-world, production-ready infrastructure to automate, judge, and host high-octane coding arenas. Powered by specialized AI layers and engineered for developers worldwide.
          </p>
        </div>

        {/* 📊 স্ট্যাটস গ্রিড কাউন্টার */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((item) => {
            const IconComponent = item.icon;
            return (
              <div 
                key={item.id} 
                className="bg-white/80 backdrop-blur-md border border-slate-200/50 p-8 rounded-3xl shadow-sm text-center space-y-2 group hover:border-slate-300 transition-all duration-300"
              >
                <div className="w-10 h-10 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto text-slate-600 border border-slate-200/60 group-hover:bg-slate-900 group-hover:text-white transition-all duration-300">
                  <IconComponent className="w-5 h-5" />
                </div>
                <h3 className="text-3xl font-black text-slate-900 tracking-tight">{item.value}</h3>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{item.label}</p>
              </div>
            );
          })}
        </div>

        {/* 🎯 আমাদের মিশন ও ভিশন */}
        <div className="bg-white/70 backdrop-blur-xl border border-slate-200/60 p-8 sm:p-12 rounded-3xl shadow-sm grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-950 tracking-tight">Our Core Mission</h2>
            <p className="text-slate-600 text-sm sm:text-base font-medium leading-relaxed">
              Traditional hackathons and coding assessments suffer from standard manual verification fatigue. Our mission is to democratize technical judging through uniform, automated metrics. 
            </p>
            <p className="text-slate-600 text-sm sm:text-base font-medium leading-relaxed">
              Whether you are an enterprise organizer hosting a global talent hunt or a competitive developer pushing production code—our ecosystem validates performance securely and flawlessly.
            </p>
          </div>
          <div className="relative mx-auto lg:ml-auto w-full max-w-[340px] aspect-square rounded-3xl bg-slate-100 border border-slate-200/80 flex items-center justify-center p-6 shadow-inner overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <Brain className="w-24 h-24 text-slate-300 group-hover:text-slate-400 group-hover:scale-105 transition-all duration-500" />
          </div>
        </div>

        {/* 🌟 কেন আমরা ইউনিক? (Core Infrastructure Column) */}
        <div className="space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-950 tracking-tight">Engineered to Perfection</h2>
            <p className="text-slate-500 text-sm font-medium max-w-md mx-auto">Discover the robust pipelines running under our sandboxed node server architectures.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {coreFeatures.map((feature, idx) => {
              const FeatureIcon = feature.icon;
              return (
                <div 
                  key={idx} 
                  className="bg-white/80 border border-slate-200/50 p-6 rounded-2xl space-y-4 shadow-2xs hover:shadow-md transition-all duration-300 hover:-translate-y-1"
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${feature.color}`}>
                    <FeatureIcon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">{feature.title}</h3>
                  <p className="text-slate-500 text-xs sm:text-sm font-medium leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* 🤍 ফুটার নোটিশ */}
        <div className="text-center pt-8 border-t border-slate-200/60">
          <p className="text-xs text-slate-400 font-semibold tracking-wider uppercase">© {new Date().getFullYear()} SkillArena Node. All rights reserved.</p>
        </div>

      </div>
    </div>
  );
}