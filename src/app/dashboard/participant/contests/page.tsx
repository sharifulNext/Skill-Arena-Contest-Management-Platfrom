"use client";

import { useEffect, useState } from "react";
import { 
  Search, SlidersHorizontal, ArrowUpDown, 
  Award, Bookmark, BookmarkCheck, ArrowRight, 
  ChevronLeft, ChevronRight, Trophy, Loader2
} from "lucide-react";
import { useRouter } from "next/navigation"; 
import Swal from "sweetalert2";

interface ContestSchema {
  _id: string;
  id?: string;
  title: string;
  category: string;
  difficulty: string;
  prize: string;
  status: "Published" | "Completed" | "Draft";
  banner?: string;
  endDate: string;
}

export default function MyContests() {
  const router = useRouter(); 
  const [contests, setContests] = useState<ContestSchema[]>([]);
  const [savedIds, setSavedIds] = useState<string[]>([]); 
  const [loading, setLoading] = useState(true);
  
  const [activeTab, setActiveTab] = useState("Active"); 
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("title");
  const [difficultyFilter, setDifficultyFilter] = useState("All");

  const fetchMyArenas = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/my-registrations?t=${Date.now()}`);
      
      if (!res.ok) {
        const errorPayload = await res.json().catch(() => ({}));
        console.error("🚨 Gateway Server Rejected with Payload:", errorPayload);
        
        if (res.status === 401) {
          Swal.fire({
            icon: "warning",
            title: "Session Expired",
            text: errorPayload.message || "Please log in again to access your dashboard.",
          });
        }
        throw new Error(errorPayload.message || "Pipeline data transfer rejected.");
      }
      
      const data = await res.json();
      if (data.success && data.data) {
        setContests(data.data);
      }

      const localSaved = localStorage.getItem("saved_arenas");
      if (localSaved) {
        setSavedIds(JSON.parse(localSaved));
      }
    } catch (err: any) {
      console.error("Error loading secure dashboard arrays:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyArenas();
  }, []);

  // 🔖 Bookmark Toggle Mechanism
  const handleToggleSave = (id: string, title: string) => {
    let updatedSaved: string[];
    const isCurrentlySaved = savedIds.includes(id);

    if (isCurrentlySaved) {
      updatedSaved = savedIds.filter(savedId => savedId !== id);
    } else {
      updatedSaved = [...savedIds, id];
    }

    setSavedIds(updatedSaved);
    localStorage.setItem("saved_arenas", JSON.stringify(updatedSaved));
    
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

  // 🎯 Submission Page-e Dynamic Routing Handlers
  const handleActionClick = (contest: ContestSchema) => {
    const contestId = contest._id || contest.id;
    
    if (contest.status === "Completed") {
      // Contest sesh hole scoreboard/result page-e jabe
      router.push(`/dashboard/participant/contests/${contestId}/scoreboard`);
    } else {
      // Active contest hole sora-sori code submission window-te niye jabe
      router.push(`/dashboard/participant/arena/${contestId}/submit`);
    }
  };

  // ⛓️ Filtering and Sorting Chain
  const filteredContests = contests
    .filter(c => {
      const contestId = c._id || c.id || "";
      if (activeTab === "Saved") return savedIds.includes(contestId);
      if (activeTab === "Active") return c.status === "Published"; 
      return c.status === "Completed";
    })
    .filter(c => {
      return (
        (c.title || "").toLowerCase().includes(searchQuery.toLowerCase()) || 
        (c.category || "").toLowerCase().includes(searchQuery.toLowerCase())
      );
    })
    .filter(c => {
      if (difficultyFilter === "All") return true;
      return c.difficulty === difficultyFilter;
    })
    .sort((a, b) => {
      if (sortBy === "title") return (a.title || "").localeCompare(b.title || "");
      return 0;
    });

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 gap-2">
        <Loader2 className="w-10 h-10 text-indigo-600 animate-spin" />
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Loading Registered Arenas...</p>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 md:p-10 space-y-8 bg-slate-50 min-h-screen">
      
      {/* Top Header Section */}
      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
          <Trophy className="w-7 h-7 sm:w-8 h-8 text-indigo-600 shrink-0" /> My Coding Arenas
        </h1>
        <p className="text-slate-500 text-xs sm:text-sm font-medium pl-1">
          Monitor your production sprints, review historical scoreboard results, and track code repository completion checkpoints.
        </p>
      </div>

      {/* 📑 Category Tabs */}
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

      {/* 🛠️ Control Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white/80 backdrop-blur-xl border border-slate-200/60 p-4 rounded-2xl shadow-sm">
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

        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-slate-400 shrink-0" />
          <select
            value={difficultyFilter}
            onChange={(e) => setDifficultyFilter(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-600 focus:outline-none focus:border-slate-900 cursor-pointer"
          >
            <option value="All">All Complexities</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <ArrowUpDown className="w-4 h-4 text-slate-400 shrink-0" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-600 focus:outline-none focus:border-slate-900 cursor-pointer"
          >
            <option value="title">Sort by Alphabetic Title</option>
          </select>
        </div>
      </div>

      {/* 🎴 Cards Grid Area */}
      {filteredContests.length === 0 ? (
        <div className="p-12 text-center bg-white/50 border border-slate-200/60 rounded-3xl text-xs font-bold text-slate-400">
          🔍 No registered or saved arenas found in this sector.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredContests.map((contest) => {
            const contestId = contest._id || contest.id || "";
            const isSaved = savedIds.includes(contestId);
            return (
              <div 
                key={contestId} 
                className="bg-white border border-slate-200/70 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
              >
                {/* Banner Wrapper */}
                <div className="relative h-44 w-full bg-slate-100 overflow-hidden shrink-0">
                  <img 
                    src={contest.banner || "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=500"} 
                    alt={contest.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  
                  {/* Bookmark Button */}
                  <button
                    onClick={() => handleToggleSave(contestId, contest.title)}
                    className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-md hover:bg-white rounded-xl shadow-sm text-slate-700 transition"
                  >
                    {isSaved ? <BookmarkCheck className="w-4 h-4 text-indigo-600 fill-indigo-600" /> : <Bookmark className="w-4 h-4" />}
                  </button>

                  <span className="absolute bottom-4 left-4 px-2.5 py-1 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-lg text-[10px] font-black uppercase tracking-wider">
                    {contest.category}
                  </span>
                </div>

                {/* Card Content Core Details */}
                <div className="p-5 flex-1 flex flex-col justify-between gap-5">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-[11px] font-bold">
                      <span className="bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded">
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

                  {/* Card Footer Status & Action Button */}
                  <div className="pt-3 border-t border-slate-50 flex items-center justify-between gap-4 text-xs">
                    <span className={`flex items-center gap-1.5 font-bold ${
                      contest.status === "Completed" ? "text-emerald-600" : "text-amber-600"
                    }`}>
                      <div className={`w-1.5 h-1.5 rounded-full ${contest.status === "Completed" ? "bg-emerald-500" : "bg-amber-500 animate-pulse"}`} />
                      {contest.status === "Published" ? "Active" : contest.status}
                    </span>

                    {/* 🎯 "Resume Repository" click korle user direct code submission track-e enter korbe */}
                    <button 
                      onClick={() => handleActionClick(contest)}
                      className="px-3.5 py-2 bg-slate-900 text-white font-bold text-[11px] rounded-xl hover:bg-indigo-600 transition flex items-center gap-1.5"
                    >
                      {contest.status === "Completed" ? "View Scoreboard" : "Submit Progress"} 
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      )}

      {/* Pagination Container */}
      <div className="flex justify-between items-center bg-white/70 backdrop-blur-xl border border-slate-200/60 p-4 rounded-xl shadow-sm text-xs font-bold text-slate-500">
        <span>Showing 1-{filteredContests.length} of {filteredContests.length} entries</span>
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