"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { Search, Bell, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function Topbar() {
  const { data: session } = useSession();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

 
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header
      className="
        sticky
        top-0
        z-30
        h-20
        flex
        items-center
        justify-between
        px-8
        bg-white/60
        dark:bg-slate-950/40
        backdrop-blur-xl
        border-b
        border-slate-200/50
        dark:border-slate-800/40
        transition-colors
        duration-300
      "
    >
     
      <div className="relative w-72 md:w-96 group hidden sm:block">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-slate-900 dark:group-focus-within:text-white transition-colors" />
        <input
          type="text"
          placeholder="Search contests, users, or results..."
          className="w-full bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-2xl py-2.5 pl-12 pr-4 outline-none focus:border-slate-300 dark:focus:border-slate-700 focus:ring-4 focus:ring-slate-100 dark:focus:ring-slate-900 transition-all text-sm"
        />
      </div>

      <div className="sm:hidden">
        <h2 className="text-lg font-black tracking-tight">Dashboard</h2>
      </div>

  
      <div className="flex items-center gap-4">
        
      
        {mounted && (
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-900 border border-transparent hover:border-slate-200 dark:hover:border-slate-800 transition-all text-slate-500 hover:text-slate-900 dark:hover:text-white"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        )}

 
        <div className="relative p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-900 border border-transparent hover:border-slate-200 dark:hover:border-slate-800 transition-all text-slate-500 hover:text-slate-900 dark:hover:text-white cursor-pointer group">
          <Bell size={18} />
       
          <span className="absolute top-2.5 right-3 w-2 h-2 bg-blue-500 rounded-full ring-2 ring-white dark:ring-slate-950 group-hover:scale-110 transition-transform"></span>
        </div>

     
        <div className="flex items-center gap-3 pl-4 border-l border-slate-200 dark:border-slate-800">
          <div className="text-right hidden md:block">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white leading-tight">
              {session?.user?.name || "Anonymous"}
            </h4>
            <p className="text-[10px] font-extrabold text-blue-500 dark:text-blue-400 uppercase tracking-widest mt-0.5">
              {(session?.user as any)?.role || "PARTICIPANT"}
            </p>
          </div>

        
          <div className="w-10 h-10 rounded-xl overflow-hidden relative border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 shrink-0">
            <Image
              src={session?.user?.image || "https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=mail"}
              alt="Profile"
              width={40}  
              height={40} 
              className="object-cover"
              priority 
            />
          </div>
        </div>

      </div>
    </header>
  );
}