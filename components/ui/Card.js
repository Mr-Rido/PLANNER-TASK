"use client";

import { motion } from "framer-motion";

export function Card({
  children,
  className = "",
  hover = true,
  glow = false,
  ...props
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={hover ? { y: -2, transition: { duration: 0.2 } } : {}}
      className={`glass-panel rounded-2xl p-5 relative overflow-hidden transition-all duration-300 ${
        glow ? "glow-purple border-purple-500/30" : "hover:border-slate-700/80"
      } ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function CardHeader({ children, className = "" }) {
  return (
    <div className={`flex items-center justify-between gap-4 mb-4 ${className}`}>
      {children}
    </div>
  );
}

export function CardTitle({ children, className = "" }) {
  return (
    <h3 className={`text-base font-semibold text-slate-100 tracking-tight ${className}`}>
      {children}
    </h3>
  );
}

export function CardDescription({ children, className = "" }) {
  return (
    <p className={`text-xs text-slate-400 leading-relaxed ${className}`}>
      {children}
    </p>
  );
}
