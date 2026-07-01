"use client";

import { useState, useRef, useEffect } from "react";
import { Menu, Search, Bell, ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { ThemeToggle } from "./theme-toggle";
import { LogoutButton } from "./logout-button";
import { useToast } from "@/components/ui/toast";
import { ROLE_LABELS, isRole } from "@/lib/auth/rbac";
import { transitions } from "@/lib/motion";
import type { AdminTheme, AdminUserInfo } from "./admin-shell";

export function Topbar({
  onMenuClick,
  theme,
  onToggleTheme,
  user,
}: {
  onMenuClick: () => void;
  theme: AdminTheme;
  onToggleTheme: () => void;
  user: AdminUserInfo;
}) {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  const roleLabel = isRole(user.role) ? ROLE_LABELS[user.role] : user.role;
  const initials = user.name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border bg-background/80 px-4 backdrop-blur-xl sm:px-6">
      <button
        type="button"
        onClick={onMenuClick}
        aria-label="Open menu"
        className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border text-foreground lg:hidden"
      >
        <Menu className="h-5 w-5" aria-hidden="true" />
      </button>

      <div className="relative hidden max-w-sm flex-1 sm:block">
        <Search
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-faint"
          aria-hidden="true"
        />
        <label htmlFor="admin-search" className="sr-only">
          Search admin
        </label>
        <input
          id="admin-search"
          placeholder="Search…"
          className="h-9 w-full rounded-lg border border-input bg-subtle pl-9 pr-3 text-sm text-foreground placeholder:text-faint focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/20"
        />
      </div>

      <div className="ml-auto flex items-center gap-2">
        <button
          type="button"
          onClick={() => toast("No new notifications", "info")}
          aria-label="Notifications"
          className="relative inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-border-strong hover:text-foreground"
        >
          <Bell className="h-[18px] w-[18px]" aria-hidden="true" />
          <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-brand-sky" />
        </button>

        <ThemeToggle theme={theme} onToggle={onToggleTheme} />

        <div ref={ref} className="relative">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-haspopup="menu"
            aria-expanded={open}
            className="inline-flex items-center gap-2 rounded-lg border border-border py-1 pl-1 pr-2 transition-colors hover:border-border-strong"
          >
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-brand-gradient text-xs font-medium text-primary-foreground">
              {initials}
            </span>
            <span className="hidden text-sm font-medium text-foreground sm:inline">
              {user.name}
            </span>
            <ChevronDown className="h-3.5 w-3.5 text-faint" aria-hidden="true" />
          </button>

          <AnimatePresence>
            {open && (
              <motion.div
                role="menu"
                initial={{ opacity: 0, y: -6, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6, scale: 0.98 }}
                transition={transitions.fast}
                className="absolute right-0 top-11 z-50 w-56 overflow-hidden rounded-xl border border-border bg-popover p-1 shadow-[0_16px_40px_rgba(0,0,0,0.4)]"
              >
                <div className="border-b border-border px-3 py-2.5">
                  <p className="truncate text-sm font-medium text-foreground">
                    {user.name}
                  </p>
                  <p className="mt-0.5 text-xs text-brand-sky">{roleLabel}</p>
                </div>
                <div className="p-1">
                  <LogoutButton />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
