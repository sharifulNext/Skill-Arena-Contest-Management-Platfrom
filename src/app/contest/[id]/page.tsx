"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { FaTrophy, FaUsers, FaCircleCheck, FaArrowLeft } from "react-icons/fa6";
import { Loader2, AlertCircle, Calendar, ShieldCheck, Share2, BarChart, Coins } from "lucide-react";
import { Button } from "@/components/ui/button";

// 🚀 ১. ডাটাবেজ রেসপন্স অনুযায়ী পারফেক্ট টাইপ ইন্টারফেস
interface ContestData {
  _id: string;
  title: string;
  description: string;
  banner: string; 
  category: string;
  difficulty: string;
  prize: string;
  entryFee: number; // 👈 ডাটাবেজে নাম্বার হিসেবে আছে
  startDate: string;
  endDate: string;
  rules: string; 
  status: string;
  participants: string[]; 
}

export default function PublicContestDetails() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const [activeTab, setActiveTab] = useState("overview");
  const [contest, setContest] = useState<ContestData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 📡 ২. এপিআই থেকে ডেটা ফেচিং
  useEffect(() => {
    if (!id) return;

    const fetchPublicContest = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/contest/${id}`);
        
        if (!res.ok) {
          throw new Error("Failed to fetch contest information.");
        }

        const data = await res.json();

        if (data.success) {
          setContest(data.data);
        } else {
          throw new Error(data.error || "Contest data not found");
        }
      } catch (err: any) {
        console.error("Public Fetch Error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPublicContest();
  }, [id]);

  // ⏳ লোডিং স্টেট
  if (loading) {
    return (
      <div className="min-h-[80vh] w-full flex flex-col items-center justify-center gap-4 bg-white">
        <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
        <p className="text-sm font-bold text-slate-500 animate-pulse tracking-wider">
          Loading Arena Details...
        </p>
      </div>
    );
  }

  // ❌ এরর স্টেট
  if (error || !contest) {
    return (
      <div className="min-h-[70vh] w-full flex flex-col items-center justify-center text-center p-6 bg-white">
        <div className="p-4 bg-rose-50 text-rose-500 rounded-2xl mb-4">
          <AlertCircle className="w-10 h-10" />
        </div>
        <h3 className="text-2xl font-black text-slate-900">Contest Not Found</h3>
        <p className="text-slate-500 text-sm max-w-sm mt-2 mb-6">{error || "The battle you are looking for does not exist."}</p>
        <Button onClick={() => router.push("/")} className="rounded-xl font-bold bg-slate-900 text-white">
          Back to Home
        </Button>
      </div>
    );
  }

  // ডেট ফরম্যাটিং
  const formattedDeadline = contest.endDate 
    ? new Date(contest.endDate).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
    : "TBD";

  return (
    <div className="min-h-screen bg-slate-50/50 pb-24 pt-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ব্যাক লিংক এবং শেয়ার বাটন */}
        <div className="flex items-center justify-between mb-6">
          <button 
            onClick={() => router.back()} 
            className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors group"
          >
            <FaArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Explore All Contests
          </button>

          <button 
            onClick={() => navigator.clipboard.writeText(window.location.href).then(() => alert("Link copied! 🔗"))}
            className="flex items-center gap-2 text-xs font-bold text-slate-600 bg-white border border-slate-200/80 px-4 py-2 rounded-xl shadow-sm hover:bg-slate-50 transition"
          >
            <Share2 className="w-3.5 h-3.5" /> Share
          </button>
        </div>

        {/* 🖼️ ১. হিরো সেকশন */}
        <div className="relative h-[280px] sm:h-[380px] md:h-[460px] w-full rounded-[2.5rem] overflow-hidden mb-12 shadow-md border border-slate-100">
          <Image 
            src={contest.banner || "https://images.unsplash.com/photo-1633356122544-f134324a6cee"} 
            alt={contest.title} 
            fill 
            priority 
            className="object-cover"
            unoptimized={contest.banner?.startsWith("data:")}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent flex items-end p-6 sm:p-10 md:p-16">
            <div className="max-w-4xl">
              <span className="inline-block bg-blue-600 text-white font-extrabold text-xs uppercase tracking-widest px-3.5 py-1.5 rounded-xl mb-4 shadow-sm">
                {contest.category || "General"}
              </span>
              
              <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-white mb-6 leading-tight tracking-tight">
                {contest.title}
              </h1>
              
              <div className="flex flex-wrap gap-3.5 text-white">
                <div className="flex items-center gap-2.5 bg-white/10 backdrop-blur-md border border-white/10 px-5 py-2.5 rounded-2xl">
                  <FaTrophy className="text-amber-400 w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="font-black text-sm sm:text-base">{contest.prize}</span>
                </div>
                <div className="flex items-center gap-2.5 bg-white/10 backdrop-blur-md border border-white/10 px-5 py-2.5 rounded-2xl">
                  <FaUsers className="text-blue-400 w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="font-black text-sm sm:text-base">
                    {contest.participants?.length || 0} Joined
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 🏢 ২. গ্রিড স্ট্রাকচার */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12 items-start">
          
          {/* বাম কলাম: কন্টেন্ট ট্যাব */}
          <div className="lg:col-span-2 bg-white border border-slate-200/60 p-6 sm:p-8 rounded-[2.5rem] shadow-sm">
            <div className="flex gap-6 sm:gap-8 border-b border-slate-100 mb-8 overflow-x-auto scrollbar-none">
              {["overview", "rules", "rewards"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-4 text-xs sm:text-sm font-black uppercase tracking-widest transition-all border-b-2 whitespace-nowrap ${
                    activeTab === tab 
                      ? "border-blue-600 text-blue-600" 
                      : "border-transparent text-slate-400 hover:text-slate-600"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="min-h-[250px]">
              {activeTab === "overview" && (
                <div className="animate-in fade-in duration-300">
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-4">About The Challenge</h2>
                  <p className="text-slate-600 leading-relaxed text-sm sm:text-base font-medium whitespace-pre-line">
                    {contest.description}
                  </p>
                </div>
              )}

              {activeTab === "rules" && (
                <div className="animate-in fade-in duration-300">
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-6">Execution & Guidelines</h2>
                  <ul className="space-y-4">
                    {contest.rules ? (
                      contest.rules.split("\n").map((rule, index) => (
                        rule.trim() && (
                          <li key={index} className="flex gap-3.5 items-start text-slate-600 text-sm sm:text-base font-medium">
                            <FaCircleCheck className="text-blue-600 mt-1 shrink-0 w-4 h-4 sm:w-5 sm:h-5" />
                            <span>{rule.trim()}</span>
                          </li>
                        )
                      ))
                    ) : (
                      <p className="text-sm text-slate-400 font-semibold">No general regulations declared.</p>
                    )}
                  </ul>
                </div>
              )}

              {activeTab === "rewards" && (
                <div className="animate-in fade-in duration-300 space-y-4">
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-4">Winner Perks</h2>
                  <div className="p-5 bg-amber-50/60 border border-amber-100 rounded-2xl flex items-start gap-4">
                    <FaTrophy className="text-amber-500 w-6 h-6 shrink-0 mt-1" />
                    <div>
                      <h4 className="font-extrabold text-slate-900 text-base">Grand Prize Allocation</h4>
                      <p className="text-xs sm:text-sm text-slate-600 mt-0.5">The winners will secure: <strong className="text-slate-900 font-bold">{contest.prize}</strong>.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* 👉 ডান কলাম: অ্যাকশন ও কুইক সাইড ইনফো (এন্ট্রি ফি সহ আপডেট করা হয়েছে) */}
          <div className="lg:col-span-1 sticky top-28">
            <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-[2.5rem] shadow-xl shadow-slate-900/10 border border-slate-800">
              <h3 className="text-lg sm:text-xl font-black mb-6">Enter The Arena</h3>
              
              <div className="space-y-4 border-b border-slate-800 pb-6 mb-6">
                {/* 🚀 নতুন যুক্ত করা হয়েছে: Registration Fee */}
                <div className="flex justify-between items-center text-xs sm:text-sm">
                  <span className="text-slate-400 font-medium flex items-center gap-1.5">
                    <Coins className="w-4 h-4 text-slate-400" /> Entry Fee
                  </span>
                  {!contest.entryFee || contest.entryFee === 0 ? (
                    <span className="text-emerald-400 font-black bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-xl text-xs uppercase tracking-wider">
                      Free Entry
                    </span>
                  ) : (
                    <span className="text-amber-400 font-black bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-xl text-xs">
                      ${contest.entryFee} 
                    </span>
                  )}
                </div>

                <div className="flex justify-between items-center text-xs sm:text-sm">
                  <span className="text-slate-400 font-medium flex items-center gap-1.5">
                    <BarChart className="w-4 h-4 text-slate-400" /> Difficulty
                  </span>
                  <span className="text-blue-400 font-extrabold bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-xl text-xs">
                    {contest.difficulty || "All Levels"}
                  </span>
                </div>
                
                <div className="flex justify-between items-center text-xs sm:text-sm">
                  <span className="text-slate-400 font-medium flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-slate-400" /> Deadline
                  </span>
                  <span className="text-white font-extrabold">{formattedDeadline}</span>
                </div>
              </div>

              {/* অ্যাকশন বাটন (ডাইনামিক টেক্সট সহ) */}
              <Button 
                onClick={() => router.push(`/dashboard/participant/contests/${id}`)}
                className="w-full py-6 sm:py-7 rounded-2xl font-black text-sm bg-blue-600 hover:bg-blue-500 text-white transition-all shadow-md active:scale-[0.99] tracking-wider uppercase"
              >
                {!contest.entryFee || contest.entryFee === 0 ? "Join For Free" : "Pay & Join Arena"}
              </Button>
              
              <div className="mt-6 flex items-center justify-center gap-2 text-[11px] text-slate-400 font-medium uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-blue-500" /> SkillArena Verified Challenge
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}