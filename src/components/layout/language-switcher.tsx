"use client";

import { useState, useRef, useEffect } from "react";
import { Globe, Check, ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { LOCALES } from "@/constants/navigation";
import { transitions } from "@/lib/motion";
import { cn } from "@/lib/utils";
import type { Locale } from "@/types";

/**
 * Language switcher. Persists the choice to localStorage (session preference).
 * In the i18n phase this will also route to /ml, /en, /hi.
 */
export function LanguageSwitcher() {
  const [open, setOpen] = useState(false);
  const [locale, setLocale] = useState<Locale>("en");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem("techuncos-locale") as Locale | null;
    if (saved) setLocale(saved);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const choose = (code: Locale) => {
    setLocale(code);
    localStorage.setItem("techuncos-locale", code);
    setOpen(false);
  };

  const current = LOCALES.find((l) => l.code === locale)!;

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Change language"
        className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-border px-2.5 text-[13px] font-medium text-muted-foreground transition-colors hover:border-border-strong hover:text-foreground"
      >
        <Globe className="h-4 w-4" aria-hidden="true" />
        <span className="tabular-nums">{current.short}</span>
        <ChevronDown
          className={cn("h-3.5 w-3.5 transition-transform", open && "rotate-180")}
          aria-hidden="true"
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            role="menu"
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={transitions.fast}
            className="absolute right-0 top-11 z-50 w-40 overflow-hidden rounded-xl border border-border bg-popover p-1 shadow-[0_16px_40px_rgba(0,0,0,0.5)]"
          >
            {LOCALES.map((l) => (
              <li key={l.code} role="none">
                <button
                  role="menuitemradio"
                  aria-checked={l.code === locale}
                  onClick={() => choose(l.code)}
                  className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  <span lang={l.code}>{l.label}</span>
                  {l.code === locale && (
                    <Check className="h-4 w-4 text-brand-sky" aria-hidden="true" />
                  )}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
