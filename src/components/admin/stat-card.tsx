import { ArrowDownRight, ArrowUpRight, type LucideIcon } from "lucide-react";
import { Reveal } from "@/components/motion";
import { cn } from "@/lib/utils";

export function StatCard({
  label,
  value,
  icon: Icon,
  deltaPct,
  hint,
}: {
  label: string;
  value: string | number;
  icon: LucideIcon;
  deltaPct?: number;
  hint?: string;
}) {
  const up = (deltaPct ?? 0) >= 0;

  return (
    <Reveal className="rounded-card border border-border bg-card p-5 transition-colors hover:border-border-strong">
      <div className="flex items-center justify-between">
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-muted text-brand-sky">
          <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
        </span>
        {deltaPct !== undefined && (
          <span
            className={cn(
              "inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-xs font-medium",
              up ? "bg-success/10 text-success" : "bg-error/10 text-error",
            )}
          >
            {up ? (
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            ) : (
              <ArrowDownRight className="h-3.5 w-3.5" aria-hidden="true" />
            )}
            {Math.abs(deltaPct)}%
          </span>
        )}
      </div>
      <p className="mt-4 font-display text-3xl font-semibold tabular-nums text-foreground">
        {value}
      </p>
      <p className="mt-1 text-sm text-muted-foreground">{label}</p>
      {hint && <p className="mt-0.5 text-xs text-faint">{hint}</p>}
    </Reveal>
  );
}
