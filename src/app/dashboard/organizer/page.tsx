"use client";

import { useState } from "react";
import { 
  PlusCircle, Users, Trophy, Calendar, 
  CheckCircle, Clock, AlertCircle, MoreVertical, Edit3, Eye 
} from "lucide-react";

// 📝 কনটেস্ট ডেটার টাইপ ডেফিনিশন
interface Contest {
  id: string;
  title: string;
  type: string;
  joinedParticipants: number;
  status: "active" | "draft" | "completed";
  deadline: string;
}

export default function OrganizerDashboard() {
  // 📊 মক ডেটা (বাস্তবে এটি API বা Database (PostgreSQL/MongoDB) থেকে আসবে)
  const [contests, setContests] = useState<Contest[]>([
    { id: "c1", title: "Next.js Speedrun Hackathon", type: "Frontend Sprint", joinedParticipants: 142, status: "active", deadline: "May 28, 2026" },
    { id: "c2", title: "React UI Challenge Vol.4", type: "UI/UX Arena", joinedParticipants: 89, status: "draft", deadline: "June 05, 2026" },
    { id: "c3", title: "Full Stack Sprint Arena", type: "Full Stack", joinedParticipants: 230, status: "completed", deadline: "Jan 15, 2026" },
    { id: "c4", title: "Algorithm Blitz Round 6", type: "Competitive Programming", joinedParticipants: 412, status: "active", deadline: "May 25, 2026" },
  ]);

  // 📈 স্ট্যাটাস ক্যালকুলেশন ম্যাট্রিক্স
  const totalRegistrations = contests.reduce((sum, c) => sum + c.joinedParticipants, 0);
  const activeContests = contests.filter(c => c.status === "active").length;

  return (
    <div className="p-4 sm:p-6 md:p-10 space-y-8 bg-slate-50 min-h-screen">
      
      {/* 🔝 1. TOP HEADER & QUICK ACTION HUB */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/60 pb-5">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Organizer Dashboard</h1>
          <p className="text-xs text-slate-500 font-medium">Create, deploy, and monitor your global developer challenge arenas.</p>
        </div>
        
        {/* কুইক অ্যাকশন বাটন */}
        <button className="flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-sm transition-all shrink-0 active:scale-95">
          <PlusCircle className="w-4 h-4" />
          <span>Create New Contest</span>
        </button>
      </div>

      {/* 📊 2. ANALYTICS METRICS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* কার্ড ১: মোট কনটেস্ট */}
        <div className="bg-white border border-slate-200/60 p-5 rounded-2xl shadow-2xs flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Total Arenas</span>
            <span className="text-2xl font-black text-slate-900 font-mono">{contests.length}</span>
          </div>
          <div className="p-3 rounded-xl bg-indigo-50 text-indigo-600">
            <Trophy className="w-5 h-5" />
          </div>
        </div>

        {/* কার্ড ২: একটিভ কনটেস্ট */}
        <div className="bg-white border border-slate-200/60 p-5 rounded-2xl shadow-2xs flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Active Arenas</span>
            <span className="text-2xl font-black text-emerald-600 font-mono">{activeContests}</span>
          </div>
          <div className="p-3 rounded-xl bg-emerald-50 text-emerald-600">
            <Clock className="w-5 h-5" />
          </div>
        </div>

        {/* কার্ড ৩: টোটাল পার্টিসিপেন্ট */}
        <div className="bg-white border border-slate-200/60 p-5 rounded-2xl shadow-2xs flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Total Developers</span>
            <span className="text-2xl font-black text-slate-900 font-mono">{totalRegistrations}</span>
          </div>
          <div className="p-3 rounded-xl bg-blue-50 text-blue-600">
            <Users className="w-5 h-5" />
          </div>
        </div>

        {/* কার্ড ৪: আপকামিং বা ড্রাফট */}
        <div className="bg-white border border-slate-200/60 p-5 rounded-2xl shadow-2xs flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Draft Sprints</span>
            <span className="text-2xl font-black text-amber-600 font-mono">
              {contests.filter(c => c.status === "draft").length}
            </span>
          </div>
          <div className="p-3 rounded-xl bg-amber-50 text-amber-600">
            <AlertCircle className="w-5 h-5" />
          </div>
        </div>

      </div>

      {/* 🗄️ 3. CONTEST MANAGEMENT MODULE */}
      <div className="bg-white border border-slate-200/70 rounded-3xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-sm font-black text-slate-900">Deployed Arenas & Sprints</h3>
          <span className="text-[10px] font-bold text-slate-400 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-md">
            Live Synchronization
          </span>
        </div>

        {/* Responsive Table Layout */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/70 border-b border-slate-100 text-[10px] font-black text-slate-400 uppercase tracking-wider">
                <th className="py-3.5 px-6">Contest Details</th>
                <th className="py-3.5 px-6">Category</th>
                <th className="py-3.5 px-6">Participants</th>
                <th className="py-3.5 px-6">Status</th>
                <th className="py-3.5 px-6">Target Deadline</th>
                <th className="py-3.5 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs font-medium text-slate-700">
              {contests.map((contest) => (
                <tr key={contest.id} className="hover:bg-slate-50/50 transition-colors group">
                  
                  {/* নাম ও আইডি */}
                  <td className="py-4 px-6">
                    <div className="space-y-0.5">
                      <p className="font-extrabold text-slate-900 group-hover:text-indigo-600 transition-colors">
                        {contest.title}
                      </p>
                      <p className="text-[10px] text-slate-400 font-mono uppercase">{contest.id}</p>
                    </div>
                  </td>

                  {/* ক্যাটাগরি */}
                  <td className="py-4 px-6 text-slate-500 font-semibold">
                    {contest.type}
                  </td>

                  {/* পার্টিসিপেন্ট কাউন্ট */}
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-1.5 font-bold font-mono text-slate-800">
                      <Users className="w-3.5 h-3.5 text-slate-400" />
                      {contest.joinedParticipants}
                    </div>
                  </td>

                  {/* ডাইনামিক স্ট্যাটাস ব্যাজ */}
                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center gap-1 text-[10px] font-black px-2 py-0.5 rounded-md border uppercase tracking-wider ${
                      contest.status === "active"
                        ? "text-emerald-600 bg-emerald-50 border-emerald-100/60"
                        : contest.status === "draft"
                        ? "text-amber-600 bg-amber-50 border-amber-100/60"
                        : "text-slate-500 bg-slate-100 border-slate-200"
                    }`}>
                      <span className={`w-1h w-1 h-1 rounded-full ${
                        contest.status === "active" ? "bg-emerald-500" : contest.status === "draft" ? "bg-amber-500" : "bg-slate-400"
                      }`} />
                      {contest.status}
                    </span>
                  </td>

                  {/* ডেডলাইন */}
                  <td className="py-4 px-6 text-slate-400 font-semibold font-mono">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 shrink-0" />
                      {contest.deadline}
                    </div>
                  </td>

                  {/* অ্যাকশন বাটনসমুহ */}
                  <td className="py-4 px-6 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button title="View Submissions" className="p-1.5 rounded-lg border border-slate-100 bg-slate-50 hover:bg-white text-slate-500 hover:text-slate-900 transition-all shadow-3xs">
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button title="Edit Contest" className="p-1.5 rounded-lg border border-slate-100 bg-slate-50 hover:bg-white text-indigo-500 hover:text-indigo-600 transition-all shadow-3xs">
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}