"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FolderLock, Plus, Loader2, Inbox, X, Save, Trophy, Sparkles, Coins } from "lucide-react";
import Link from "next/link";
import ContestCard from "@/components/dashboard/ContestCard";
import Swal from "sweetalert2";

interface ContestType {
  _id: string;
  title: string;
  description: string;
  category: string;
  difficulty: string;
  prize: string;
  entryFee: number; // ৳ এন্ট্রি ফি অলরেডি ইন্টারফেসে আছে
  startDate: string;
  endDate: string;
  rules: string;
  status: "Draft" | "Published" | "Completed";
  banner: string;
}

export default function ManageContestsPage() {
  const [contests, setContests] = useState<ContestType[]>([]);
  const [loading, setLoading] = useState(true);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const [editData, setEditData] = useState<ContestType | null>(null);

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

  // ✅ Edit modal খোলা
  const handleEditOpen = (contest: ContestType) => {
    setEditData({ ...contest }); // copy করে নাও — original mutate না হয়
    setEditModalOpen(true);
  };

  // ✅ Edit form submit
  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editData) return;

    setEditLoading(true);
    try {
      const res = await fetch(`/api/contest/${editData._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: editData.title,
          description: editData.description,
          category: editData.category,
          difficulty: editData.difficulty,
          prize: editData.prize,
          entryFee: Number(editData.entryFee) || 0, // 🚀 নাম্বার ফরম্যাট সেফটি নিশ্চিত করা হলো
          startDate: editData.startDate,
          endDate: editData.endDate,
          rules: editData.rules,
        }),
      });

      const data = await res.json();

      if (data.success) {
        // Refetch না করে local state আপডেট
        setContests((prev) =>
          prev.map((c) => (c._id === editData._id ? { ...c, ...editData, entryFee: Number(editData.entryFee) || 0 } : c))
        );
        setEditModalOpen(false);
        Swal.fire({
          icon: "success",
          title: "Updated!",
          text: "Contest updated successfully.",
          customClass: { popup: "rounded-3xl" },
          confirmButtonColor: "#0f172a",
        });
      } else {
        throw new Error(data.error);
      }
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message,
        customClass: { popup: "rounded-3xl" },
      });
    } finally {
      setEditLoading(false);
    }
  };

  // Delete
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
        setContests((prev) => prev.filter((c) => c._id !== id));
        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "Contest removed.",
          customClass: { popup: "rounded-3xl" },
        });
      } else {
        throw new Error(data.error);
      }
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message,
        customClass: { popup: "rounded-3xl" },
      });
    }
  };

  // Publish
  const handlePublish = async (id: string) => {
    try {
      const res = await fetch(`/api/contest/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "Published" }),
      });
      const data = await res.json();

      if (data.success) {
        setContests((prev) =>
          prev.map((c) => (c._id === id ? { ...c, status: "Published" } : c))
        );
        Swal.fire({
          icon: "success",
          title: "Live!",
          text: "Contest published successfully.",
          customClass: { popup: "rounded-3xl" },
        });
      }
    } catch (error) {
      console.error("Publishing error:", error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-white/80 backdrop-blur-md rounded-2xl border border-slate-200/60 shadow-sm">
            <FolderLock className="h-6 w-6 text-slate-800" />
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-tight text-slate-900">Manage Arenas</h1>
            <p className="text-slate-500 text-xs font-medium">
              Review, configure, edit, and push your hackathons to live server.
            </p>
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

      {/* Content */}
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
          <p className="text-slate-500 text-sm max-w-xs mt-1">
            Ready to find some elite talents? Launch your very first competition now.
          </p>
        </motion.div>
      ) : (
        <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {contests.map((contest) => (
              <ContestCard
                key={contest._id}
                contest={contest}
                onDelete={handleDelete}
                onPublish={handlePublish}
                onEdit={handleEditOpen}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      {/* ✅ Edit Modal */}
      <AnimatePresence>
        {editModalOpen && editData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
            onClick={() => setEditModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto scrollbar-none"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-slate-100 sticky top-0 bg-white rounded-t-3xl z-10">
                <h2 className="text-xl font-black text-slate-900">Edit Contest</h2>
                <button
                  onClick={() => setEditModalOpen(false)}
                  className="p-2 hover:bg-slate-100 rounded-xl transition"
                >
                  <X className="w-5 h-5 text-slate-500" />
                </button>
              </div>

              {/* Modal Form */}
              <form onSubmit={handleEditSubmit} className="p-6 space-y-5">

                {/* Title */}
                <div className="space-y-1.5">
                  <label className="text-sm font-bold text-slate-700 flex items-center gap-1.5">
                    <Trophy className="w-4 h-4 text-slate-400" /> Contest Title
                  </label>
                  <input
                    type="text"
                    required
                    value={editData.title}
                    onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 font-medium transition"
                  />
                </div>

                {/* 🚀 2-Column Grid: Prize Pool & Registration Fee */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-bold text-slate-700 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-slate-400" /> Prize Pool
                    </label>
                    <input
                      type="text"
                      required
                      value={editData.prize}
                      onChange={(e) => setEditData({ ...editData, prize: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 font-medium transition"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-bold text-slate-700 flex items-center gap-1.5">
                      <Coins className="w-4 h-4 text-slate-400" /> Registration Fee (BDT)
                    </label>
                    <input
                      type="number"
                      min="0"
                      required
                      placeholder="0 for Free entry"
                      value={editData.entryFee ?? 0}
                      onChange={(e) => setEditData({ ...editData, entryFee: Number(e.target.value) })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 font-medium transition"
                    />
                  </div>
                </div>

                {/* Category & Difficulty */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-bold text-slate-700">Category</label>
                    <select
                      value={editData.category}
                      onChange={(e) => setEditData({ ...editData, category: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 font-medium transition"
                    >
                      {["Coding","Quiz","Writing","Design","Photography","Hackathon","Debate","Video Contest"].map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-bold text-slate-700">Difficulty</label>
                    <select
                      value={editData.difficulty}
                      onChange={(e) => setEditData({ ...editData, difficulty: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 font-medium transition"
                    >
                      {["Beginner", "Intermediate", "Advanced"].map((d) => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Start & End Date */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-bold text-slate-700">Start Date</label>
                    <input
                      type="datetime-local"
                      required
                      value={editData.startDate?.slice(0, 16)}
                      onChange={(e) => setEditData({ ...editData, startDate: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 font-medium transition"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-bold text-slate-700">End Date</label>
                    <input
                      type="datetime-local"
                      required
                      value={editData.endDate?.slice(0, 16)}
                      onChange={(e) => setEditData({ ...editData, endDate: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 font-medium transition"
                    />
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-1.5">
                  <label className="text-sm font-bold text-slate-700">Description</label>
                  <textarea
                    rows={4}
                    required
                    value={editData.description}
                    onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 font-medium transition"
                  />
                </div>

                {/* Rules */}
                <div className="space-y-1.5">
                  <label className="text-sm font-bold text-slate-700">Rules</label>
                  <textarea
                    rows={3}
                    required
                    value={editData.rules}
                    onChange={(e) => setEditData({ ...editData, rules: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 font-medium transition"
                  />
                </div>

                {/* Buttons */}
                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setEditModalOpen(false)}
                    className="px-5 py-3 rounded-xl border border-slate-200 text-slate-600 font-semibold text-sm hover:bg-slate-50 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={editLoading}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 text-white font-semibold text-sm hover:bg-slate-800 transition disabled:opacity-50"
                  >
                    {editLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Save className="w-4 h-4" />
                    )}
                    {editLoading ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}