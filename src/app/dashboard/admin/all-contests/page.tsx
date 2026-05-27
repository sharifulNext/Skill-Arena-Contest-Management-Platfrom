"use client";

import { useEffect, useState } from "react";
import { 
  Trophy, Search, Check, X, Trash2, 
  Star, ShieldAlert, Calendar, DollarSign, Loader2 
} from "lucide-react";
import Swal from "sweetalert2";

interface ContestMatrix {
  _id: string;
  title: string;
  createdBy: { _id: string; name: string } | null;
  status: string;
  reports?: number;
  isFeatured?: boolean;
  endDate: string;
  prize: string;
}

export default function AdminContestModeration() {
  const [contests, setContests] = useState<ContestMatrix[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  // 📡 ডাটাবেজ থেকে রিয়েল-টাইম ডাটা ফেচ পাইপলাইন
  const fetchContests = async () => {
    try {
      const res = await fetch("/api/admin/contests");
      
      // 🛡️ সেফটি গার্ড: এপিআই বডি ব্ল্যাঙ্ক বা ক্র্যাশ হলে হ্যান্ডেল করবে
      if (!res.ok) {
        const errText = await res.text();
        throw new Error(`Server returned status ${res.status}: ${errText || "Empty Response"}`);
      }

      const data = await res.json();
      if (data.success) {
        setContests(data.data);
      }
    } catch (err) {
      console.error("Failed to sync arena nodes:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContests();
  }, []);

  // 🟢 ১. অ্যাপ্রুভ / পাবলিশ অ্যাকশন
  const handleApproveContest = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/contests/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "Published" })
      });
      const data = await res.json();

      if (data.success) {
        setContests(contests.map(c => c._id === id ? { ...c, status: "Published" } : c));
        Swal.fire({
          icon: "success",
          title: "Contest Live! 🟢",
          text: "The arena has been successfully deployed to core nodes.",
          customClass: { popup: "rounded-3xl" },
          confirmButtonColor: "#0f172a"
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  // 🔴 ২. রিজেক্ট / মুভ টু ড্রাফট অ্যাকশন
  const handleRejectContest = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/contests/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "Draft" })
      });
      const data = await res.json();

      if (data.success) {
        setContests(contests.map(c => c._id === id ? { ...c, status: "Draft" } : c));
        Swal.fire({
          icon: "error",
          title: "Contest Restricted",
          text: "The contest payload has been restricted back to Draft.",
          customClass: { popup: "rounded-3xl" },
          confirmButtonColor: "#0f172a"
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  // ⭐️ ৩. প্রিমিয়াম ফিচার টগল অ্যাকশন
  const handleToggleFeature = async (id: string, currentFeatured: boolean) => {
    try {
      const nextFeatured = !currentFeatured;
      const res = await fetch(`/api/admin/contests/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isFeatured: nextFeatured })
      });
      const data = await res.json();

      if (data.success) {
        setContests(contests.map(c => c._id === id ? { ...c, isFeatured: nextFeatured } : c));
      }
    } catch (err) {
      console.error(err);
    }
  };

  // 🗑️ ৪. পার্মানেন্টলি ডাটা ডিলিট অপারেশন
  const handleDeleteContest = (id: string, title: string) => {
    Swal.fire({
      title: "Purge Arena?",
      text: `Permanently destroy "${title}" from clusters?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e11d48",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Yes, Delete",
      customClass: { popup: "rounded-3xl" }
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await fetch(`/api/admin/contests/${id}`, { method: "DELETE" });
          const data = await res.json();

          if (data.success) {
            setContests(contests.filter(c => c._id !== id));
            Swal.fire({
              title: "Purged!",
              text: "The arena object has been permanently wiped.",
              icon: "success",
              confirmButtonColor: "#0f172a",
              customClass: { popup: "rounded-3xl" }
            });
          }
        } catch (err) {
          console.error(err);
        }
      }
    });
  };

  // 🔍 সার্চ অ্যান্ড ফিল্টার প্রসেসর
  const filteredContests = contests.filter(c => {
    const organizerName = c.createdBy?.name || "Unknown";
    const matchesSearch = c.title.toLowerCase().includes(search.toLowerCase()) || organizerName.toLowerCase().includes(search.toLowerCase());
    
    const reportsCount = c.reports || 0;
    const matchesFilter = statusFilter === "ALL" || 
                          (statusFilter === "PENDING" && c.status === "Draft") ||
                          (statusFilter === "APPROVED" && c.status === "Published") ||
                          (statusFilter === "FLAGGED" && reportsCount > 3);
    return matchesSearch && matchesFilter;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 gap-2">
        <Loader2 className="w-10 h-10 text-slate-800 animate-spin" />
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Scanning Active Arenas...</p>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 md:p-10 space-y-6 md:space-y-8 bg-slate-50 min-h-screen">
      
      {/* 👑 হেডার */}
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
          <Trophy className="w-6 h-6 sm:w-8 h-8 text-slate-700" /> Contest Gatekeeper
        </h1>
        <p className="text-slate-500 text-xs sm:text-sm font-medium">Verify structural contest payloads, feature premium pools, and isolate reported abuse triggers.</p>
      </div>

      {/* 🎛️ ফিল্টার প্যানেল */}
      <div className="flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center bg-white/70 backdrop-blur-xl border border-slate-200/60 p-4 rounded-2xl shadow-sm">
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

        <div className="w-full sm:w-auto">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full sm:w-auto px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-600 focus:outline-none focus:border-slate-900 cursor-pointer"
          >
            <option value="ALL">All Lifecycles</option>
            <option value="PENDING">Pending (Drafts)</option>
            <option value="APPROVED">Published Arenas</option>
            <option value="FLAGGED">High Reports ⚠️</option>
          </select>
        </div>
      </div>

      {/* 📱 মোবাইল রেসপনসিভ ভিউ */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:hidden">
        {filteredContests.length === 0 ? (
          <div className="p-8 text-center bg-white rounded-2xl text-xs font-semibold text-slate-400 col-span-full">
            ❌ No arenas found matching the filtration queries.
          </div>
        ) : (
          filteredContests.map((contest) => (
            <div key={contest._id} className="bg-white border border-slate-200/70 p-5 rounded-2xl shadow-sm space-y-4 relative overflow-hidden">
              <div className="space-y-2">
                <div className="flex justify-between items-start gap-2">
                  <h4 className="font-bold text-slate-900 text-sm leading-tight">{contest.title}</h4>
                  <span className={`px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-wider shrink-0 ${
                    contest.status === "Published" ? "bg-emerald-50 text-emerald-700 border border-emerald-100" : "bg-amber-50 text-amber-700 border border-amber-100"
                  }`}>{contest.status}</span>
                </div>
                <p className="text-xs text-slate-400 font-semibold">by {contest.createdBy?.name || "Unknown Organizer"}</p>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 text-[11px] font-bold">
                <div className="text-indigo-600 bg-indigo-50/60 p-2 rounded-xl flex items-center gap-1">
                  <DollarSign className="w-3.5 h-3.5" /> Pool: {contest.prize}
                </div>
                <div className="text-slate-500 bg-slate-50 p-2 rounded-xl flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" /> {new Date(contest.endDate).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
                </div>
              </div>

              <div className="flex justify-end gap-1.5 pt-2 border-t border-slate-100">
                {contest.status === "Draft" && (
                  <button onClick={() => handleApproveContest(contest._id)} className="flex-1 py-2 bg-emerald-50 text-emerald-600 rounded-xl text-xs font-bold border border-emerald-100 flex items-center justify-center gap-1"><Check className="w-4 h-4" /> Approve</button>
                )}
                {contest.status === "Published" && (
                  <button onClick={() => handleRejectContest(contest._id)} className="flex-1 py-2 bg-rose-50 text-rose-600 rounded-xl text-xs font-bold border border-rose-100 flex items-center justify-center gap-1"><X className="w-4 h-4" /> Reject</button>
                )}
                <button onClick={() => handleToggleFeature(contest._id, !!contest.isFeatured)} className={`p-2 rounded-xl border ${contest.isFeatured ? "bg-amber-50 text-amber-600 border-amber-200" : "bg-slate-50 text-slate-400"}`}><Star className={`w-4 h-4 ${contest.isFeatured ? "fill-amber-500 text-amber-500" : ""}`} /></button>
                <button onClick={() => handleDeleteContest(contest._id, contest.title)} className="p-2 bg-slate-50 text-slate-400 hover:text-rose-600 border border-transparent rounded-xl"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* 🖥️ ডেস্কটপ টেবিল ভিউ */}
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
                  <tr key={contest._id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="p-4 space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 text-sm block">{contest.title}</span>
                        {contest.isFeatured && (
                          <span className="px-2 py-0.5 text-[9px] font-black uppercase bg-amber-50 text-amber-600 border border-amber-200 rounded-md tracking-wider flex items-center gap-0.5"><Star className="w-2.5 h-2.5 fill-amber-500 text-amber-500" /> Featured</span>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-[11px] font-semibold text-slate-400">
                        <span className="text-indigo-600 font-bold bg-indigo-50 border border-indigo-100/50 px-1.5 py-0.5 rounded-md">{contest.prize} Pool</span>
                        <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {new Date(contest.endDate).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</span>
                      </div>
                    </td>
                    <td className="p-4 font-semibold text-slate-800 text-sm">{contest.createdBy?.name || "Unknown"}</td>
                    <td className="p-4">
                      <span className={`px-2.5 py-0.5 rounded-lg text-[10px] font-black uppercase tracking-wider border ${
                        contest.status === "Published" ? "bg-emerald-50 border-emerald-100 text-emerald-700" : "bg-amber-50 border-amber-100 text-amber-700"
                      }`}>{contest.status}</span>
                    </td>
                    <td className="p-4 text-center">
                      {(contest.reports || 0) > 0 ? (
                        <span className="px-2 py-1 bg-rose-50 text-rose-600 border border-rose-100 rounded-xl font-bold flex items-center gap-1 w-fit mx-auto text-[11px]"><ShieldAlert className="w-3.5 h-3.5" /> {contest.reports} Flags</span>
                      ) : (
                        <span className="text-slate-400 font-bold text-[11px]">— Clean</span>
                      )}
                    </td>
                    <td className="p-4 text-right space-x-1">
                      {contest.status === "Draft" && (
                        <button onClick={() => handleApproveContest(contest._id)} className="p-2 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-xl hover:bg-emerald-500 hover:text-white transition shadow-sm" title="Publish Contest"><Check className="w-3.5 h-3.5" /></button>
                      )}
                      {contest.status === "Published" && (
                        <button onClick={() => handleRejectContest(contest._id)} className="p-2 bg-rose-50 text-rose-600 border border-rose-100 rounded-xl hover:bg-rose-500 hover:text-white transition shadow-sm" title="Move to Draft"><X className="w-3.5 h-3.5" /></button>
                      )}
                      <button onClick={() => handleToggleFeature(contest._id, !!contest.isFeatured)} className={`p-2 border rounded-xl transition shadow-sm ${contest.isFeatured ? "bg-amber-50 border-amber-200 text-amber-600" : "bg-slate-50 text-slate-400"}`} title="Toggle Premium Feature"><Star className={`w-3.5 h-3.5 ${contest.isFeatured ? "fill-amber-500 text-amber-500" : ""}`} /></button>
                      <button onClick={() => handleDeleteContest(contest._id, contest.title)} className="p-2 bg-slate-50 text-slate-400 hover:text-rose-600 border border-transparent hover:border-rose-100 rounded-xl transition" title="Purge Contest"><Trash2 className="w-3.5 h-3.5" /></button>
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