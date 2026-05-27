"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Brain, ExternalLink, Loader2, ArrowLeft, Trophy, Edit3 } from "lucide-react";
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

  // 📡 ১. ডাটাবেজ থেকে রিয়েল-টাইম সাবমিশন ফেচ করা
  const fetchSubmissions = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/organizer/submissions");
      const data = await res.json();
      if (data.success) {
        setSubmissions(data.data);
      }
    } catch (err) {
      console.error("Error fetching submissions from database:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  // ✍️ ২. অর্গানাইজার ম্যানুয়াল রিভিউ হ্যান্ডলার (রিসোর্স লিংক সহ পপআপ)
  const handleReviewSubmission = async (sub: SubmissionData) => {
    Swal.fire({
      title: `Reviewing: ${sub.participantName || "Participant"}`,
      html: `
        <div style="text-align: left; font-family: sans-serif;" class="space-y-4">
          
          <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; padding: 14px; border-radius: 12px; margin-bottom: 20px;">
            <span style="display: block; font-size: 11px; font-weight: bold; color: #64748b; text-transform: uppercase; tracking-wider; margin-bottom: 8px;">Submitted Resources</span>
            
            <a href="${sub.repoUrl.startsWith("http") ? sub.repoUrl : `https://${sub.repoUrl}`}" 
               target="_blank" 
               style="display: inline-flex; items-center; gap: 4px; font-size: 13px; font-weight: 700; color: #2563eb; text-decoration: underline; margin-right: 20px;">
               🌐 Open GitHub Repository ↗
            </a>
            
            ${sub.liveUrl ? `
              <a href="${sub.liveUrl.startsWith("http") ? sub.liveUrl : `https://${sub.liveUrl}`}" 
                 target="_blank" 
                 style="display: inline-flex; items-center; gap: 4px; font-size: 13px; font-weight: 700; color: #059669; text-decoration: underline;">
                 🚀 Live Preview ↗
              </a>
            ` : ""}
          </div>

          <div>
            <label style="display: block; font-weight: bold; font-size: 13px; margin-bottom: 6px; color: #1e293b;">Assign Assessment Score (0-100)</label>
            <input id="swal-score" type="number" class="swal2-input" value="${sub.aiScore || 0}" min="0" max="100" style="margin: 0; width: 100%; border-radius: 10px; font-weight: 600;">
          </div>

          <div style="margin-top: 15px;">
            <label style="display: block; font-weight: bold; font-size: 13px; margin-bottom: 6px; color: #1e293b;">Final Verdict Status</label>
            <select id="swal-status" class="swal2-input" style="margin: 0; width: 100%; border-radius: 10px; font-weight: 500;">
              <option value="Pending" ${sub.status === "Pending" ? "selected" : ""}>⏳ Pending (Keep Reviewing)</option>
              <option value="Evaluated" ${sub.status === "Evaluated" ? "selected" : ""}>✅ Evaluated (Accept & Score)</option>
              <option value="Rejected" ${sub.status === "Rejected" ? "selected" : ""}>❌ Rejected (Disqualify)</option>
            </select>
          </div>
        </div>
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Submit Evaluation",
      confirmButtonColor: "#0f172a",
      cancelButtonColor: "#64748b",
      customClass: { popup: "rounded-3xl" },
      preConfirm: () => {
        const score = (document.getElementById("swal-score") as HTMLInputElement).value;
        const status = (document.getElementById("swal-status") as HTMLSelectElement).value;
        
        if (!score || Number(score) < 0 || Number(score) > 100) {
          Swal.showValidationMessage("Please enter a valid score between 0 and 100");
          return false;
        }
        return { aiScore: score, status: status };
      }
    }).then(async (result) => {
      if (result.isConfirmed && result.value) {
        try {
          // ডাটাবেজে রিয়েল-টাইম সেভ করার জন্য PATCH API কল
          const response = await fetch("/api/organizer/submissions", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              submissionId: sub._id,
              aiScore: result.value.aiScore,
              status: result.value.status,
              aiFeedback: `Manually audited and approved by the Organizer Panel.`
            })
          });

          const data = await response.json();
          if (!response.ok || !data.success) throw new Error(data.message || "Database state sync failed");

          Swal.fire({ 
            icon: "success", 
            title: "Review Saved Successfully!", 
            timer: 1500, 
            showConfirmButton: false, 
            customClass: { popup: "rounded-2xl" } 
          });
          
          fetchSubmissions(); // ডাটা আপডেট হওয়ার সাথে সাথে ফ্রন্টএন্ড গ্রিড রিফ্রেশ করা
        } catch (error: any) {
          Swal.fire({ 
            icon: "error", 
            title: "Error Saving Review", 
            text: error.message, 
            customClass: { popup: "rounded-2xl" } 
          });
        }
      }
    });
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
        <div className="pb-4">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <Trophy className="w-7 h-7 text-slate-400" /> Organizer Dashboard
            </h1>
            <p className="text-slate-500 text-sm font-medium">Click &quot;Review&quot; to inspect code resources and assign manual grades.</p>
          </div>
        </div>

        {/* 🤍 হোয়াইট গ্লাস-মরফিক ডেটা টেবিল কন্টেইনার */}
        <div className="bg-white/70 backdrop-blur-xl border border-slate-200/60 p-8 rounded-3xl shadow-sm">
          
          {submissions.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <Brain className="w-12 h-12 text-slate-400 mx-auto" />
              <h3 className="text-lg font-bold text-slate-700">No submissions found</h3>
              <p className="text-xs text-slate-400 max-w-xs mx-auto font-medium">As soon as participants submit their repository from the portal, it will instantly display here.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 text-slate-400 text-sm font-semibold">
                    <th className="pb-4">Participant</th>
                    <th className="pb-4">Resource Link</th>
                    <th className="pb-4 text-center">AI/Manual Score</th>
                    <th className="pb-4 text-center">Status</th>
                    <th className="pb-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm font-medium text-slate-700">
                  {submissions.map((sub) => (
                    <tr key={sub._id} className="group hover:bg-slate-50/50 transition-colors">
                      
                      {/* নাম ও প্রোফাইল অ্যাভাটার */}
                      <td className="py-4 flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center font-bold text-sm border border-slate-200 uppercase">
                          {sub.participantName ? sub.participantName[0] : "?"}
                        </div>
                        <div>
                          <span className="font-semibold text-slate-900 block">{sub.participantName || "Anonymous"}</span>
                          <span className="text-xs text-slate-400 font-medium block">{sub.participantEmail}</span>
                        </div>
                      </td>
                      
                      {/* রিসোর্স লিংক কলাম */}
                      <td className="py-4">
                        <div className="flex flex-col gap-1">
                          <a 
                            href={sub.repoUrl.startsWith("http") ? sub.repoUrl : `https://${sub.repoUrl}`} 
                            target="_blank" 
                            rel="noreferrer" 
                            className="text-xs text-slate-600 hover:text-slate-900 hover:underline flex items-center gap-1 transition-colors w-max"
                          >
                            GitHub Repo <ExternalLink className="w-3 h-3 text-slate-400" />
                          </a>
                          {sub.liveUrl && (
                            <a 
                              href={sub.liveUrl.startsWith("http") ? sub.liveUrl : `https://${sub.liveUrl}`} 
                              target="_blank" 
                              rel="noreferrer" 
                              className="text-xs text-indigo-600 hover:text-indigo-800 hover:underline flex items-center gap-1 transition-colors w-max"
                            >
                              Live Preview <ExternalLink className="w-3 h-3 text-indigo-400" />
                            </a>
                          )}
                        </div>
                      </td>

                      {/* স্কোর কলাম */}
                      <td className="py-4 text-center">
                        <span className={`text-base font-bold ${sub.status === "Pending" ? "text-slate-400" : "text-slate-900"}`}>
                          {sub.status === "Pending" ? "Processing" : `${sub.aiScore}/100`}
                        </span>
                      </td>

                      {/* ডায়নামিক স্ট্যাটাস ব্যাজ কালার */}
                      <td className="py-4 text-center">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-semibold border ${
                          sub.status === "Evaluated" 
                            ? "bg-emerald-50 border-emerald-200 text-emerald-700" 
                            : sub.status === "Pending"
                              ? "bg-amber-50 border-amber-200 text-amber-700 animate-pulse"
                              : "bg-rose-50 border-rose-200 text-rose-700"
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${
                            sub.status === "Evaluated" 
                              ? "bg-emerald-500" 
                              : sub.status === "Pending" 
                                ? "bg-amber-500" 
                                : "bg-rose-500"
                          }`} />
                          {sub.status}
                        </span>
                      </td>

                      {/* 🛠️ অ্যাকশন রিভিউ বাটন */}
                      <td className="py-4 text-right">
                        <button
                          onClick={() => handleReviewSubmission(sub)}
                          className="px-3 py-1.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition flex items-center gap-1 ml-auto shadow-sm shadow-slate-900/10"
                        >
                          <Edit3 className="w-3.5 h-3.5" /> Review
                        </button>
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