"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Trophy, Calendar, Sparkles, BookOpen, Layers, Loader2, Upload, X, Coins } from "lucide-react";
import Swal from "sweetalert2";

export default function CreateContestForm() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "Coding",
    difficulty: "Intermediate",
    prize: "",
    entryFee: 0, // 👈 নতুন যুক্ত করা হয়েছে (ডিফল্ট ০ অর্থাৎ ফ্রি)
    startDate: "",
    endDate: "",
    rules: "",
    banner: "", 
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      Swal.fire({
        icon: "error",
        title: "File Too Large",
        text: "Please select an image under 2MB.",
        customClass: { popup: "rounded-3xl" }
      });
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      setImagePreview(base64String); 
      setFormData((prev) => ({ ...prev, banner: base64String })); 
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    setFormData((prev) => ({ ...prev, banner: "" }));
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.banner) {
      Swal.fire({ icon: "warning", title: "Image Required", text: "Please upload a contest banner image.", customClass: { popup: "rounded-3xl" } });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/contest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");

      Swal.fire({
        icon: "success",
        title: "Contest Created! 🎉",
        text: "Saved successfully with Cloudinary Link.",
        customClass: { popup: "rounded-3xl" },
        confirmButtonColor: "#0f172a"
      });

      router.push("/dashboard/organizer/manage-contests");
      router.refresh();
    } catch (error: any) {
      Swal.fire({ icon: "error", title: "Oops...", text: error.message, customClass: { popup: "rounded-3xl" } });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white/70 backdrop-blur-xl border border-slate-200/60 p-8 rounded-3xl shadow-sm space-y-6">
      
      {/* Title & Prize */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
            <Trophy className="w-4 h-4 text-slate-400" /> Contest Title
          </label>
          <input 
            type="text" 
            placeholder="e.g., Next.js Speedrun Hackathon" 
            required
            className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 font-medium transition"
            onChange={(e) => setFormData({...formData, title: e.target.value})}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-slate-400" /> Prize Pool Details
          </label>
          <input 
            type="text" 
            placeholder="e.g., $500 Cash + Certificates" 
            required
            className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 font-medium transition"
            onChange={(e) => setFormData({...formData, prize: e.target.value})}
          />
        </div>
      </div>

      {/* Category & Difficulty */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
            <Layers className="w-4 h-4 text-slate-400" /> Category
          </label>
          <select 
            value={formData.category}
            className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 font-medium transition"
            onChange={(e) => setFormData({...formData, category: e.target.value})}
          >
            <option value="Coding">Coding</option>
            <option value="Quiz">Quiz</option>
            <option value="Writing">Writing</option>
            <option value="Design">Design</option>
            <option value="Photography">Photography</option>
            <option value="Hackathon">Hackathon</option>
            <option value="Debate">Debate</option>
            <option value="Video Contest">Video Contest</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
            <Layers className="w-4 h-4 text-slate-400" /> Difficulty Level
          </label>
          <select 
            className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 font-medium transition"
            onChange={(e) => setFormData({...formData, difficulty: e.target.value})}
          >
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </select>
        </div>
      </div>

      {/* 👉 নতুন যুক্ত করা হয়েছে: Entry Fee Field (Full Width) */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
          <Coins className="w-4 h-4 text-slate-400" /> Registration Entry Fee (USD)
        </label>
        <input 
          type="number" 
          min="0"
          value={formData.entryFee}
          placeholder="Enter fee amount (e.g. 500) or keep 0 for Free" 
          required
          className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 font-medium transition"
          onChange={(e) => setFormData({...formData, entryFee: Number(e.target.value)})}
        />
        <p className="text-[11px] text-slate-400 font-medium">Keep it <strong className="text-slate-600">0</strong> if this arena challenge has no registration criteria.</p>
      </div>

      {/* 📁 Upload Box */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
          <Upload className="w-4 h-4 text-slate-400" /> Contest Banner Image
        </label>
        
        <input 
          type="file" 
          ref={fileInputRef}
          accept="image/*"
          className="hidden" 
          onChange={handleFileChange}
        />

        {!imagePreview ? (
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-slate-300 rounded-2xl p-6 text-center cursor-pointer hover:bg-slate-50 transition-all flex flex-col items-center justify-center gap-2 group"
          >
            <div className="p-3 bg-slate-100 rounded-full text-slate-400 group-hover:text-slate-600 transition">
              <Upload className="w-6 h-6" />
            </div>
            <p className="text-sm font-bold text-slate-700">Click to upload from Laptop/PC</p>
            <p className="text-xs text-slate-400 font-medium">Cloudinary Active (Max 2MB)</p>
          </div>
        ) : (
          <div className="relative rounded-2xl overflow-hidden border border-slate-200 max-h-60 w-full bg-slate-50">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={imagePreview} alt="Uploaded Banner" className="w-full h-60 object-cover" />
            <button 
              type="button"
              onClick={removeImage}
              className="absolute top-3 right-3 p-2 bg-rose-500 hover:bg-rose-600 text-white rounded-full shadow-md transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Timelines */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-slate-400" /> Start Date & Time
          </label>
          <input 
            type="datetime-local" 
            required
            className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 font-medium transition"
            onChange={(e) => setFormData({...formData, startDate: e.target.value})}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-slate-400" /> End Date & Time
          </label>
          <input 
            type="datetime-local" 
            required
            className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 font-medium transition"
            onChange={(e) => setFormData({...formData, endDate: e.target.value})}
          />
        </div>
      </div>

      {/* Description */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-slate-400" /> Detailed Description
        </label>
        <textarea 
          rows={4}
          placeholder="Describe the context goal..."
          required
          className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 font-medium transition"
          onChange={(e) => setFormData({...formData, description: e.target.value})}
        />
      </div>

      {/* Rules */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-slate-400" /> Contest Rules & Submissions Criteria
        </label>
        <textarea 
          rows={3}
          placeholder="e.g., 1. Must follow the prompt guidelines..."
          required
          className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 font-medium transition"
          onChange={(e) => setFormData({...formData, rules: e.target.value})}
        />
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-end gap-4 pt-4 border-t border-slate-100">
        <button 
          disabled={loading}
          type="submit" 
          className="px-6 py-3 rounded-xl bg-slate-900 text-white font-semibold shadow-lg shadow-slate-900/10 hover:bg-slate-800 transition flex items-center gap-2 disabled:opacity-50"
        >
          {loading && <Loader2 className="w-4 h-4 animate-spin" />}
          {loading ? "Optimizing & Uploading..." : "Save Contest"}
        </button>
      </div>
    </form>
  );
}