"use client";

import { useRouter } from "next/navigation";
import { 
  ArrowLeft, Trophy, Users, CheckCircle, 
  Send, BarChart3, DollarSign, TrendingUp, 
  PieChart as PieIcon, Activity, Calendar 
} from "lucide-react";
import { 
  ResponsiveContainer, AreaChart, Area, 
  XAxis, YAxis, Tooltip, CartesianGrid, 
  BarChart, Bar, PieChart, Pie, Cell, Legend 
} from "recharts";

// 📉 ১. কন্টেস্ট গ্রোথ এবং সাবমিশন অ্যাক্টিভিটি ডেটা (Monthly Trend)
const monthlyTrendData = [
  { name: "Jan", contests: 4, submissions: 45, participationRate: 75, revenue: 1200 },
  { name: "Feb", contests: 7, submissions: 80, participationRate: 82, revenue: 2100 },
  { name: "Mar", contests: 12, submissions: 150, participationRate: 88, revenue: 4500 },
  { name: "Apr", contests: 18, submissions: 240, participationRate: 91, revenue: 7200 },
  { name: "May", contests: 25, submissions: 380, participationRate: 95, revenue: 11400 },
];

// 🍕 ২. টপ ক্যাটাগরি ডেটা (Distribution)
const categoryData = [
  { name: "Frontend (React/Next)", value: 45, color: "#0f172a" }, // Slate 900
  { name: "Backend Architecture", value: 25, color: "#3b82f6" },  // Blue 500
  { name: "Full-Stack SaaS", value: 20, color: "#10b981" },       // Emerald 500
  { name: "UI/UX Design Blitz", value: 10, color: "#f59e0b" },    // Amber 500
];

export default function OrganizerAnalyticsPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 p-6 sm:p-10 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        
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
            <BarChart3 className="w-8 h-8 text-slate-500" /> Platform Analytics
          </h1>
          <p className="text-slate-500 text-sm font-medium">Real-time business insights, financial performance, and cohort metrics.</p>
        </div>

        {/* 💳 ৬টি বিজনেস অ্যানালিটিক্স কার্ডস (KPI Cards) */}
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
          
          {/* Total Contests */}
          <div className="bg-white/70 backdrop-blur-xl border border-slate-200/60 p-5 rounded-2xl space-y-2 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700"><Trophy className="w-5 h-5" /></div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Contests</p>
              <p className="text-xl font-bold text-slate-900">32</p>
            </div>
          </div>

          {/* Total Participants */}
          <div className="bg-white/70 backdrop-blur-xl border border-slate-200/60 p-5 rounded-2xl space-y-2 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700"><Users className="w-5 h-5" /></div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Participants</p>
              <p className="text-xl font-bold text-slate-900">1,840</p>
            </div>
          </div>

          {/* Active Contests */}
          <div className="bg-white/70 backdrop-blur-xl border border-slate-200/60 p-5 rounded-2xl space-y-2 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center"><CheckCircle className="w-5 h-5" /></div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Arenas</p>
              <p className="text-xl font-bold text-emerald-700">6 Live</p>
            </div>
          </div>

          {/* Total Submissions */}
          <div className="bg-white/70 backdrop-blur-xl border border-slate-200/60 p-5 rounded-2xl space-y-2 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100 flex items-center justify-center"><Send className="w-5 h-5" /></div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Submissions</p>
              <p className="text-xl font-bold text-indigo-700">895</p>
            </div>
          </div>

          {/* Average Score */}
          <div className="bg-white/70 backdrop-blur-xl border border-slate-200/60 p-5 rounded-2xl space-y-2 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 border border-amber-100 flex items-center justify-center"><TrendingUp className="w-5 h-5" /></div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Avg AI Audit</p>
              <p className="text-xl font-bold text-amber-700">78.4/100</p>
            </div>
          </div>

          {/* Revenue */}
          <div className="bg-white/70 backdrop-blur-xl border border-slate-200/60 p-5 rounded-2xl space-y-2 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center"><DollarSign className="w-5 h-5" /></div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Net Revenue</p>
              <p className="text-xl font-bold text-blue-700">$11,400</p>
            </div>
          </div>

        </div>

        {/* 📊 চার্ট গ্রিড সেকশন */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* ১. Contest Growth & Revenue (Area Chart) */}
          <div className="bg-white/70 backdrop-blur-xl border border-slate-200/60 p-6 rounded-3xl shadow-sm space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <Calendar className="w-5 h-5 text-slate-400" />
              <div>
                <h3 className="font-bold text-base text-slate-800">Contest Growth & Revenue Flow</h3>
                <p className="text-xs text-slate-400 font-medium">Trajectory of hosted hackathons matched against revenue scales.</p>
              </div>
            </div>
            <div className="h-72 w-full font-medium text-xs">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="100%">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" stroke="#94a3b8" tickLine={false} />
                  <YAxis stroke="#94a3b8" tickLine={false} />
                  <Tooltip />
                  <Area type="monotone" dataKey="revenue" name="Revenue ($)" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorRevenue)" />
                  <Area type="monotone" dataKey="contests" name="Contests Hosted" stroke="#0f172a" strokeWidth={2} fill="none" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* ২. Submission Activity & Participation Rate (Bar + Line Chart) */}
          <div className="bg-white/70 backdrop-blur-xl border border-slate-200/60 p-6 rounded-3xl shadow-sm space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <Activity className="w-5 h-5 text-slate-400" />
              <div>
                <h3 className="font-bold text-base text-slate-800">Submission Volatiles & Engagement</h3>
                <p className="text-xs text-slate-400 font-medium">Monthly submission intake vs percentage metrics of user retention.</p>
              </div>
            </div>
            <div className="h-72 w-full font-medium text-xs">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" stroke="#94a3b8" tickLine={false} />
                  <YAxis stroke="#94a3b8" tickLine={false} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="submissions" name="Submissions" fill="#0f172a" radius={[6, 6, 0, 0]} barSize={30} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* ৩. Top Categories (Pie Chart) */}
          <div className="bg-white/70 backdrop-blur-xl border border-slate-200/60 p-6 rounded-3xl shadow-sm space-y-4 lg:col-span-2">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <PieIcon className="w-5 h-5 text-slate-400" />
              <div>
                <h3 className="font-bold text-base text-slate-800">Top Categories & Track Dominance</h3>
                <p className="text-xs text-slate-400 font-medium">Structural distribution of interest groups across active contest ecosystems.</p>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row items-center justify-around gap-6 pt-4">
              {/* Pie Component */}
              <div className="h-64 w-64 font-medium text-xs">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Custom Legend / Metrics List */}
              <div className="space-y-3 w-full md:w-96">
                {categoryData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-xl bg-slate-50/50 border border-slate-100">
                    <div className="flex items-center gap-2.5">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-sm font-semibold text-slate-700">{item.name}</span>
                    </div>
                    <span className="text-sm font-bold text-slate-900">{item.value}%</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}