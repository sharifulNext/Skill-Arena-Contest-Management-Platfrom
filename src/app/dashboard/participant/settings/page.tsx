"use client";

import { useState } from "react";
import { 
  User, ShieldCheck, Bell, Paintbrush, Save, 
  Monitor, Key, Smartphone, Laptop, LogOut 
} from "lucide-react";
import Swal from "sweetalert2";

export default function ParticipantSettings() {
  // 📑 একটিভ সাব-সেকশন ট্যাব স্টেট
  const [activeTab, setActiveTab] = useState<"account" | "appearance" | "notifications" | "security">("account");

  // 📋 গ্লোবাল সেটিংস এবং টগল স্টেট
  const [profile, setProfile] = useState({
    name: "Shariful Islam",
    email: "shariful@devarena.com",
    darkMode: false,
    themeColor: "indigo",
    alertContests: true,
    alertEmails: true,
    alertLeaderboard: false,
    twoFactor: false
  });

  const handleToggle = (key: keyof typeof profile) => {
    setProfile(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSaveSettings = () => {
    Swal.fire({
      icon: "success",
      title: "Preferences Synchronized",
      text: "Your profile updates and communication webhooks have been updated.",
      confirmButtonColor: "#0f172a",
      customClass: { popup: "rounded-3xl" }
    });
  };

  return (
    <div className="p-4 sm:p-6 md:p-10 space-y-8 bg-slate-50 min-h-screen">
      
      {/* 👑 হেডার ট্র্যাকার */}
      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
          <Monitor className="w-7 h-7 sm:w-8 h-8 text-indigo-600 shrink-0" /> Settings & Preferences
        </h1>
        <p className="text-slate-500 text-xs sm:text-sm font-medium pl-1">
          Modify identity blueprints, configure notification routing engines, and manage authenticated active sessions.
        </p>
      </div>

      {/* 💻 কোর সেটিংস ইন্টারফেস গ্রিড */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        
        {/* 📑 বাম পাশের মিনিমাল ট্যাব লিস্ট */}
        <div className="bg-white/80 backdrop-blur-md border border-slate-200/60 p-3 rounded-2xl shadow-sm space-y-1 lg:col-span-1">
          {[
            { id: "account", name: "Account Details", icon: User },
            { id: "appearance", name: "Appearance UI", icon: Paintbrush },
            { id: "notifications", name: "Alert Routes", icon: Bell },
            { id: "security", name: "Security & 2FA", icon: ShieldCheck },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all text-left ${
                  activeTab === tab.id
                    ? "bg-slate-900 text-white shadow-sm"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{tab.name}</span>
              </button>
            );
          })}
        </div>

        {/* 📝 ডান পাশের ডাইনামিক সাব-সেকশন প্যানেল */}
        <div className="bg-white border border-slate-200/70 p-6 md:p-8 rounded-3xl shadow-sm lg:col-span-3 space-y-6">
          
          {/* 1️⃣ ACCOUNT SETTNGS SECTION */}
          {activeTab === "account" && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="text-base font-bold text-slate-900">Identity Configurations</h3>
                <p className="text-xs text-slate-400 font-medium">Update your profile parameters used across active leaderboard matrices.</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500">Full Handle Name</label>
                  <input 
                    type="text" 
                    value={profile.name} 
                    onChange={(e) => setProfile({...profile, name: e.target.value})}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 font-semibold focus:outline-none focus:border-slate-900" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500">Communication Email Address</label>
                  <input 
                    type="email" 
                    value={profile.email} 
                    disabled
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-100 border border-slate-200 font-semibold text-slate-400 cursor-not-allowed focus:outline-none" 
                  />
                </div>
              </div>
            </div>
          )}

          {/* 2️⃣ APPEARANCE SECTION */}
          {activeTab === "appearance" && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="text-base font-bold text-slate-900">Ecosystem Themes</h3>
                <p className="text-xs text-slate-400 font-medium">Customize the layout presentation mechanics for your compilation feed.</p>
              </div>
              
              <div className="space-y-5">
                {/* ডার্ক মোড টগল */}
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100/80 text-xs">
                  <div className="space-y-0.5">
                    <span className="font-bold text-slate-800 block">Enable Dark Ideology</span>
                    <span className="text-[11px] text-slate-400 font-medium block">Switch platform components into a low-light dark interface layout.</span>
                  </div>
                  <input 
                    type="checkbox" 
                    checked={profile.darkMode} 
                    onChange={() => handleToggle("darkMode")}
                    className="w-4 h-4 rounded cursor-pointer accent-slate-900" 
                  />
                </div>

                {/* থিম কালার সিলেকশন */}
                <div className="space-y-3 text-xs">
                  <label className="font-bold text-slate-500 block">Theme Palette Focus</label>
                  <div className="flex items-center gap-3">
                    {["indigo", "emerald", "rose", "violet"].map((color) => (
                      <button
                        key={color}
                        onClick={() => setProfile({...profile, themeColor: color})}
                        className={`w-8 h-8 rounded-xl border-2 uppercase text-[9px] font-black tracking-tight flex items-center justify-center transition-all ${
                          profile.themeColor === color ? "border-slate-900 scale-105 shadow-sm" : "border-transparent opacity-70"
                        } ${
                          color === "indigo" ? "bg-indigo-600 text-white" : color === "emerald" ? "bg-emerald-600 text-white" : color === "rose" ? "bg-rose-600 text-white" : "bg-violet-600 text-white"
                        }`}
                      >
                        {profile.themeColor === color && "✓"}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 3️⃣ NOTIFICATION SETTINGS SECTION (Toggle switches) */}
          {activeTab === "notifications" && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="text-base font-bold text-slate-900">Notification Channels</h3>
                <p className="text-xs text-slate-400 font-medium">Control which automated triggers broadcast alerts to your external ports.</p>
              </div>
              
              <div className="space-y-4 text-xs">
                {/* ১. কনটেস্ট অ্যালার্ট */}
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <div>
                    <span className="font-bold text-slate-800 block">Contest Alerts</span>
                    <span className="text-[11px] text-slate-400 font-medium block">Get notified instantly when new high-pool sprint arenas launch.</span>
                  </div>
                  <input type="checkbox" checked={profile.alertContests} onChange={() => handleToggle("alertContests")} className="w-4 h-4 cursor-pointer accent-slate-900" />
                </div>

                {/* ২. ইমেইল নোটিফিকেশন */}
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <div>
                    <span className="font-bold text-slate-800 block">Email Notifications</span>
                    <span className="text-[11px] text-slate-400 font-medium block">Receive daily telemetry digests and automated repository score sheets.</span>
                  </div>
                  <input type="checkbox" checked={profile.alertEmails} onChange={() => handleToggle("alertEmails")} className="w-4 h-4 cursor-pointer accent-slate-900" />
                </div>

                {/* ৩. লিডারবোর্ড আপডেট */}
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <div>
                    <span className="font-bold text-slate-800 block">Leaderboard Position Swaps</span>
                    <span className="text-[11px] text-slate-400 font-medium block">Alert me immediately if another user overtakes my rank position index.</span>
                  </div>
                  <input type="checkbox" checked={profile.alertLeaderboard} onChange={() => handleToggle("alertLeaderboard")} className="w-4 h-4 cursor-pointer accent-slate-900" />
                </div>
              </div>
            </div>
          )}

          {/* 4️⃣ SECURITY SECTION (Change password, 2FA, Active sessions) */}
          {activeTab === "security" && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="text-base font-bold text-slate-900">Cryptographic Security Protocols</h3>
                <p className="text-xs text-slate-400 font-medium">Calibrate password authentication protocols and invalidate concurrent device sessions.</p>
              </div>

              {/* পাসওয়ার্ড সেকশন */}
              <div className="space-y-3 bg-slate-50/50 p-4 rounded-2xl border border-slate-100/80 text-xs">
                <h4 className="font-bold text-slate-800 flex items-center gap-1.5"><Key className="w-4 h-4 text-slate-500" /> Change Session Credentials</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                  <input type="password" placeholder="Current Token Password" className="px-4 py-2 rounded-xl bg-white border border-slate-200 font-semibold focus:outline-none focus:border-slate-900" />
                  <input type="password" placeholder="New Secret Password" className="px-4 py-2 rounded-xl bg-white border border-slate-200 font-semibold focus:outline-none focus:border-slate-900" />
                </div>
              </div>

              {/* 2FA টগল */}
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100/80 text-xs">
                <div className="space-y-0.5">
                  <span className="font-bold text-slate-800 block">Two-Factor Authentication (2FA)</span>
                  <span className="text-[11px] text-slate-400 font-medium block">Enforce dynamic TOTP app code requirements during core submission push streams.</span>
                </div>
                <input type="checkbox" checked={profile.twoFactor} onChange={() => handleToggle("twoFactor")} className="w-4 h-4 cursor-pointer accent-slate-900" />
              </div>

              {/* একটিভ সেশন ট্র্যাকার */}
              <div className="space-y-3 text-xs">
                <label className="font-bold text-slate-400 uppercase tracking-wider block">Active Hardware Sessions</label>
                <div className="divide-y divide-slate-100 border border-slate-100 rounded-2xl overflow-hidden bg-slate-50/40">
                  
                  <div className="flex items-center justify-between p-3.5">
                    <div className="flex items-center gap-3">
                      <Laptop className="w-4 h-4 text-indigo-600" />
                      <div>
                        <span className="font-bold text-slate-800 block">MacBook Pro • Apple Silicon</span>
                        <span className="text-[10px] text-slate-400 font-medium block">Dhaka, Bangladesh • <span className="text-emerald-600 font-bold">Current Instance</span></span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3.5">
                    <div className="flex items-center gap-3">
                      <Smartphone className="w-4 h-4 text-slate-400" />
                      <div>
                        <span className="font-bold text-slate-700 block">Google Pixel 8 Pro</span>
                        <span className="text-[10px] text-slate-400 font-medium block">Sylhet, Bangladesh • 2 hours ago</span>
                      </div>
                    </div>
                    <button className="text-[11px] font-bold text-rose-600 hover:bg-rose-50 px-2.5 py-1 rounded-lg border border-transparent hover:border-rose-100 transition flex items-center gap-1">
                      <LogOut className="w-3 h-3" /> Revoke
                    </button>
                  </div>

                </div>
              </div>
            </div>
          )}

          {/* 💾 বটম গ্লোবাল সাবমিট বাটন */}
          <div className="pt-6 border-t border-slate-100 flex justify-end">
            <button
              onClick={handleSaveSettings}
              className="w-full sm:w-auto px-6 py-3 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-slate-800 transition shadow-sm flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4" /> Sync Preferences
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}