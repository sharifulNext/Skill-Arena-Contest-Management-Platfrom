"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function DashboardShell({
  children,
}: {
  children: React.ReactNode;
}) {
  // সাইডবার টগলের জন্য স্টেট
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* মোবাইল মেনু টগলের জন্য সাইডবারেও এই স্টেটটি পাস করা লাগতে পারে */}
      <Sidebar />

      <div className="flex-1 ml-0 lg:ml-[280px] transition-all">
        {/* এখানে onMenuClick ফাংশনটি পাস করে দিলাম */}
        <Topbar onMenuClick={toggleSidebar} />

        <main className="p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}