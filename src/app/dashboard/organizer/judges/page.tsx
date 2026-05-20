"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, UserPlus, Shield, Mail, CheckCircle2, Clock, Award, Users } from "lucide-react";
import Swal from "sweetalert2";

// ডামি জাজ ডাটা লিস্ট
const initialJudges = [
  { id: "1", name: "Dr. Ariful Islam", email: "arif.islam@skillarena.com", expertise: "Backend & Cloud Architecture", status: "Active", reviewsDone: 14 },
  { id: "2", name: "Sania Rahman", email: "sania.design@gmail.com", expertise: "UI/UX & Product Design", status: "Active", reviewsDone: 9 },
  { id: "3", name: "Kevin Mitnick Jr.", email: "kevin.sec@arena.io", expertise: "Cyber Security & SecOps", status: "Pending Invite", reviewsDone: 0 },
];

export default function OrganizerJudgesPage() {
  const router = useRouter();
  const [judges, setJudges] = useState(initialJudges);
  const [showInviteModal, setShowInviteModal] = useState(false);
  
  // নতুন জাজ ইনভাইট ফর্ম স্টেট
  const [newJudge, setNewJudge] = useState({ name: "", email: "", expertise: "" });

  // 🧪 ডামি জাজ ইনভাইট হ্যান্ডলার
  const handleInviteJudge = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newJudge.name || !newJudge.email || !newJudge.expertise) return;

    const createdJudge = {
      id: String(judges.length + 1),
      name: newJudge.name,
      email: newJudge.email,
      expertise: newJudge.expertise,
      status: "Pending Invite",
      reviewsDone: 0
    };

    setJudges([...judges, createdJudge]);
    setShowInviteModal(false);
    setNewJudge({ name: "", email: "", expertise: "" });

    Swal.fire({
      icon: "success",
      title: "Invitation Sent! ✉️",
      text: `${createdJudge.name} has been invited as an expert judge.`,
      customClass: { popup: "rounded-3xl" },
      confirmButtonColor: "#0f172a"
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 p-6 sm:p-10 font-sans relative">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* ব্যাক বাটন */}
        <button 
          onClick={() => router.back()} 
          className="flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-900 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" /> Back to Dashboard
        </button>

        {/* হেডার সেকশন */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-2">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <Shield className="w-8 h-8 text-slate-400" /> Judges Infrastructure
            </h1>
            <p className="text-slate-500 text-sm font-medium">Appoint tech experts, manage evaluations rubrics, and track audit speed.</p>
          </div>

          {/* ইনভাইট বাটন */}
          <button 
            onClick={() => setShowInviteModal(true)}
            className="px-5 py-3 rounded-xl bg-slate-900 text-white font-semibold shadow-lg shadow-slate-900/10 hover:bg-slate-800 transition flex items-center gap-2 text-sm"
          >
            <UserPlus className="w-4 h-4" /> Invite Expert Judge
          </button>
        </div>

        {/* 📊 কুইক স্ট্যাটস সামারি কার্ডস */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white/70 backdrop-blur-xl border border-slate-200/60 p-5 rounded-2xl flex items-center gap-4 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700"><Users className="w-6 h-6" /></div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Panel</p>
              <p className="text-xl font-bold text-slate-900">{judges.length} Judges</p>
            </div>
          </div>
          <div className="bg-white/70 backdrop-blur-xl border border-slate-200/60 p-5 rounded-2xl flex items-center gap-4 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-100 flex items-center justify-center"><CheckCircle2 className="w-6 h-6" /></div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Evaluators</p>
              <p className="text-xl font-bold text-emerald-700">{judges.filter(j => j.status === "Active").length} Active</p>
            </div>
          </div>
          <div className="bg-white/70 backdrop-blur-xl border border-slate-200/60 p-5 rounded-2xl flex items-center gap-4 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-700 border border-indigo-100 flex items-center justify-center"><Award className="w-6 h-6" /></div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Audits Done</p>
              <p className="text-xl font-bold text-indigo-700">{judges.reduce((acc, curr) => acc + curr.reviewsDone, 0)} Projects</p>
            </div>
          </div>
        </div>

        {/* 🤍 হোয়াইট গ্লাস জাজেস টেবিল */}
        <div className="bg-white/70 backdrop-blur-xl border border-slate-200/60 p-6 sm:p-8 rounded-3xl shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 text-sm font-semibold">
                  <th className="pb-4">Judge Information</th>
                  <th className="pb-4">Expertise Domain</th>
                  <th className="pb-4 text-center">Reviews Managed</th>
                  <th className="pb-4 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm font-medium text-slate-700">
                {judges.map((judge) => (
                  <tr key={judge.id} className="group hover:bg-slate-50/50 transition-colors">
                    {/* জাজ প্রোফাইল */}
                    <td className="py-4 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-sm">
                        {judge.name[0]}
                      </div>
                      <div>
                        <span className="font-semibold text-slate-900 block">{judge.name}</span>
                        <span className="text-xs text-slate-400 flex items-center gap-1 font-medium mt-0.5">
                          <Mail className="w-3 h-3" /> {judge.email}
                        </span>
                      </div>
                    </td>

                    {/* ডোমেইন */}
                    <td className="py-4">
                      <span className="px-2.5 py-1 text-xs font-semibold bg-slate-100 border border-slate-200 text-slate-700 rounded-lg">
                        {judge.expertise}
                      </span>
                    </td>

                    {/* ইভ্যালুয়েশন কাউন্ট */}
                    <td className="py-4 text-center font-bold text-slate-900">
                      {judge.reviewsDone} submissions
                    </td>

                    {/* স্ট্যাটাস ব্যাজ */}
                    <td className="py-4 text-right">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-semibold border ${
                        judge.status === "Active" 
                          ? "bg-emerald-50 border-emerald-200 text-emerald-700" 
                          : "bg-amber-50 border-amber-200 text-amber-700"
                      }`}>
                        {judge.status === "Active" ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />}
                        {judge.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* 🔮 ইনভাইট জাজ মডাল (হোয়াইট গ্লাস ব্লার মোড) */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-slate-900/20 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-white border border-slate-200 shadow-2xl rounded-3xl max-w-md w-full p-6 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <h3 className="text-xl font-bold text-slate-900">Appoint Guest Judge</h3>
            <p className="text-xs font-medium text-slate-400">An invitation mail containing a dashboard access token will be generated.</p>
            
            <form onSubmit={handleInviteJudge} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600">Full Name</label>
                <input type="text" required placeholder="e.g. Dr. John Doe" value={newJudge.name} onChange={(e) => setNewJudge({...newJudge, name: e.target.value})} className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:border-slate-900" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600">Expert Email</label>
                <input type="email" required placeholder="judge@example.com" value={newJudge.email} onChange={(e) => setNewJudge({...newJudge, email: e.target.value})} className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:border-slate-900" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600">Core Expertise Domain</label>
                <input type="text" required placeholder="e.g. Full-Stack Dev / Security Auditor" value={newJudge.expertise} onChange={(e) => setNewJudge({...newJudge, expertise: e.target.value})} className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:border-slate-900" />
              </div>

              <div className="flex gap-2 justify-end pt-2">
                <button type="button" onClick={() => setShowInviteModal(false)} className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-semibold text-slate-500 hover:bg-slate-50">Cancel</button>
                <button type="submit" className="px-4 py-2 rounded-xl bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800">Send Invite</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}