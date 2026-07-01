"use client";

import { Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";
import type { AdminTheme } from "./admin-shell";

export function ThemeToggle({
  theme,
  onToggle,
}: {
  theme: AdminTheme;
  onToggle: () => void;
}) {
  const isDark = theme === "dark";
  return (
    <button
      type="button"
      onClick={onToggle}
      role="switch"
      aria-checked={isDark}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-border-strong hover:text-foreground"
    >
      <motion.span
        key={theme}
        initial={{ rotate: -30, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        {isDark ? (
          <Moon className="h-[18px] w-[18px]" aria-hidden="true" />
        ) : (
          <Sun className="h-[18px] w-[18px]" aria-hidden="true" />
        )}
      </motion.span>
    </button>
  );
}
