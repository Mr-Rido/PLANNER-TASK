export function Badge({ children, variant = "default", className = "" }) {
  const variants = {
    default: "bg-slate-800 text-slate-300 border-slate-700",
    purple: "bg-purple-500/15 text-purple-300 border-purple-500/30",
    blue: "bg-sky-500/15 text-sky-300 border-sky-500/30",
    emerald: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
    amber: "bg-amber-500/15 text-amber-300 border-amber-500/30",
    rose: "bg-rose-500/15 text-rose-300 border-rose-500/30",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${
        variants[variant] || variants.default
      } ${className}`}
    >
      {children}
    </span>
  );
}

export function PriorityBadge({ priority }) {
  switch (priority) {
    case "High":
      return (
        <Badge variant="rose">
          <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse" />
          Tinggi
        </Badge>
      );
    case "Medium":
      return (
        <Badge variant="amber">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
          Sedang
        </Badge>
      );
    case "Low":
    default:
      return (
        <Badge variant="blue">
          <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
          Rendah
        </Badge>
      );
  }
}

export function StatusBadge({ status }) {
  switch (status) {
    case "Completed":
      return (
        <Badge variant="emerald">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          Selesai
        </Badge>
      );
    case "In Progress":
      return (
        <Badge variant="purple">
          <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
          Sedang Dikerjakan
        </Badge>
      );
    case "To Do":
    default:
      return (
        <Badge variant="default">
          <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
          Belum Dimulai
        </Badge>
      );
  }
}
