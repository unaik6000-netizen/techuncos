"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ExternalLink } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { ADMIN_NAV } from "@/lib/admin-nav";
import type { AdminStats } from "@/data/admin";
import { cn } from "@/lib/utils";

export function Sidebar({
  stats,
  onNavigate,
}: {
  stats: Pick<AdminStats, "commentsPending">;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col">
      <div className="flex h-16 items-center border-b border-border px-5">
        <Logo />
        <span className="ml-2 rounded-md border border-border bg-muted px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-faint">
          Admin
        </span>
      </div>

      <nav className="flex-1 space-y-6 overflow-y-auto px-3 py-5" aria-label="Admin">
        {ADMIN_NAV.map((section) => (
          <div key={section.title}>
            <p className="px-3 pb-1.5 text-[10px] font-medium uppercase tracking-[0.12em] text-faint">
              {section.title}
            </p>
            <ul className="space-y-0.5">
              {section.items.map((item) => {
                const active =
                  item.href === "/admin"
                    ? pathname === "/admin"
                    : pathname.startsWith(item.href);
                const badge =
                  item.badgeKey === "commentsPending"
                    ? stats.commentsPending
                    : 0;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={onNavigate}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "group flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                        active
                          ? "bg-muted font-medium text-foreground"
                          : "text-muted-foreground hover:bg-muted/60 hover:text-foreground",
                      )}
                    >
                      <item.icon
                        className={cn(
                          "h-[18px] w-[18px] shrink-0",
                          active ? "text-brand-sky" : "text-faint group-hover:text-foreground",
                        )}
                        aria-hidden="true"
                      />
                      <span className="flex-1">{item.label}</span>
                      {badge > 0 && (
                        <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-sky px-1.5 text-[11px] font-medium text-primary-foreground">
                          {badge}
                        </span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      <div className="border-t border-border p-3">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted/60 hover:text-foreground"
        >
          <ExternalLink className="h-[18px] w-[18px] text-faint" aria-hidden="true" />
          View live site
        </Link>
      </div>
    </div>
  );
}
