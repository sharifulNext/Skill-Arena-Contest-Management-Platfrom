"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Trophy, Calendar, Trash2, Globe, Sparkles, Pencil } from "lucide-react";
import { cn } from "@/lib/utils";

interface Contest {
  _id: string;
  title: string;
  description: string;
  category: string;
  difficulty: string;
  prize: string;
  entryFee: number;
  startDate: string;
  endDate: string;
  rules: string;
  status: "Draft" | "Published" | "Completed";
  banner: string;
}

interface ContestCardProps {
  contest: Contest;
  onDelete: (id: string) => void;
  onPublish: (id: string) => void;
  onEdit: (contest: Contest) => void; // ✅ Edit callback
}

export default function ContestCard({ contest, onDelete, onPublish, onEdit }: ContestCardProps) {
  const [actionLoading, setActionLoading] = useState(false);

  const handlePublish = async () => {
    setActionLoading(true);
    await onPublish(contest._id);
    setActionLoading(false);
  };

  const handleDelete = async () => {
    setActionLoading(true);
    await onDelete(contest._id);
    setActionLoading(false);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="relative overflow-hidden rounded-3xl border border-white/60 bg-white/50 p-6 shadow-sm backdrop-blur-xl transition-all hover:shadow-md hover:border-slate-300/50 flex flex-col justify-between min-h-[250px]"
    >
      {/* Background Blobs */}
      <div className="absolute -right-10 -top-10 -z-10 h-24 w-24 rounded-full bg-indigo-500/5 blur-2xl" />
      <div className="absolute -left-10 -bottom-10 -z-10 h-24 w-24 rounded-full bg-blue-500/5 blur-2xl" />

      <div>
        {/* Header Tags */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-lg">
            {contest.category}
          </span>
          <span
            className={cn(
              "text-[11px] font-bold px-2.5 py-1 rounded-lg uppercase tracking-wider",
              contest.status === "Published"
                ? "bg-emerald-50 text-emerald-600 border border-emerald-200/50"
                : contest.status === "Completed"
                ? "bg-slate-100 text-slate-500 border border-slate-200/50"
                : "bg-amber-50 text-amber-600 border border-amber-200/50"
            )}
          >
            {contest.status}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold tracking-tight text-slate-800 line-clamp-1 mb-2">
          {contest.title}
        </h3>

        {/* Info Grid */}
        <div className="space-y-2 my-4 text-sm font-medium text-slate-500">
          <div className="flex items-center gap-2">
            <Trophy className="w-4 h-4 text-slate-400" />
            <span className="text-slate-700 font-semibold">{contest.prize}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-slate-400" />
            <span>{formatDate(contest.startDate)} - {formatDate(contest.endDate)}</span>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-slate-400" />
            <span
              className={cn(
                "text-xs px-2 py-0.5 rounded font-bold",
                contest.difficulty === "Advanced" && "bg-red-50 text-red-600",
                contest.difficulty === "Intermediate" && "bg-blue-50 text-blue-600",
                contest.difficulty === "Beginner" && "bg-slate-100 text-slate-600"
              )}
            >
              {contest.difficulty}
            </span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-100 mt-2">
        {/* Delete */}
        <button
          disabled={actionLoading}
          onClick={handleDelete}
          className="p-2.5 rounded-xl text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-100 transition disabled:opacity-50"
          title="Delete Contest"
        >
          <Trash2 className="w-4 h-4" />
        </button>

        {/* ✅ Edit Button */}
        <button
          disabled={actionLoading}
          onClick={() => onEdit(contest)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-50 text-blue-700 border border-blue-100 text-xs font-bold hover:bg-blue-100 transition disabled:opacity-50"
          title="Edit Contest"
        >
          <Pencil className="w-3.5 h-3.5" />
          Edit
        </button>

        {/* Publish — শুধু Draft এ দেখাবে */}
        {contest.status === "Draft" && (
          <button
            disabled={actionLoading}
            onClick={handlePublish}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold shadow-sm hover:bg-slate-800 transition disabled:opacity-50"
          >
            <Globe className="w-3.5 h-3.5" />
            Publish Live
          </button>
        )}
      </div>
    </motion.div>
  );
}