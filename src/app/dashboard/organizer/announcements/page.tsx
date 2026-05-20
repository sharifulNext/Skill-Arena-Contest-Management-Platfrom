"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  ArrowLeft, Megaphone, Send, Users, 
  Clock, Bell, LayoutGrid, CheckCircle2, 
  AlertTriangle, Trash2 
} from "lucide-react";
import Swal from "sweetalert2";

// 📋 ১. আগের অ্যানাউন্সমেন্টগুলোর ডামি হিস্ট্রি ডেটা
const initialAnnouncements = [
  {
    id: "a1",
    title: "Next.js Performance Speedrun Started! 🚀",
    message: "The arena is officially open. Clone the boilerplate code and make sure to deploy on Vercel before submitting.",
    audience: "All Participants",
    type: "Contest Started",
    createdAt: "2 Hours ago",
  },
  {
    id: "a2",
    title: "Urgent: 6 Hours Remaining for Code Submission ⏰",
    message: "Deadline reminder! Make sure your GitHub repositories are public and the environment variables are correctly configured.",
    audience: "Next.js Speedrun Cohort",
    type: "Deadline Reminder",
    createdAt: "Yesterday",
  },
];

export default function OrganizerAnnouncementsPage() {
  const router = useRouter();
  const [announcements, setAnnouncements] = useState(initialAnnouncements);
  
  // 📝 নতুন অ্যানাউন্সমেন্ট ফর্ম স্টেট
  const [formData, setFormData] = useState({
    title: "",
    message: "",
    audience: "All Participants",
    type: "Contest Started",
    contestId: "664f1234567890abcdef1234"
  });

  // 🚀 নতুন অ্যানাউন্সমেন্ট ব্লাস্ট হ্যান্ডলার
  const handleBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.message) return;

    const newNotification = {
      id: `a${announcements.length + 1}`,
      title: formData.title,
      message: formData.message,
      audience: formData.audience,
      type: formData.type,
      createdAt: "Just Now",
    };

    setAnnouncements([newNotification, ...announcements]);
    setFormData({ ...formData, title: "", message: "" });

    Swal.fire({
      icon: "success",
      title: "Notification Blasted! 📢",
      text: "Live update has been pushed and emails are dispatched to the target audience.",
      customClass: { popup: "rounded-3xl" },
      confirmButtonColor: "#0f172a"
    });
  };

  // 🗑️ অ্যানাউন্সমেন্ট ডিলিট হ্যান্ডলার
  const handleDelete = (id: string) => {
    setAnnouncements(announcements.filter(item => item.id !== id));
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

        {/* হেডার সেকশন */}
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Megaphone className="w-8 h-8 text-indigo-500 drop-shadow-sm" /> Announcement Broadcast
          </h1>
          <p className="text-slate-500 text-sm font-medium">Broadcast alerts, release live tracking states, or signal deadline extensions across tracks.</p>
        </div>

        {/* 🎛️ মেইন টু-কলাম লেআউট */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* 📬 বাম কলাম: নতুন অ্যানাউন্সমেন্ট ফর্ম (১ কলাম) */}
          <div className="bg-white/70 backdrop-blur-xl border border-slate-200/60 p-6 rounded-3xl shadow-sm h-fit space-y-4">
            <h3 className="text-base font-bold text-slate-800 flex items-center gap-2 border-b border-slate-100 pb-3">
              <Send className="w-4 h-4 text-slate-400" /> Dispatch Center
            </h3>

            <form onSubmit={handleBroadcast} className="space-y-4">
              {/* ১. নোটিশ ক্যাটাগরি */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600">Announcement Event Type</label>
                <select 
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold focus:outline-none focus:border-slate-900"
                >
                  <option value="Contest Started">Contest Started 🚀</option>
                  <option value="Deadline Reminder">Deadline Reminder ⏰</option>
                  <option value="Winner Published">Winner Published 🏆</option>
                  <option value="Maintenance Notice">Maintenance Notice ⚠️</option>
                </select>
              </div>

              {/* ২. টার্গেট অডিয়েন্স */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600">Target Audience Scope</label>
                <select 
                  value={formData.audience}
                  onChange={(e) => setFormData({ ...formData, audience: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold focus:outline-none focus:border-slate-900"
                >
                  <option value="All Participants">All Registered Participants</option>
                  <option value="Next.js Speedrun Cohort">Specific Contest Cohort Only</option>
                  <option value="Panel Judges">Panel Judges & Experts Only</option>
                </select>
              </div>

              {/* ৩. টাইটেল ইনপুট */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600">Broadcast Title</label>
                <input 
                  type="text" 
                  required 
                  placeholder="e.g. Winner Leaderboard is Live!" 
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium focus:outline-none focus:border-slate-900" 
                />
              </div>

              {/* ৪. মেসেজ বডি */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600">Detailed Message</label>
                <textarea 
                  rows={4} 
                  required 
                  placeholder="Write full specifications or update details..." 
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium focus:outline-none focus:border-slate-900 leading-relaxed" 
                />
              </div>

              {/* ব্লাস্ট সাবমিট বাটন */}
              <button 
                type="submit"
                className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold flex items-center justify-center gap-2 text-xs uppercase tracking-wider shadow-lg shadow-slate-900/10 transition"
              >
                <Megaphone className="w-4 h-4" /> Blast Broadcast Alert
              </button>
            </form>
          </div>

          {/* 📜 ডান কলাম: অ্যানাউন্সমেন্ট লিজেন্ড ও লাইভ হিস্ট্রি (২ কলাম) */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-base font-bold text-slate-800 flex items-center gap-2 px-1">
              <Clock className="w-4 h-4 text-slate-400" /> Transmitted Logs ({announcements.length})
            </h3>

            {announcements.length === 0 ? (
              <div className="bg-white/70 border border-slate-200/60 p-12 rounded-3xl text-center space-y-2">
                <Bell className="w-10 h-10 text-slate-300 mx-auto" />
                <h4 className="font-bold text-slate-700">No signals transmitted</h4>
                <p className="text-xs text-slate-400 max-w-xs mx-auto">Your broadcast station is quiet. Fire up a new notification alert from the dispatch panel.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {announcements.map((item) => (
                  <div key={item.id} className="bg-white/70 backdrop-blur-xl border border-slate-200/60 p-5 rounded-2xl shadow-sm flex flex-col sm:flex-row justify-between items-start gap-4 hover:border-slate-300 transition-all">
                    <div className="space-y-2 flex-grow">
                      
                      {/* টপ মেটা ডাটা লাইন */}
                      <div className="flex flex-wrap items-center gap-2">
                        {/* ইভেন্ট টাইপ ব্যাজ */}
                        <span className={`px-2 py-0.5 rounded-lg text-[10px] font-bold uppercase border ${
                          item.type.includes("Urgent") || item.type.includes("Deadline") || item.type.includes("Maintenance")
                            ? "bg-rose-50 border-rose-100 text-rose-700"
                            : "bg-indigo-50 border-indigo-100 text-indigo-700"
                        }`}>
                          {item.type}
                        </span>

                        {/* অডিয়েন্স স্কোপ */}
                        <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1">
                          <Users className="w-3 h-3" /> {item.audience}
                        </span>

                        {/* টাইমস্ট্যাম্প */}
                        <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1 sm:ml-2">
                          <Clock className="w-3 h-3" /> {item.createdAt}
                        </span>
                      </div>

                      {/* টাইটেল এবং ডেসক্রিপশন */}
                      <h4 className="font-bold text-slate-900 text-base">{item.title}</h4>
                      <p className="text-xs text-slate-500 font-medium leading-relaxed max-w-2xl">{item.message}</p>
                    </div>

                    {/* ডিলিট বাটন অ্যাকশন */}
                    <button 
                      onClick={() => handleDelete(item.id)}
                      className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-100 rounded-xl transition flex-shrink-0"
                      title="Remove Log"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}