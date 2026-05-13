"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils"; 
import { Menu, X, ChevronDown } from "lucide-react"; 

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Contests", href: "/contest" },
    { name: "Categories", href: "/categories" },
    { name: "Leaderboard", href: "/leaderboard" },
    { name: "Features", href: "/features" },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300 border-b",
        scrolled 
          ? "bg-white/80 backdrop-blur-md py-3 shadow-sm border-slate-200" 
          : "bg-transparent py-5 border-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        
        {/* Logo - Playfair Display for premium feel */}
        <Link href="/" className="group flex items-center gap-2">
          <div className="h-8 w-8 bg-black rounded-lg flex items-center justify-center transition-transform group-hover:rotate-12">
            <span className="text-white font-bold text-lg">S</span>
          </div>
          <span className="text-2xl font-heading font-bold tracking-tight text-slate-900">
            SkillArena
          </span>
        </Link>

        {/* Desktop Menu - Noto Sans */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-sans font-medium text-slate-600 hover:text-black transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 after:bg-black after:transition-all hover:after:w-full"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Auth Actions */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/login"
            className="text-sm font-semibold text-slate-700 hover:text-black px-4 py-2 transition-all"
          >
            Log in
          </Link>
          <Link
            href="/register"
            className="text-sm font-semibold bg-black text-white px-5 py-2.5 rounded-full hover:bg-slate-800 transition-all shadow-md hover:shadow-lg active:scale-95"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 text-slate-900 focus-visible:ring-2 ring-slate-400 rounded-md"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Slide-down */}
      <div
        className={cn(
          "absolute top-full left-0 w-full bg-white border-b shadow-xl md:hidden transition-all duration-300 overflow-hidden",
          isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="flex flex-col p-6 gap-4 font-sans">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-lg font-medium text-slate-800 border-b border-slate-50 pb-2"
            >
              {link.name}
            </Link>
          ))}
          <div className="flex flex-col gap-3 mt-4">
            <Link
              href="/login"
              className="w-full text-center py-3 border rounded-xl font-semibold"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="w-full text-center py-3 bg-black text-white rounded-xl font-semibold"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}