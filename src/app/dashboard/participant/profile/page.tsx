"use client";

import { useState } from "react";
import { 
  User, Trophy, Zap, Target, Award, Flame, 
  Globe, Calendar, MapPin, ExternalLink, 
  Activity, History, Medal, Star 
} from "lucide-react";

// ✅ Custom GitHub SVG icon
const GitHubIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M12 0C5.37 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.089-.745.083-.729.083-.729 1.205.084 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.468-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.3 1.23A11.52 11.52 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.29-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.61-2.807 5.625-5.479 5.921.43.372.823 1.102.823 2.222 0 1.606-.015 2.898-.015 3.293 0 .322.216.694.825.576C20.565 21.796 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
  </svg>
);

// ✅ Custom LinkedIn SVG icon (Fixes the missing export build error)
const LinkedInIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

type TabType = "overview" | "achievements" | "history" | "activity";

export default function ParticipantProfile() {
  const [activeTab, setActiveTab] = useState<TabType>("overview");

  const userProfile = {
    name: "Shariful Islam",
    role: "Full Stack Software Engineer",
    bio: "Building real-world, production-ready full stack applications. Obsessed with performance optimization, Next.js server components, and dynamic LLM configurations.",
    location: "Dhaka, Bangladesh",
    joined: "Joined January 2026",
    socials: {
      github: "github.com/shariful",
      linkedin: "linkedin.com/in/shariful",
      portfolio: "shariful.dev"
    },
    stats: [
      { title: "Total Wins",      value: "14",    icon: Trophy, text: "text-amber-500",  bg: "bg-amber-50"  },
      { title: "Contests Joined", value: "38",    icon: Target, text: "text-blue-500",   bg: "bg-blue-50"   },
      { title: "Best Rank",       value: "#2",    icon: Medal,  text: "text-rose-500",   bg: "bg-rose-50"   },
      { title: "Global XP",       value: "4,850", icon: Zap,    text: "text-purple-500", bg: "bg-purple-50" },
    ],
    badges: [
      { id: "b1", title: "UI Master", icon: "🏆", desc: "Crafted flawless glassmorphic UI without icon collision.", color: "from-amber-400 to-orange-500" },
      { id: "b2", title: "10 Wins", icon: "🔥", desc: "Secured first place in over 10 elite coding arenas.", color: "from-rose-500 to-red-600" },
      { id: "b3", title: "Speed Coder", icon: "⚡", desc: "Submitted production-ready codebase in under 2 hours.", color: "from-purple-500 to-indigo-600" },
    ],
    contestHistory: [
      { name: "Next.js Speedrun Hackathon", rank: "#1", xp: "+500", date: "Mar 2026", status: "Won" },
      { name: "React UI Challenge Vol.3",   rank: "#2", xp: "+300", date: "Feb 2026", status: "Runner Up" },
      { name: "Full Stack Sprint Arena",   rank: "#1", xp: "+500", date: "Jan 2026", status: "Won" },
      { name: "Algorithm Blitz Round 5",   rank: "#5", xp: "+100", date: "Jan 2026", status: "Top 10" },
    ],
    activityLog: [
      { action: "Joined contest",      detail: "TypeScript Type Challenge",     time: "2 hours ago",  icon: "🎯" },
      { action: "Badge Unlocked",      detail: "Speed Coder — Tier 3",          time: "1 day ago",    icon: "🏅" },
      { action: "Submitted solution",  detail: "Next.js Speedrun Hackathon",    time: "3 days ago",   icon: "📤" },
      { action: "Ranked #1",           detail: "Full Stack Sprint Arena",      time: "1 week ago",   icon: "🥇" },
      { action: "Profile updated",     detail: "Added portfolio link",          time: "2 weeks ago",  icon: "✏️" },
    ],
    allBadges: [
      { title: "UI Master",    icon: "🏆", unlocked: true,  desc: "Crafted flawless glassmorphic UI." },
      { title: "10 Wins",        icon: "🔥", unlocked: true,  desc: "Won over 10 elite coding arenas." },
      { title: "Speed Coder",    icon: "⚡", unlocked: true,  desc: "Submitted in under 2 hours." },
      { title: "Tier 4 Elite",   icon: "💎", unlocked: false, desc: "Complete 5 Tier 4 complexity sprints." },
      { title: "50 Contests",    icon: "🎖️", unlocked: false, desc: "Participate in 50 contests total." },
      { title: "Perfect Score",  icon: "💯", unlocked: false, desc: "Achieve 100% score in any contest." },
      { title: "Mentor",         icon: "🧑‍🏫", unlocked: false, desc: "Help 10 beginners in the community." },
      { title: "Streak x30",     icon: "📅", unlocked: false, desc: "Maintain a 30-day login streak." },
      { title: "API Wizard",     icon: "🔌", unlocked: false, desc: "Build and deploy a public REST API." },
      { title: "DB Champion",    icon: "🗄️", unlocked: false, desc: "Win a database optimization contest." },
      { title: "Open Source",    icon: "🌍", unlocked: false, desc: "Contribute to 3 open-source repos." },
      { title: "Legend",         icon: "👑", unlocked: false, desc: "Reach the top 1% on the global leaderboard." },
    ],
  };

  return (
    <div className="p-4 sm:p-6 md:p-10 space-y-8 bg-slate-50 min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT COLUMN */}
        <div className="bg-white border border-slate-200/60 p-6 rounded-3xl shadow-sm space-y-6 lg:col-span-1 h-fit">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-4xl shadow-md text-white font-bold relative">
              ⚡
              <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-white animate-pulse" title="Online" />
            </div>
            <div className="space-y-1">
              <h2 className="text-xl font-black text-slate-900 tracking-tight">{userProfile.name}</h2>
              <span className="text-xs font-bold text-indigo-600 bg-indigo-50 border border-indigo-100/50 px-2.5 py-0.5 rounded-md inline-block">
                {userProfile.role}
              </span>
            </div>
            <p className="text-slate-500 text-xs font-semibold leading-relaxed max-w-xs">
              &ldquo;{userProfile.bio}&rdquo;
            </p>
          </div>

          <div className="border-t border-slate-100 pt-4 space-y-3 text-[11px] font-bold text-slate-400">
            <div className="flex items-center gap-2.5">
              <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
              <span className="text-slate-600">{userProfile.location}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
              <span className="text-slate-500">{userProfile.joined}</span>
            </div>
          </div>

          {/* Social Links Portal */}
          <div className="border-t border-slate-100 pt-5 space-y-2.5">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Connected Repositories</label>
            
            <a href={`https://${userProfile.socials.github}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs font-mono font-bold text-slate-700 hover:bg-slate-100 transition group">
              <div className="flex items-center gap-2">
                <GitHubIcon className="w-4 h-4 text-slate-900" />
                <span>GitHub</span>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
            </a>

            <a href={`https://${userProfile.socials.linkedin}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs font-mono font-bold text-slate-700 hover:bg-slate-100 transition group">
              <div className="flex items-center gap-2">
                <LinkedInIcon className="w-4 h-4 text-blue-600" /> {/* ✅ Updated to use LinkedInIcon */}
                <span>LinkedIn</span>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
            </a>

            <a href={`https://${userProfile.socials.portfolio}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs font-mono font-bold text-slate-700 hover:bg-slate-100 transition group">
              <div className="flex items-center gap-2"><Globe className="w-4 h-4 text-indigo-500" /> <span>Portfolio</span></div>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex bg-white border border-slate-200/60 p-1.5 rounded-2xl shadow-sm text-xs font-bold text-slate-500 overflow-x-auto gap-1">
            {[
              { id: "overview",     name: "Overview Profile", icon: User     },
              { id: "achievements",  name: "Badges Hub",       icon: Award    },
              { id: "history",       name: "Arena History",    icon: History  },
              { id: "activity",      name: "Live Logs",        icon: Activity },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as TabType)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all whitespace-nowrap ${
                    activeTab === tab.id ? "bg-slate-900 text-white shadow-sm font-black" : "hover:text-slate-900 hover:bg-slate-50"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 shrink-0" />
                  <span>{tab.name}</span>
                </button>
              );
            })}
          </div>

          <div className="bg-white border border-slate-200/70 p-6 md:p-8 rounded-3xl shadow-sm min-h-[400px]">
            {activeTab === "overview" && (
              <div className="space-y-8 animate-in fade-in duration-200">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {userProfile.stats.map((stat, idx) => {
                    const Icon = stat.icon;
                    return (
                      <div key={idx} className="bg-slate-50/50 p-4 rounded-2xl border border-slate-100 flex flex-col justify-between gap-3">
                        <span className="text-[11px] font-bold text-slate-400 block tracking-tight">{stat.title}</span>
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xl font-black text-slate-900 tracking-tight font-mono">{stat.value}</span>
                          <div className={`p-2 rounded-lg ${stat.bg} ${stat.text}`}><Icon className="w-4 h-4 shrink-0" /></div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                    <Star className="w-4 h-4 text-amber-500 fill-amber-400" /> Acquired Special Tier Badges
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {userProfile.badges.map((badge) => (
                      <div key={badge.id} className="p-4 rounded-2xl border border-slate-100 bg-slate-50 flex items-start gap-3 group hover:border-slate-300 transition-all">
                        <div className="text-2xl bg-white shadow-sm p-2 rounded-xl shrink-0 group-hover:scale-110 transition-transform">{badge.icon}</div>
                        <div className="space-y-1">
                          <h4 className="text-xs font-extrabold text-slate-900 tracking-tight">{badge.title}</h4>
                          <p className="text-[10px] text-slate-400 font-medium leading-normal">{badge.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "achievements" && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-black text-slate-900">Global Milestone Tracker</h3>
                  <span className="text-[11px] font-bold text-slate-400 bg-slate-50 border border-slate-200 px-3 py-1 rounded-lg">3 / 12 Unlocked</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div className="h-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-700" style={{ width: "25%" }} />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {userProfile.allBadges.map((badge, idx) => (
                    <div key={idx} className={`p-4 rounded-2xl border flex items-center gap-3 transition-all ${badge.unlocked ? "bg-slate-50 border-slate-200 hover:border-slate-300" : "bg-slate-50/40 border-slate-100 opacity-50 grayscale"}`}>
                      <div className="text-2xl bg-white shadow-sm p-2 rounded-xl shrink-0">{badge.icon}</div>
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <h4 className="text-xs font-extrabold text-slate-900">{badge.title}</h4>
                          {badge.unlocked && <span className="text-[9px] font-black text-emerald-600 bg-emerald-50 border border-emerald-100 px-1.5 py-0.5 rounded-md">UNLOCKED</span>}
                        </div>
                        <p className="text-[10px] text-slate-400 font-medium">{badge.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "history" && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <h3 className="text-sm font-black text-slate-900">Arena Battle History</h3>
                <div className="space-y-3">
                  {userProfile.contestHistory.map((contest, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-slate-200 transition-all group">
                      <div className="space-y-1">
                        <p className="text-xs font-extrabold text-slate-900 group-hover:text-indigo-600 transition-colors">{contest.name}</p>
                        <p className="text-[10px] text-slate-400 font-semibold">{contest.date}</p>
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        <span className="text-[11px] font-black text-purple-600 bg-purple-50 border border-purple-100 px-2 py-1 rounded-lg font-mono">{contest.xp} XP</span>
                        <span className={`text-[11px] font-black px-2.5 py-1 rounded-lg border ${contest.rank === "#1" ? "text-amber-600 bg-amber-50 border-amber-100" : contest.rank === "#2" ? "text-slate-600 bg-slate-100 border-slate-200" : "text-slate-500 bg-slate-50 border-slate-100"}`}>{contest.rank}</span>
                        <span className={`hidden sm:inline-block text-[10px] font-black px-2.5 py-1 rounded-lg border ${contest.status === "Won" ? "text-emerald-600 bg-emerald-50 border-emerald-100" : contest.status === "Runner Up" ? "text-blue-600 bg-blue-50 border-blue-100" : "text-slate-500 bg-slate-50 border-slate-100"}`}>{contest.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "activity" && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <h3 className="text-sm font-black text-slate-900 flex items-center gap-2"><Flame className="w-4 h-4 text-orange-500" /> Recent Activity Log</h3>
                <div className="relative space-y-0">
                  <div className="absolute left-[22px] top-0 bottom-0 w-px bg-slate-100" />
                  {userProfile.activityLog.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-4 pb-6 last:pb-0 relative">
                      <div className="w-11 h-11 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-lg shrink-0 shadow-sm z-10">{item.icon}</div>
                      <div className="pt-2 space-y-0.5">
                        <p className="text-xs font-extrabold text-slate-900">{item.action}</p>
                        <p className="text-[11px] text-slate-500 font-semibold">{item.detail}</p>
                        <p className="text-[10px] text-slate-400 font-medium">{item.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}