"use client";

import Link from "next/link";
import { 
  FaGithub, 
  FaFacebook, 
  FaLinkedinIn, 
  FaXTwitter 
} from "react-icons/fa6"; // Modern Brand Icons
import { IoMailOutline } from "react-icons/io5"; // Clean Mail Icon

export default function Footer() {
  const socialLinks = [
    { 
      href: "https://github.com", 
      icon: <FaGithub size={20} />, 
      label: "GitHub" 
    },
    { 
      href: "#", 
      icon: <FaXTwitter size={20} />, 
      label: "Twitter" 
    },
    { 
      href: "#", 
      icon: <FaLinkedinIn size={20} />, 
      label: "LinkedIn" 
    },
    { 
      href: "#", 
      icon: <FaFacebook size={20} />, 
      label: "Facebook" 
    },
    { 
      href: "mailto:info@skillarena.com", 
      icon: <IoMailOutline size={22} />, 
      label: "Email" 
    },
  ];

  return (
    <footer className="bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-900 pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-1">
            <Link 
              href="/" 
              className="text-2xl font-black tracking-tighter text-slate-900 dark:text-white"
            >
              Skill<span className="text-primary">Arena</span>
            </Link>
            <p className="mt-4 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              The ultimate platform for competitive minds. Host, compete, and conquer with AI-powered insights.
            </p>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white mb-6 uppercase text-xs tracking-widest">
              Company
            </h4>
            <ul className="space-y-4 text-sm text-slate-500 dark:text-slate-400 font-medium">
              <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
              <li><Link href="/contests" className="hover:text-primary transition-colors">Explore Contests</Link></li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white mb-6 uppercase text-xs tracking-widest">
              Legal
            </h4>
            <ul className="space-y-4 text-sm text-slate-500 dark:text-slate-400 font-medium">
              <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Connect Section */}
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white mb-6 uppercase text-xs tracking-widest">
              Connect
            </h4>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((social, index) => (
                <Link 
                  key={index}
                  href={social.href} 
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-primary hover:bg-primary/10 transition-all duration-300 border border-transparent hover:border-primary/20"
                >
                  {social.icon}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-slate-100 dark:border-slate-900 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-400 font-medium">
            © 2026 SkillArena. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">System Online</span>
          </div>
        </div>
      </div>
    </footer>
  );
}