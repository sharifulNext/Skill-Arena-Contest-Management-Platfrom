"use client";

import { useState } from "react";
import { 
  Cpu, Sliders, Terminal, Settings, RefreshCw, 
  Layers, CheckCircle, AlertCircle, Save, HelpCircle 
} from "lucide-react";
import Swal from "sweetalert2";

// 📋 ডামি এআই ইনবাউন্ড ইভেন্ট লগস
const initialLogs = [
  { id: "log_1", timestamp: "10:52:11 PM", model: "Gemini 1.5 Pro", event: "Scored Submission #4021", status: "SUCCESS", latency: "1.8s" },
  { id: "log_2", timestamp: "10:48:05 PM", model: "GPT-4o", event: "Prompt Token Limit Exceeded", status: "FAILED", latency: "0.4s" },
  { id: "log_3", timestamp: "10:31:42 PM", model: "Gemini 1.5 Pro", event: "Code Quality Evaluation (User: Dev_Anik)", status: "SUCCESS", latency: "2.1s" },
];

export default function AIControlPanel() {
  // ⚡ ১. কোর এআই স্টেট কন্ট্রোল
  const [isAIEnabled, setIsAIEnabled] = useState(true);
  const [selectedModel, setSelectedModel] = useState("gemini-1.5-pro");
  const [systemPrompt, setSystemPrompt] = useState(
    "You are an expert code auditor. Analyze the submitted Next.js repository framework against strict performance, safety parameters, and architectural pattern metrics..."
  );

  // 📊 ২. এআই স্কোরিং কনফিগ স্টেট (আপনার দেওয়া অবজেক্ট রিকোয়ারমেন্ট)
  const [weights, setWeights] = useState({
    uiux: 25,
    codeQuality: 35,
    performance: 20,
    innovation: 10,
    documentation: 10,
  });

  const [logs, setLogs] = useState(initialLogs);

  // 🔄 স্কোরিং ম্যাট্রিক্স চেঞ্জ হ্যান্ডলার
  const handleWeightChange = (key: keyof typeof weights, value: number) => {
    setWeights((prev) => ({ ...prev, [key]: value }));
  };

  // 📐 টোটাল ওয়েট ক্যালকুলেশন ভ্যালিডেশন (১০০% মিলতে হবে)
  const totalWeight = weights.uiux + weights.codeQuality + weights.performance + weights.innovation + weights.documentation;

  // 💾 গ্লোবাল কনফিগারেশন সেভ গেটওয়ে
  const handleSaveConfig = () => {
    if (totalWeight !== 100) {
      Swal.fire({
        icon: "error",
        title: "Matrix Inbalance! ⚠️",
        text: `Total dynamic weight allocation must equal exactly 100%. Current sum is ${totalWeight}%.`,
        confirmButtonColor: "#e11d48",
        customClass: { popup: "rounded-3xl" }
      });
      return;
    }

    Swal.fire({
      icon: "success",
      title: "AI Matrix Synchronized",
      text: "Scoring metrics, prompt guidelines, and LLM endpoints updated successfully.",
      confirmButtonColor: "#0f172a",
      customClass: { popup: "rounded-3xl" }
    });
  };

  return (
    <div className="p-4 sm:p-6 md:p-10 space-y-8 bg-slate-50 min-h-screen">
      
      {/* 👑 হেডার ট্র্যাকার */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-5">
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
            <Cpu className="w-7 h-7 sm:w-8 h-8 text-indigo-600 shrink-0" /> AI Control Engine
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm font-medium pl-1">Toggle automated review agents, calibrate algorithmic evaluation scores, and monitor live token logs.</p>
        </div>

        {/* ⚡ গ্লোবাল অন/অফ সুইচ */}
        <button 
          onClick={() => setIsAIEnabled(!isAIEnabled)}
          className={`w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2.5 shadow-sm border ${
            isAIEnabled 
              ? "bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100" 
              : "bg-rose-50 border-rose-200 text-rose-700 hover:bg-rose-100"
          }`}
        >
          <div className={`w-2.5 h-2.5 rounded-full ${isAIEnabled ? "bg-emerald-500 animate-pulse" : "bg-rose-500"}`} />
          {isAIEnabled ? "AUTOMATED AI REVIEW: ACTIVE" : "AUTOMATED AI REVIEW: DISABLED"}
        </button>
      </div>

      {/* ⚙️ মেইন গ্রিড লেআউট */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* কলাম ১ এবং ২: স্কোরিং এবং প্রম্পট কনফিগারেশন */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* 📊 ১. এআই স্কোরিং কনফিগ মেকার */}
          <div className="bg-white border border-slate-200/70 p-6 rounded-3xl shadow-sm space-y-6">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Sliders className="w-5 h-5 text-indigo-600" /> Algorithmic Scoring Framework
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {Object.entries(weights).map(([key, value]) => (
                <div key={key} className="space-y-2 bg-slate-50/50 p-4 rounded-2xl border border-slate-100">
                  <div className="flex justify-between items-center text-xs font-bold capitalize text-slate-700">
                    <span>{key === "uiux" ? "UI/UX Fidelity" : key.replace(/([A-Z])/g, ' $1')}</span>
                    <span className="text-indigo-600 bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded-md font-mono">{value}%</span>
                  </div>
                  <input 
                    type="range" 
                    min="0" 
                    max="50" 
                    value={value}
                    disabled={!isAIEnabled}
                    onChange={(e) => handleWeightChange(key as keyof typeof weights, parseInt(e.target.value) || 0)}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600 disabled:opacity-40"
                  />
                </div>
              ))}
            </div>

            {/* ভ্যালিডেশন বার ইন্ডিকেটর */}
            <div className={`p-4 rounded-xl flex items-center justify-between border text-xs font-bold ${
              totalWeight === 100 
                ? "bg-emerald-50/70 border-emerald-200/60 text-emerald-700" 
                : "bg-amber-50/70 border-amber-200/60 text-amber-700"
            }`}>
              <div className="flex items-center gap-2">
                {totalWeight === 100 ? <CheckCircle className="w-4 h-4 shrink-0" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
                <span>Allocation Calibration System ({totalWeight}/100%)</span>
              </div>
              <span className="font-mono">{totalWeight === 100 ? "Ready" : `${100 - totalWeight}% Remaining`}</span>
            </div>
          </div>

          {/* 📝 ২. সিস্টেম প্রম্পট অ্যান্ড মডেল সিলেকশন প্যানেল */}
          <div className="bg-white border border-slate-200/70 p-6 rounded-3xl shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start md:items-center gap-4 border-b border-slate-100 pb-4">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Terminal className="w-5 h-5 text-indigo-600" /> System Prompt Blueprint
              </h3>

              {/* মডেল সিলেকশন ড্রপডাউন */}
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Layers className="w-4 h-4 text-slate-400 shrink-0" />
                <select
                  value={selectedModel}
                  disabled={!isAIEnabled}
                  onChange={(e) => setSelectedModel(e.target.value)}
                  className="w-full sm:w-auto px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-600 focus:outline-none focus:border-slate-900 cursor-pointer disabled:opacity-50"
                >
                  <option value="gemini-1.5-pro">Gemini 1.5 Pro (Recommended)</option>
                  <option value="gpt-4o">OpenAI GPT-4o</option>
                  <option value="claude-3-5-sonnet">Claude 3.5 Sonnet</option>
                </select>
              </div>
            </div>

            {/* প্রম্পট টেক্সটেরিয়া */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500">LLM Core Instruction Persona Injection</label>
              <textarea 
                rows={5}
                value={systemPrompt}
                disabled={!isAIEnabled}
                onChange={(e) => setSystemPrompt(e.target.value)}
                className="w-full p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-mono text-slate-700 focus:outline-none focus:border-slate-900 leading-relaxed font-medium disabled:opacity-50"
              />
            </div>

            {/* একশন বাটন */}
            <div className="flex justify-end pt-2">
              <button
                onClick={handleSaveConfig}
                disabled={!isAIEnabled}
                className="w-full sm:w-auto px-5 py-2.5 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-slate-800 transition shadow-sm flex items-center justify-center gap-2 disabled:opacity-40"
              >
                <Save className="w-4 h-4" /> Save Core AI Settings
              </button>
            </div>
          </div>

        </div>

        {/* কলাম ৩: লাইভ অপারেশনাল লগস */}
        <div className="space-y-4">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 px-1">
            <Settings className="w-4 h-4 text-slate-500" /> Live Operational Metrics
          </h3>

          <div className="bg-white border border-slate-200/60 p-5 rounded-3xl shadow-sm space-y-4">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <span className="text-xs font-bold text-slate-400">Telemetry Stream Logs</span>
              <button 
                onClick={() => setLogs([...initialLogs])} 
                className="p-1.5 text-slate-400 hover:text-slate-900 rounded-lg hover:bg-slate-50 transition"
                title="Flush and Sync Logs"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* লগ ট্র্যাকার লিস্ট */}
            <div className="space-y-3 max-h-[480px] overflow-y-auto">
              {logs.map((log) => (
                <div key={log.id} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2 text-[11px] font-medium">
                  <div className="flex justify-between items-center">
                    <span className="font-mono text-slate-400">{log.timestamp}</span>
                    <span className={`px-2 py-0.5 rounded text-[9px] font-black ${
                      log.status === "SUCCESS" ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
                    }`}>
                      {log.status}
                    </span>
                  </div>

                  <p className="text-slate-800 font-bold tracking-tight">{log.event}</p>
                  
                  <div className="flex justify-between items-center text-[10px] text-slate-400 font-semibold pt-1">
                    <span>Engine: <span className="text-slate-600 font-bold ml-0.5">{log.model}</span></span>
                    <span>Latency: <span className="text-slate-600 font-mono ml-0.5">{log.latency}</span></span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}