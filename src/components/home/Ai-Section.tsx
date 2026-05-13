"use client";
import { motion } from "framer-motion";
import { Brain, Code, Lightbulb, PenTool, BarChart } from "lucide-react";

const aiFeatures = [
  { title: "AI Code Review", desc: "Instant feedback on code quality and logic.", icon: <Code /> },
  { title: "AI Hint Generator", desc: "Stuck? Get smart hints without the spoiler.", icon: <Lightbulb /> },
  { title: "AI Writing Feedback", desc: "Grammar, tone, and creativity analysis.", icon: <PenTool /> },
  { title: "AI Automated Scoring", desc: "Bias-free, lightning-fast grading system.", icon: <BarChart /> },
];

export default function AISection() {
  return (
    <section className="py-24 bg-white text-black overflow-hidden">
      <div className="container mx-auto px-6 text-center">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-primary text-sm font-bold mb-4">
            <Brain size={16} /> <span>Powered by Advanced AI</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-heading font-bold">Our Secret Sauce</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {aiFeatures.map((f, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -10 }}
              className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-lg hover:bg-white/10 transition-all"
            >
              <div className="text-primary mb-4">{f.icon}</div>
              <h3 className="text-xl font-bold mb-2">{f.title}</h3>
              <p className="text-gray-400 text-sm">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}