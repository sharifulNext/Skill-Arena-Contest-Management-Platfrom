"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa6";

// ১. CATEGORIES ভেরিয়েবলটি এখানে ডিফাইন করা হয়েছে
const CATEGORIES = [
  {
    id: "coding",
    name: "Coding",
    slug: "coding",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97",
    contestCount: 12,
    description: "Algorithmic challenges, data structures, and competitive programming."
  },
  {
    id: "design",
    name: "UI/UX Design",
    slug: "design",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5",
    contestCount: 8,
    description: "Create stunning user interfaces and experience designs."
  },
  {
    id: "gaming",
    name: "Gaming",
    slug: "gaming",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e",
    contestCount: 5,
    description: "E-sports and competitive gaming tournaments."
  }
];

export default function CategoriesPage() {
  return (
    <div className="min-h-screen py-10">
      <div className="mb-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">
            Browse <span className="text-primary italic">Categories</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400">
            Pick your field and start competing today.
          </p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {CATEGORIES.map((category, index) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link 
              href={`/categories/${category.slug}`}
              className="group block relative overflow-hidden rounded-[2.5rem] bg-slate-900 h-72 border border-slate-100 dark:border-slate-800"
            >
              {/* Background Image */}
              <Image 
                src={category.image}
                alt={category.name}
                fill
                className="object-cover opacity-60 group-hover:scale-110 transition-transform duration-700"
              />
              
              {/* Overlay Content */}
              <div className="absolute inset-0 p-8 flex flex-col justify-end bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent">
                <div className="bg-primary/20 backdrop-blur-md border border-primary/20 w-fit px-3 py-1 rounded-full mb-3">
                  <span className="text-[10px] font-black text-primary uppercase tracking-widest">
                    {category.contestCount} Active Contests
                  </span>
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
                  {category.name}
                </h3>
                
                <div className="flex items-center gap-2 text-white/60 text-sm font-medium group-hover:text-white transition-all">
                  Explore Now 
                  <FaArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}