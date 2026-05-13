"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoSearchOutline, IoFilterOutline, IoCalendarOutline } from "react-icons/io5";
import ContestCard from "@/components/contest/ContestCard";


// Mock Data (পরবর্তীতে API থেকে আসবে)
const MOCK_CONTESTS = [
  {
    id: "1",
    title: "Global React Challenge 2026",
    category: "Web Development",
    difficulty: "Medium" as const,
    participants: 1240,
    startTime: "2026-06-01T10:00:00Z",
    status: "Upcoming" as const,
    prize: "$500",
  },
  {
    id: "2",
    title: "AI Prompt Engineering Master",
    category: "Artificial Intelligence",
    difficulty: "Hard" as const,
    participants: 850,
    startTime: "2026-05-20T15:30:00Z",
    status: "Live" as const,
    prize: "$1000",
  },
  {
    id: "3",
    title: "UI/UX Design Sprint",
    category: "Design",
    difficulty: "Easy" as const,
    participants: 420,
    startTime: "2026-04-15T09:00:00Z",
    status: "Ended" as const,
    prize: "$300",
  },
];

export default function ContestsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  // Filtering Logic
  const filteredContests = useMemo(() => {
    return MOCK_CONTESTS.filter((contest) => {
      const matchesSearch = contest.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            contest.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter = activeFilter === "All" || contest.status === activeFilter;
      
      return matchesSearch && matchesFilter;
    });
  }, [searchQuery, activeFilter]);

  const filterOptions = ["All", "Live", "Upcoming", "Ended"];

  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <header className="mb-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">
            Active <span className="text-primary italic">Contests</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 max-w-2xl leading-relaxed">
            Participate in high-stakes contests, sharpen your skills, and win amazing prizes. 
            Filter through categories and find your next challenge.
          </p>
        </motion.div>
      </header>

      {/* Control Bar: Search & Filter Tabs */}
      <div className="sticky top-24 z-30 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md py-4 mb-10 border-b border-slate-100 dark:border-slate-800">
        <div className="flex flex-col lg:flex-row gap-6 justify-between items-center">
          
          {/* Search Input */}
          <div className="relative w-full lg:max-w-md">
            <IoSearchOutline className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="text"
              placeholder="Search contests..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-12 pl-12 pr-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:border-primary outline-none transition-all text-sm"
            />
          </div>

          {/* Status Filter Tabs */}
          <div className="flex items-center p-1 bg-slate-100 dark:bg-slate-900 rounded-xl overflow-x-auto max-w-full">
            {filterOptions.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-6 py-2 rounded-lg text-sm font-bold transition-all whitespace-nowrap ${
                  activeFilter === filter 
                    ? "bg-white dark:bg-slate-800 text-primary shadow-sm" 
                    : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Contest Grid */}
      <motion.div 
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        <AnimatePresence mode="popLayout">
          {filteredContests.map((contest) => (
            <ContestCard key={contest.id} contest={contest} />
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Empty State */}
      {filteredContests.length === 0 && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center py-20 text-center"
        >
          <div className="w-20 h-20 bg-slate-100 dark:bg-slate-900 rounded-full flex items-center justify-center mb-4 text-slate-400">
            <IoSearchOutline size={40} />
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">No Contests Found</h3>
          <p className="text-slate-500 mt-2">Try adjusting your filters or search query.</p>
          <button 
            onClick={() => {setSearchQuery(""); setActiveFilter("All")}}
            className="mt-6 text-primary font-bold hover:underline"
          >
            Clear all filters
          </button>
        </motion.div>
      )}
    </div>
  );
}