"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoSearchOutline } from "react-icons/io5";
import { Loader2 } from "lucide-react";
import PublicContestCard from "@/components/contest/PublicContestCard";

export default function ContestsPage() {
  const [contests, setContests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  
  const fetchLiveContests = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/contest?view=public&t=${Date.now()}`); 
      const data = await res.json();
      
      if (data.success) {
        const publicContests = data.data.filter((c: any) => c.status === "Published"
);
        setContests(publicContests);
      }
    } catch (error) {
      console.error("Failed to load contests:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLiveContests();
  }, []);

  
  const filteredContests = useMemo(() => {
    return contests.filter((contest: any) => {
      const matchesSearch = 
        contest.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contest.category.toLowerCase().includes(searchQuery.toLowerCase());
      
      if (!matchesSearch) return false;
      if (activeFilter === "All") return true;

      const now = new Date();
      const start = new Date(contest.startDate);
      const end = new Date(contest.endDate);

      if (activeFilter === "Live") {
        return now >= start && now <= end;
      }
      if (activeFilter === "Upcoming") {
        return now < start;
      }
      if (activeFilter === "Ended") {
        return now > end;
      }

      return true;
    });
  }, [searchQuery, activeFilter, contests]);

  const filterOptions = ["All", "Live", "Upcoming", "Ended"];

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      {/* Header */}
      <header className="mb-12 mt-6">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-3 tracking-tight">
            Active <span className="text-slate-700 italic">Contests</span>
          </h1>
          <p className="text-slate-500 max-w-2xl text-sm md:text-base font-medium leading-relaxed">
            Participate in high-stakes contests, sharpen your skills, and win amazing prizes.
          </p>
        </motion.div>
      </header>

      {/* Search & Filter Top Bar */}
      <div className="sticky top-20 z-30 bg-white/80 backdrop-blur-md py-4 mb-10 border-b border-slate-100">
        <div className="flex flex-col lg:flex-row gap-4 justify-between items-center">
          
          {/* Search Box */}
          <div className="relative w-full lg:max-w-md">
            <IoSearchOutline className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="text"
              placeholder="Search contests by title or category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-12 pl-12 pr-4 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-slate-900 transition-all text-sm font-medium"
            />
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center p-1 bg-slate-100 rounded-xl overflow-x-auto max-w-full">
            {filterOptions.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-6 py-2 rounded-lg text-sm font-bold transition-all whitespace-nowrap ${
                  activeFilter === filter 
                    ? "bg-white text-slate-900 shadow-sm" 
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Contests Render Grid */}
      {loading ? (
        <div className="flex h-60 items-center justify-center">
          <Loader2 className="w-8 h-8 text-slate-900 animate-spin" />
        </div>
      ) : filteredContests.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <h3 className="text-xl font-bold text-slate-800">No Contests Found</h3>
          <p className="text-slate-500 text-sm mt-1">Try adjusting your search queries or tabs.</p>
        </div>
      ) : (
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredContests.map((contest: any) => (
       
              <PublicContestCard key={contest._id} contest={contest} />
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}