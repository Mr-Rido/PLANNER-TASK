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
} from "lucide-react";

export function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    { label: "Dashboard", href: "/", icon: LayoutDashboard },
    { label: "Tasks", href: "/tasks", icon: CheckSquare },
    { label: "Calendar", href: "/calendar", icon: Calendar },
    { label: "Subjects", href: "/subjects", icon: BookOpen },
    { label: "Progress", href: "/progress", icon: BarChart3 },
    { label: "Settings", href: "/settings", icon: Settings },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0c1220]/95 backdrop-blur-lg border-t border-slate-800/80 px-2 py-2 flex items-center justify-around safe-area-pb">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href;

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center gap-1 py-1 px-2.5 rounded-xl transition-all ${isActive
                ? "text-purple-400 font-medium"
                : "text-slate-400 hover:text-slate-200"
              }`}
          >
            <div
              className={`p-1.5 rounded-lg transition-all ${isActive
                  ? "bg-purple-600/20 text-purple-300 border border-purple-500/30"
                  : "bg-transparent"
                }`}
            >
              <Icon className="w-4 h-4" />
            </div>
            <span className="text-[10px] tracking-tight">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
