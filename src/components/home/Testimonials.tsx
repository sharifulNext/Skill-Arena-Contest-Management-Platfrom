"use client";

import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import Image from "next/image";

const testimonials = [
  {
    name: "Dr. Sayedur Rahman",
    role: "Head of CSE, Leading University",
    content: "This platform transformed our university contests. The AI evaluation saved our faculty hundreds of hours in grading, and the students loved the real-time feedback.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
  },
  {
    name: "Sarah Jenkins",
    role: "Tech Recruiter at GlobalTech",
    content: "We used SkillArena for our annual internal hackathon. The 'Team Contest' feature and live leaderboard created an intense, fun, and highly professional environment.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
  },
  {
    name: "Tanvir Mahtab",
    role: "Top Rated Competitive Programmer",
    content: "The AI Hint Generator is a game changer! It helped me get through a tough coding block without giving away the full solution. Highly recommended for serious learners.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Tanvir",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-900/50">
      <div className="container mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-heading font-extrabold text-slate-900 dark:text-white mb-4"
          >
            What People <span className="text-primary font-serif italic">Say</span>
          </motion.h2>
          <div className="flex justify-center gap-1">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} size={16} className="fill-yellow-500 text-yellow-500" />
            ))}
          </div>
          <p className="mt-4 text-slate-500 dark:text-slate-400">Trusted by top universities and industry leaders.</p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ y: -10 }}
              className="relative p-8 bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-xl transition-all"
            >
              <Quote className="absolute top-6 right-8 text-slate-100 dark:text-slate-700 w-12 h-12 -z-0" />
              
              <div className="relative z-10">
                <p className="text-slate-600 dark:text-slate-300 italic mb-8 leading-relaxed">
                  "{t.content}"
                </p>
                
                <div className="flex items-center gap-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-primary/20 bg-slate-100">
                    <img 
                      src={t.avatar} 
                      alt={t.name}
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                      {t.name}
                    </h4>
                    <p className="text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold">
                      {t.role}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}