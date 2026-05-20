"use client";

import { useState } from "react";
import { 
  Search, SlidersHorizontal, ArrowUpDown, Calendar, 
  Award, Layers, Bookmark, BookmarkCheck, ArrowRight, 
  ChevronLeft, ChevronRight, Trophy, Flame
} from "lucide-react";
import Swal from "sweetalert2";

// 📋 ডামি কন্টেস্ট মাস্টার ডেটাসেট
const initialContests = [
  {
    id: "c_01",
    title: "Next.js 15 Production Hyper-Sprint",
    category: "Web Development",
    difficulty: "Hard",
    prize: "$2,500 USD",
    status: "Active",
    progress: 65,
    banner: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=500&auto=format&fit=crop&q=60",
    saved: false,
  },
  {
    id: "c_02",
    title: "AI Agent Automation & Orchestration",
    category: "Artificial Intelligence",
    difficulty: "Expert",
    prize: "$5,000 USD",
    status: "Active",
    progress: 20,
    banner: "https://images.unsplash.com/photo-1677442136019-21780efad99a?w=500&auto=format&fit=crop&q=60",
    saved: true,
  },
  {
    id: "c_03",
    title: "Secure Smart Contract Vulnerability Audit",
    category: "Cybersecurity",
    difficulty: "Medium",
    prize: "$1,500 USD",
    status: "Completed",
    progress: 100,
    banner: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=500&auto=format&fit=crop&q=60",
    saved: false,
  },
  {
    id: "c_04",
    title: "Figma UI/UX Design System Overhaul",
    category: "Product Design",
    difficulty: "Easy",
    prize: "$800 USD",
    status: "Saved",
    progress: 0,
    banner: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500&auto=format&fit=crop&q=60",
    saved: true,
  }
];

export default function MyContests() {
  const [contests, setContests] = useState(initialContests);
  const [activeTab, setActiveTab] = useState("Active"); // Active | Completed | Saved
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("title"); // title | prize | progress
  const [difficultyFilter, setDifficultyFilter] = useState("All");

  // 🔖 ১. সেভ/আনসেভ কন্টেস্ট টগল মেকানিজম
  const handleToggleSave = (id: string, title: string, isCurrentlySaved: boolean) => {
    setContests(contests.map(c => c.id === id ? { ...c, saved: !c.saved } : c));
    
    Swal.fire({
      icon: "success",
      title: isCurrentlySaved ? "Removed from Saved" : "Bookmarked Successfully!",
      text: `"${title}" has been updated in your personalized pipeline.`,
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 2500,
      timerProgressBar: true,
    });
  };

  // 🔍 ২. ফিল্টারিং এবং সার্চ লজিক প্রসেসর
  const filteredContests = contests
    .filter(c => {
      // ট্যাব কন্ডিশনাল ফিল্টার
      if (activeTab === "Saved") return c.saved;
      return c.status === activeTab;
    })
    .filter(c => {
      // সার্চ ফিল্টার
      return c.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
             c.category.toLowerCase().includes(searchQuery.toLowerCase());
    })
    .filter(c => {
      // ডিফিকাল্টি ড্রপডাউন ফিল্টার
      if (difficultyFilter === "All") return true;
      return c.difficulty === difficultyFilter;
    })
    .sort((a, b) => {
      // সর্টিং মেকানিজম
      if (sortBy === "title") return a.title.localeCompare(b.title);
      if (sortBy === "progress") return b.progress - a.progress;
      return 0;
    });

  return (
    <div className="p-4 sm:p-6 md:p-10 space-y-8 bg-slate-50 min-h-screen">
      
      {/* 👑 হেডার ট্র্যাকার */}
      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
          <Trophy className="w-7 h-7 sm:w-8 h-8 text-indigo-600 shrink-0" /> My Coding Arenas
        </h1>
        <p className="text-slate-500 text-xs sm:text-sm font-medium pl-1">
          Monitor your production sprints, review historical scoreboard results, and track code repository completion checkpoints.
        </p>
      </div>

      {/* 📑 ১. গ্লোবাল ট্যাব কন্ট্রোল (Active | Completed | Saved) */}
      <div className="flex border-b border-slate-200 gap-2 sm:gap-6 text-xs sm:text-sm font-bold">
        {["Active", "Completed", "Saved"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-3.5 px-2 transition-all relative ${
              activeTab === tab 
                ? "text-slate-900 border-b-2 border-slate-900 font-black" 
                : "text-slate-400 hover:text-slate-600"
            }`}
          >
            {tab} Arenas
          </button>
        ))}
      </div>

      {/* 🛠️ ২. সার্চ, ফিল্টার এবং সর্ট গেটওয়ে টুলবার */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white/80 backdrop-blur-xl border border-slate-200/60 p-4 rounded-2xl shadow-sm">
        
        {/* সার্চ বার */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input 
            type="text" 
            placeholder="Search by arena title or stack..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold focus:outline-none focus:border-slate-900"
          />
        </div>

        {/* ফিল্টার ড্রপডাউন */}
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-slate-400 shrink-0" />
          <select
            value={difficultyFilter}
            onChange={(e) => setDifficultyFilter(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-600 focus:outline-none focus:border-slate-900 cursor-pointer"
          >
            <option value="All">All Complexities</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
            <option value="Expert">Expert</option>
          </select>
        </div>

        {/* সর্ট ড্রপডাউন */}
        <div className="flex items-center gap-2">
          <ArrowUpDown className="w-4 h-4 text-slate-400 shrink-0" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-600 focus:outline-none focus:border-slate-900 cursor-pointer"
          >
            <option value="title">Sort by Alphabetic Title</option>
            <option value="progress">Sort by Highest Progress</option>
          </select>
        </div>
      </div>

      {/* 🎴 ৩. ডাইনামিক কন্টেস্ট কার্ডস গ্রিড */}
      {filteredContests.length === 0 ? (
        <div className="p-12 text-center bg-white/50 border border-slate-200/60 rounded-3xl text-xs font-bold text-slate-400">
          🔍 No arenas matched your active search query or filter parameters.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredContests.map((contest) => (
            <div 
              key={contest.id} 
              className="bg-white border border-slate-200/70 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
            >
              {/* ব্যানার ইমেজ ও বুকমার্ক জোন */}
              <div className="relative h-44 w-full bg-slate-100 overflow-hidden shrink-0">
                <img 
                  src={contest.banner} 
                  alt={contest.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                
                {/* বুকমার্ক সেভ বাটন */}
                <button
                  onClick={() => handleToggleSave(contest.id, contest.title, contest.saved)}
                  className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-md hover:bg-white rounded-xl shadow-sm text-slate-700 transition"
                >
                  {contest.saved ? <BookmarkCheck className="w-4 h-4 text-indigo-600 fill-indigo-600" /> : <Bookmark className="w-4 h-4" />}
                </button>

                {/* ক্যাটাগরি ব্যাজ */}
                <span className="absolute bottom-4 left-4 px-2.5 py-1 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-lg text-[10px] font-black uppercase tracking-wider">
                  {contest.category}
                </span>
              </div>

              {/* কার্ড বডি কন্টেন্ট */}
              <div className="p-5 flex-1 flex flex-col justify-between gap-5">
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-[11px] font-bold">
                    <span className={`px-2 py-0.5 rounded ${
                      contest.difficulty === "Expert" || contest.difficulty === "Hard"
                        ? "bg-rose-50 text-rose-600"
                        : contest.difficulty === "Medium" ? "bg-amber-50 text-amber-600" : "bg-emerald-50 text-emerald-600"
                    }`}>
                      Complexity: {contest.difficulty}
                    </span>
                    <span className="text-slate-400 font-semibold flex items-center gap-1">
                      <Award className="w-3.5 h-3.5 text-indigo-500" /> Pool: <span className="text-slate-800 font-black">{contest.prize}</span>
                    </span>
                  </div>

                  <h3 className="font-extrabold text-slate-900 text-sm leading-snug group-hover:text-indigo-600 transition-colors">
                    {contest.title}
                  </h3>
                </div>

                {/* প্রোগ্রেস বার ট্র্যাকার */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-[10px] font-bold text-slate-400">
                    <span>Repository Milestones</span>
                    <span className="font-mono text-slate-800">{contest.progress}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-indigo-600 rounded-full transition-all duration-500"
                      style={{ width: `${contest.progress}%` }}
                    />
                  </div>
                </div>

                {/* অ্যাকশন বাটন গেটওয়ে */}
                <div className="pt-3 border-t border-slate-50 flex items-center justify-between gap-4 text-xs">
                  <span className={`flex items-center gap-1.5 font-bold ${
                    contest.status === "Completed" ? "text-emerald-600" : "text-amber-600"
                  }`}>
                    <div className={`w-1.5 h-1.5 rounded-full ${contest.status === "Completed" ? "bg-emerald-500" : "bg-amber-500 animate-pulse"}`} />
                    {contest.status}
                  </span>

                  <button className="px-3.5 py-2 bg-slate-900 text-white font-bold text-[11px] rounded-xl hover:bg-indigo-600 transition flex items-center gap-1.5">
                    {contest.status === "Completed" ? "View Scoreboard" : "Resume Repository"} 
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}

      {/* 🔢 ৪. প্রফেশনাল পেজিনেশন কন্ট্রোল */}
      <div className="flex justify-between items-center bg-white/70 backdrop-blur-xl border border-slate-200/60 p-4 rounded-xl shadow-sm text-xs font-bold text-slate-500">
        <span>Showing 1-{filteredContests.length} of {filteredContests.length} global entries</span>
        <div className="flex items-center gap-2">
          <button className="p-1.5 rounded-lg border border-slate-200 bg-white text-slate-400 cursor-not-allowed">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button className="p-1.5 rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 transition">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

    </div>
  );
}