"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";


import {
  LayoutDashboard,
  Trophy,
  FileText,
  BarChart3,
  User,
  Settings,
  PlusCircle,
  FolderLock,
  Gavel,
  Users,
  ShieldAlert,
} from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  
  
  const role = (session?.user as any)?.role || "PARTICIPANT";

  // ১. Participant Menu Configuration
  const participantMenu = [
    { title: "Dashboard", href: "/dashboard/participant", icon: LayoutDashboard },
    { title: "My Contests", href: "/dashboard/participant/contests", icon: Trophy },
    { title: "Submissions", href: "/dashboard/participant/submissions", icon: FileText },
    { title: "Leaderboard", href: "/dashboard/participant/leaderboard", icon: BarChart3 },
    { title: "Profile", href: "/dashboard/participant/profile", icon: User },
    { title: "Settings", href: "/dashboard/participant/settings", icon: Settings },
  ];

  // ২. Organizer Menu Configuration
  const organizerMenu = [
    { title: "Dashboard", href: "/dashboard/organizer", icon: LayoutDashboard },
    { title: "Create Contest", href: "/dashboard/organizer/create-contest", icon: PlusCircle },
    { title: "Manage Contests", href: "/dashboard/organizer/manage-contests", icon: FolderLock },
    { title: "Analytics", href: "/dashboard/organizer/analytics", icon: BarChart3 },
    { title: "Judges", href: "/dashboard/organizer/judges", icon: Gavel },
  ];

  // ৩. Admin Menu Configuration
  const adminMenu = [
    { title: "Dashboard", href: "/dashboard/admin", icon: LayoutDashboard },
    { title: "Users", href: "/dashboard/admin/users", icon: Users },
    { title: "All Contests", href: "/dashboard/admin/all-contests", icon: Trophy },
    { title: "Reports", href: "/dashboard/admin/reports", icon: ShieldAlert },
    { title: "Platform Settings", href: "/dashboard/admin/settings", icon: Settings },
  ];

 
  let menu = participantMenu;
  if (role === "ORGANIZER") menu = organizerMenu;
  if (role === "ADMIN") menu = adminMenu;

  return (
    <aside
      className="
        fixed
        left-0
        top-0
        z-50
        h-screen
        w-[280px]
        border-r
        border-slate-200/80
        bg-white
        p-5
        shadow-sm
        flex
        flex-col
        justify-between
      "
    >
      <div>
        {/* LOGO AREA */}
        <div className="mb-10">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="h-10 w-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-black transition-transform group-hover:scale-105">
              S
            </div>

            <div>
              <h1 className="text-lg font-black tracking-tight text-slate-900">SkillArena</h1>
              <p className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md mt-0.5 inline-block uppercase tracking-wider">
                {role} PANEL
              </p>
            </div>
          </Link>
        </div>

        {/* NAVIGATION LINKS */}
        <nav className="space-y-1.5">
          {menu.map((item) => {
         
            const active = pathname === item.href || pathname.startsWith(item.href + "/");

            return (
              <Link
                key={item.title}
                href={item.href}
                className={cn(
                  "relative flex items-center gap-3 overflow-hidden rounded-2xl px-4 py-3.5 text-sm font-semibold transition-all group",
                  active
                    ? "text-white"
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                )}
              >
                {/* Framer Motion Active Indicator Layer */}
                {active && (
                  <motion.div
                    layoutId="sidebar-active-indicator"
                    className="absolute inset-0 bg-slate-900 z-0 shadow-md shadow-slate-900/10"
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 30,
                    }}
                  />
                )}

                {/* Content layers kept at z-10 to stay visible above the background motion layer */}
                <item.icon className="relative z-10 h-5 w-5 shrink-0" />
                <span className="relative z-10">{item.title}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* FOOTER / USER BRIEF INFO (OPTIONAL) */}
      <div className="pt-4 border-t border-slate-100 text-center">
        <p className="text-[11px] text-slate-400 font-medium">SkillArena v1.0.0 © 2026</p>
      </div>
    </aside>
  );
}