"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";

export function Toast({ toast, onClose }) {
  if (!toast) return null;

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />,
    info: <Info className="w-5 h-5 text-purple-400 shrink-0" />,
  };

  const borders = {
    success: "border-emerald-500/30 bg-emerald-950/80 text-emerald-200",
    error: "border-rose-500/30 bg-rose-950/80 text-rose-200",
    info: "border-purple-500/30 bg-purple-950/80 text-purple-200",
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        className="fixed bottom-20 md:bottom-8 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-2xl border backdrop-blur-md shadow-2xl shadow-black/50 text-sm font-medium"
      >
        <div className={`flex items-center gap-2.5 p-3 rounded-xl border ${borders[toast.type || "info"]}`}>
          {icons[toast.type || "info"]}
          <span>{toast.message}</span>
          <button
            onClick={onClose}
            className="ml-2 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
