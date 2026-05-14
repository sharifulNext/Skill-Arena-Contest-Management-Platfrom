"use client";

import Sidebar from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";

export default function DashboardGlobalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // bg-slate-50 দিয়ে পুরো স্ক্রিনকে চমৎকার লাইট মোড করা হলো
    <div className="min-h-screen bg-slate-50 text-slate-900 flex overflow-hidden">
      
      {/* বাম পাশের ডাইনামিক রোল-বেসড সাইডবার */}
      <Sidebar />

      {/* ডানপাশের মেইন কন্টেন্ট এরিয়া (সাইডবারের উইথ অনুযায়ী ২৫০পিক্সেল মার্জিন লেফট) */}
      <div className="flex-1 ml-[280px] flex flex-col min-h-screen overflow-hidden relative">
        
        {/* ড্যাশবোর্ডের নিজস্ব প্রফেশনাল টপবার (সার্চবার ও প্রোফাইল ড্রপডাউন সহ) */}
        <Topbar />

        {/* মেইন ড্যাশবোর্ড পেজের কন্টেন্ট এরিয়া */}
        <main className="flex-1 p-8 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-slate-100/40 via-slate-50 to-white overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}