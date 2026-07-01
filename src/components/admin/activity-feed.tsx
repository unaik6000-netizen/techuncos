import { FileCheck2, MessageSquare, PencilLine, UserPlus } from "lucide-react";
import { RECENT_ACTIVITY, type ActivityKind } from "@/data/admin";

const KIND: Record<ActivityKind, { icon: typeof FileCheck2; color: string }> = {
  publish: { icon: FileCheck2, color: "var(--success)" },
  comment: { icon: MessageSquare, color: "var(--info)" },
  edit: { icon: PencilLine, color: "var(--warning)" },
  subscriber: { icon: UserPlus, color: "var(--brand-blue)" },
};

export function ActivityFeed() {
  return (
    <div className="rounded-card border border-border bg-card p-5">
      <h2 className="font-display text-base font-semibold text-foreground">
        Recent activity
      </h2>
      <ul className="mt-4 space-y-1">
        {RECENT_ACTIVITY.map((item) => {
          const { icon: Icon, color } = KIND[item.kind];
          return (
            <li key={item.id} className="flex items-start gap-3 py-2">
              <span
                className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg"
                style={{
                  color,
                  backgroundColor: `color-mix(in srgb, ${color} 12%, transparent)`,
                }}
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm leading-snug text-foreground">{item.text}</p>
                <p className="text-xs text-faint">{item.time}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
