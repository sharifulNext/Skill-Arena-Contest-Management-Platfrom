"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, UserPlus, Shield, Mail, CheckCircle2, Clock, Award, Users } from "lucide-react";
import Swal from "sweetalert2";

// ১. টাইপ সেফটির জন্য ইন্টারফেস
interface Judge {
  id: string;
  name: string;
  email: string;
  expertise: string;
  status: "Active" | "Pending Invite";
  reviewsDone: number;
}

// ২. ডাটা ইনিশিয়ালাইজেশন
const initialJudges: Judge[] = [
  { id: "1", name: "Dr. Ariful Islam", email: "arif.islam@skillarena.com", expertise: "Backend & Cloud Architecture", status: "Active", reviewsDone: 14 },
  { id: "2", name: "Sania Rahman", email: "sania.design@gmail.com", expertise: "UI/UX & Product Design", status: "Active", reviewsDone: 9 },
  { id: "3", name: "Kevin Mitnick Jr.", email: "kevin.sec@arena.io", expertise: "Cyber Security & SecOps", status: "Pending Invite", reviewsDone: 0 },
];

export default function OrganizerJudgesPage() {
  const router = useRouter();
  const [judges, setJudges] = useState<Judge[]>(initialJudges);
  const [showInviteModal, setShowInviteModal] = useState<boolean>(false);
  const [newJudge, setNewJudge] = useState({ name: "", email: "", expertise: "" });

  // ৩. ইনভাইট হ্যান্ডলার
  const handleInviteJudge = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newJudge.name || !newJudge.email || !newJudge.expertise) return;

    const createdJudge: Judge = {
      id: String(judges.length + 1),
      ...newJudge,
      status: "Pending Invite",
      reviewsDone: 0
    };

    setJudges([...judges, createdJudge]);
    setShowInviteModal(false);
    setNewJudge({ name: "", email: "", expertise: "" });

    Swal.fire({
      icon: "success",
      title: "Invitation Sent! ✉️",
      text: `${createdJudge.name} has been invited.`,
      confirmButtonColor: "#0f172a"
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 p-6 sm:p-10 font-sans">
      <div className="max-w-7xl mx-auto space-y-6">
        
        <button 
          onClick={() => router.back()} 
          className="flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </button>

        <div className="flex justify-between items-center pb-2">
          <div>
            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
              <Shield className="w-8 h-8 text-slate-400" /> Judges Infrastructure
            </h1>
            <p className="text-slate-500 text-sm">Appoint tech experts and track audit speed.</p>
          </div>

          <button 
            onClick={() => setShowInviteModal(true)}
            className="px-5 py-3 rounded-xl bg-slate-900 text-white font-semibold hover:bg-slate-800 transition flex items-center gap-2 text-sm"
          >
            <UserPlus className="w-4 h-4" /> Invite Expert Judge
          </button>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-2xl flex items-center gap-4 shadow-sm border border-slate-100">
            <Users className="w-6 h-6 text-slate-400" />
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase">Total Panel</p>
              <p className="text-xl font-bold">{judges.length} Judges</p>
            </div>
          </div>
          {/* ... অন্যান্য স্ট্যাটস কার্ড */}
        </div>

        {/* Table Section */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b text-slate-400 text-sm font-semibold">
                <th className="pb-4">Judge Information</th>
                <th className="pb-4">Expertise</th>
                <th className="pb-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {judges.map((judge) => (
                <tr key={judge.id} className="border-b border-slate-50">
                  <td className="py-4 font-semibold">{judge.name}</td>
                  <td className="py-4 text-sm">{judge.expertise}</td>
                  <td className="py-4 text-sm">{judge.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-slate-900/20 backdrop-blur-md flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-3xl max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Appoint Guest Judge</h3>
            <form onSubmit={handleInviteJudge} className="space-y-4">
              <input type="text" placeholder="Full Name" value={newJudge.name} onChange={(e) => setNewJudge({...newJudge, name: e.target.value})} className="w-full p-3 rounded-xl bg-slate-50 border" required />
              <input type="email" placeholder="Email" value={newJudge.email} onChange={(e) => setNewJudge({...newJudge, email: e.target.value})} className="w-full p-3 rounded-xl bg-slate-50 border" required />
              <input type="text" placeholder="Expertise" value={newJudge.expertise} onChange={(e) => setNewJudge({...newJudge, expertise: e.target.value})} className="w-full p-3 rounded-xl bg-slate-50 border" required />
              <div className="flex gap-2 justify-end">
                <button type="button" onClick={() => setShowInviteModal(false)} className="px-4 py-2 text-sm font-semibold">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-slate-900 text-white rounded-xl text-sm">Send Invite</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}