"use client";

import { useState } from "react";
import { 
  ShieldAlert, AlertTriangle, Eye, CheckCircle, 
  Ban, ShieldX, Search, Filter, ExternalLink, Calendar 
} from "lucide-react";
import Swal from "sweetalert2";

// 📋 ডামি ইনবাউন্ড রিপোর্টস ডাটাবেজ
const initialReports = [
  { id: "r1", reporter: "Tamim Iqbal", targetUser: "Fahim Shahriar", type: "Plagiarism", contest: "NextJS Production Sprint", description: "Submitted exact source code cloned from a public GitHub repository without modifications.", evidence: "https://github.com/evidence-link-1", date: "19 May, 2026", status: "PENDING" },
  { id: "r2", reporter: "Nigar Sultana", targetUser: "Siam Hossain", type: "Cheating", contest: "AI Automated Agent Blitz", description: "Using hardcoded response logic instead of real LLM API outputs to bypass the benchmark.", evidence: "https://pastebin.com/evidence-2", date: "18 May, 2026", status: "PENDING" },
  { id: "r3", reporter: "Arif Khan", targetUser: "SpammyBot99", type: "Spam", contest: "Legacy React Optimization", description: "Flooding the submission timeline with 50+ empty pull requests within 5 minutes.", evidence: "#", date: "15 May, 2026", status: "RESOLVED" },
  { id: "r4", reporter: "Zayan Ahmed", targetUser: "AbuseUser_1", type: "Abusive Content", contest: "Web3 Solis Speedrun", description: "Attacking other participants with highly offensive and derogatory slurs inside the public discussion channel.", evidence: "https://screenshot.io/evidence-4", date: "14 May, 2026", status: "PENDING" },
  { id: "r5", reporter: "Mitu Akter", targetUser: "Dev_Anik", type: "Fake Submission", contest: "Scraping Bot Architecture", description: "Uploaded a corrupted ZIP archive containing empty dummy text files instead of actual codebase.", evidence: "#", date: "12 May, 2026", status: "PENDING" },
];

export default function AdminReportsSystem() {
  const [reports, setReports] = useState(initialReports);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("ALL");

  // 📝 ১. রিপোর্টের ফুল ডিসক্রিপশন দেখার মডাল
  const handleViewDetails = (description: string, evidence: string) => {
    Swal.fire({
      title: "Incident Telemetry 🔍",
      html: `
        <div class="text-left space-y-4 text-xs md:text-sm font-medium text-slate-600">
          <p class="bg-slate-50 p-4 rounded-2xl border border-slate-100 leading-relaxed">${description}</p>
          ${evidence !== "#" ? `<a href="${evidence}" target="_blank" class="text-indigo-600 hover:underline font-bold flex items-center gap-2 mt-3">View Technical Evidence Source ↗</a>` : `<p class="text-slate-400 italic mt-2">No external evidence attached.</p>`}
        </div>
      `,
      confirmButtonText: "Close Audit Log",
      confirmButtonColor: "#0f172a",
      customClass: { popup: "rounded-3xl max-w-lg" }
    });
  };

  // 🟢 ২. একশন: ডিসমিস/ক্লিয়ার রিপোর্ট
  const handleDismissReport = (id: string) => {
    setReports(reports.map(r => r.id === id ? { ...r, status: "RESOLVED" } : r));
    Swal.fire({
      icon: "success",
      title: "Report Dismissed",
      text: "The incident hash has been archived as harmless.",
      confirmButtonColor: "#0f172a",
      customClass: { popup: "rounded-3xl" }
    });
  };

  // 🟡 ৩. একশন: ওয়ার্নিং ইস্যু করা
  const handleIssueWarning = (id: string, targetUser: string) => {
    setReports(reports.map(r => r.id === id ? { ...r, status: "RESOLVED" } : r));
    Swal.fire({
      icon: "info",
      title: "Warning Dispatched ⚠️",
      text: `An official compliance warning flag has been pushed to ${targetUser}'s profile.`,
      confirmButtonColor: "#0f172a",
      customClass: { popup: "rounded-3xl" }
    });
  };

  // 🔴 ৪. একশন: একাউন্ট সাসপেন্ড/ব্যান করা
  const handleSuspendUser = (id: string, targetUser: string) => {
    Swal.fire({
      title: "Enforce Cluster Ban?",
      text: `Are you sure you want to isolate and ban "${targetUser}" based on audited evidence?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e11d48",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Yes, Block Account",
      customClass: { popup: "rounded-3xl" }
    }).then((result) => {
      if (result.isConfirmed) {
        setReports(reports.map(r => r.id === id ? { ...r, status: "SUSPENDED" } : r));
        Swal.fire({
          title: "Account Restricted!",
          text: "User profile status shifted to BANNED.",
          icon: "success",
          confirmButtonColor: "#0f172a",
          customClass: { popup: "rounded-3xl" }
        });
      }
    });
  };

  // 🔍 ফিল্টারিং অ্যান্ড সার্চ ইনজেকশন
  const filteredReports = reports.filter(r => {
    const matchesSearch = r.targetUser.toLowerCase().includes(search.toLowerCase()) || r.reporter.toLowerCase().includes(search.toLowerCase()) || r.contest.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = typeFilter === "ALL" || r.type === typeFilter || (typeFilter === "PENDING" && r.status === "PENDING");
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="p-4 sm:p-6 md:p-10 space-y-8 bg-slate-50 min-h-screen">
      
      {/* 👑 হেডার সেকশন */}
      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
          <ShieldAlert className="w-7 h-7 sm:w-8 h-8 text-rose-600 shrink-0" /> Resolution Center
        </h1>
        <p className="text-slate-500 text-xs sm:text-sm font-medium pl-1">Investigate plagiarism footprints, counter active cheating logs, and moderate ecosystem guidelines.</p>
      </div>

      {/* 🎛️ কন্ট্রোল ফিল্টার বার */}
      <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center bg-white/70 backdrop-blur-xl border border-slate-200/60 p-4 rounded-2xl shadow-sm">
        {/* সার্চ বার */}
        <div className="relative w-full sm:max-w-xs">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input 
            type="text" 
            placeholder="Search target, reporter or arena..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold focus:outline-none focus:border-slate-900"
          />
        </div>

        {/* টাইপ ফিল্টার ড্রপডাউন */}
        <div className="w-full sm:w-auto">
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="w-full sm:w-auto px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-600 focus:outline-none focus:border-slate-900 cursor-pointer"
          >
            <option value="ALL">All Incidents Types</option>
            <option value="PENDING">Active Review Stream</option>
            <option value="Cheating">Cheating</option>
            <option value="Plagiarism">Plagiarism</option>
            <option value="Fake Submission">Fake Submission</option>
            <option value="Abusive Content">Abusive Content</option>
            <option value="Spam">Spam</option>
          </select>
        </div>
      </div>

      {/* 📱 ১. মোবাইল ভিউ: রেসপনসিভ রিপোর্ট কার্ড লেআউট */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:hidden">
        {filteredReports.length === 0 ? (
          <div className="p-8 text-center bg-white rounded-2xl text-xs font-semibold text-slate-400 col-span-full">
            🎉 Integrity verified. Core reporting pipeline contains zero active triggers.
          </div>
        ) : (
          filteredReports.map((report) => (
            <div key={report.id} className="bg-white border border-slate-200/70 p-5 rounded-2xl shadow-sm space-y-4 relative">
              
              <div className="flex justify-between items-start gap-3">
                <div className="space-y-2">
                  <span className={`px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-wider border ${
                    report.type === "Cheating" || report.type === "Plagiarism" ? "bg-rose-50 text-rose-700 border-rose-100" :
                    report.type === "Abusive Content" ? "bg-amber-50 text-amber-700 border-amber-100" :
                    "bg-slate-100 text-slate-600 border-slate-200"
                  }`}>
                    {report.type}
                  </span>
                  <h4 className="font-bold text-slate-900 text-sm pt-1">Target: <span className="text-rose-600 ml-1">{report.targetUser}</span></h4>
                </div>
                
                <span className={`px-2 py-0.5 rounded-lg text-[10px] font-bold ${report.status === "PENDING" ? "bg-amber-50 text-amber-600 border border-amber-100 animate-pulse" : "bg-slate-100 text-slate-400"}`}>
                  {report.status}
                </span>
              </div>

              <div className="text-xs space-y-2 bg-slate-50 p-4 rounded-xl border border-slate-100/50 font-medium">
                <p className="text-slate-400 text-[11px]">Flagged inside: <span className="text-slate-700 font-bold ml-1">{report.contest}</span></p>
                <p className="text-slate-400 text-[11px]">Filed by: <span className="text-slate-600 font-bold ml-1">{report.reporter}</span></p>
                <p className="text-slate-400 text-[11px] flex items-center gap-1.5 pt-1"><Calendar className="w-3.5 h-3.5" /> {report.date}</p>
              </div>

              {/* অ্যাকশন বাটন প্যানেল */}
              <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
                <button 
                  onClick={() => handleViewDetails(report.description, report.evidence)}
                  className="flex-1 py-2 bg-slate-100 text-slate-700 rounded-xl text-xs font-bold hover:bg-slate-200 transition flex items-center justify-center gap-1.5"
                >
                  <Eye className="w-4 h-4" /> Inspect
                </button>

                {report.status === "PENDING" && (
                  <div className="flex items-center gap-1.5">
                    <button onClick={() => handleDismissReport(report.id)} className="p-2 bg-emerald-50 text-emerald-600 rounded-xl border border-emerald-100 hover:bg-emerald-600 hover:text-white transition" title="Dismiss"><CheckCircle className="w-4 h-4" /></button>
                    <button onClick={() => handleIssueWarning(report.id, report.targetUser)} className="p-2 bg-amber-50 text-amber-600 rounded-xl border border-amber-100 hover:bg-amber-500 hover:text-white transition" title="Issue Warning"><AlertTriangle className="w-4 h-4" /></button>
                    <button onClick={() => handleSuspendUser(report.id, report.targetUser)} className="p-2 bg-rose-50 text-rose-600 rounded-xl border border-rose-100 hover:bg-rose-600 hover:text-white transition" title="Restrict Access"><Ban className="w-4 h-4" /></button>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* 🖥️ ২. ডেস্কটপ ভিউ: ফুল রেসপনসিভ ডাটা গ্রিড টেবিল */}
      <div className="hidden lg:block bg-white/70 backdrop-blur-xl border border-slate-200/60 rounded-3xl overflow-hidden shadow-sm p-3">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 text-xs font-bold uppercase tracking-wider">
                <th className="p-4">Accused Target</th>
                <th className="p-4">Violation / Incident Type</th>
                <th className="p-4">Source Arena Origin</th>
                <th className="p-4">Filed Timestamp</th>
                <th className="p-4 text-right">Review Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs font-medium text-slate-700">
              {filteredReports.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-10 text-center text-slate-400 font-semibold">
                    🎉 Integrity verified. Core reporting pipeline contains zero active triggers.
                  </td>
                </tr>
              ) : (
                filteredReports.map((report) => (
                  <tr key={report.id} className="hover:bg-slate-50/50 transition-colors group">
                    {/* ১. টার্গেট ইউজার + রিপোর্টার */}
                    <td className="p-4">
                      <span className="font-bold text-slate-900 text-sm block mb-1">{report.targetUser}</span>
                      <span className="text-slate-400 font-medium text-[11px]">Filed by: {report.reporter}</span>
                    </td>

                    {/* ২. রিপোর্ট টাইপ ক্যাটাগরি */}
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider border ${
                        report.type === "Cheating" || report.type === "Plagiarism" ? "bg-rose-50 border-rose-100 text-rose-700" :
                        report.type === "Abusive Content" ? "bg-amber-50 border-amber-100 text-amber-700" :
                        "bg-slate-100 border-slate-200 text-slate-600"
                      }`}>
                        {report.type}
                      </span>
                    </td>

                    {/* ৩. কন্টেস্টের নাম */}
                    <td className="p-4 font-bold text-slate-800">
                      {report.contest}
                    </td>

                    {/* ৪. ডেট + স্ট্যাটাস */}
                    <td className="p-4">
                      <span className="text-slate-400 font-semibold block mb-1">{report.date}</span>
                      <span className={`text-[10px] font-bold uppercase tracking-wide ${report.status === "PENDING" ? "text-amber-500" : "text-slate-400"}`}>
                        • {report.status}
                      </span>
                    </td>

                    {/* ৫. একশন হ্যান্ডলার প্যানেল */}
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {/* ইন্সপেক্ট বাটন */}
                        <button
                          onClick={() => handleViewDetails(report.description, report.evidence)}
                          className="p-2 bg-slate-50 text-slate-600 border border-slate-200 rounded-xl hover:bg-slate-900 hover:text-white hover:border-transparent transition shadow-sm"
                          title="Inspect Evidence Payload"
                        >
                          <Eye className="w-4 h-4" />
                        </button>

                        {report.status === "PENDING" && (
                          <>
                            <button
                              onClick={() => handleDismissReport(report.id)}
                              className="p-2 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-xl hover:bg-emerald-500 hover:text-white transition shadow-sm"
                              title="Dismiss & Archive"
                            >
                              <CheckCircle className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleIssueWarning(report.id, report.targetUser)}
                              className="p-2 bg-amber-50 text-amber-600 border border-amber-100 rounded-xl hover:bg-amber-500 hover:text-white transition shadow-sm"
                              title="Issue Offense Warning"
                            >
                              <AlertTriangle className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleSuspendUser(report.id, report.targetUser)}
                              className="p-2 bg-rose-50 text-rose-600 border border-rose-100 rounded-xl hover:bg-rose-600 hover:text-white transition shadow-sm"
                              title="Restrict Cluster / Enforce Ban"
                            >
                              <Ban className="w-4 h-4" />
                            </button>
                          </>
                        )}
                      </div>
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