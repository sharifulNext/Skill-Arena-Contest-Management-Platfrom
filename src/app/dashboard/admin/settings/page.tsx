"use client";

import { useState } from "react";
import { 
  Settings, Paintbrush, ShieldCheck, Mail, Palette, 
  AlertOctagon, Cpu, Save, RefreshCw, EyeOff, ShieldAlert 
} from "lucide-react";
import Swal from "sweetalert2";

export default function PlatformSettings() {
  // 🔘 একটিভ ট্যাব স্টেট ম্যানেজমেন্ট
  const [activeTab, setActiveTab] = useState("branding");

  // 📋 গ্লোবাল সেটিংস স্টেট
  const [settings, setSettings] = useState({
    siteName: "DevArena hDev",
    supportEmail: "support@devarena.com",
    sessionTimeout: "60",
    twoFactor: true,
    smtpHost: "smtp.mailgun.org",
    smtpPort: "587",
    globalTheme: "light-glass",
    maintenanceMode: false,
    aiModel: "gemini-1.5-pro",
  });

  // 🔄 ইনপুট চেঞ্জ হ্যান্ডলার
  const handleChange = (key: string, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  // 💾 সেটিংস সেভ মেকানিজম
  const handleSaveSettings = () => {
    Swal.fire({
      icon: "success",
      title: "Configuration Synchronized",
      text: "Global system parameters updated successfully across cluster instances.",
      confirmButtonColor: "#0f172a",
      customClass: { popup: "rounded-3xl" }
    });
  };

  // 📑 ট্যাব নেভিগেশন কনফিগ
  const tabs = [
    { id: "branding", name: "Branding", icon: Paintbrush },
    { id: "security", name: "Security & Auth", icon: ShieldCheck },
    { id: "smtp", name: "SMTP Engine", icon: Mail },
    { id: "themes", name: "System Themes", icon: Palette },
    { id: "maintenance", name: "Maintenance Mode", icon: AlertOctagon },
    { id: "ai", name: "AI Globals", icon: Cpu },
  ];

  return (
    <div className="p-4 sm:p-6 md:p-10 space-y-8 bg-slate-50 min-h-screen">
      
      {/* 👑 হেডার ট্র্যাকার */}
      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
          <Settings className="w-7 h-7 sm:w-8 h-8 text-slate-700 shrink-0" /> System Control Architecture
        </h1>
        <p className="text-slate-500 text-xs sm:text-sm font-medium pl-1">
          Calibrate platform parameters, alter cluster variables, modify SMTP pipelines, and toggle high-priority staging states.
        </p>
      </div>

      {/* 💻 কোর সেটিংস ইন্টারফেস গ্রিড */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        
        {/* 📑 বাম পাশের ট্যাব নেভিগেশন প্যানেল */}
        <div className="bg-white/70 backdrop-blur-xl border border-slate-200/60 p-3 rounded-2xl shadow-sm space-y-1 lg:col-span-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
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

        {/* 📝 ডান পাশের ডাইনামিক সেকশন ফর্ম প্যানেল */}
        <div className="bg-white border border-slate-200/70 p-6 md:p-8 rounded-3xl shadow-sm lg:col-span-3 space-y-6">
          
          {/* 1️⃣ Branding Section */}
          {activeTab === "branding" && (
            <div className="space-y-6">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="text-base font-bold text-slate-900">Platform Identity & Persona</h3>
                <p className="text-xs text-slate-400 font-medium">Configure global client-facing naming architectures and telemetry support info.</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500">Platform Brand Name</label>
                  <input 
                    type="text" 
                    value={settings.siteName} 
                    onChange={(e) => handleChange("siteName", e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold focus:outline-none focus:border-slate-900" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500">System Support Web-Mail</label>
                  <input 
                    type="email" 
                    value={settings.supportEmail} 
                    onChange={(e) => handleChange("supportEmail", e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold focus:outline-none focus:border-slate-900" 
                  />
                </div>
              </div>
            </div>
          )}

          {/* 2️⃣ Security Section */}
          {activeTab === "security" && (
            <div className="space-y-6">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="text-base font-bold text-slate-900">Authentication Protocols</h3>
                <p className="text-xs text-slate-400 font-medium">Manage security thresholds, multi-factor routines, and cookie TTL variables.</p>
              </div>
              <div className="space-y-5">
                <div className="space-y-2 max-w-xs">
                  <label className="text-xs font-bold text-slate-500">Session Expire Token Threshold (Minutes)</label>
                  <input 
                    type="number" 
                    value={settings.sessionTimeout} 
                    onChange={(e) => handleChange("sessionTimeout", e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold focus:outline-none focus:border-slate-900" 
                  />
                </div>
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100/80">
                  <div className="space-y-0.5 pr-4">
                    <span className="text-xs font-bold text-slate-800 block">Enforce Mandatory 2FA</span>
                    <span className="text-[11px] text-slate-400 font-medium block">Require second-factor TOTP keys for privileged operations (Admin/Judge accounts).</span>
                  </div>
                  <input 
                    type="checkbox" 
                    checked={settings.twoFactor} 
                    onChange={(e) => handleChange("twoFactor", e.target.checked)}
                    className="w-4 h-4 text-slate-900 focus:ring-transparent border-slate-300 rounded cursor-pointer accent-slate-900" 
                  />
                </div>
              </div>
            </div>
          )}

          {/* 3️⃣ SMTP Section */}
          {activeTab === "smtp" && (
            <div className="space-y-6">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="text-base font-bold text-slate-900">SMTP Relay System Engine</h3>
                <p className="text-xs text-slate-400 font-medium">Configure transaction email routes for user invitations, submission receipts, and alerts.</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500">Outbound SMTP Server Host</label>
                  <input 
                    type="text" 
                    value={settings.smtpHost} 
                    onChange={(e) => handleChange("smtpHost", e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold focus:outline-none focus:border-slate-900" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500">TLS Assignment Port</label>
                  <input 
                    type="text" 
                    value={settings.smtpPort} 
                    onChange={(e) => handleChange("smtpPort", e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold focus:outline-none focus:border-slate-900" 
                  />
                </div>
              </div>
            </div>
          )}

          {/* 4️⃣ Themes Section */}
          {activeTab === "themes" && (
            <div className="space-y-6">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="text-base font-bold text-slate-900">Ecosystem Aesthetics Layout</h3>
                <p className="text-xs text-slate-400 font-medium">Select global default view layout states for participants, judges, and viewers.</p>
              </div>
              <div className="space-y-2 max-w-sm">
                <label className="text-xs font-bold text-slate-500">Active Global View Theme</label>
                <select
                  value={settings.globalTheme}
                  onChange={(e) => handleChange("globalTheme", e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-600 focus:outline-none focus:border-slate-900 cursor-pointer"
                >
                  <option value="light-glass">Premium Light Glassmorphic (Active)</option>
                  <option value="cyber-dark">Cyber Dark-Infused Matrix</option>
                  <option value="minimalist-white">Corporate Clean Minimalist</option>
                </select>
              </div>
            </div>
          )}

          {/* 5️⃣ Maintenance Mode Section */}
          {activeTab === "maintenance" && (
            <div className="space-y-6">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="text-base font-bold text-slate-900">Hardware Staging Controls</h3>
                <p className="text-xs text-slate-400 font-medium">Isolate production requests during core schema adjustments or updates.</p>
              </div>
              <div className={`p-5 rounded-2xl border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 transition-all ${
                settings.maintenanceMode 
                  ? "bg-rose-50 border-rose-200/60" 
                  : "bg-amber-50/60 border-amber-200/50"
              }`}>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wide text-amber-800">
                    <ShieldAlert className="w-4 h-4 shrink-0 text-amber-600" /> Hard Lock Maintenance Trigger
                  </div>
                  <p className="text-[11px] text-slate-500 font-semibold leading-relaxed max-w-lg">
                    When active, all client operations are blocked with a HTTP 503 code page. Authenticated administrators retain system access endpoints.
                  </p>
                </div>
                
                <button
                  onClick={() => handleChange("maintenanceMode", !settings.maintenanceMode)}
                  className={`px-4 py-2 text-xs font-black rounded-xl transition-all shadow-sm shrink-0 w-full sm:w-auto text-center ${
                    settings.maintenanceMode
                      ? "bg-rose-600 text-white hover:bg-rose-700"
                      : "bg-white border border-amber-200 text-amber-700 hover:bg-amber-100/50"
                  }`}
                >
                  {settings.maintenanceMode ? "SYSTEM IS LOCKED" : "ACTIVATE LOCK"}
                </button>
              </div>
            </div>
          )}

          {/* 6️⃣ AI Settings Section */}
          {activeTab === "ai" && (
            <div className="space-y-6">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="text-base font-bold text-slate-900">Global AI Node Integrations</h3>
                <p className="text-xs text-slate-400 font-medium">Select dynamic automated endpoint tokens for evaluating participant entries.</p>
              </div>
              <div className="space-y-2 max-w-sm">
                <label className="text-xs font-bold text-slate-500">Default Assessment Intelligence Endpoint</label>
                <select
                  value={settings.aiModel}
                  onChange={(e) => handleChange("aiModel", e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-600 focus:outline-none focus:border-slate-900 cursor-pointer"
                >
                  <option value="gemini-1.5-pro">Gemini 1.5 Pro Cluster</option>
                  <option value="gpt-4o">OpenAI Enterprise GPT-4o</option>
                  <option value="claude-3-5-sonnet">Claude 3.5 Sonnet Edge</option>
                </select>
              </div>
            </div>
          )}

          {/* 💾 বটম গ্লোবাল সাবমিট বাটন */}
          <div className="pt-6 border-t border-slate-100 flex justify-end">
            <button
              onClick={handleSaveSettings}
              className="w-full sm:w-auto px-6 py-3 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-slate-800 transition shadow-sm flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4" /> Save Target Configuration
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}