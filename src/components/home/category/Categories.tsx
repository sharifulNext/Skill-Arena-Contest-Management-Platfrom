"use client";

import { motion } from "framer-motion";
import { 
  Code2, 
  BrainCircuit, 
  PenTool, 
  Palette, 
  Camera, 
  Terminal, 
  Mic2, 
  Video 
} from "lucide-react";
import { cn } from "@/lib/utils";

const categories = [
  {
    title: "Coding",
    description: "Algorithmic challenges, CP, and real-world dev tasks.",
    icon: <Code2 className="w-8 h-8" />,
    color: "bg-blue-500/10 text-blue-600",
  },
  {
    title: "Quiz",
    description: "Test your knowledge in GK, Tech, and more.",
    icon: <BrainCircuit className="w-8 h-8" />,
    color: "bg-purple-500/10 text-purple-600",
  },
  {
    title: "Writing",
    description: "Essays, storytelling, and professional blogging.",
    icon: <PenTool className="w-8 h-8" />,
    color: "bg-orange-500/10 text-orange-600",
  },
  {
    title: "Design",
    description: "UI/UX, Logo, and Creative Illustration contests.",
    icon: <Palette className="w-8 h-8" />,
    color: "bg-pink-500/10 text-pink-600",
  },
  {
    title: "Photography",
    description: "Capture the world through your lens and win prizes.",
    icon: <Camera className="w-8 h-8" />,
    color: "bg-cyan-500/10 text-cyan-600",
  },
  {
    title: "Hackathon",
    description: "Build innovative products in a 48-hour sprint.",
    icon: <Terminal className="w-8 h-8" />,
    color: "bg-emerald-500/10 text-emerald-600",
  },
  {
    title: "Debate",
    description: "Present your arguments and sharpen your logic.",
    icon: <Mic2 className="w-8 h-8" />,
    color: "bg-red-500/10 text-red-600",
  },
  {
    title: "Video Contest",
    description: "Cinematography and creative video editing battles.",
    icon: <Video className="w-8 h-8" />,
    color: "bg-indigo-500/10 text-indigo-600",
  },
];

export default function CategoriesSection() {
  return (
    <section className="py-24 bg-white dark:bg-slate-950">
      <div className="container mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-heading font-extrabold text-slate-900 dark:text-white mb-4"
          >
            Diverse Contest Categories
          </motion.h2>
          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
            Choose your niche and show your skills to the world. We host a wide range of competitions.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ 
                y: -10, 
                boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)" 
              }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="group p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 transition-all cursor-pointer hover:border-primary/50"
            >
              <div className={cn(
                "w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 group-hover:rotate-3",
                category.color
              )}>
                {category.icon}
              </div>
              
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                {category.title}
              </h3>
              
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                {category.description}
              </p>

              <div className="mt-6 flex items-center text-xs font-bold uppercase tracking-wider text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                Explore Contests →
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}