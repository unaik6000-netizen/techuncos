"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Search, X, CornerDownLeft, Loader2 } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { createBrowserClient } from "@/lib/supabase/client";
import { CategoryBadge } from "@/components/ui/badge";
import { transitions } from "@/lib/motion";
import type { CategorySlug, Locale } from "@/types";

interface SearchHit {
  id: string;
  slug: string;
  title: string;
  category: CategorySlug;
  lang: Locale | null;
}

/**
 * ⌘K command-style search. Queries Supabase directly (anon key — safe in
 * the browser, RLS guarantees only published articles are searchable),
 * debounced as you type. Backdrop blur signals a dismissible layer.
 */
export function SearchDialog({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchHit[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setQuery("");
      setResults([]);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;
    const supabase = createBrowserClient();
    const controller = new AbortController();
    setLoading(true);

    const timer = setTimeout(async () => {
      const q = query.trim();
      const builder = supabase
        .from("articles")
        .select("id, slug, title, category, lang")
        .eq("status", "published")
        .order("published_at", { ascending: false })
        .limit(q ? 6 : 5);

      const { data } = q
        ? await builder.or(`title.ilike.%${q}%,excerpt.ilike.%${q}%`)
        : await builder;

      if (!controller.signal.aborted) {
        setResults(data ?? []);
        setLoading(false);
      }
    }, 250);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [query, open]);

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
              {loading && (
                <Loader2 className="h-4 w-4 shrink-0 animate-spin text-faint" aria-hidden="true" />
              )}
              <button
                onClick={onClose}
                aria-label="Close search"
                className="rounded-md p-1 text-faint transition-colors hover:text-foreground"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <div className="max-h-[52vh] overflow-y-auto p-2">
              {results.length === 0 && !loading ? (
                <p className="px-3 py-8 text-center text-sm text-faint">
                  {query ? `No articles match "${query}".` : "Start typing to search…"}
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
