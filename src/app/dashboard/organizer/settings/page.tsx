"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  ArrowLeft, Settings, User, Lock, 
  Globe, Building2, Bell, Save, ShieldCheck 
} from "lucide-react";
import Swal from "sweetalert2";

export default function OrganizerSettingsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("profile");

  // 📝 সেটিংস স্টেট (ডামি ডাটা)
  const [profile, setProfile] = useState({ name: "Arif Alom", email: "arif@skillarena.com", role: "Super Organizer" });
  const [password, setPassword] = useState({ current: "", new: "", confirm: "" });
  const [socials, setSocials] = useState({ website: "https://skillarena.com", github: "https://github.com/arifalom", linkedin: "" });
  const [org, setOrg] = useState({ name: "SkillArena HQ", bio: "Empowering developers through high-octane technical hackathons and automated AI assessments.", founded: "2026" });
  const [notifications, setNotifications] = useState({ emails: true, submissions: true, marketing: false });

  // 💾 সেভ হ্যান্ডলার
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    
    Swal.fire({
      icon: "success",
      title: "Settings Updated! ⚙️",
      text: "Your preferences and configuration configurations have been locked in.",
      customClass: { popup: "rounded-3xl" },
      confirmButtonColor: "#0f172a"
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 p-6 sm:p-10 font-sans">
      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* ব্যাক বাটন */}
        <button 
          onClick={() => router.back()} 
          className="flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-900 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" /> Back to Dashboard
        </button>

        {/* হেডার সেকশন */}
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Settings className="w-8 h-8 text-slate-400" /> Control Center
          </h1>
          <p className="text-slate-500 text-sm font-medium">Fine-tune your organizer profile, sync webhook endpoints, and manage organization security blueprints.</p>
        </div>

        {/* 🎛️ লেআউট কন্টেইনার */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          
          {/* 📑 বাম পাশের ট্যাব নেভিগেশন (১ কলাম) */}
          <div className="space-y-1.5">
            {[
              { id: "profile", label: "Profile Info", icon: User },
              { id: "password", label: "Security", icon: Lock },
              { id: "socials", label: "Social Links", icon: Globe },
              { id: "org", label: "Organization", icon: Building2 },
              { id: "notifications", label: "Notifications", icon: Bell },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all border ${
                    activeTab === tab.id
                      ? "bg-slate-900 text-white border-transparent shadow-md shadow-slate-900/10"
                      : "bg-white/70 backdrop-blur-xl border-slate-200/60 text-slate-600 hover:bg-white hover:text-slate-900"
                  }`}
                >
                  <Icon className="w-4 h-4" /> {tab.label}
                </button>
              );
            })}
          </div>

          {/* 🤍 ডান পাশের হোয়াইট গ্লাস ফর্ম সেকশন (৩ কলাম) */}
          <div className="md:col-span-3 bg-white/70 backdrop-blur-xl border border-slate-200/60 p-6 sm:p-8 rounded-3xl shadow-sm">
            <form onSubmit={handleSaveSettings} className="space-y-6">
              
              {/* 👤 ১. প্রোফাইল সেটিংস ট্যাব */}
              {activeTab === "profile" && (
                <div className="space-y-4">
                  <h3 className="text-base font-bold text-slate-800 border-b border-slate-100 pb-2">Profile Matrix</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-500">Full Name</label>
                      <input type="text" value={profile.name} onChange={(e) => setProfile({...profile, name: e.target.value})} className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold focus:outline-none focus:border-slate-900" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-500">Account Role</label>
                      <input type="text" disabled value={profile.role} className="w-full px-4 py-2.5 rounded-xl bg-slate-100 border border-slate-200 text-xs font-bold text-slate-400 cursor-not-allowed" />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500">Contact Email Address</label>
                    <input type="email" value={profile.email} onChange={(e) => setProfile({...profile, email: e.target.value})} className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold focus:outline-none focus:border-slate-900" />
                  </div>
                </div>
              )}

              {/* 🔒 ২. পাসওয়ার্ড ট্যাব */}
              {activeTab === "password" && (
                <div className="space-y-4">
                  <h3 className="text-base font-bold text-slate-800 border-b border-slate-100 pb-2">Authentication Architecture</h3>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500">Current Password</label>
                    <input type="password" placeholder="••••••••" value={password.current} onChange={(e) => setPassword({...password, current: e.target.value})} className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium focus:outline-none focus:border-slate-900" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-500">New Password</label>
                      <input type="password" placeholder="Min. 8 characters" value={password.new} onChange={(e) => setPassword({...password, new: e.target.value})} className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium focus:outline-none focus:border-slate-900" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-500">Confirm Blueprint Password</label>
                      <input type="password" placeholder="Repeat new password" value={password.confirm} onChange={(e) => setPassword({...password, confirm: e.target.value})} className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium focus:outline-none focus:border-slate-900" />
                    </div>
                  </div>
                </div>
              )}

              {/* 🚀 ৩. সোশ্যাল লিংকস ট্যাব */}
              {activeTab === "socials" && (
                <div className="space-y-4">
                  <h3 className="text-base font-bold text-slate-800 border-b border-slate-100 pb-2">Network Integration</h3>
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-500">Official Web URL</label>
                      <input type="url" value={socials.website} onChange={(e) => setSocials({...socials, website: e.target.value})} className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold focus:outline-none focus:border-slate-900" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-500">GitHub Organization Account</label>
                      <input type="url" value={socials.github} onChange={(e) => setSocials({...socials, github: e.target.value})} className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold focus:outline-none focus:border-slate-900" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-500">LinkedIn Profile</label>
                      <input type="url" placeholder="https://linkedin.com/company/..." value={socials.linkedin} onChange={(e) => setSocials({...socials, linkedin: e.target.value})} className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold focus:outline-none focus:border-slate-900" />
                    </div>
                  </div>
                </div>
              )}

              {/* 🏢 ৪. অর্গানাইজেশন ইনফো ট্যাব */}
              {activeTab === "org" && (
                <div className="space-y-4">
                  <h3 className="text-base font-bold text-slate-800 border-b border-slate-100 pb-2">Corporate Profile</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                    <div className="sm:col-span-3 space-y-1">
                      <label className="text-xs font-bold text-slate-500">Organization Identity Name</label>
                      <input type="text" value={org.name} onChange={(e) => setOrg({...org, name: e.target.value})} className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold focus:outline-none focus:border-slate-900" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-500">Established</label>
                      <input type="number" value={org.founded} onChange={(e) => setOrg({...org, founded: e.target.value})} className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold focus:outline-none focus:border-slate-900 text-center" />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500">Public Manifesto / Bio</label>
                    <textarea rows={3} value={org.bio} onChange={(e) => setOrg({...org, bio: e.target.value})} className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium focus:outline-none focus:border-slate-900 leading-relaxed" />
                  </div>
                </div>
              )}

              {/* 🔔 ৫. নোটিফিকেশন সেটিংস ট্যাব */}
              {activeTab === "notifications" && (
                <div className="space-y-4">
                  <h3 className="text-base font-bold text-slate-800 border-b border-slate-100 pb-2">Alert Dispatches</h3>
                  
                  <div className="space-y-3">
                    {/* Toggle 1 */}
                    <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50/50 border border-slate-100 cursor-pointer">
                      <div>
                        <span className="text-xs font-bold text-slate-800 block">Transactional Emails</span>
                        <span className="text-[11px] font-semibold text-slate-400 block">Get instantly alerted via email upon new contestant registrations.</span>
                      </div>
                      <input type="checkbox" checked={notifications.emails} onChange={(e) => setNotifications({...notifications, emails: e.target.checked})} className="w-4 h-4 accent-slate-900 cursor-pointer" />
                    </label>

                    {/* Toggle 2 */}
                    <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50/50 border border-slate-100 cursor-pointer">
                      <div>
                        <span className="text-xs font-bold text-slate-800 block">Submission Inbound Triggers</span>
                        <span className="text-[11px] font-semibold text-slate-400 block">Receive live operational logs when code updates hit the background AI audit channels.</span>
                      </div>
                      <input type="checkbox" checked={notifications.submissions} onChange={(e) => setNotifications({...notifications, submissions: e.target.checked})} className="w-4 h-4 accent-slate-900 cursor-pointer" />
                    </label>
                  </div>
                </div>
              )}

              {/* 🔘 গ্লোবাল সাবমিট অ্যাকশন বাটন */}
              <div className="flex justify-end pt-4 border-t border-slate-100">
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold flex items-center gap-2 text-xs uppercase tracking-wider shadow-md shadow-slate-900/10 transition"
                >
                  <Save className="w-4 h-4" /> Save System Settings
                </button>
              </div>

            </form>
          </div>

        </div>

      </div>
    </div>
  );
}