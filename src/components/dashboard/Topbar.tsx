"use client";

import { Menu } from "lucide-react"; // 👈 লুসিড মেনু আইকন

interface TopbarProps {
  onMenuClick: () => void;
}

export default function Topbar({ onMenuClick }: TopbarProps) {
  return (
    <header className="h-16 border-b border-slate-200/80 bg-white/80 backdrop-blur-md flex items-center justify-between px-4 md:px-6 sticky top-0 z-30 w-full">
      
      <div className="flex items-center gap-3">
        <button 
          onClick={onMenuClick}
          className="p-2 -ml-2 text-slate-700 hover:bg-slate-100 rounded-xl lg:hidden transition"
          title="Open Menu"
        >
          <Menu className="w-6 h-6" />
        </button>
        <span className="text-base md:text-lg font-black tracking-tight text-slate-900">
          Dashboard
        </span>
      </div>


      <div className="flex items-center gap-3">
        {/* আপনার বর্তমান কোডের থিম টগল, নোটিফিকেশন আইকন এবং ইউজার ইমেজ এখানে রাখুন */}
        {/* উদাহরণ: */}
        <div className="h-9 w-9 rounded-full bg-slate-200 border border-slate-300 animate-pulse" />
      </div>

    </header>
  );
}