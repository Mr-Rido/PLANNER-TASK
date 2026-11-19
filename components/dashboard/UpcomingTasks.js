"use client";

import Link from "next/link";
import {
  Calendar,
  CheckCircle2,
  Clock,
  ArrowRight,
  AlertCircle,
  ExternalLink,
} from "lucide-react";
import { Card, CardHeader, CardTitle } from "../ui/Card";
import { PriorityBadge } from "../ui/Badge";

export function UpcomingTasks({ tasks = [], subjects = [], onToggleStatus }) {
  const subjectMap = subjects.reduce((acc, sub) => {
    acc[sub.id] = sub;
    return acc;
  }, {});

  const today = new Date().toISOString().split("T")[0];

  // Filter tasks that are not completed, sorted by dueDate ascending
  const upcoming = [...tasks]
    .filter((t) => t.status !== "Completed")
    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
    .slice(0, 5);

  const formatDeadline = (dueDate) => {
    if (!dueDate) return "-";
    if (dueDate === today) return { label: "Hari Ini", isUrgent: true };

    const due = new Date(dueDate);
    const now = new Date(today);
    const diffTime = due - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return { label: `Terlambat (${Math.abs(diffDays)}h)`, isOverdue: true };
    if (diffDays === 1) return { label: "Besok", isUrgent: true };
    if (diffDays <= 7) return { label: `${diffDays} hari lagi`, isNormal: true };
    return { label: dueDate, isNormal: true };
  };

  return (
    <Card hover={false} className="p-6">
      <CardHeader className="mb-4">
        <div>
          <CardTitle className="text-base font-bold text-white flex items-center gap-2">
            <Clock className="w-4 h-4 text-purple-400" />
            Deadline Terdekat
          </CardTitle>
          <p className="text-xs text-slate-400 mt-0.5">
            Tugas yang membutuhkan penyelesaian segera.
          </p>
        </div>
        <Link
          href="/tasks"
          className="text-xs font-semibold text-purple-400 hover:text-purple-300 inline-flex items-center gap-1 group"
        >
          Lihat Semua
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </CardHeader>

      {upcoming.length === 0 ? (
        <div className="text-center py-10 px-4 border border-dashed border-slate-800 rounded-2xl bg-slate-900/40">
          <CheckCircle2 className="w-10 h-10 text-emerald-400/60 mx-auto mb-2" />
          <p className="text-sm font-semibold text-slate-300">
            Hore! Tidak ada deadline mendesak.
          </p>
          <p className="text-xs text-slate-500 mt-1">
            Semua tugas aktif sudah selesai atau belum ada tugas yang ditambahkan.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {upcoming.map((task) => {
            const subject = subjectMap[task.subjectId];
            const deadline = formatDeadline(task.dueDate);

            return (
              <div
                key={task.id}
                className="group p-3.5 rounded-xl bg-slate-900/70 border border-slate-800/80 hover:border-purple-500/40 transition-all flex items-start justify-between gap-3"
              >
                <div className="flex items-start gap-3 min-w-0">
                  {/* Quick Status Toggle Button */}
                  <button
                    onClick={() => onToggleStatus(task.id)}
                    title="Klik untuk ubah status pengerjaan"
                    className="mt-0.5 w-5 h-5 rounded-lg border border-slate-700 hover:border-purple-500 flex items-center justify-center text-transparent hover:text-purple-400 transition-colors shrink-0"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </button>

                  <div className="min-w-0">
                    <h4 className="text-sm font-semibold text-slate-100 group-hover:text-purple-300 transition-colors truncate">
                      {task.title}
                    </h4>
                    <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                      {subject && (
                        <span
                          className="text-[11px] font-medium px-2 py-0.5 rounded-md border"
                          style={{
                            backgroundColor: `${subject.color}15`,
                            borderColor: `${subject.color}40`,
                            color: subject.color,
                          }}
                        >
                          {subject.code}
                        </span>
                      )}
                      <PriorityBadge priority={task.priority} />
                    </div>
                  </div>
                </div>

                {/* Due Date Indicator */}
                <div className="shrink-0 text-right">
                  <span
                    className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-md border ${
                      deadline.isOverdue
                        ? "bg-rose-500/15 text-rose-300 border-rose-500/30"
                        : deadline.isUrgent
                        ? "bg-amber-500/15 text-amber-300 border-amber-500/30"
                        : "bg-slate-800 text-slate-400 border-slate-700"
                    }`}
                  >
                    <Calendar className="w-3 h-3" />
                    {deadline.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </Card>
  );
}
