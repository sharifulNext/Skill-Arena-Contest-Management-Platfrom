"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Menu, X, ChevronDown, LayoutDashboard, User, Settings, LogOut } from "lucide-react";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mounted, setMounted] = useState(false); 

  useEffect(() => {
    setMounted(true); 
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Contests", href: "/contest" },
    { name: "About", href: "/about" },
    { name: "Leaderboard", href: "/leaderboard" },
  ];

  
  const isScrolled = mounted ? scrolled : false;

  return (
    <nav
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300 border-b",
        isScrolled
          ? "bg-white/90 backdrop-blur-md py-3 shadow-sm border-slate-200"
          : "bg-transparent py-5 border-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        
        {/* LOGO */}
        <Link href="/" className="group flex items-center gap-2">
          <div className="h-9 w-9 bg-black rounded-xl flex items-center justify-center transition-transform group-hover:rotate-12 shadow-lg shadow-black/10">
            <span className="text-white font-bold text-xl">S</span>
          </div>
          <span className="text-2xl font-bold tracking-tight text-slate-900">
            SkillArena
          </span>
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-semibold text-slate-600 hover:text-black transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* AUTH SECTION */}
        <div className="hidden md:flex items-center gap-4">
          {!mounted ? (
        
            <div className="h-10 w-24" /> 
          ) : !session ? (
            <>
              <Link href="/login" className="text-sm font-bold text-slate-700 hover:text-black px-4 py-2 transition">
                Log in
              </Link>
              <Link href="/register" className="text-sm font-bold bg-black text-white px-6 py-2.5 rounded-full hover:bg-slate-800 transition shadow-md active:scale-95">
                Get Started
              </Link>
            </>
          ) : (
            /* ADVANCED DROPDOWN */
            <div className="relative">
              <button 
                onClick={() => setDropdownOpen(!dropdownOpen)}
                onBlur={() => setTimeout(() => setDropdownOpen(false), 200)}
                className="flex items-center gap-2 p-1 pr-3 bg-slate-50 border border-slate-200 rounded-full hover:bg-slate-100 transition-all shadow-sm"
              >
                <div className="h-8 w-8 relative rounded-full overflow-hidden bg-primary flex items-center justify-center text-white font-bold">
                  {session.user?.image ? (
                    <Image src={session.user.image} alt="User" fill className="object-cover" />
                  ) : (
                    <span className="text-xs">{session.user?.name?.charAt(0).toUpperCase()}</span>
                  )}
                </div>
                <span className="text-sm font-bold text-slate-700">{session.user?.name?.split(" ")[0]}</span>
                <ChevronDown size={14} className={cn("transition-transform", dropdownOpen && "rotate-180")} />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-3 w-56 bg-white border border-slate-100 rounded-2xl shadow-2xl py-2 animate-in fade-in zoom-in duration-200">
                  <div className="px-4 py-2 border-b border-slate-50 mb-1">
                     <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Account</p>
                     <p className="text-sm font-bold text-slate-800 truncate">{session.user?.email}</p>
                  </div>

                  <Link href="/dashboard" className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-black">
                    <LayoutDashboard size={18} /> Dashboard
                  </Link>
                  <Link href="/profile" className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-black">
                    <User size={18} /> My Profile
                  </Link>
                  <Link href="/settings" className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-black">
                    <Settings size={18} /> Settings
                  </Link>

                  <div className="h-px bg-slate-100 my-1 mx-2" />

                  <button 
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="flex w-full items-center gap-3 px-4 py-2.5 text-sm font-bold text-red-500 hover:bg-red-50 transition-colors"
                  >
                    <LogOut size={18} /> Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* MOBILE TOGGLE */}
        <button className="md:hidden p-2 text-slate-900" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      <div className={cn("absolute top-full left-0 w-full bg-white border-b shadow-2xl md:hidden transition-all duration-300 overflow-hidden", isOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0")}>
        <div className="flex flex-col p-6 gap-3 font-sans">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href} onClick={() => setIsOpen(false)} className="text-lg font-bold text-slate-800 border-b border-slate-50 pb-2 hover:text-primary transition-colors">
              {link.name}
            </Link>
          ))}

          {mounted && (
            !session ? (
              <div className="flex flex-col gap-3 mt-4">
                <Link href="/login" onClick={() => setIsOpen(false)} className="w-full text-center py-3 border border-slate-200 rounded-xl font-bold">Login</Link>
                <Link href="/register" onClick={() => setIsOpen(false)} className="w-full text-center py-3 bg-black text-white rounded-xl font-bold">Get Started</Link>
              </div>
            ) : (
              <div className="flex flex-col gap-3 mt-4">
                <Link href="/dashboard" onClick={() => setIsOpen(false)} className="flex items-center justify-center gap-2 w-full py-3 bg-slate-100 rounded-xl font-bold">
                  <LayoutDashboard size={20}/> Dashboard
                </Link>
                <button onClick={() => signOut({ callbackUrl: "/" })} className="w-full py-3 bg-red-500 text-white rounded-xl font-bold">Logout</button>
              </div>
            )
          )}
        </div>
      </div>
    </nav>
  );
}