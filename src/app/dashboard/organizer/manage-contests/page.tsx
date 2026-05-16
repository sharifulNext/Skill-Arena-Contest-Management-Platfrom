"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FolderLock, Plus, Loader2, Inbox } from "lucide-react";
import Link from "next/link";
import ContestCard from "@/components/dashboard/ContestCard";
import Swal from "sweetalert2";

export default function ManageContestsPage() {
  const [contests, setContests] = useState([]);
  const [loading, setLoading] = useState(true);

  // ১. ডাটা ফেচ ফাংশন
  const fetchContests = async () => {
    try {
      const res = await fetch("/api/contest");
      const data = await res.json();
      if (data.success) setContests(data.data);
    } catch (error) {
      console.error("Failed to fetch contests:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContests();
  }, []);

  // ২. কনটেস্ট ডিলিট হ্যান্ডলার
  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0f172a",
      cancelButtonColor: "#f43f5e",
      confirmButtonText: "Yes, delete it!",
      customClass: { popup: "rounded-3xl" },
    });

    if (!result.isConfirmed) return;

    try {
      const res = await fetch(`/api/contest/${id}`, { method: "DELETE" });
      const data = await res.json();

      if (data.success) {
        setContests((prev) => prev.filter((c: any) => c._id !== id));
        Swal.fire({ icon: "success", title: "Deleted!", text: "Contest removed.", customClass: { popup: "rounded-3xl" } });
      } else {
        throw new Error(data.error);
      }
    } catch (error: any) {
      Swal.fire({ icon: "error", title: "Error", text: error.message, customClass: { popup: "rounded-3xl" } });
    }
  };

  // ৩. কনটেস্ট পাবলিশ হ্যান্ডলার (Draft -> Published)
  const handlePublish = async (id: string) => {
    try {
      const res = await fetch(`/api/contest/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "Published" }),
      });
      const data = await res.json();

      if (data.success) {
        setContests((prev: any) =>
          prev.map((c: any) => (c._id === id ? { ...c, status: "Published" } : c))
        );
        Swal.fire({ icon: "success", title: "Live!", text: "Contest published successfully.", customClass: { popup: "rounded-3xl" } });
      }
    } catch (error) {
      console.error("Publishing error:", error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Title Header with Action Button */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-white/80 backdrop-blur-md rounded-2xl border border-slate-200/60 shadow-sm">
            <FolderLock className="h-6 w-6 text-slate-800" />
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-tight text-slate-900">Manage Arenas</h1>
            <p className="text-slate-500 text-xs font-medium">Review, configure, edit, and push your hackathons to live server.</p>
          </div>
        </div>

        <Link
          href="/dashboard/organizer/create-contest"
          className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm transition shadow-lg shadow-slate-900/5"
        >
          <Plus className="w-4 h-4" />
          Create Contest
        </Link>
      </div>

      {/* Main Grid Content Area */}
      {loading ? (
        <div className="flex h-60 items-center justify-center">
          <Loader2 className="w-8 h-8 text-slate-800 animate-spin" />
        </div>
      ) : contests.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center text-center p-12 border border-dashed border-slate-300/60 rounded-3xl bg-white/30 backdrop-blur-sm min-h-[300px]"
        >
          <div className="p-4 bg-slate-100 rounded-full mb-4 text-slate-400">
            <Inbox className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-800">No Contests Hosted Yet</h3>
          <p className="text-slate-500 text-sm max-w-xs mt-1">Ready to find some elite talents? Launch your very first competition now.</p>
        </motion.div>
      ) : (
        <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {contests.map((contest: any) => (
              <ContestCard
                key={contest._id}
                contest={contest}
                onDelete={handleDelete}
                onPublish={handlePublish}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}