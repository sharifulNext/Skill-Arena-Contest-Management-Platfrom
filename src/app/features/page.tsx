"use client";

import { motion } from "framer-motion";
import { 
  Cpu, 
  Zap, 
  ShieldAlert, 
  BarChart3, 
  Settings, 
  CheckCircle2,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";

const FEATURES = [
  {
    title: "AI Judging System",
    description: "Automated code evaluation and design scoring using advanced AI models. Get instant results without human bias.",
    icon: <Cpu className="w-8 h-8" />,
    color: "text-blue-500",
    bg: "bg-blue-500/10"
  },
  {
    title: "Real-time Rankings",
    description: "Live leaderboards that update instantly as submissions come in. Keep the competition intense and transparent.",
    icon: <Zap className="w-8 h-8" />,
    color: "text-amber-500",
    bg: "bg-amber-500/10"
  },
  {
    title: "Proctoring & Anti-Cheat",
    description: "Plagiarism detection and AI proctoring to ensure fair play. We track tab switching and code similarity.",
    icon: <ShieldAlert className="w-8 h-8" />,
    color: "text-red-500",
    bg: "bg-red-500/10"
  },
  {
    title: "Deep Analytics",
    description: "Comprehensive insights for both participants and organizers. Track performance trends and skill growth.",
    icon: <BarChart3 className="w-8 h-8" />,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10"
  },
  {
    title: "Organizer Dashboard",
    description: "Powerful tools to host, manage, and moderate contests. Custom rules, automated prize distribution, and more.",
    icon: <Settings className="w-8 h-8" />,
    color: "text-purple-500",
    bg: "bg-purple-500/10"
  }
];

export default function FeaturesPage() {
  return (
    <div className="min-h-screen py-20 px-6">
      {/* Hero Section */}
      <div className="max-w-4xl mx-auto text-center mb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className="px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest">
            Platform Capabilities
          </span>
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white mt-6 mb-8 tracking-tight">
            Built for the <span className="text-primary italic">Next Generation</span> of Competitions.
          </h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 leading-relaxed">
            SkillArena combines cutting-edge AI with a seamless user experience to provide the most reliable contest management ecosystem.
          </p>
        </motion.div>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {FEATURES.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group p-8 rounded-[2.5rem] bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 hover:border-primary/20 hover:shadow-2xl hover:shadow-primary/5 transition-all"
          >
            <div className={`w-16 h-16 ${feature.bg} ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
              {feature.icon}
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              {feature.title}
            </h3>
            <p className="text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
              {feature.description}
            </p>
            <div className="flex items-center gap-2 text-sm font-bold text-primary opacity-0 group-hover:opacity-100 transition-opacity">
              Learn more <ArrowRight size={16} />
            </div>
          </motion.div>
        ))}

        {/* Dynamic CTA Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="lg:col-span-1 p-8 rounded-[2.5rem] bg-primary flex flex-col justify-center items-center text-center text-white relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-3xl" />
          <h3 className="text-3xl font-black mb-4">Ready to Host?</h3>
          <p className="text-white/80 mb-8 text-sm">
            Join 500+ universities and companies hosting contests on SkillArena.
          </p>
          <Button variant="secondary" className="w-full rounded-2xl py-6 font-bold bg-white text-primary hover:bg-slate-50">
            Get Started Now
          </Button>
        </motion.div>
      </div>

      {/* Trust Section */}
      <div className="mt-32 max-w-5xl mx-auto bg-slate-50 dark:bg-slate-800/50 rounded-[3rem] p-12 text-center border border-dashed border-slate-200 dark:border-slate-700">
        <h4 className="text-sm font-bold text-slate-400 uppercase tracking-[0.3em] mb-8">Integrated with</h4>
        <div className="flex flex-wrap justify-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all">
          {/* এখানে বড় বড় কোম্পানির লোগো বা নাম দিতে পারেন */}
          <span className="text-2xl font-black">GitHub</span>
          <span className="text-2xl font-black">OpenAI</span>
          <span className="text-2xl font-black">Vercel</span>
          <span className="text-2xl font-black">AWS</span>
        </div>
      </div>
    </div>
  );
}