"use client";

import { useState } from "react";
import { 
  Gavel, Plus, Trash2, ShieldAlert, Check, X, 
  UserPlus, Search, Star, Award, Briefcase, ChevronRight 
} from "lucide-react";
import Swal from "sweetalert2";

// 📋 ১. এক্সপার্ট জাজ পুল ডাটা
const initialJudges = [
  { id: "j1", name: "Dr. Jamil Ahmed", email: "jamil@expert.com", expertise: "Next.js & Software Architecture", rating: 4.9, activeContests: 2, performance: "Excellent" },
  { id: "j2", name: "Sarah Jasmine", email: "sarah.j@design.io", expertise: "UI/UX & Product Design", rating: 4.8, activeContests: 1, performance: "High Quality" },
  { id: "j3", name: "Rakib H. Tanvir", email: "rakib@cyber.net", expertise: "Web3 Security & Smart Contracts", rating: 4.6, activeContests: 0, performance: "Average" },
];

// 📋 ২. অর্গানাইজারদের কাছ থেকে আসা ইনবাউন্ড জাজ রিকোয়েস্ট
const initialRequests = [
  { id: "req_1", contestTitle: "AI Automated Agent Blitz", organizer: "Neural Networks", requestedExpertise: "Machine Learning / Next.js", status: "PENDING" },
  { id: "req_2", contestTitle: "Solis Smart Contract Run", organizer: "CryptoLabs BD", requestedExpertise: "Web3 Security", status: "PENDING" },
];

export default function AdminJudgeManagement() {
  const [judges, setJudges] = useState(initialJudges);
  const [requests, setRequests] = useState(initialRequests);
  const [searchQuery, setSearchQuery] = useState("");

  // ➕ ১. নতুন জাজ অ্যাড করার মডাল/অ্যালার্ট গেটওয়ে
  const handleAddJudge = async () => {
    const { value: formValues } = await Swal.fire({
      title: "Appoint Master Judge ⚖️",
      html:
        '<input id="swal-input1" class="swal2-input text-sm rounded-xl" placeholder="Full Name">' +
        '<input id="swal-input2" class="swal2-input text-sm rounded-xl" placeholder="Email Address">' +
        '<input id="swal-input3" class="swal2-input text-sm rounded-xl" placeholder="Expertise (e.g. React, Web3)">',
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonColor: "#0f172a",
      cancelButtonColor: "#64748b",
      customClass: { popup: "rounded-3xl" },
      preConfirm: () => {
        return [
          (document.getElementById("swal-input1") as HTMLInputElement).value,
          (document.getElementById("swal-input2") as HTMLInputElement).value,
          (document.getElementById("swal-input3") as HTMLInputElement).value,
        ];
      }
    });

    if (formValues && formValues[0] && formValues[1] && formValues[2]) {
      const newJudge = {
        id: `j_${Date.now()}`,
        name: formValues[0],
        email: formValues[1],
        expertise: formValues[2],
        rating: 5.0,
        activeContests: 0,
        performance: "New Appointee"
      };
      setJudges([newJudge, ...judges]);
      Swal.fire({ icon: "success", title: "Judge Whitelisted!", confirmButtonColor: "#0f172a", customClass: { popup: "rounded-3xl" } });
    }
  };

  // 🔗 ২. রিকোয়েস্ট অনুযায়ী জাজ অ্যাসাইন করা (Flow: Admin Assigns Judge)
  const handleAssignJudge = (requestId: string, contestTitle: string) => {
    const judgeOptions = judges.reduce((acc, judge) => {
      acc[judge.id] = `${judge.name} (${judge.expertise})`;
      return acc;
    }, {} as Record<string, string>);

    Swal.fire({
      title: "Select Core Judge",
      text: `Assigning an expert panel for "${contestTitle}"`,
      input: "select",
      inputOptions: judgeOptions,
      inputPlaceholder: "Select a whitelisted judge",
      showCancelButton: true,
      confirmButtonColor: "#0f172a",
      cancelButtonColor: "#64748b",
      customClass: { popup: "rounded-3xl" }
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        const selectedJudgeId = result.value;
        setJudges(judges.map(j => j.id === selectedJudgeId ? { ...j, activeContests: j.activeContests + 1 } : j));
        setRequests(requests.filter(req => req.id !== requestId));

        Swal.fire({
          icon: "success",
          title: "Panel Assigned Successfully!",
          confirmButtonColor: "#0f172a",
          customClass: { popup: "rounded-3xl" }
        });
      }
    });
  };

  // 🗑️ ৩. জাজ প্যানেল থেকে রিমুভ করা
  const handleRemoveJudge = (id: string, name: string) => {
    Swal.fire({
      title: "Revoke Credentials?",
      text: `Are you sure you want to remove ${name} from the core judges portal?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e11d48",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Yes, Revoke",
      customClass: { popup: "rounded-3xl" }
    }).then((result) => {
      if (result.isConfirmed) {
        setJudges(judges.filter(j => j.id !== id));
        Swal.fire({ title: "Revoked!", icon: "success", confirmButtonColor: "#0f172a", customClass: { popup: "rounded-3xl" } });
      }
    });
  };

  const filteredJudges = judges.filter(j => 
    j.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    j.expertise.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-4 sm:p-6 md:p-10 space-y-8 bg-slate-50 min-h-screen">
      
      {/* 👑 হেডার ট্র্যাকার */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-5">
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
            <Gavel className="w-7 h-7 sm:w-8 h-8 text-slate-700 shrink-0" /> Supreme Judiciary Panel
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm font-medium pl-1">Appoint top-tier industry vets, monitor score latency, and audit organizer judging requests.</p>
        </div>
        
        <button 
          onClick={handleAddJudge}
          className="w-full sm:w-auto px-5 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition shadow-sm flex items-center justify-center gap-2 shrink-0"
        >
          <UserPlus className="w-4 h-4" /> Appoint New Judge
        </button>
      </div>

      {/* 📥 ফ্লো সেকশন: ইনবাউন্ড জাজ রিকোয়েস্টস */}
      <div className="space-y-4">
        <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2 px-1">
          <ShieldAlert className="w-4 h-4 sm:w-5 h-5 text-amber-500 shrink-0" /> Inbound Organizer Requests ({requests.length})
        </h3>

        {requests.length === 0 ? (
          <div className="p-8 text-center bg-white/70 border border-slate-200/60 rounded-2xl text-xs font-semibold text-slate-400">
            🎉 All arena request pipelines are currently assigned and locked.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {requests.map((req) => (
              <div key={req.id} className="bg-white border border-slate-200/60 p-5 rounded-2xl shadow-sm flex flex-col justify-between gap-5">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-[10px] font-bold text-blue-600 uppercase tracking-wider bg-blue-50 px-2.5 py-1 rounded-md w-fit">
                    Organizer Request Flow
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm">{req.contestTitle}</h4>
                  <p className="text-xs text-slate-400 font-semibold">Hosted by: <span className="text-slate-700 ml-1">{req.organizer}</span></p>
                  <p className="text-xs text-slate-500 font-medium bg-slate-50 p-3 rounded-xl border border-slate-100/70 leading-relaxed">
                    Required Stack: <span className="font-bold text-slate-800 ml-1">{req.requestedExpertise}</span>
                  </p>
                </div>
                
                <button
                  onClick={() => handleAssignJudge(req.id, req.contestTitle)}
                  className="w-full py-2.5 bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-bold rounded-xl hover:bg-indigo-600 hover:text-white transition flex items-center justify-center gap-2"
                >
                  Assign Whitelisted Judge <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 📊 মেইন জাজেস ম্যাট্রিক্স রোস্টার */}
      <div className="space-y-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center bg-white/70 backdrop-blur-xl border border-slate-200/60 p-4 rounded-2xl shadow-sm">
          <div className="relative w-full sm:max-w-xs">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search judge or core stack..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold focus:outline-none focus:border-slate-900"
            />
          </div>
          <div className="text-xs font-bold text-slate-400 shrink-0 pr-1">
            Total Active Panelists: {judges.length}
          </div>
        </div>

        {/* 📱 মোবাইল ভিউ: রেসপনসিভ জাজ কার্ডস */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:hidden">
          {filteredJudges.map((judge) => (
            <div key={judge.id} className="bg-white border border-slate-200/70 p-5 rounded-2xl shadow-sm space-y-4">
              <div className="flex justify-between items-start gap-2">
                <div className="space-y-1">
                  <h4 className="font-bold text-slate-900 text-sm">{judge.name}</h4>
                  <p className="text-[11px] text-slate-400 font-medium">{judge.email}</p>
                </div>
                <span className="flex items-center gap-1 text-amber-500 font-bold text-xs bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-100 shrink-0">
                  <Star className="w-3.5 h-3.5 fill-amber-500" /> {judge.rating}
                </span>
              </div>

              <div className="space-y-2 text-xs">
                <p className="text-slate-500 font-medium"><span className="font-bold text-slate-700 mr-1">Expertise:</span> {judge.expertise}</p>
                <div className="grid grid-cols-2 gap-3 pt-2 text-[11px] font-bold">
                  <div className="bg-slate-50 p-2.5 rounded-xl text-slate-600 border border-slate-100">Active Arenas: {judge.activeContests}</div>
                  <div className={`p-2.5 rounded-xl text-center border ${judge.performance === "Excellent" || judge.performance === "High Quality" ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-slate-100 border-slate-200 text-slate-600"}`}>
                    Perf: {judge.performance}
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-end">
                <button 
                  onClick={() => handleRemoveJudge(judge.id, judge.name)}
                  className="py-2.5 px-4 bg-rose-50 text-rose-600 rounded-xl text-xs font-bold border border-rose-100 flex items-center justify-center gap-2 transition w-full"
                >
                  <Trash2 className="w-4 h-4" /> Revoke Panelist
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* 🖥️ ডেস্কটপ ভিউ: ফুল জাজেস রোস্টার টেবিল */}
        <div className="hidden lg:block bg-white/70 backdrop-blur-xl border border-slate-200/60 rounded-3xl overflow-hidden shadow-sm p-3">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 text-xs font-bold uppercase tracking-wider">
                  <th className="p-4">Judge Panelist</th>
                  <th className="p-4">Expertise Domain</th>
                  <th className="p-4 text-center">Active Arenas</th>
                  <th className="p-4">Performance Score</th>
                  <th className="p-4 text-right">Access Operations</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs font-medium text-slate-700">
                {filteredJudges.map((judge) => (
                  <tr key={judge.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-4">
                      <span className="font-bold text-slate-900 text-sm block mb-1">{judge.name}</span>
                      <span className="text-slate-400 font-medium text-[11px]">{judge.email}</span>
                    </td>
                    <td className="p-4">
                      <span className="px-2.5 py-1 text-slate-700 bg-slate-100 border border-slate-200 rounded-lg font-semibold inline-block">
                        {judge.expertise}
                      </span>
                    </td>
                    <td className="p-4 text-center font-bold text-slate-800 font-mono">
                      {judge.activeContests}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <span className={`px-2.5 py-1 rounded-md font-bold text-[11px] border ${
                          judge.performance === "Excellent" || judge.performance === "High Quality" 
                            ? "bg-emerald-50 text-emerald-600 border-emerald-100" 
                            : "bg-slate-100 border-slate-200 text-slate-600"
                        }`}>
                          {judge.performance}
                        </span>
                        <span className="flex items-center gap-1 text-amber-500 font-bold text-[11px]">
                          <Star className="w-3.5 h-3.5 fill-amber-500" /> {judge.rating}
                        </span>
                      </div>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleRemoveJudge(judge.id, judge.name)}
                          className="p-2 bg-slate-50 text-slate-400 hover:text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-100 rounded-xl transition"
                          title="Revoke Judge Status"
                        >
                          <Trash2 className="w-4 h-4" />
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

    </div>
  );
}