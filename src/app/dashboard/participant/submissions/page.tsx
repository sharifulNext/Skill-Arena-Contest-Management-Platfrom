"use client";

import { useEffect, useState } from "react";
import { 
  CheckCircle2, Clock, XCircle, Code2, Sparkles, 
  ExternalLink, Search, SlidersHorizontal, Eye, Loader2 
} from "lucide-react";

interface SubmissionItem {
  id: string;
  contest: string;
  status: "Accepted" | "Pending" | "Rejected" | string;
  score: string;
  submittedAt: string;
  aiScore: string;
  repoUrl: string;
  aiFeedback: string;
}

export default function ParticipantSubmissions() {
  const [submissions, setSubmissions] = useState<SubmissionItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedSub, setSelectedSub] = useState<SubmissionItem | null>(null);

  // 🔄 ডাটাবেজ থেকে রিয়েল-টাইম ডাটা ফেচিং পাইপলাইন
  useEffect(() => {
    const fetchSubmissionsHistory = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/participant/submissions");
        const payload = await res.json();
        
        if (res.ok && payload.success) {
          setSubmissions(payload.data);
        }
      } catch (err) {
        console.error("Error communicating with processing nodes:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissionsHistory();
  }, []);

  // 🔍 সার্চ ও ফিল্টার প্রসেসর (রিয়েল ডাটার ওপর কাজ করবে)
  const filteredSubmissions = submissions.filter(sub => {
    const matchesSearch = sub.contest.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "All" || sub.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 gap-2">
        <Loader2 className="w-10 h-10 text-indigo-600 animate-spin" />
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Compiling Submission Logs...</p>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 md:p-10 space-y-8 bg-slate-50 min-h-screen">
      
      {/* 👑 হেডার ট্র্যাকার */}
      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
          <Code2 className="w-7 h-7 sm:w-8 h-8 text-indigo-600 shrink-0" /> Submission Repositories
        </h1>
        <p className="text-slate-500 text-xs sm:text-sm font-medium pl-1">
          Review automated commit states, analyze structural compilation scores, and audit LLM feedback responses.
        </p>
      </div>

      {/* 🛠️ ১. ফিল্টার টুলবার */}
      <div className="flex flex-col sm:flex-row gap-4 bg-white/80 backdrop-blur-xl border border-slate-200/60 p-4 rounded-2xl shadow-sm">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input 
            type="text" 
            placeholder="Search submission history..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold focus:outline-none focus:border-slate-900"
          />
        </div>
        <div className="flex items-center gap-2 sm:max-w-xs w-full sm:w-auto">
          <SlidersHorizontal className="w-4 h-4 text-slate-400 shrink-0" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full sm:w-auto px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-600 focus:outline-none focus:border-slate-900 cursor-pointer"
          >
            <option value="All">All Statuses</option>
            <option value="Accepted">Accepted</option>
            <option value="Pending">Pending</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* 📊 ২. মেইন রেসপনসিভ সাবমিশন টেবিল */}
      <div className="bg-white border border-slate-200/60 rounded-3xl overflow-hidden shadow-sm p-3">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 text-xs font-bold uppercase tracking-wider">
                <th className="p-4">Contest Arena</th>
                <th className="p-4">Status</th>
                <th className="p-4">Manual Score</th>
                <th className="p-4">Submitted At</th>
                <th className="p-4">AI Score</th>
                <th className="p-4 text-right">Inspect</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-xs font-semibold text-slate-700">
              {filteredSubmissions.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-400">
                    No matching deployment commits logged in this timeline.
                  </td>
                </tr>
              ) : (
                filteredSubmissions.map((sub) => (
                  <tr 
                    key={sub.id} 
                    onClick={() => setSelectedSub(sub)}
                    className="hover:bg-indigo-50/40 transition-colors cursor-pointer group"
                  >
                    <td className="p-4">
                      <span className="font-extrabold text-slate-900 block group-hover:text-indigo-600 transition-colors">{sub.contest}</span>
                      <span className="text-[10px] text-slate-400 font-mono block mt-0.5">{sub.id}</span>
                    </td>
                    
                    <td className="p-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-black uppercase ${
                        sub.status === "Accepted" 
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-100" 
                          : sub.status === "Pending" 
                            ? "bg-amber-50 text-amber-700 border border-amber-100 animate-pulse" 
                            : "bg-rose-50 text-rose-700 border border-rose-100"
                      }`}>
                        {sub.status === "Accepted" && <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />}
                        {sub.status === "Pending" && <Clock className="w-3.5 h-3.5 shrink-0" />}
                        {sub.status === "Rejected" && <XCircle className="w-3.5 h-3.5 shrink-0" />}
                        {sub.status}
                      </span>
                    </td>
                    
                    <td className="p-4 font-mono font-bold text-slate-800">
                      {sub.score}
                    </td>
                    
                    <td className="p-4 text-slate-500 font-medium">
                      {sub.submittedAt}
                    </td>
                    
                    <td className="p-4">
                      <span className={`inline-flex items-center gap-1 font-bold font-mono ${
                        sub.status === "Pending" ? "text-slate-400" : "text-purple-600 bg-purple-50 px-2 py-0.5 rounded-md border border-purple-100/60"
                      }`}>
                        <Sparkles className="w-3 h-3 text-purple-500 fill-purple-400" /> {sub.aiScore}
                      </span>
                    </td>

                    <td className="p-4 text-right">
                      <button className="p-2 text-slate-400 group-hover:text-indigo-600 group-hover:bg-indigo-50 rounded-xl transition">
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 🎴 ৩. SUBMISSION DETAILS MODAL */}
      {selectedSub && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-md transition-opacity" onClick={() => setSelectedSub(null)} />
          <div className="bg-white border border-slate-200 w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl relative z-10 animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
            
            <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex justify-between items-start gap-4">
              <div className="space-y-1">
                <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">Audit Inspection Hub</span>
                <h3 className="font-extrabold text-slate-900 text-base leading-snug">{selectedSub.contest}</h3>
              </div>
              <button 
                onClick={() => setSelectedSub(null)}
                className="px-3 py-1.5 bg-slate-200/70 hover:bg-slate-200 text-slate-600 text-xs font-bold rounded-xl transition shrink-0"
              >
                Close
              </button>
            </div>

            <div className="p-6 space-y-6 overflow-y-auto flex-1 text-xs">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 font-semibold text-slate-500">
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <span className="block text-[10px] text-slate-400 font-bold mb-1">DEPLOYMENT STATE</span>
                  <span className="text-slate-800 font-bold">{selectedSub.status}</span>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <span className="block text-[10px] text-slate-400 font-bold mb-1">SCORE AGGREGATE</span>
                  <span className="text-slate-800 font-mono font-bold">{selectedSub.score}</span>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 col-span-2 sm:col-span-1">
                  <span className="block text-[10px] text-slate-400 font-bold mb-1">AUTOMATED AI GRADE</span>
                  <span className="text-purple-600 font-mono font-black">{selectedSub.aiScore}</span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400">REPOSITORY INSTANCE LINK</label>
                <a 
                  href={selectedSub.repoUrl.startsWith("http") ? selectedSub.repoUrl : `https://${selectedSub.repoUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-indigo-50/50 border border-indigo-100 rounded-xl flex items-center justify-between text-indigo-700 hover:bg-indigo-50 transition group font-mono font-bold"
                >
                  <span>{selectedSub.repoUrl}</span>
                  <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </a>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-purple-500 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 fill-purple-200" /> COGNITIVE AI FEEDBACK TELEMETRY
                </label>
                <div className="p-4 bg-gradient-to-br from-indigo-950 to-slate-950 text-indigo-100 font-medium rounded-2xl border border-slate-800 leading-relaxed font-mono whitespace-pre-line shadow-sm">
                  {selectedSub.aiFeedback}
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}