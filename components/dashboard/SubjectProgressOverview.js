"use client";

import Link from "next/link";
import { BookOpen, ArrowRight } from "lucide-react";
import { Card, CardHeader, CardTitle } from "../ui/Card";

export function SubjectProgressOverview({ subjects = [], tasks = [] }) {
  const subjectStats = subjects.map((sub) => {
    const subTasks = tasks.filter((t) => t.subjectId === sub.id);
    const total = subTasks.length;
    const completed = subTasks.filter((t) => t.status === "Completed").length;
    const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
    return {
      ...sub,
      total,
      completed,
      percent,
    };
  });

  return (
    <Card hover={false} className="p-6">
      <CardHeader className="mb-4">
        <div>
          <CardTitle className="text-base font-bold text-white flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-sky-400" />
            Distribusi Mata Kuliah
          </CardTitle>
          <p className="text-xs text-slate-400 mt-0.5">
            Persentase penyelesaian tugas per mata kuliah aktif.
          </p>
        </div>
        <Link
          href="/subjects"
          className="text-xs font-semibold text-sky-400 hover:text-sky-300 inline-flex items-center gap-1 group"
        >
          Kelola
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </CardHeader>

      <div className="space-y-4">
        {subjectStats.map((sub) => (
          <div key={sub.id} className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 min-w-0">
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: sub.color }}
                />
                <span className="font-medium text-slate-200 truncate">
                  {sub.name}
                </span>
                <span className="text-slate-500 text-[10px]">({sub.code})</span>
              </div>
              <span className="font-semibold text-slate-300 shrink-0">
                {sub.completed}/{sub.total}{" "}
                <span className="text-slate-500 font-normal">({sub.percent}%)</span>
              </span>
            </div>

            {/* Progress Bar with subject color */}
            <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${sub.percent}%`,
                  backgroundColor: sub.color,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
