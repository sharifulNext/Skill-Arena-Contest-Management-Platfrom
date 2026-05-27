"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Trophy, Users, Calendar, Clock, ShieldCheck, CreditCard, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface WinnerInfo {
  name: string;
  photo: string;
}

interface ContestData {
  _id: string;
  title: string;
  description: string;
  banner: string;
  category: string;
  difficulty: string;
  prize: string;
  entryFee: number;
  startDate: string;
  endDate: string;
  rules: string;
  participants: string[];
  winner?: WinnerInfo; // ঐচ্ছিক: উইনার ডিক্লেয়ার করার পর আসবে
  isRegistered: boolean; // ব্যাকএন্ড থেকে আসবে
  isEnded: boolean;      // ব্যাকএন্ড থেকে আসবে
}

export default function PrivateContestDetails() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;
  const { data: session, status: authStatus } = useSession();

  const [contest, setContest] = useState<ContestData | null>(null);
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState<string>("");

  // 🔐 সেশন সিকিউরিটি গার্ড (Authentication Guard)
  useEffect(() => {
    if (authStatus === "unauthenticated") {
      router.push(`/login?callbackUrl=/contest/${id}`);
    }
  }, [authStatus, id, router]);

  // 📡 ডাটা ফেচিং
  useEffect(() => {
    if (!id || authStatus !== "authenticated") return;

    const fetchContestDetails = async () => {
      try {
        const res = await fetch(`/api/contest/${id}`);
        const data = await res.json();
        if (data.success) {
          setContest(data.data);
        }
      } catch (err) {
        console.error("Error fetching private contest details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchContestDetails();
  }, [id, authStatus]);

  // ⏳ রিয়েল-টাইম কাউন্টডাউন টাইমার লজিক
  useEffect(() => {
    if (!contest || contest.isEnded) {
      setTimeLeft("Contest Ended");
      return;
    }

    const timer = setInterval(() => {
      const difference = +new Date(contest.endDate) - +new Date();
      
      if (difference <= 0) {
        setTimeLeft("Contest Ended");
        clearInterval(timer);
        // কন্টেস্ট শেষ হলে স্টেট আপডেট করে বাটন ডিজেবল করার জন্য
        setContest(prev => prev ? { ...prev, isEnded: true } : null);
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [contest]);

  if (authStatus === "loading" || loading) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center gap-3 bg-white">
        <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
        <p className="text-sm font-bold text-slate-500 tracking-wider">Securing Arena Access...</p>
      </div>
    );
  }

  if (!contest) return null;

  return (
    <div className="min-h-screen bg-slate-50/50 pb-24 pt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 🏆 উইনার ডিক্লেয়ারেশন সেকশন (যদি উইনার থাকে) */}
        {contest.winner && (
          <div className="mb-10 bg-gradient-to-r from-amber-500 via-yellow-500 to-orange-500 p-1 rounded-[2.5rem] shadow-xl animate-in fade-in slide-in-from-top-4 duration-500">
            <div className="bg-slate-900 rounded-[2.4rem] p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-5 text-center sm:text-left flex-col sm:flex-row">
                <div className="relative w-20 h-20 rounded-full overflow-hidden border-4 border-amber-400 shadow-md">
                  <Image src={contest.winner.photo || "/avatar-placeholder.png"} alt={contest.winner.name} fill className="object-cover" />
                </div>
                <div>
                  <span className="bg-amber-400 text-slate-950 text-[10px] font-black px-2.5 py-1 rounded-md uppercase tracking-wider">Contest Champion</span>
                  <h2 className="text-2xl font-black text-white mt-1.5">{contest.winner.name}</h2>
                  <p className="text-slate-400 text-xs sm:text-sm">Conquered the challenge and secured the grand prize!</p>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/10 text-center shrink-0 w-full sm:w-auto">
                <p className="text-amber-400 text-[10px] font-bold uppercase tracking-wider">Prize Disbursed</p>
                <p className="text-2xl font-black text-white">{contest.prize}</p>
              </div>
            </div>
          </div>
        )}

        {/* 🖼️ বিগ ব্যানার / হিরো এরিয়া */}
        <div className="relative h-[300px] sm:h-[400px] md:h-[480px] w-full rounded-[2.5rem] overflow-hidden mb-12 shadow-md">
          <Image src={contest.banner} alt={contest.title} fill priority className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent flex items-end p-6 sm:p-12">
            <div className="max-w-4xl">
              <span className="bg-blue-600 text-white font-black text-xs uppercase tracking-widest px-3.5 py-1.5 rounded-xl mb-4 inline-block">{contest.category}</span>
              <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-white mb-6 leading-tight tracking-tight">{contest.title}</h1>
              
              <div className="flex flex-wrap gap-4 text-white">
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10">
                  <Trophy className="text-amber-400 w-4 h-4" />
                  <span className="font-extrabold text-sm">{contest.prize}</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10">
                  <Users className="text-blue-400 w-4 h-4" />
                  <span className="font-extrabold text-sm">{contest.participants?.length || 0} Participants</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 📋 মেইন কন্টেন্ট গ্রিড */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12 items-start">
          
          {/* বাম পাশ: ফুল ডেসক্রিপশন এবং টাস্ক ডিটেইলস */}
          <div className="lg:col-span-2 space-y-8 bg-white border border-slate-200/60 p-6 sm:p-8 rounded-[2.5rem] shadow-xs">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-4">Contest Description & Tasks</h2>
              <p className="text-slate-600 leading-relaxed font-medium text-sm sm:text-base whitespace-pre-line">{contest.description}</p>
            </div>
            
            <div className="pt-6 border-t border-slate-100">
              <h3 className="text-lg font-black text-slate-900 mb-4">Submission Rules</h3>
              <p className="text-slate-600 leading-relaxed font-medium text-sm whitespace-pre-line bg-slate-50 p-5 rounded-2xl border border-slate-100">{contest.rules || "No extra rules mentioned."}</p>
            </div>
          </div>

          {/* ডান পাশ: লাইভ কাউন্টডাউন এবং পেমেন্ট অ্যাকশন বাটন */}
          <div className="lg:col-span-1 sticky top-28 space-y-6">
            
            {/* 🕒 লাইভ কাউন্টডাউন কার্ড */}
            <div className="bg-white border border-slate-200/80 p-6 sm:p-8 rounded-[2.5rem] shadow-sm text-center">
              <div className="flex items-center justify-center gap-2 text-slate-400 font-bold uppercase tracking-wider text-xs mb-3">
                <Clock className="w-4 h-4 text-blue-600 animate-pulse" /> Live Countdown
              </div>
              <h3 className={`text-2xl sm:text-3xl font-black tracking-tight ${contest.isEnded ? "text-rose-600" : "text-slate-900"}`}>
                {timeLeft}
              </h3>
            </div>

            {/* 💳 পেমেন্ট / রেজিস্ট্রেশন কার্ড */}
            <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-[2.5rem] shadow-xl border border-slate-800">
              <h3 className="text-lg font-black mb-6">Action Control</h3>
              
              <div className="flex justify-between items-center text-sm border-b border-slate-800 pb-4 mb-6">
                <span className="text-slate-400 font-medium">Registration Fee</span>
                <span className="text-amber-400 font-black text-base">${contest.entryFee}</span>
              </div>

              {/* 🔘 ডাইনামিক কন্ডিশনাল বাটন */}
              {contest.isEnded ? (
                // ১. কন্টেস্ট শেষ হয়ে গেলে বাটন ডিজেবল
                <Button className="w-full py-6 rounded-2xl font-black bg-rose-500/10 border border-rose-500/20 text-rose-500 cursor-not-allowed uppercase text-xs" disabled>
                  <AlertCircle className="w-4 h-4 mr-2" /> Contest Ended
                </Button>
              ) : contest.isRegistered ? (
                // ২. ইউজার যদি অলরেডি পেমেন্ট করে রেজিস্টার্ড থাকে
                <Button className="w-full py-6 rounded-2xl font-black bg-emerald-600 hover:bg-emerald-600 text-white uppercase text-xs tracking-wider shadow-md" disabled>
                  <CheckCircle className="w-4 h-4 mr-2" /> You are Registered
                </Button>
              ) : (
                // ৩. ইউজার এখনো রেজিস্টার্ড না হলে পেমেন্ট গেটওয়েতে পাঠানোর বাটন
                <Button 
                  onClick={() => router.push(`/checkout/${contest._id}`)}
                  className="w-full py-6 rounded-2xl font-black text-xs bg-blue-600 hover:bg-blue-500 text-white transition-all shadow-md tracking-wider uppercase"
                >
                  <CreditCard className="w-4 h-4 mr-2" /> Pay & Join Arena
                </Button>
              )}

              <div className="mt-6 flex items-center justify-center gap-2 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-blue-500" /> Secure Arena Transaction
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}