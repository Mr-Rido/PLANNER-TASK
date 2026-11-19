"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  CheckSquare,
  Calendar,
  BookOpen,
  BarChart3,
  Settings,
  Sparkles,
  GraduationCap,
} from "lucide-react";

export function Sidebar({ profile }) {
  const pathname = usePathname();

  const navItems = [
    { label: "Dashboard", href: "/", icon: LayoutDashboard },
    { label: "My Tasks", href: "/tasks", icon: CheckSquare },
    { label: "Calendar", href: "/calendar", icon: Calendar },
    { label: "Subjects", href: "/subjects", icon: BookOpen },
    { label: "Progress", href: "/progress", icon: BarChart3 },
    { label: "Settings", href: "/settings", icon: Settings },
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 h-screen sticky top-0 bg-[#0c1220]/95 border-r border-slate-800/80 p-5 shrink-0 z-30 select-none">
      {/* Brand Header */}
      <div className="flex items-center gap-3 px-2 py-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center text-white shadow-lg shadow-purple-500/25">
          <GraduationCap className="w-5 h-5" />
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <h1 className="text-base font-bold text-white tracking-tight">
              TaskPlanner
            </h1>
            <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
              PRO
            </span>
          </div>
          <p className="text-[11px] text-slate-400">Academic Productivity</p>
        </div>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 space-y-1.5">
        <p className="text-[11px] font-semibold text-slate-500 px-3 uppercase tracking-wider mb-2">
          Menu Utama
        </p>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group relative ${isActive
                  ? "bg-purple-600/15 text-purple-300 border border-purple-500/30 glow-purple font-semibold"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 border border-transparent"
                }`}
            >
              {isActive && (
                <span className="absolute left-0 top-2 bottom-2 w-1 bg-purple-500 rounded-r-full" />
              )}
              <Icon
                className={`w-4 h-4 transition-colors ${isActive
                    ? "text-purple-400"
                    : "text-slate-500 group-hover:text-slate-300"
                  }`}
              />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Futuristic Student Mini Profile Card */}
      <div className="pt-4 border-t border-slate-800/80">
        <div className="glass-card rounded-xl p-3 flex items-center gap-3 border border-slate-800/80">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-purple-500 to-sky-500 flex items-center justify-center font-bold text-white text-xs shrink-0 shadow-md">
            {profile?.name
              ? profile.name
                .split(" ")
                .map((n) => n[0])
                .slice(0, 2)
                .join("")
              : "ST"}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-slate-200 truncate">
              {profile?.name || "Mahasiswa"}
            </p>
            <p className="text-[10px] text-purple-300 truncate">
              {profile?.major || "Sistem Informasi"}
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
