"use client";

import { useState } from "react";
import { 
  Users, Layers, Trophy, Activity, 
  FileText, Cpu, DollarSign, ShieldAlert,
  ArrowUpRight, Check, X 
} from "lucide-react";
import { 
  ResponsiveContainer, AreaChart, Area, 
  XAxis, YAxis, Tooltip, CartesianGrid, BarChart, Bar 
} from "recharts";
import { motion } from "framer-motion";
import Swal from "sweetalert2";

// 📊 গ্লোবাল প্ল্যাটফর্ম গ্রোথ ও রেভিনিউ লগ (ডামি ডাটা)
const performanceLogs = [
  { name: "Jan", users: 4200, revenue: 12000, aiCalls: 8500 },
  { name: "Feb", users: 6800, revenue: 19000, aiCalls: 14000 },
  { name: "Mar", users: 9500, revenue: 26000, aiCalls: 22000 },
  { name: "Apr", users: 12100, revenue: 34000, aiCalls: 31000 },
  { name: "May", users: 14820, revenue: 42150, aiCalls: 45000 },
];

export default function AdminDashboardOverview() {
  const [tickets, setTickets] = useState([
    { id: "t1", org: "CyberBlitz Inc.", lead: "Asif Rahman", track: "Web3 Speedrun", fee: "$250" },
    { id: "t2", org: "NeuralLabs AI", lead: "Zayan Khan", track: "LLM Fine-Tune Blitz", fee: "$400" },
  ]);

  const triggerAlert = (type: "success" | "error", title: string, text: string) => {
    Swal.fire({
      icon: type,
      title,
      text,
      customClass: { popup: "rounded-3xl" },
      confirmButtonColor: "#0f172a"
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 p-6 sm:p-10 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* 👑 হেডার সেকশন */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Root Administration</h1>
            <p className="text-slate-500 text-sm font-medium">Global platform telemetry, financial health indices, and gatekeeping control.</p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/80 border border-slate-200/60 shadow-sm text-xs font-bold text-emerald-600">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping mr-1.5" />
            MAINFRAME LIVE
          </div>
        </div>

        {/* ⚡ ৮টি মেগা নিয়ন গ্রেডিয়েন্ট অ্যানালিটিক্স কার্ডস (Clean Light Glassmorphism) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* 1. Total Users */}
          <motion.div whileHover={{ y: -2 }} className="p-0.5 rounded-2xl bg-gradient-to-b from-indigo-500/10 to-transparent">
            <div className="bg-white/70 border border-slate-200/60 backdrop-blur-xl p-5 rounded-[14px] flex items-center justify-between shadow-sm">
              <div className="space-y-1">
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Total Users</p>
                <p className="text-2xl font-black text-slate-900 tracking-tight">14,820</p>
              </div>
              <div className="w-11 h-11 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600"><Users className="w-5 h-5" /></div>
            </div>
          </motion.div>

          {/* 2. Total Organizers */}
          <motion.div whileHover={{ y: -2 }} className="p-0.5 rounded-2xl bg-gradient-to-b from-sky-500/10 to-transparent">
            <div className="bg-white/70 border border-slate-200/60 backdrop-blur-xl p-5 rounded-[14px] flex items-center justify-between shadow-sm">
              <div className="space-y-1">
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Organizers</p>
                <p className="text-2xl font-black text-slate-900 tracking-tight">642</p>
              </div>
              <div className="w-11 h-11 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-600"><Layers className="w-5 h-5" /></div>
            </div>
          </motion.div>

          {/* 3. Total Contests */}
          <motion.div whileHover={{ y: -2 }} className="p-0.5 rounded-2xl bg-gradient-to-b from-amber-500/10 to-transparent">
            <div className="bg-white/70 border border-slate-200/60 backdrop-blur-xl p-5 rounded-[14px] flex items-center justify-between shadow-sm">
              <div className="space-y-1">
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Total Arenas</p>
                <p className="text-2xl font-black text-slate-900 tracking-tight">248</p>
              </div>
              <div className="w-11 h-11 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600"><Trophy className="w-5 h-5" /></div>
            </div>
          </motion.div>

          {/* 4. Active Contests */}
          <motion.div whileHover={{ y: -2 }} className="p-0.5 rounded-2xl bg-gradient-to-b from-emerald-500/10 to-transparent">
            <div className="bg-white/70 border border-slate-200/60 backdrop-blur-xl p-5 rounded-[14px] flex items-center justify-between shadow-sm">
              <div className="space-y-1">
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Active Contests</p>
                <p className="text-2xl font-black text-emerald-600 tracking-tight">18 Live</p>
              </div>
              <div className="w-11 h-11 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600"><Activity className="w-5 h-5" /></div>
            </div>
          </motion.div>

          {/* 5. Submissions */}
          <motion.div whileHover={{ y: -2 }} className="p-0.5 rounded-2xl bg-gradient-to-b from-purple-500/10 to-transparent">
            <div className="bg-white/70 border border-slate-200/60 backdrop-blur-xl p-5 rounded-[14px] flex items-center justify-between shadow-sm">
              <div className="space-y-1">
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Submissions</p>
                <p className="text-2xl font-black text-slate-900 tracking-tight">4,125</p>
              </div>
              <div className="w-11 h-11 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600"><FileText className="w-5 h-5" /></div>
            </div>
          </motion.div>

          {/* 6. AI Reviews */}
          <motion.div whileHover={{ y: -2 }} className="p-0.5 rounded-2xl bg-gradient-to-b from-fuchsia-500/10 to-transparent">
            <div className="bg-white/70 border border-slate-200/60 backdrop-blur-xl p-5 rounded-[14px] flex items-center justify-between shadow-sm">
              <div className="space-y-1">
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">AI Reviews</p>
                <p className="text-2xl font-black text-fuchsia-600 tracking-tight">3,890</p>
              </div>
              <div className="w-11 h-11 rounded-xl bg-fuchsia-50 border border-fuchsia-100 flex items-center justify-center text-fuchsia-600"><Cpu className="w-5 h-5" /></div>
            </div>
          </motion.div>

          {/* 7. Revenue */}
          <motion.div whileHover={{ y: -2 }} className="p-0.5 rounded-2xl bg-gradient-to-b from-indigo-500/15 to-transparent">
            <div className="bg-white/70 border border-slate-200/60 backdrop-blur-xl p-5 rounded-[14px] flex items-center justify-between shadow-sm">
              <div className="space-y-1">
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Gross Revenue</p>
                <p className="text-2xl font-black text-indigo-600 tracking-tight">$42,150</p>
              </div>
              <div className="w-11 h-11 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600"><DollarSign className="w-5 h-5" /></div>
            </div>
          </motion.div>

          {/* 8. Reports */}
          <motion.div whileHover={{ y: -2 }} className="p-0.5 rounded-2xl bg-gradient-to-b from-rose-500/10 to-transparent">
            <div className="bg-white/70 border border-slate-200/60 backdrop-blur-xl p-5 rounded-[14px] flex items-center justify-between shadow-sm">
              <div className="space-y-1">
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Open Disputes</p>
                <p className="text-2xl font-black text-rose-600 tracking-tight">3 Alerts</p>
              </div>
              <div className="w-11 h-11 rounded-xl bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-600"><ShieldAlert className="w-5 h-5" /></div>
            </div>
          </motion.div>

        </div>

        {/* 📊 ডাটা-হেভি রেসপনসিভ অ্যানিমেটেড চার্ট গ্রিড */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Revenue Flow (Area Chart) */}
          <div className="lg:col-span-2 bg-white/70 border border-slate-200/60 backdrop-blur-xl p-6 rounded-3xl shadow-sm space-y-4">
            <div>
              <h3 className="text-base font-bold text-slate-800 tracking-wide">Financial Flow & Scale Velocity</h3>
              <p className="text-xs text-slate-400">Live sync between gross token inflows and verification cohorts.</p>
            </div>
            <div className="h-64 w-full text-[10px] font-semibold">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={performanceLogs} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                  <defs>
                    <linearGradient id="lightGlow" x1="0" y1="0" x2="0" y2="100%">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.15}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="name" stroke="#94a3b8" tickLine={false} />
                  <YAxis stroke="#94a3b8" tickLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: "#ffffff", borderColor: "#e2e8f0", borderRadius: "12px", color: "#0f172a" }} />
                  <Area type="monotone" dataKey="revenue" name="Revenue ($)" stroke="#6366f1" strokeWidth={2.5} fillOpacity={1} fill="url(#lightGlow)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* AI Workload (Bar Chart) */}
          <div className="bg-white/70 border border-slate-200/60 backdrop-blur-xl p-6 rounded-3xl shadow-sm space-y-4">
            <div>
              <h3 className="text-base font-bold text-slate-800 tracking-wide">AI Processing Workload</h3>
              <p className="text-xs text-slate-400">Automated evaluation sequences executed monthly.</p>
            </div>
            <div className="h-64 w-full text-[10px] font-semibold">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={performanceLogs} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="name" stroke="#94a3b8" tickLine={false} />
                  <YAxis stroke="#94a3b8" tickLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: "#ffffff", borderColor: "#e2e8f0", borderRadius: "12px" }} />
                  <Bar dataKey="aiCalls" name="AI Audits" fill="#ec4899" radius={[4, 4, 0, 0]} barSize={20} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>

        {/* 🛡️ পেন্ডিং গেটওয়ে রিকোয়েস্ট টেবিল */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2 px-1">
            <ShieldAlert className="w-5 h-5 text-amber-500" /> Pending Arena Gateways ({tickets.length})
          </h3>
          
          {tickets.length === 0 ? (
            <div className="p-10 text-center bg-white/70 border border-slate-200/60 rounded-2xl text-xs font-semibold text-slate-400">
              🎉 Gateway firewall status clean. No verification requests pending.
            </div>
          ) : (
            <div className="bg-white/70 backdrop-blur-xl border border-slate-200/60 rounded-3xl overflow-hidden shadow-sm p-2">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-100 text-slate-400 text-xs font-bold uppercase tracking-wider">
                      <th className="p-4">Entity / Organization</th>
                      <th className="p-4">Lead Operator</th>
                      <th className="p-4">Target Workspace Track</th>
                      <th className="p-4 text-center">Security Escrow</th>
                      <th className="p-4 text-right">Access Control</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs font-medium text-slate-700">
                    {tickets.map((t) => (
                      <tr key={t.id} className="hover:bg-slate-50/50 transition-colors group">
                        <td className="p-4 font-bold text-slate-900 text-sm">{t.org}</td>
                        <td className="p-4 text-slate-500">{t.lead}</td>
                        <td className="p-4">
                          <span className="px-2.5 py-1 text-[11px] font-bold bg-slate-100 text-slate-700 border border-slate-200 rounded-lg flex items-center gap-1 w-fit">
                            {t.track} <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
                          </span>
                        </td>
                        <td className="p-4 text-center font-bold text-emerald-600 text-sm">{t.fee}</td>
                        <td className="p-4 text-right space-x-2">
                          <button 
                            onClick={() => { setTickets(tickets.filter(x => x.id !== t.id)); triggerAlert("error", "Application Dismissed", "Inbound token stream rejected."); }}
                            className="p-2 bg-rose-50 text-rose-600 border border-rose-100 rounded-xl hover:bg-rose-100 transition shadow-sm"
                          >
                            <X className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => { setTickets(tickets.filter(x => x.id !== t.id)); triggerAlert("success", "Stream Verified", "Contest deployment approved successfully."); }}
                            className="p-2 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-xl hover:bg-emerald-100 transition shadow-sm"
                          >
                            <Check className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}