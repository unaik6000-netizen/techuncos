import Link from "next/link";
import { PlusCircle, MessageSquare, Image as ImageIcon, Settings } from "lucide-react";
import { Stagger, StaggerItem } from "@/components/motion";

const ACTIONS = [
  {
    label: "New article",
    description: "Write & publish",
    href: "/admin/articles/new",
    icon: PlusCircle,
    primary: true,
  },
  {
    label: "Moderate comments",
    description: "Review the queue",
    href: "/admin/comments",
    icon: MessageSquare,
  },
  {
    label: "Media library",
    description: "Upload & manage",
    href: "/admin/media",
    icon: ImageIcon,
  },
  { label: "Settings", description: "Site & SEO", href: "/admin/settings", icon: Settings },
];

export function QuickActions() {
  return (
    <Stagger className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {ACTIONS.map((a) => (
        <StaggerItem key={a.href} className="h-full">
          <Link
            href={a.href}
            className="group flex h-full flex-col justify-between gap-6 rounded-card border border-border bg-card p-4 transition-colors hover:border-border-strong"
          >
            <span
              className={
                a.primary
                  ? "inline-flex h-10 w-10 items-center justify-center rounded-lg bg-brand-gradient text-primary-foreground"
                  : "inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-muted text-brand-sky"
              }
            >
              <a.icon className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <p className="text-sm font-medium text-foreground group-hover:text-brand-sky">
                {a.label}
              </p>
              <p className="mt-0.5 text-xs text-faint">{a.description}</p>
            </div>
          </Link>
        </StaggerItem>
      ))}
    </Stagger>
  );
}
