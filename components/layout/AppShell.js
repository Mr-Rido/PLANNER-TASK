"use client";

import { useState } from "react";
import { usePlanner } from "@/hooks/usePlanner";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { BottomNav } from "./BottomNav";
import { TaskModal } from "../tasks/TaskModal";
import { Toast } from "../ui/Toast";

export function AppShell({ children }) {
  const {
    tasks,
    subjects,
    profile,
    activities,
    isLoaded,
    addTask,
  } = usePlanner();

  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  const handleCreateTask = (taskData) => {
    addTask(taskData);
    showToast(`Tugas "${taskData.title}" berhasil ditambahkan!`, "success");
  };

  return (
    <div className="min-h-screen flex bg-[#0b0f19] text-slate-100">
      {/* Desktop Sidebar */}
      <Sidebar profile={profile} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 pb-28 md:pb-8">
        <Header
          profile={profile}
          activities={activities}
          onOpenAddTask={() => setIsTaskModalOpen(true)}
        />

        <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto animate-in fade-in duration-300">
          {children}
        </main>
      </div>

      {/* Mobile Floating Action Button (FAB) for Quick Task Creation */}
      <button
        onClick={() => setIsTaskModalOpen(true)}
        className="md:hidden fixed bottom-20 right-5 z-40 w-13 h-13 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-600 text-white flex items-center justify-center shadow-xl shadow-purple-500/40 border border-purple-400/30 active:scale-95 transition-transform"
        aria-label="Tambah Tugas Cepat"
      >
        <span className="text-2xl leading-none font-light">+</span>
      </button>

      {/* Mobile Bottom Navigation */}
      <BottomNav />

      {/* Global Quick Add Task Modal */}
      <TaskModal
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
        onSubmit={handleCreateTask}
        subjects={subjects}
      />

      {/* Toast Notification */}
      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}
