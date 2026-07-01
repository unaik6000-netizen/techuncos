import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { AreaChart } from "./mini-chart";
import { formatCompact, cn } from "@/lib/utils";
import type { AdminStats } from "@/data/admin";

export function AnalyticsOverview({ stats }: { stats: AdminStats }) {
  const up = stats.viewsDeltaPct >= 0;

  return (
    <div className="rounded-card border border-border bg-card p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="font-display text-base font-semibold text-foreground">
            Views
          </h2>
          <p className="mt-1 flex items-baseline gap-2">
            <span className="font-display text-2xl font-semibold tabular-nums text-foreground">
              {formatCompact(stats.viewsTotal)}
            </span>
            <span
              className={cn(
                "inline-flex items-center gap-0.5 text-xs font-medium",
                up ? "text-success" : "text-error",
              )}
            >
              {up ? (
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              ) : (
                <ArrowDownRight className="h-3.5 w-3.5" aria-hidden="true" />
              )}
              {Math.abs(stats.viewsDeltaPct)}%
            </span>
          </p>
        </div>
        <span className="rounded-lg border border-border bg-muted px-2.5 py-1 text-xs text-muted-foreground">
          Last 14 days
        </span>
      </div>

      <div className="mt-5">
        <AreaChart data={stats.viewsSeries} className="h-44 w-full" />
      </div>
    </div>
  );
}
