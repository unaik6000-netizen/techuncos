import Link from "next/link";
import { Clock } from "lucide-react";
import { ArticleCover } from "./article-cover";
import { CategoryBadge } from "@/components/ui/badge";
import { formatDate, formatCompact, cn } from "@/lib/utils";
import type { Article } from "@/types";

/**
 * Default article card. Hover state is pure CSS (group-hover) — no per-card
 * JS — so a grid of these stays fast. `priority` lifts the first cover for LCP.
 */
export function ArticleCard({
  article,
  priority,
  className,
}: {
  article: Article;
  priority?: boolean;
  className?: string;
}) {
  return (
    <Link
      href={`/article/${article.slug}`}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-card border border-border bg-card transition-colors duration-300 hover:border-border-strong focus-visible:outline-none",
        className,
      )}
    >
      <ArticleCover
        category={article.category}
        title={article.title}
        src={article.cover}
        priority={priority}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      />

      <div className="flex flex-1 flex-col p-5">
        <CategoryBadge slug={article.category} className="mb-3 self-start" />

        <h3
          {...(article.lang ? { lang: article.lang } : {})}
          className="text-[17px] font-semibold leading-snug text-foreground transition-colors duration-200 group-hover:text-brand-sky"
        >
          {article.title}
        </h3>

        <p
          {...(article.lang ? { lang: article.lang } : {})}
          className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground"
        >
          {article.excerpt}
        </p>

        <div className="mt-4 flex items-center gap-3 pt-4 text-xs text-faint">
          <span className="tabular-nums">{formatDate(article.publishedAt)}</span>
          <span aria-hidden="true">·</span>
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" aria-hidden="true" />
            {article.readTime} min
          </span>
          <span aria-hidden="true">·</span>
          <span className="tabular-nums">{formatCompact(article.views)} views</span>
        </div>
      </div>
    </Link>
  );
}
