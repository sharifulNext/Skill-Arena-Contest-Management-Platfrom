"use client";

import { useState } from "react";
import { 
  Users, Search, Filter, ShieldCheck, 
  UserMinus, UserCheck, Trash2, ShieldAlert,
  UserX, RefreshCw
} from "lucide-react";
import Swal from "sweetalert2";

// 📋 ডামি ইউজার ডেটাবেজ মড্যুল
const initialUsers = [
  { id: "u1", name: "Anik Rahman", email: "anik@gmail.com", role: "PARTICIPANT", status: "Active", joined: "12 May, 2026", avatar: "A" },
  { id: "u2", name: "Sabbir Ahmed", email: "sabbir@skillarena.com", role: "ORGANIZER", status: "Pending Verification", joined: "18 May, 2026", avatar: "S" },
  { id: "u3", name: "Dr. Jamil", email: "jamil@expert.com", role: "JUDGE", status: "Active", joined: "10 Jan, 2026", avatar: "J" },
  { id: "u4", name: "Fahim Shahriar", email: "fahim@spam.com", role: "PARTICIPANT", status: "Banned", joined: "02 Feb, 2026", avatar: "F" },
  { id: "u5", name: "Tasnim Raisa", email: "raisa@innovate.org", role: "ORGANIZER", status: "Verified", joined: "15 Apr, 2026", avatar: "T" },
];

export default function AdminUserManagement() {
  const [users, setUsers] = useState(initialUsers);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("ALL");

  // 🔄 ১. চেঞ্জ রোল হ্যান্ডলার (Toggle Between Role Blocks)
  const handleRoleChange = (id: string, currentRole: string) => {
    let nextRole = "PARTICIPANT";
    if (currentRole === "PARTICIPANT") nextRole = "ORGANIZER";
    else if (currentRole === "ORGANIZER") nextRole = "JUDGE";
    
    setUsers(users.map(u => u.id === id ? { ...u, role: nextRole } : u));
    
    Swal.fire({
      icon: "success",
      title: "Role Swapped! 🔄",
      text: `User role has been successfully modified to ${nextRole}.`,
      customClass: { popup: "rounded-3xl" },
      confirmButtonColor: "#0f172a"
    });
  };

  // 🚫 ২. ব্যান / আনব্যান হ্যান্ডলার
  const handleToggleBan = (id: string, currentStatus: string) => {
    const isBanned = currentStatus === "Banned";
    const nextStatus = isBanned ? "Active" : "Banned";
    
    setUsers(users.map(u => u.id === id ? { ...u, status: nextStatus } : u));

    Swal.fire({
      icon: isBanned ? "success" : "warning",
      title: isBanned ? "User Re-activated" : "User Intercepted / Banned 🚫",
      text: isBanned ? "Access to the terminal has been restored." : "User network block has been deployed.",
      customClass: { popup: "rounded-3xl" },
      confirmButtonColor: "#0f172a"
    });
  };

  // 🛡️ ৩. অর্গানাইজার ভেরিফাই হ্যান্ডলার
  const handleVerifyOrganizer = (id: string) => {
    setUsers(users.map(u => u.id === id ? { ...u, status: "Verified" } : u));
    Swal.fire({
      icon: "success",
      title: "Credentials Verified! 🛡️",
      text: "Organizer profile is now signed and whitelisted.",
      customClass: { popup: "rounded-3xl" },
      confirmButtonColor: "#0f172a"
    });
  };

  // 🗑️ ৪. পার্মানেন্ট ডিলিট হ্যান্ডলার
  const handleDeleteUser = (id: string, name: string) => {
    Swal.fire({
      title: "Purge User?",
      text: `Are you sure you want to permanently wipe ${name} from core nodes?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e11d48",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Yes, Purge",
      customClass: { popup: "rounded-3xl" }
    }).then((result) => {
      if (result.isConfirmed) {
        setUsers(users.filter(u => u.id !== id));
        Swal.fire({
          title: "Purged!",
          text: "User records have been completely dropped.",
          icon: "success",
          confirmButtonColor: "#0f172a",
          customClass: { popup: "rounded-3xl" }
        });
      }
    });
  };

  // 🔍 সার্চ এবং ফিল্টারিং মেকানিজম পাইপলাইন
  const filteredUsers = users.filter(u => {
    const matchesSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = roleFilter === "ALL" || u.role === roleFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="p-6 sm:p-10 space-y-8 bg-slate-50 min-h-screen">
      
      {/* 👑 হেডার এরিয়া */}
      <div className="space-y-1">
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
          <Users className="w-8 h-8 text-slate-700" /> Identity Matrix
        </h1>
        <p className="text-slate-500 text-sm font-medium">Audit credentials, swap environment roles, enforce bans, or dispatch security clears.</p>
      </div>

      {/* 🎛️ কন্ট্রোল ফিল্টার বার (Search & Filter Section) */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-white/70 backdrop-blur-xl border border-slate-200/60 p-4 rounded-2xl shadow-sm">
        {/* সার্চ বার */}
        <div className="relative w-full sm:max-w-xs">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input 
            type="text" 
            placeholder="Search name or email..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold focus:outline-none focus:border-slate-900"
          />
        </div>

        {/* রোল ফিল্টার ড্রপডাউন */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <Filter className="w-4 h-4 text-slate-400 hidden sm:block" />
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-600 focus:outline-none focus:border-slate-900 cursor-pointer"
          >
            <option value="ALL">All Cluster Roles</option>
            <option value="PARTICIPANT">Participants</option>
            <option value="ORGANIZER">Organizers</option>
            <option value="JUDGE">Judges</option>
          </select>
        </div>
      </div>

      {/* 🛡️ ডাটা টেবিল কন্টেইনার (User Table Matrix) */}
      <div className="bg-white/70 backdrop-blur-xl border border-slate-200/60 rounded-3xl overflow-hidden shadow-sm p-2">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 text-xs font-bold uppercase tracking-wider">
                <th className="p-4">Identity Matrix (User)</th>
                <th className="p-4">Cluster Role</th>
                <th className="p-4">Gateway Status</th>
                <th className="p-4">Joined Node</th>
                <th className="p-4 text-right">Terminal Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs font-medium text-slate-700">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-10 text-center text-slate-400 font-semibold">
                    ❌ No identity matrices match the current filtering scope.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-slate-50/50 transition-colors group">
                    
                    {/* ১. অবতার + নাম + ইমেইল */}
                    <td className="p-4 flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-slate-800 to-slate-950 text-white font-bold flex items-center justify-center shadow-inner uppercase">
                        {user.avatar}
                      </div>
                      <div>
                        <span className="font-bold text-slate-900 block text-sm">{user.name}</span>
                        <span className="text-slate-400 font-medium text-[11px]">{user.email}</span>
                      </div>
                    </td>

                    {/* ২. ক্লাস্টার রোল ব্যাজ */}
                    <td className="p-4">
                      <span className={`px-2.5 py-0.5 rounded-lg text-[10px] font-black uppercase tracking-wider border ${
                        user.role === "ORGANIZER" ? "bg-blue-50 border-blue-100 text-blue-700" :
                        user.role === "JUDGE" ? "bg-purple-50 border-purple-100 text-purple-700" :
                        "bg-slate-100 border-slate-200 text-slate-700"
                      }`}>
                        {user.role}
                      </span>
                    </td>

                    {/* ৩. গেটওয়ে স্ট্যাটাস */}
                    <td className="p-4">
                      <span className={`px-2 py-0.5 rounded-md text-[11px] font-bold ${
                        user.status === "Verified" || user.status === "Active" ? "text-emerald-600 bg-emerald-50 border border-emerald-100" :
                        user.status === "Pending Verification" ? "text-amber-600 bg-amber-50 border border-amber-100 animate-pulse" :
                        "text-rose-600 bg-rose-50 border border-rose-100"
                      }`}>
                        {user.status}
                      </span>
                    </td>

                    {/* ৪. জয়েনিং ডেট */}
                    <td className="p-4 text-slate-400 font-semibold">
                      {user.joined}
                    </td>

                    {/* ৫. অ্যাডমিন টার্মিনাল অ্যাকশন বাটনস */}
                    <td className="p-4 text-right space-x-1">
                      
                      {/* যদি অর্গানাইজার ভেরিফিকেশন পেন্ডিং থাকে তবে ভেরিফাই বাটন শো হবে */}
                      {user.role === "ORGANIZER" && user.status === "Pending Verification" && (
                        <button
                          onClick={() => handleVerifyOrganizer(user.id)}
                          className="p-2 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-xl hover:bg-emerald-100 transition shadow-sm"
                          title="Verify Organizer Credentials"
                        >
                          <ShieldCheck className="w-3.5 h-3.5" />
                        </button>
                      )}

                      {/* রোল সোয়াপ বাটন */}
                      <button
                        onClick={() => handleRoleChange(user.id, user.role)}
                        className="p-2 bg-slate-100 text-slate-600 border border-slate-200 rounded-xl hover:bg-slate-900 hover:text-white hover:border-transparent transition shadow-sm"
                        title="Swap Matrix Role"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                      </button>

                      {/* ব্যান / আনব্যান টগল বাটন */}
                      <button
                        onClick={() => handleToggleBan(user.id, user.status)}
                        className={`p-2 border rounded-xl transition shadow-sm ${
                          user.status === "Banned" 
                            ? "bg-amber-50 border-amber-200 text-amber-600 hover:bg-amber-100" 
                            : "bg-rose-50 border-rose-100 text-rose-500 hover:bg-rose-500 hover:text-white hover:border-transparent"
                        }`}
                        title={user.status === "Banned" ? "Unban Account" : "Enforce Ban Block"}
                      >
                        {user.status === "Banned" ? <UserCheck className="w-3.5 h-3.5" /> : <UserX className="w-3.5 h-3.5" />}
                      </button>

                      {/* মেম্বর রেকর্ড সম্পূর্ণ মুছুন */}
                      <button
                        onClick={() => handleDeleteUser(user.id, user.name)}
                        className="p-2 bg-slate-50 text-slate-400 hover:text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-100 rounded-xl transition"
                        title="Purge Identity Object"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>

                    </td>

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}