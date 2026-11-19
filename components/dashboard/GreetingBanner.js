"use client";

import { useMemo } from "react";
import { Sparkles, Target, Flame } from "lucide-react";

export function GreetingBanner({ profile, tasks = [] }) {
  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour >= 4 && hour < 11) return "Selamat Pagi";
    if (hour >= 11 && hour < 15) return "Selamat Siang";
    if (hour >= 15 && hour < 18) return "Selamat Sore";
    return "Selamat Malam";
  }, []);

  const pendingHighPriority = useMemo(() => {
    return tasks.filter((t) => t.priority === "High" && t.status !== "Completed").length;
  }, [tasks]);

  const completedCount = useMemo(() => {
    return tasks.filter((t) => t.status === "Completed").length;
  }, [tasks]);

  const completionRate = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;

  return (
    <div className="relative overflow-hidden rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-purple-950/60 via-slate-900/80 to-slate-900/90 border border-purple-500/20 shadow-xl glow-purple mb-8">
      {/* Decorative Blur Spheres */}
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-sky-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 text-xs font-medium">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>Fokus Akademik & Manajemen Waktu</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {greeting},{" "}
            <span className="bg-gradient-to-r from-purple-300 to-sky-300 bg-clip-text text-transparent">
              {profile?.name || "Mahasiswa"}
            </span>
            ! 🚀
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {pendingHighPriority > 0
              ? `Kamu memiliki ${pendingHighPriority} tugas prioritas tinggi yang perlu perhatianmu hari ini.`
              : "Semua tugas prioritas tinggi terkendali. Terus pertahankan ritme belajar yang baik!"}
          </p>
        </div>

        {/* Quick Highlights Badge */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="glass-card px-4 py-3 rounded-2xl border border-slate-700/60 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-300">
              <Target className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] text-slate-400">Total Selesai</p>
              <p className="text-lg font-bold text-white">
                {completionRate}%{" "}
                <span className="text-xs font-normal text-slate-400">
                  ({completedCount}/{tasks.length})
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
