"use client";

import { useState } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";

export default function DashboardGlobalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex overflow-hidden relative w-full">
      
      
      {isSidebarOpen && (
        <div 
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-slate-900/30 backdrop-blur-sm lg:hidden transition-opacity"
        />
      )}

      
      <Sidebar isOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

    
      <div className="flex-1 lg:ml-[280px] w-full flex flex-col min-h-screen overflow-hidden relative">
      
        <Topbar onMenuClick={() => setIsSidebarOpen(true)} />

 
        <main className="flex-1 p-4 md:p-8 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-slate-100/40 via-slate-50 to-white overflow-y-auto w-full">
          {children}
        </main>
      </div>
    </div>
  );
}