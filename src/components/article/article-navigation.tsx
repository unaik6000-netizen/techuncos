import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Article } from "@/types";

/** Previous / next article navigation, ordered by publish date. */
export function ArticleNavigation({
  prev,
  next,
}: {
  prev: Article | null;
  next: Article | null;
}) {
  if (!prev && !next) return null;

  return (
    <nav
      aria-label="Article navigation"
      className="container-shell mt-12 grid max-w-4xl gap-4 sm:grid-cols-2"
    >
      {prev ? (
        <Link
          href={`/article/${prev.slug}`}
          className="group flex flex-col rounded-card border border-border bg-card p-5 transition-colors hover:border-border-strong"
        >
          <span className="inline-flex items-center gap-1.5 text-xs text-faint">
            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" aria-hidden="true" />
            Previous
          </span>
          <span
            {...(prev.lang ? { lang: prev.lang } : {})}
            className="mt-2 line-clamp-2 text-sm font-medium text-foreground group-hover:text-brand-sky"
          >
            {prev.title}
          </span>
        </Link>
      ) : (
        <span />
      )}

      {next && (
        <Link
          href={`/article/${next.slug}`}
          className="group flex flex-col rounded-card border border-border bg-card p-5 text-right transition-colors hover:border-border-strong sm:items-end"
        >
          <span className="inline-flex items-center gap-1.5 text-xs text-faint">
            Next
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </span>
          <span
            {...(next.lang ? { lang: next.lang } : {})}
            className="mt-2 line-clamp-2 text-sm font-medium text-foreground group-hover:text-brand-sky"
          >
            {next.title}
          </span>
        </Link>
      )}
    </nav>
  );
}
