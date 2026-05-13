"use client";

import { useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { FaTrophy, FaUsers, FaRegClock, FaCircleCheck } from "react-icons/fa6";
import { Button } from "@/components/ui/button";

export default function ContestDetails() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("overview");

  // এই ডেটা পরবর্তীতে API থেকে আসবে
  const contest = {
    title: "Global React Challenge 2026",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee",
    prize: "$1,500",
    participants: "1.2k",
    deadline: "June 15, 2026",
    description: "Build a production-ready dashboard using Next.js 15 and Tailwind CSS. Show your skills in state management and UI performance.",
    rules: [
      "Must use Next.js and Tailwind CSS.",
      "Repository must be public.",
      "AI-generated code is allowed but must be explained.",
      "Submission deadline is final."
    ]
  };

  return (
    <div className="min-h-screen pb-20">
      {/* 1. Hero Banner */}
      <div className="relative h-[300px] md:h-[400px] w-full rounded-[2.5rem] overflow-hidden mb-8">
        <Image 
          src={contest.image} 
          alt={contest.title} 
          fill 
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent flex items-end p-8 md:p-12">
          <div>
            <h1 className="text-3xl md:text-5xl font-black text-white mb-4 leading-tight">
              {contest.title}
            </h1>
            <div className="flex flex-wrap gap-4 text-white/90">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl">
                <FaTrophy className="text-amber-400" />
                <span className="font-bold">{contest.prize} Pool</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl">
                <FaUsers className="text-primary" />
                <span className="font-bold">{contest.participants} Joined</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left Column: Content */}
        <div className="lg:col-span-2">
          {/* Custom Tabs */}
          <div className="flex gap-8 border-b border-slate-100 dark:border-slate-800 mb-8">
            {["overview", "rules", "leaderboard"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 text-sm font-bold uppercase tracking-widest transition-all ${
                  activeTab === tab 
                  ? "border-b-2 border-primary text-primary" 
                  : "text-slate-400 hover:text-slate-600"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="prose dark:prose-invert max-w-none">
            {activeTab === "overview" && (
              <div className="animate-in fade-in duration-500">
                <h2 className="text-2xl font-bold mb-4 dark:text-white">About the Contest</h2>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  {contest.description}
                </p>
              </div>
            )}

            {activeTab === "rules" && (
              <div className="animate-in slide-in-from-bottom-4 duration-500">
                <h2 className="text-2xl font-bold mb-6 dark:text-white">Participation Rules</h2>
                <ul className="space-y-4">
                  {contest.rules.map((rule, index) => (
                    <li key={index} className="flex gap-3 items-start text-slate-600 dark:text-slate-400">
                      <FaCircleCheck className="text-primary mt-1 shrink-0" />
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Sticky Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-28 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-8 rounded-[2rem]">
            <h3 className="text-xl font-bold mb-6 dark:text-white">Join the Battle</h3>
            
            <div className="space-y-6 mb-8">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-500">Status</span>
                <span className="text-emerald-500 font-bold bg-emerald-500/10 px-2 py-1 rounded-md">Registration Open</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-500">Deadline</span>
                <span className="text-slate-900 dark:text-white font-bold">{contest.deadline}</span>
              </div>
            </div>

            <Button className="w-full py-7 rounded-2xl font-black text-lg shadow-xl shadow-primary/20 hover:scale-[1.02] transition-transform">
              REGISTER NOW
            </Button>
            
            <p className="text-[10px] text-center text-slate-400 mt-4 uppercase tracking-tighter">
              By joining, you agree to our Terms of Service
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}