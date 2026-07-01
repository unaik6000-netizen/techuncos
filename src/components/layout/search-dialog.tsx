"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import { Search, X, CornerDownLeft } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { ARTICLES } from "@/data/articles";
import { CategoryBadge } from "@/components/ui/badge";
import { transitions } from "@/lib/motion";

/**
 * ⌘K command-style search. Filters local articles by title/excerpt as you
 * type. Backdrop blur signals a dismissible layer; Esc and backdrop close it.
 */
export function SearchDialog({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setQuery("");
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return ARTICLES.slice(0, 5);
    return ARTICLES.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.excerpt.toLowerCase().includes(q),
    ).slice(0, 6);
  }, [query]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={transitions.fast}
          className="fixed inset-0 z-[100] flex items-start justify-center bg-black/60 px-4 pt-[12vh] backdrop-blur-sm"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label="Search articles"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: -8 }}
            transition={transitions.base}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-xl overflow-hidden rounded-2xl border border-border-strong bg-popover shadow-[0_24px_64px_rgba(0,0,0,0.6)]"
          >
            <div className="flex items-center gap-3 border-b border-border px-4">
              <Search className="h-5 w-5 shrink-0 text-faint" aria-hidden="true" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search articles…"
                aria-label="Search articles"
                className="h-14 flex-1 bg-transparent text-[15px] text-foreground placeholder:text-faint focus:outline-none"
              />
              <button
                onClick={onClose}
                aria-label="Close search"
                className="rounded-md p-1 text-faint transition-colors hover:text-foreground"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <div className="max-h-[52vh] overflow-y-auto p-2">
              {results.length === 0 ? (
                <p className="px-3 py-8 text-center text-sm text-faint">
                  No articles match “{query}”.
                </p>
              ) : (
                <ul className="space-y-0.5">
                  {results.map((a) => (
                    <li key={a.id}>
                      <Link
                        href={`/article/${a.slug}`}
                        onClick={onClose}
                        className="flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-muted"
                      >
                        <div className="min-w-0 flex-1">
                          <p
                            {...(a.lang ? { lang: a.lang } : {})}
                            className="truncate text-sm font-medium text-foreground"
                          >
                            {a.title}
                          </p>
                        </div>
                        <CategoryBadge slug={a.category} />
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="flex items-center justify-between border-t border-border px-4 py-2.5 text-[11px] text-faint">
              <span className="inline-flex items-center gap-1.5">
                <CornerDownLeft className="h-3.5 w-3.5" aria-hidden="true" /> to open
              </span>
              <span>
                <kbd className="rounded border border-border px-1.5 py-0.5 font-mono">
                  Esc
                </kbd>{" "}
                to close
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
