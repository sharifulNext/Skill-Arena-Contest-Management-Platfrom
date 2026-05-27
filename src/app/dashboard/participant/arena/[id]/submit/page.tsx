"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { 
  Trophy, Code2, Terminal, 
  CheckCircle2, AlertCircle, Loader2, ArrowLeft, Send
} from "lucide-react";
import Swal from "sweetalert2";

interface ContestDetail {
  _id: string;
  title: string;
  category: string;
  difficulty: string;
  prize: string;
  description?: string;
  rules?: string | string[];
  constraints?: string | string[];
}

export default function CodeSubmissionPage() {
  const params = useParams();
  const router = useRouter();
  const contestId = params.id as string;

  const [contest, setContest] = useState<ContestDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  
  const [repositoryUrl, setRepositoryUrl] = useState("");
  const [liveLink, setLiveLink] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    const fetchContestDetails = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/contest/${contestId}`);
        
        if (!res.ok) {
          throw new Error(`Server responded with status: ${res.status}`);
        }

        const payload = await res.json();
        if (payload.success) {
          setContest(payload.data);
        } else {
          throw new Error(payload.message || "Failed to parse ledger");
        }
      } catch (err: any) {
        console.error("🎯 Safe Fallback Triggered. Reason:", err);
        // Fallback static dataset for development consistency
        setContest({
          _id: contestId,
          title: "Production Sprint: Next.js Architecture Optimization",
          category: "Web Development",
          difficulty: "Advanced",
          prize: "$500 USD",
          description: "Optimize the core rendering engine of a containerized Next.js dynamic dashboard application. Reduce Time-to-First-Byte (TTFB) by 40% and ensure strict Type Safety under concurrent hydration nodes.",
          rules: [
            "Submissions must use Next.js App Router Structure.",
            "Strict TypeScript configuration required.",
            "No inline custom CSS styling layers allowed."
          ],
          constraints: [
            "Memory consumption ceiling limit: 512MB RAM.",
            "Max operation execution payload limit: 4000ms."
          ]
        });
      } finally {
        setLoading(false);
      }
    };

    if (contestId) fetchContestDetails();
  }, [contestId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!repositoryUrl) {
      Swal.fire({
        icon: "error",
        title: "Repository URL Required",
        text: "Please provide your GitHub or GitLab source code repository link.",
      });
      return;
    }

    try {
      setSubmitting(true);
      
      const res = await fetch(`/api/contest/${contestId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ repositoryUrl, liveLink, notes }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        await Swal.fire({
          icon: "success",
          title: "Code Deployed Successfully!",
          text: data.message || "Your repository pipeline points have been logged.",
          confirmButtonText: "Return to Dashboard",
          confirmButtonColor: "#4f46e5"
        });
        router.push("/dashboard/participant/contests");
      } else {
        throw new Error(data.message || "Submission reject execution.");
      }
    } catch (err: any) {
      console.error("Submission pipeline failure:", err);
      Swal.fire({
        icon: "error",
        title: "Submission Error",
        text: err.message || "Something went wrong while executing the code transfer protocol.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 gap-2">
        <Loader2 className="w-10 h-10 text-indigo-600 animate-spin" />
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Initializing Secure Arena...</p>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 md:p-10 space-y-8 bg-slate-50 min-h-screen">
      
      <button 
        onClick={() => router.push("/dashboard/participant/contests")}
        className="flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-900 transition bg-white px-3 py-1.5 rounded-xl border border-slate-200/80 shadow-sm"
      >
        <ArrowLeft className="w-4 h-4" /> Exit Arena Node
      </button>

      <div className="bg-white border border-slate-200/60 rounded-3xl p-6 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 uppercase tracking-wider bg-indigo-50 px-2.5 py-1 rounded-lg w-max">
            <Code2 className="w-3.5 h-3.5" /> Live Coding Arena
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            {contest?.title}
          </h1>
        </div>
        <div className="flex items-center gap-4 bg-slate-50 border border-slate-100 px-4 py-3 rounded-2xl w-full md:w-auto shrink-0 justify-between md:justify-start">
          <span className="text-xs font-bold text-slate-400">Prize Pool Valuation:</span>
          <span className="text-sm font-black text-slate-900 bg-white border px-3 py-1 rounded-xl shadow-sm tracking-tight flex items-center gap-1.5">
            <Trophy className="w-4 h-4 text-amber-500" /> {contest?.prize}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-slate-200/60 rounded-3xl p-6 shadow-sm space-y-6">
            
            <div className="space-y-3">
              <h2 className="text-sm font-black text-slate-900 flex items-center gap-2 uppercase tracking-wider text-slate-400">
                <Terminal className="w-4 h-4 text-slate-900" /> Problem Statement
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed font-medium">
                {contest?.description}
              </p>
            </div>

            <hr className="border-slate-100" />

            <div className="space-y-3">
              <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-indigo-600" /> Deployment Directives & Rules
              </h3>
              <ul className="space-y-2.5">
                {Array.isArray(contest?.rules) ? (
                  contest.rules.map((rule, idx) => (
                    <li key={idx} className="text-xs font-semibold text-slate-600 flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-1.5 shrink-0" /> {rule}
                    </li>
                  ))
                ) : contest?.rules ? (
                  String(contest.rules).split(/[,\n]/).map((rule: string, idx: number) => rule.trim() && (
                    <li key={idx} className="text-xs font-semibold text-slate-600 flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-1.5 shrink-0" /> {rule}
                    </li>
                  ))
                ) : (
                  <li className="text-xs text-slate-400">No specific rules provided for this arena.</li>
                )}
              </ul>
            </div>

            <hr className="border-slate-100" />

            <div className="space-y-3">
              <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-amber-500" /> Architecture Constraints
              </h3>
              <ul className="space-y-2.5">
                {Array.isArray(contest?.constraints) ? (
                  contest.constraints.map((constraint, idx) => (
                    <li key={idx} className="text-xs font-mono font-bold text-amber-700 bg-amber-50/50 border border-amber-200/40 px-3 py-1.5 rounded-xl flex items-center gap-2">
                      ⚡ {constraint}
                    </li>
                  ))
                ) : contest?.constraints ? (
                  String(contest.constraints).split(/[,\n]/).map((constraint: string, idx: number) => constraint.trim() && (
                    <li key={idx} className="text-xs font-mono font-bold text-amber-700 bg-amber-50/50 border border-amber-200/40 px-3 py-1.5 rounded-xl flex items-center gap-2">
                      ⚡ {constraint}
                    </li>
                  ))
                ) : (
                  <li className="text-xs font-mono text-slate-400">Standard platform runtime guardrails apply.</li>
                )}
              </ul>
            </div>

          </div>
        </div>

        <div className="bg-white border border-slate-200/60 rounded-3xl p-6 shadow-sm space-y-6">
          <div className="space-y-1">
            <h2 className="text-sm font-black text-slate-900 uppercase tracking-wider">Submission Payload</h2>
            <p className="text-slate-400 text-xs font-medium">Transmit repository links safely into evaluation pipelines.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 block">Source Code Repository URL *</label>
              <input 
                type="url" 
                required
                placeholder="https://github.com/username/project"
                value={repositoryUrl}
                onChange={(e) => setRepositoryUrl(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold focus:outline-none focus:border-slate-900 focus:bg-white transition"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 block">Live Deployment Link (Optional)</label>
              <input 
                type="url" 
                placeholder="https://project.vercel.app"
                value={liveLink}
                onChange={(e) => setLiveLink(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold focus:outline-none focus:border-slate-900 focus:bg-white transition"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 block">Engineering Notes / Deployment Instructions</label>
              <textarea 
                rows={4}
                placeholder="Detail architecture blueprints, environment setups, or special compiler parameters..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold focus:outline-none focus:border-slate-900 focus:bg-white transition resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 bg-slate-950 text-white rounded-xl font-bold text-xs hover:bg-indigo-600 transition flex items-center justify-center gap-2 shadow-sm disabled:bg-slate-400 disabled:cursor-not-allowed"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Executing Pipeline Transfer...
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" /> Fire Code Submission
                </>
              )}
            </button>
          </form>
        </div>
      </div>

    </div>
  );
}