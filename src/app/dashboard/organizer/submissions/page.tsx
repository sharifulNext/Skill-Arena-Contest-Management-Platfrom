"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Brain, ExternalLink, Loader2, ArrowLeft, RefreshCw, Send, Terminal, Trophy } from "lucide-react";
import Swal from "sweetalert2";

interface SubmissionData {
  _id: string;
  participantName: string;
  participantEmail: string;
  repoUrl: string;
  liveUrl?: string;
  aiScore: number;
  status: string;
  createdAt: string;
}

export default function OrganizerSubmissionsPage() {
  const router = useRouter();
  const [submissions, setSubmissions] = useState<SubmissionData[]>([]);
  const [loading, setLoading] = useState(true);
  const [triggerLoading, setTriggerLoading] = useState(false);

  // 📡 ডাটা ফেচিং ফাংশন
  const fetchSubmissions = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/organizer/submissions");
      const data = await res.json();
      if (data.success) setSubmissions(data.data);
    } catch (err) {
      console.error("Error fetching submissions:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  // 🧪 ডামি ডেটা পুশ করে টেস্ট করার ফাংশন
  const handleTestSubmit = async () => {
    try {
      setTriggerLoading(true);
      
      const dummyNames = ["Arif Alom", "Tamim Iqbal", "Nusrat Jahan", "Fahim Ahmed"];
      const randomName = dummyNames[Math.floor(Math.random() * dummyNames.length)];

      const res = await fetch("/api/organizer/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          participantName: randomName,
          participantEmail: `${randomName.toLowerCase().replace(" ", "")}@gmail.com`,
          repoUrl: `https://github.com/${randomName.toLowerCase().replace(" ", "")}/arena-solution`,
          liveUrl: "https://skillarena-demo.vercel.app"
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      Swal.fire({
        icon: "success",
        title: "Submission Injected! 🎉",
        text: `Successfully added mock submission for ${randomName}`,
        customClass: { popup: "rounded-3xl" },
        confirmButtonColor: "#0f172a"
      });

      fetchSubmissions(); 
    } catch (error: any) {
      Swal.fire({ icon: "error", title: "Injection Failed", text: error.message, customClass: { popup: "rounded-3xl" } });
    } finally {
      setTriggerLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-10 h-10 text-slate-900 animate-spin" />
        <p className="text-xs font-bold text-slate-500 tracking-widest uppercase animate-pulse">Syncing Submission Core...</p>
      </div>
    );
  }

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
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-4">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <Trophy className="w-7 h-7 text-slate-400" /> Organizer Submissions
            </h1>
            <p className="text-slate-500 text-sm font-medium">Global view of all participant uploads and automated AI grading status.</p>
          </div>

          {/* 🧪 ইনজেক্ট বাটন (ক্লেভার স্লিক ডিজাইন) */}
          <button 
            onClick={handleTestSubmit}
            disabled={triggerLoading}
            className="px-5 py-3 rounded-xl bg-slate-900 text-white font-semibold shadow-lg shadow-slate-900/10 hover:bg-slate-800 transition flex items-center gap-2 disabled:opacity-50 text-sm"
          >
            {triggerLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            Inject Test Data
          </button>
        </div>

        {/* 🤍 হোয়াইট গ্লাস-মরফিক ডেটা টেবিল কন্টেইনার */}
        <div className="bg-white/70 backdrop-blur-xl border border-slate-200/60 p-8 rounded-3xl shadow-sm">
          
          {submissions.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <Brain className="w-12 h-12 text-slate-400 mx-auto" />
              <h3 className="text-lg font-bold text-slate-700">No submissions found</h3>
              <p className="text-xs text-slate-400 max-w-xs mx-auto font-medium">Click &quot;Inject Test Data&quot; to test the Mongoose connection dynamically.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 text-slate-400 text-sm font-semibold">
                    <th className="pb-4">Participant</th>
                    <th className="pb-4">Resource Link</th>
                    <th className="pb-4 text-center">AI Audit Score</th>
                    <th className="pb-4 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm font-medium text-slate-700">
                  {submissions.map((sub) => (
                    <tr key={sub._id} className="group hover:bg-slate-50/50 transition-colors">
                      {/* নাম ও প্রোফাইল */}
                      <td className="py-4 flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center font-bold text-sm border border-slate-200">
                          {sub.participantName[0]}
                        </div>
                        <div>
                          <span className="font-semibold text-slate-900 block">{sub.participantName}</span>
                          <span className="text-xs text-slate-400 font-medium block">{sub.participantEmail}</span>
                        </div>
                      </td>
                      
                      {/* রিপোজিটরি লিংক */}
                      <td className="py-4">
                        <div className="flex flex-col gap-1">
                          <a href={sub.repoUrl} target="_blank" rel="noreferrer" className="text-xs text-slate-600 hover:text-slate-900 hover:underline flex items-center gap-1 transition-colors w-max">
                            GitHub Repo <ExternalLink className="w-3 h-3 text-slate-400" />
                          </a>
                          {sub.liveUrl && (
                            <a href={sub.liveUrl} target="_blank" rel="noreferrer" className="text-xs text-indigo-600 hover:text-indigo-800 hover:underline flex items-center gap-1 transition-colors w-max">
                              Live Preview <ExternalLink className="w-3 h-3 text-indigo-400" />
                            </a>
                          )}
                        </div>
                      </td>

                      {/* এআই স্কোর */}
                      <td className="py-4 text-center">
                        <span className="text-base font-bold text-slate-900">
                          {sub.aiScore}/100
                        </span>
                      </td>

                      {/* স্ট্যাটাস ব্যাজ */}
                      <td className="py-4 text-right">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-semibold border ${
                          sub.aiScore >= 85 
                            ? "bg-emerald-50 border-emerald-200 text-emerald-700" 
                            : "bg-blue-50 border-blue-200 text-blue-700"
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${sub.aiScore >= 85 ? "bg-emerald-500" : "bg-blue-500"}`} />
                          {sub.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}