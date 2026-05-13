"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    question: "How do the contests work?",
    answer: "Participating is easy! Simply browse active contests, register for one that fits your skills, and submit your work before the deadline. Our live timers and synchronized environment ensure a fair experience for everyone.",
  },
  {
    question: "Is AI judging available for all categories?",
    answer: "Yes! We use advanced AI models to provide instant feedback for code, writing, and even creative design assessments. While AI handles the majority of technical grading, human judges can also review submissions for a hybrid evaluation.",
  },
  {
    question: "Can universities or organizations host private contests?",
    answer: "Absolutely. SkillArena offers a dedicated 'Organizer Mode' where universities, clubs, or companies can host private or public competitions with customized rules, branding, and analytics.",
  },
  {
    question: "Is team contest supported?",
    answer: "Yes, we support both solo and team-based competitions. Organizers can set team size limits, and our platform allows real-time collaboration and joint submissions for team members.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24 bg-white dark:bg-slate-950">
      <div className="container mx-auto px-6 max-w-4xl">
        
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs font-bold mb-4"
          >
            <HelpCircle size={14} /> <span>Got Questions?</span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-heading font-extrabold text-slate-900 dark:text-white">
            Frequently Asked <span className="text-primary">Questions</span>
          </h2>
        </div>

        {/* Custom FAQ List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={cn(
                  "border rounded-2xl overflow-hidden transition-all duration-300",
                  isOpen 
                    ? "border-primary/30 bg-white dark:bg-slate-900 shadow-lg" 
                    : "border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50"
                )}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className={cn(
                    "font-bold transition-colors",
                    isOpen ? "text-primary" : "text-slate-900 dark:text-white"
                  )}>
                    {faq.question}
                  </span>
                  <ChevronDown 
                    className={cn(
                      "w-5 h-5 text-slate-400 transition-transform duration-300",
                      isOpen && "rotate-180 text-primary"
                    )} 
                  />
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-4">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Contact Support CTA */}
        <div className="mt-12 text-center">
          <p className="text-sm text-slate-500">
            Still have questions? <span className="text-primary font-bold cursor-pointer hover:underline transition-all">Contact our support team</span>
          </p>
        </div>
      </div>
    </section>
  );
}