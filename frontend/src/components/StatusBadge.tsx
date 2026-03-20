import { cn } from "@/lib/utils";

const statusConfig = {
  active: { label: "Active", className: "bg-success/15 text-success border-success/30" },
  "under-review": { label: "Under Review", className: "bg-warning/15 text-warning border-warning/30" },
  closed: { label: "Closed", className: "bg-muted text-muted-foreground border-border" },
};

export function StatusBadge({ status }: { status: "active" | "under-review" | "closed" }) {
  const config = statusConfig[status];
  return (
    <span className={cn("inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border", config.className)}>
      <span className={cn("h-1.5 w-1.5 rounded-full", {
        "bg-success": status === "active",
        "bg-warning": status === "under-review",
        "bg-muted-foreground": status === "closed",
      })} />
      {config.label}
    </span>
  );
}
