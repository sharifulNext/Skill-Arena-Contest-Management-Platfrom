"use client";

import { useState } from "react";
import { 
  Trophy, Search, Filter, Check, X, Trash2, 
  Star, ShieldAlert, ArrowUpRight, Calendar, DollarSign 
} from "lucide-react";
import { motion } from "framer-motion";
import Swal from "sweetalert2";

// 📋 ডামি কন্টেস্ট ডেটাবেজ
const initialContests = [
  { id: "c1", title: "NextJS 16 Production Sprint", organizer: "SkillArena HQ", status: "PENDING", reports: 0, isFeatured: false, deadline: "30 May, 2026", prize: "$1,500" },
  { id: "c2", title: "Web3 Solis Speedrun", organizer: "CryptoLabs BD", status: "APPROVED", reports: 0, isFeatured: true, deadline: "05 June, 2026", prize: "$2,500" },
  { id: "c3", title: "AI Automated Agent Blitz", organizer: "Neural Networks", status: "LIVE", reports: 1, isFeatured: false, deadline: "25 May, 2026", prize: "$5,000" },
  { id: "c4", title: "Legacy React Optimization", organizer: "Devs-Community", status: "ENDED", reports: 4, isFeatured: false, deadline: "10 May, 2026", prize: "$800" },
  { id: "c5", title: "Scraping Bot Architecture", organizer: "Spammy Org", status: "LIVE", reports: 8, isFeatured: false, deadline: "28 May, 2026", prize: "$300" },
];

export default function AdminContestModeration() {
  const [contests, setContests] = useState(initialContests);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const handleApproveContest = (id: string) => {
    setContests(contests.map(c => c.id === id ? { ...c, status: "APPROVED" } : c));
    Swal.fire({
      icon: "success",
      title: "Contest Approved! 🟢",
      text: "The contest state has progressed to APPROVED.",
      customClass: { popup: "rounded-3xl" },
      confirmButtonColor: "#0f172a"
    });
  };

  const handleRejectContest = (id: string) => {
    setContests(contests.map(c => c.id === id ? { ...c, status: "REJECTED" } : c));
    Swal.fire({
      icon: "error",
      title: "Contest Rejected",
      text: "The contest application has been declined.",
      customClass: { popup: "rounded-3xl" },
      confirmButtonColor: "#0f172a"
    });
  };

  const handleToggleFeature = (id: string, currentFeatured: boolean) => {
    setContests(contests.map(c => c.id === id ? { ...c, isFeatured: !currentFeatured } : c));
  };

  const handleDeleteContest = (id: string, title: string) => {
    Swal.fire({
      title: "Purge Arena?",
      text: `Permanently destroy "${title}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e11d48",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Yes, Delete",
      customClass: { popup: "rounded-3xl" }
    }).then((result) => {
      if (result.isConfirmed) {
        setContests(contests.filter(c => c.id !== id));
      }
    });
  };

  const filteredContests = contests.filter(c => {
    const matchesSearch = c.title.toLowerCase().includes(search.toLowerCase()) || c.organizer.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = statusFilter === "ALL" || c.status === statusFilter || (statusFilter === "FLAGGED" && c.reports > 3);
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="p-4 sm:p-6 md:p-10 space-y-6 md:space-y-8 bg-slate-50 min-h-screen">
      
      {/* 👑 হেডার এরিয়া (Responsive Flex) */}
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
          <Trophy className="w-6 h-6 sm:w-8 h-8 text-slate-700" /> Contest Gatekeeper
        </h1>
        <p className="text-slate-500 text-xs sm:text-sm font-medium">Verify structural contest payloads, feature premium pools, and isolate reported abuse triggers.</p>
      </div>

      {/* 🎛️ কন্ট্রোল ফিল্টার বার (Full Responsive Stack) */}
      <div className="flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center bg-white/70 backdrop-blur-xl border border-slate-200/60 p-4 rounded-2xl shadow-sm">
        {/* সার্চ বার */}
        <div className="relative w-full sm:max-w-xs">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input 
            type="text" 
            placeholder="Search contest or organizer..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold focus:outline-none focus:border-slate-900"
          />
        </div>

        {/* ফিল্টার ড্রপডাউন */}
        <div className="w-full sm:w-auto">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full sm:w-auto px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-600 focus:outline-none focus:border-slate-900 cursor-pointer"
          >
            <option value="ALL">All Lifecycles</option>
            <option value="PENDING">Pending Approval</option>
            <option value="APPROVED">Approved Arenas</option>
            <option value="LIVE">Live Channels</option>
            <option value="ENDED">Ended Tracks</option>
            <option value="FLAGGED">Abuse / High Reports ⚠️</option>
          </select>
        </div>
      </div>

      {/* 📱 ১. মোবাইল ভিউ: রেসপনসিভ কার্ড লেআউট (Hidden on large screens, shown on mobile/tablet) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:hidden">
        {filteredContests.length === 0 ? (
          <div className="p-8 text-center bg-white rounded-2xl text-xs font-semibold text-slate-400 col-span-full">
            ❌ No arenas found matching the filtration queries.
          </div>
        ) : (
          filteredContests.map((contest) => (
            <div key={contest.id} className="bg-white border border-slate-200/70 p-5 rounded-2xl shadow-sm space-y-4 relative overflow-hidden">
              {/* মেইন কন্টেন্ট */}
              <div className="space-y-2">
                <div className="flex justify-between items-start gap-2">
                  <h4 className="font-bold text-slate-900 text-sm leading-tight">{contest.title}</h4>
                  <span className={`px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-wider shrink-0 ${
                    contest.status === "LIVE" ? "bg-emerald-50 text-emerald-700 border border-emerald-100" :
                    contest.status === "APPROVED" ? "bg-blue-50 text-blue-700 border border-blue-100" :
                    contest.status === "PENDING" ? "bg-amber-50 text-amber-700 border border-amber-100" :
                    "bg-slate-100 text-slate-600"
                  }`}>
                    {contest.status}
                  </span>
                </div>

                <p className="text-xs text-slate-400 font-semibold">by {contest.organizer}</p>
              </div>

              {/* মেটা ডাটা (প্রাইজ ও ডেডলাইন) */}
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 text-[11px] font-bold">
                <div className="text-indigo-600 bg-indigo-50/60 p-2 rounded-xl flex items-center gap-1">
                  <DollarSign className="w-3.5 h-3.5" /> Pool: {contest.prize}
                </div>
                <div className="text-slate-500 bg-slate-50 p-2 rounded-xl flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" /> End: {contest.deadline}
                </div>
              </div>

              {/* অ্যাবিউজ ফ্ল্যাগ ট্রিগার */}
              {contest.reports > 0 && (
                <div className={`p-2 rounded-xl text-xs font-bold flex items-center gap-1.5 justify-center ${contest.reports > 3 ? "bg-rose-50 text-rose-600 border border-rose-100" : "bg-amber-50 text-amber-600"}`}>
                  <ShieldAlert className="w-4 h-4" /> {contest.reports} Security Flags
                </div>
              )}

              {/* মোবাইল অ্যাকশন বাটন প্যানেল */}
              <div className="flex justify-end gap-1.5 pt-2 border-t border-slate-100">
                {contest.status === "PENDING" && (
                  <>
                    <button onClick={() => handleApproveContest(contest.id)} className="flex-1 py-2 bg-emerald-50 text-emerald-600 rounded-xl text-xs font-bold border border-emerald-100 flex items-center justify-center gap-1"><Check className="w-4 h-4" /> Approve</button>
                    <button onClick={() => handleRejectContest(contest.id)} className="flex-1 py-2 bg-rose-50 text-rose-600 rounded-xl text-xs font-bold border border-rose-100 flex items-center justify-center gap-1"><X className="w-4 h-4" /> Reject</button>
                  </>
                )}
                <button onClick={() => handleToggleFeature(contest.id, contest.isFeatured)} className={`p-2 rounded-xl border ${contest.isFeatured ? "bg-amber-50 text-amber-600 border-amber-200" : "bg-slate-50 text-slate-400"}`}><Star className={`w-4 h-4 ${contest.isFeatured ? "fill-amber-500 text-amber-500" : ""}`} /></button>
                <button onClick={() => handleDeleteContest(contest.id, contest.title)} className="p-2 bg-slate-50 text-slate-400 hover:text-rose-600 border border-transparent rounded-xl"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* 🖥️ ২. ডেস্কটপ ভিউ: ফুল ম্যাট্রিক্স টেবিল (Hidden on mobile/tablet, shown on large screens) */}
      <div className="hidden lg:block bg-white/70 backdrop-blur-xl border border-slate-200/60 rounded-3xl overflow-hidden shadow-sm p-2">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 text-xs font-bold uppercase tracking-wider">
                <th className="p-4">Contest Core Payload</th>
                <th className="p-4">Organizer</th>
                <th className="p-4">Lifecycle State</th>
                <th className="p-4 text-center">Abuse Monitors</th>
                <th className="p-4 text-right">Gate Operations</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs font-medium text-slate-700">
              {filteredContests.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-10 text-center text-slate-400 font-semibold">❌ No arenas found matching the filtration queries.</td>
                </tr>
              ) : (
                filteredContests.map((contest) => (
                  <tr key={contest.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="p-4 space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 text-sm block">{contest.title}</span>
                        {contest.isFeatured && (
                          <span className="px-2 py-0.5 text-[9px] font-black uppercase bg-amber-50 text-amber-600 border border-amber-200 rounded-md tracking-wider flex items-center gap-0.5"><Star className="w-2.5 h-2.5 fill-amber-500 text-amber-500" /> Featured</span>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-[11px] font-semibold text-slate-400">
                        <span className="text-indigo-600 font-bold bg-indigo-50 border border-indigo-100/50 px-1.5 py-0.5 rounded-md">{contest.prize} Pool</span>
                        <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {contest.deadline}</span>
                      </div>
                    </td>
                    <td className="p-4 font-semibold text-slate-800 text-sm">{contest.organizer}</td>
                    <td className="p-4">
                      <span className={`px-2.5 py-0.5 rounded-lg text-[10px] font-black uppercase tracking-wider border ${
                        contest.status === "LIVE" ? "bg-emerald-50 border-emerald-100 text-emerald-700 animate-pulse" :
                        contest.status === "APPROVED" ? "bg-blue-50 border-blue-100 text-blue-700" :
                        contest.status === "PENDING" ? "bg-amber-50 border-amber-100 text-amber-700" :
                        "bg-slate-100 border-slate-200 text-slate-600"
                      }`}>{contest.status}</span>
                    </td>
                    <td className="p-4 text-center">
                      {contest.reports > 3 ? (
                        <span className="px-2 py-1 bg-rose-50 text-rose-600 border border-rose-100 rounded-xl font-bold flex items-center gap-1 w-fit mx-auto animate-bounce text-[11px]"><ShieldAlert className="w-3.5 h-3.5" /> {contest.reports} Flags</span>
                      ) : contest.reports > 0 ? (
                        <span className="px-2 py-1 bg-amber-50 text-amber-600 border border-amber-100 rounded-xl font-bold flex items-center gap-1 w-fit mx-auto text-[11px]"><ShieldAlert className="w-3.5 h-3.5" /> {contest.reports} Report</span>
                      ) : (
                        <span className="text-slate-400 font-bold text-[11px]">— Clean</span>
                      )}
                    </td>
                    <td className="p-4 text-right space-x-1">
                      {contest.status === "PENDING" && (
                        <>
                          <button onClick={() => handleApproveContest(contest.id)} className="p-2 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-xl hover:bg-emerald-500 hover:text-white transition shadow-sm"><Check className="w-3.5 h-3.5" /></button>
                          <button onClick={() => handleRejectContest(contest.id)} className="p-2 bg-rose-50 text-rose-600 border border-rose-100 rounded-xl hover:bg-rose-500 hover:text-white transition shadow-sm"><X className="w-3.5 h-3.5" /></button>
                        </>
                      )}
                      <button onClick={() => handleToggleFeature(contest.id, contest.isFeatured)} className={`p-2 border rounded-xl transition shadow-sm ${contest.isFeatured ? "bg-amber-50 border-amber-200 text-amber-600" : "bg-slate-50 text-slate-400"}`}><Star className={`w-3.5 h-3.5 ${contest.isFeatured ? "fill-amber-500 text-amber-500" : ""}`} /></button>
                      <button onClick={() => handleDeleteContest(contest.id, contest.title)} className="p-2 bg-slate-50 text-slate-400 hover:text-rose-600 border border-transparent hover:border-rose-100 rounded-xl transition"><Trash2 className="w-3.5 h-3.5" /></button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}