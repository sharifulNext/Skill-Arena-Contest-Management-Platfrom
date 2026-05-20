"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Trophy, Download, Megaphone, CheckCircle2, ShieldAlert, Medal, Crown, Star } from "lucide-react";
import Swal from "sweetalert2";

// 📋 ১. ইভ্যালুয়েশন শেষ হওয়া টপ পার্টিসিপেন্টদের ডামি ডেটা (লিডারবোর্ড জেনারেট করার জন্য)
const initialCandidates = [
  { id: "p1", name: "Asif Zubayer", email: "asif@gmail.com", aiScore: 96, judgeScore: 94, totalScore: 95, rank: 1, prize: "$500" },
  { id: "p2", name: "Sanim Rahman", email: "sanim@gmail.com", aiScore: 92, judgeScore: 90, totalScore: 91, rank: 2, prize: "$300" },
  { id: "p3", name: "Nusrat Jahan", email: "nusrat@gmail.com", aiScore: 88, judgeScore: 86, totalScore: 87, rank: 3, prize: "$150" },
  { id: "p4", name: "Fahim Ahmed", email: "fahim@gmail.com", aiScore: 85, judgeScore: 83, totalScore: 84, rank: 4, prize: "Consolation Toolkit" },
];

export default function PublishResultPage() {
  const router = useRouter();
  const [candidates, setCandidates] = useState(initialCandidates);
  const [isPublished, setIsPublished] = useState(false);
  const [isAnnounced, setIsAnnounced] = useState(false);

  // 📝 প্রাইজ বা র‍্যাংক কাস্টমাইজ করার হ্যান্ডলার (যদি অর্গানাইজার এডিট করতে চায়)
  const handlePrizeChange = (id: string, value: string) => {
    setCandidates(prev =>
      prev.map(cand => (cand.id === id ? { ...cand, prize: value } : cand))
    );
  };

  // 🚀 ১. পাবলিশ উইনার্স অ্যান্ড লিডারবোর্ড
  const handlePublish = () => {
    setIsPublished(true);
    Swal.fire({
      icon: "success",
      title: "Result Published! 🏆",
      text: "The official leaderboard is now live for all participants and judges.",
      customClass: { popup: "rounded-3xl" },
      confirmButtonColor: "#0f172a"
    });
  };

  // ✉️ ২. সেন্ড অ্যানাউন্সমেন্ট (ইমেইল/নোটিফিকেশন ব্লাস্ট)
  const handleAnnouncement = () => {
    if (!isPublished) {
      Swal.fire({
        icon: "warning",
        title: "Publish Result First",
        text: "You must publish the leaderboard before blast announcements.",
        customClass: { popup: "rounded-3xl" },
        confirmButtonColor: "#0f172a"
      });
      return;
    }
    setIsAnnounced(true);
    Swal.fire({
      icon: "success",
      title: "Announcements Blasted! 🚀",
      text: "Notification alerts and certificates have been dispatched to all participants.",
      customClass: { popup: "rounded-3xl" },
      confirmButtonColor: "#0f172a"
    });
  };

  // 📄 ৩. ডাউনলোড পিডিএফ রেজাল্ট (স্লিক ডামি জেনারেটর)
  const handleDownloadPDF = () => {
    Swal.fire({
      title: "Generating PDF...",
      html: "Assembling scoresheets and AI audit logs.",
      timer: 1500,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
      },
      customClass: { popup: "rounded-3xl" }
    }).then(() => {
      Swal.fire({
        icon: "success",
        title: "PDF Downloaded! 📄",
        text: "SkillArena_Contest_Final_Report.pdf is saved.",
        customClass: { popup: "rounded-3xl" },
        confirmButtonColor: "#0f172a"
      });
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 p-6 sm:p-10 font-sans">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* ব্যাক বাটন */}
        <button 
          onClick={() => router.back()} 
          className="flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-900 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" /> Back to Dashboard
        </button>

        {/* হেডার ও অ্যাকশন প্যানেল */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 pb-2">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <Trophy className="w-8 h-8 text-amber-500 drop-shadow-sm" /> Result & Leaderboard Desk
            </h1>
            <p className="text-slate-500 text-sm font-medium">Review combined AI/Judge evaluations, assign prizes, and freeze the final rankings.</p>
          </div>

          {/* ⚡ অ্যাকশন বাটন গ্রুপ */}
          <div className="flex flex-wrap gap-2.5 w-full lg:w-auto">
            <button 
              onClick={handleDownloadPDF}
              className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold flex items-center gap-2 text-sm shadow-sm transition"
            >
              <Download className="w-4 h-4" /> Download PDF
            </button>
            
            <button 
              onClick={handleAnnouncement}
              className={`px-4 py-2.5 rounded-xl font-semibold flex items-center gap-2 text-sm transition ${
                isAnnounced 
                  ? "bg-indigo-50 border border-indigo-200 text-indigo-700" 
                  : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 shadow-sm"
              }`}
            >
              <Megaphone className="w-4 h-4" /> {isAnnounced ? "Announcement Sent" : "Send Announcement"}
            </button>

            <button 
              onClick={handlePublish}
              disabled={isPublished}
              className={`px-5 py-2.5 rounded-xl font-semibold shadow-md transition flex items-center gap-2 text-sm text-white ${
                isPublished 
                  ? "bg-emerald-600 hover:bg-emerald-700 opacity-90 shadow-none" 
                  : "bg-slate-900 hover:bg-slate-800 shadow-slate-900/10"
              }`}
            >
              <CheckCircle2 className="w-4 h-4" /> {isPublished ? "Result Live & Active" : "Publish Winners"}
            </button>
          </div>
        </div>

        {/* 🚦 স্ট্যাটাস ব্যানার */}
        <div className={`p-4 rounded-2xl border flex items-center gap-3 transition-colors ${
          isPublished 
            ? "bg-emerald-50 border-emerald-200 text-emerald-800" 
            : "bg-amber-50 border-amber-200 text-amber-800"
        }`}>
          {isPublished ? <CheckCircle2 className="w-5 h-5 text-emerald-600" /> : <ShieldAlert className="w-5 h-5 text-amber-600" />}
          <div className="text-xs sm:text-sm font-semibold">
            {isPublished 
              ? "The result is currently LIVE. Participants can access their scores and positions on the public leaderboard leaderboard." 
              : "Draft Mode: This leaderboard is private. Review the details below before releasing it to the public arena."}
          </div>
        </div>

        {/* 🏆 হোয়াইট গ্লাস লিডারবোর্ড টেবিল */}
        <div className="bg-white/70 backdrop-blur-xl border border-slate-200/60 p-6 sm:p-8 rounded-3xl shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 text-sm font-semibold">
                  <th className="pb-4 text-center w-16">Rank</th>
                  <th className="pb-4">Contestant</th>
                  <th className="pb-4 text-center">AI Score</th>
                  <th className="pb-4 text-center">Judge Score</th>
                  <th className="pb-4 text-center">Final Score</th>
                  <th className="pb-4 text-right w-64">Prize Pool Allocation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm font-medium text-slate-700">
                {candidates.map((cand) => (
                  <tr key={cand.id} className="group hover:bg-slate-50/50 transition-colors">
                    
                    {/* র‍্যাংক মেডেল */}
                    <td className="py-4 text-center">
                      <div className="flex justify-center">
                        {cand.rank === 1 && <div className="w-8 h-8 rounded-full bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center font-bold shadow-sm"><Crown className="w-4 h-4" /></div>}
                        {cand.rank === 2 && <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 text-slate-600 flex items-center justify-center font-bold"><Medal className="w-4 h-4" /></div>}
                        {cand.rank === 3 && <div className="w-8 h-8 rounded-full bg-orange-50 border border-orange-100 text-orange-700 flex items-center justify-center font-bold"><Star className="w-4 h-4" /></div>}
                        {cand.rank > 3 && <span className="text-slate-400 font-bold">#{cand.rank}</span>}
                      </div>
                    </td>

                    {/* প্রতিযোগী */}
                    <td className="py-4">
                      <div>
                        <span className="font-semibold text-slate-900 block">{cand.name}</span>
                        <span className="text-xs text-slate-400 font-medium block">{cand.email}</span>
                      </div>
                    </td>

                    {/* এআই স্কোর */}
                    <td className="py-4 text-center text-slate-500 font-semibold">
                      {cand.aiScore}/100
                    </td>

                    {/* জাজ স্কোর */}
                    <td className="py-4 text-center text-slate-500 font-semibold">
                      {cand.judgeScore}/100
                    </td>

                    {/* ফাইনাল অ্যাগ্রিগেটেড স্কোর */}
                    <td className="py-4 text-center font-bold text-slate-900 text-base">
                      {cand.totalScore}/100
                    </td>

                    {/* 🎁 প্রাইজ ইনপুট ফিল্ড */}
                    <td className="py-4 text-right">
                      <input 
                        type="text" 
                        disabled={isPublished}
                        value={cand.prize} 
                        onChange={(e) => handlePrizeChange(cand.id, e.target.value)}
                        placeholder="Assign Reward"
                        className="w-48 px-3 py-1.5 rounded-lg bg-slate-50/80 border border-slate-200 text-xs font-semibold text-slate-800 focus:outline-none focus:bg-white focus:border-slate-900 text-right disabled:opacity-75 disabled:cursor-not-allowed"
                      />
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