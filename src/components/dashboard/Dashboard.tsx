"use client";


import Sidebar from "./Sidebar";
import Topbar from "./Topbar";


export default function DashboardShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex">
      <Sidebar />

      <div className="flex-1 ml-[280px]">
        <Topbar />

        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}