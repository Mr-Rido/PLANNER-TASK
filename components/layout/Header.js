"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import {
  Bell,
  Plus,
  Sparkles,
  Calendar as CalendarIcon,
  CheckCircle2,
  Clock,
  Trash2,
} from "lucide-react";
import { Button } from "../ui/Button";

export function Header({ profile, activities = [], onOpenAddTask }) {
  const pathname = usePathname();
  const [showNotifications, setShowNotifications] = useState(false);

  const getPageInfo = () => {
    switch (pathname) {
      case "/":
        return {
          title: "Dashboard Utama",
          subtitle: "Ringkasan produktivitas dan deadline akademikmu.",
        };
      case "/tasks":
        return {
          title: "Manajemen Tugas",
          subtitle: "Kelola, filter, dan selesaikan semua tugas kuliah.",
        };
      case "/calendar":
        return {
          title: "Jadwal & Kalender",
          subtitle: "Visualisasi jadwal tugas dan deadline bulanan.",
        };
      case "/subjects":
        return {
          title: "Mata Kuliah",
          subtitle: "Daftar mata kuliah dan distribusi beban akademik.",
        };
      case "/progress":
        return {
          title: "Statistik & Produktivitas",
          subtitle: "Evaluasi capaian belajar dan persentase kelulusan tugas.",
        };
      case "/settings":
        return {
          title: "Pengaturan & Profil",
          subtitle: "Kelola profil mahasiswa dan preferensi data lokal.",
        };
      default:
        return {
          title: "Student Task Planner",
          subtitle: "Academic Management System",
        };
    }
  };

  const { title, subtitle } = getPageInfo();

  return (
    <header className="sticky top-0 z-30 bg-[#0b0f19]/85 backdrop-blur-md border-b border-slate-800/80 px-4 sm:px-8 py-4 flex items-center justify-between gap-4">
      {/* Title & Subtitle */}
      <div>
        <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight flex items-center gap-2">
          {title}
        </h2>
        <p className="text-xs text-slate-400 hidden sm:block mt-0.5">{subtitle}</p>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        {/* Quick Add Button */}
        <Button
          onClick={onOpenAddTask}
          size="sm"
          className="shadow-md shadow-purple-600/30"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">Tambah Tugas</span>
        </Button>

        {/* Notifications Popover */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-colors relative"
            aria-label="Notifikasi"
          >
            <Bell className="w-4 h-4" />
            {activities.length > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-purple-500 ring-2 ring-[#0b0f19] animate-pulse" />
            )}
          </button>

          {showNotifications && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setShowNotifications(false)}
              />
              <div className="absolute right-0 mt-2 w-80 sm:w-96 glass-panel rounded-2xl border border-slate-700/80 p-4 shadow-2xl z-50 animate-in fade-in zoom-in-95">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-purple-400" />
                    <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                      Aktivitas Terakhir
                    </h4>
                  </div>
                  <span className="text-[10px] text-slate-500">
                    {activities.length} catatan
                  </span>
                </div>

                <div className="max-h-72 overflow-y-auto divide-y divide-slate-800/50 mt-2 pr-1 space-y-1">
                  {activities.length === 0 ? (
                    <p className="text-xs text-slate-500 text-center py-6">
                      Belum ada aktivitas tercatat.
                    </p>
                  ) : (
                    activities.slice(0, 7).map((act) => (
                      <div key={act.id} className="py-2.5 flex items-start gap-2.5">
                        <div className="w-6 h-6 rounded-lg bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-300 shrink-0 mt-0.5">
                          {act.icon === "check" ? (
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          ) : act.icon === "trash" ? (
                            <Trash2 className="w-3.5 h-3.5 text-rose-400" />
                          ) : (
                            <Clock className="w-3.5 h-3.5 text-purple-400" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-slate-300 leading-snug">
                            {act.text}
                          </p>
                          <span className="text-[10px] text-slate-500">
                            {act.timestamp}
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Profile Avatar Pill */}
        <div className="flex items-center gap-2 pl-2 border-l border-slate-800">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white text-xs font-bold ring-2 ring-purple-500/30">
            {profile?.name
              ? profile.name
                .split(" ")
                .map((n) => n[0])
                .slice(0, 2)
                .join("")
              : "ST"}
          </div>
          <div className="hidden lg:block text-left">
            <p className="text-xs font-medium text-slate-200">
              {profile?.name || "Mahasiswa"}
            </p>
            <p className="text-[10px] text-slate-400">
              {profile?.semester || "Semester 5"}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
