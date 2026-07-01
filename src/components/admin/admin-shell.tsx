"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Sidebar } from "./sidebar";
import { Topbar } from "./topbar";
import { ToastProvider } from "@/components/ui/toast";
import { transitions } from "@/lib/motion";
import { cn } from "@/lib/utils";

export type AdminTheme = "dark" | "light";

export interface AdminUserInfo {
  name: string;
  role: string;
}

export function AdminShell({
  children,
  commentsPending,
  user,
}: {
  children: React.ReactNode;
  commentsPending: number;
  user: AdminUserInfo;
}) {
  const [theme, setTheme] = useState<AdminTheme>("dark");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("techuncos-admin-theme") as AdminTheme | null;
    if (saved) setTheme(saved);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const toggleTheme = () => {
    setTheme((t) => {
      const next = t === "dark" ? "light" : "dark";
      localStorage.setItem("techuncos-admin-theme", next);
      return next;
    });
  };

  const stats = { commentsPending };

  return (
    <div className={cn("min-h-dvh bg-background text-foreground", theme === "light" && "light")}>
      <ToastProvider>
        {/* Desktop sidebar */}
        <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 border-r border-border bg-subtle lg:block">
          <Sidebar stats={stats} />
        </aside>

        {/* Mobile drawer */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={transitions.fast}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileOpen(false)}
            >
              <motion.aside
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={transitions.base}
                onClick={(e) => e.stopPropagation()}
                className="h-dvh w-72 max-w-[82%] border-r border-border bg-subtle"
              >
                <Sidebar stats={stats} onNavigate={() => setMobileOpen(false)} />
              </motion.aside>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="lg:pl-64">
          <Topbar
            onMenuClick={() => setMobileOpen(true)}
            theme={theme}
            onToggleTheme={toggleTheme}
            user={user}
          />
          <main className="p-4 sm:p-6 lg:p-8">{children}</main>
        </div>
      </ToastProvider>
    </div>
  );
}
