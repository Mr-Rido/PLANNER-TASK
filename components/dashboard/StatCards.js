"use client";

import { useMemo } from "react";
import { CheckCircle2, Clock, AlertCircle, ListTodo } from "lucide-react";
import { Card } from "../ui/Card";

export function StatCards({ tasks = [] }) {
  const stats = useMemo(() => {
    const today = new Date().toISOString().split("T")[0];

    let completed = 0;
    let inProgress = 0;
    let todo = 0;
    let overdue = 0;

    tasks.forEach((t) => {
      if (t.status === "Completed") {
        completed++;
      } else {
        if (t.dueDate && t.dueDate < today) {
          overdue++;
        }
        if (t.status === "In Progress") {
          inProgress++;
        } else {
          todo++;
        }
      }
    });

    const total = tasks.length;
    const completionPercent = total > 0 ? Math.round((completed / total) * 100) : 0;

    return { total, completed, inProgress, todo, overdue, completionPercent };
  }, [tasks]);

  const cards = [
    {
      title: "Total Tugas",
      value: stats.total,
      label: "Seluruh mata kuliah",
      icon: ListTodo,
      color: "purple",
      badgeColor: "bg-purple-500/15 text-purple-300 border-purple-500/30",
      iconBg: "bg-purple-500/20 text-purple-400",
    },
    {
      title: "Tugas Selesai",
      value: stats.completed,
      label: `${stats.completionPercent}% terselesaikan`,
      icon: CheckCircle2,
      color: "emerald",
      badgeColor: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
      iconBg: "bg-emerald-500/20 text-emerald-400",
    },
    {
      title: "Dalam Pengerjaan",
      value: stats.inProgress,
      label: "Sedang diproses",
      icon: Clock,
      color: "sky",
      badgeColor: "bg-sky-500/15 text-sky-300 border-sky-500/30",
      iconBg: "bg-sky-500/20 text-sky-400",
    },
    {
      title: "Perlu Perhatian",
      value: stats.overdue > 0 ? `${stats.overdue} Terlambat` : `${stats.todo} Menunggu`,
      label: stats.overdue > 0 ? "Melewati batas deadline" : "Belum mulai dikerjakan",
      icon: AlertCircle,
      color: stats.overdue > 0 ? "rose" : "amber",
      badgeColor:
        stats.overdue > 0
          ? "bg-rose-500/15 text-rose-300 border-rose-500/30"
          : "bg-amber-500/15 text-amber-300 border-amber-500/30",
      iconBg:
        stats.overdue > 0
          ? "bg-rose-500/20 text-rose-400 animate-pulse"
          : "bg-amber-500/20 text-amber-400",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {cards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <Card key={idx} hover={true} className="p-5 flex flex-col justify-between">
            <div className="flex items-center justify-between gap-3 mb-3">
              <span className="text-xs font-semibold text-slate-400 tracking-wide">
                {card.title}
              </span>
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${card.iconBg}`}>
                <Icon className="w-5 h-5" />
              </div>
            </div>

            <div>
              <div className="text-2xl font-extrabold text-white tracking-tight mb-1">
                {card.value}
              </div>
              <p className="text-xs text-slate-400">{card.label}</p>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
