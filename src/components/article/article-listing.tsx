import { FileText } from "lucide-react";
import { ArticleCard } from "./article-card";
import { EmptyState } from "@/components/ui/empty-state";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import type { Article } from "@/types";

/**
 * Reusable article listing — the page header + responsive grid used by both
 * category pages and the all-articles page. Shows a premium empty state when
 * there are no matching articles.
 */
export function ArticleListing({
  eyebrow,
  title,
  description,
  articles,
  filters,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  articles: Article[];
  filters?: React.ReactNode;
}) {
  return (
    <div className="container-shell py-12 sm:py-16">
      <Reveal>
        <div className="mb-2 flex items-center gap-2">
          <span className="h-px w-6 bg-brand-gradient" />
          <span className="text-xs font-medium uppercase tracking-[0.14em] text-brand-sky">
            {eyebrow}
          </span>
        </div>
        <h1 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          {title}
        </h1>
        {description && (
          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
            {description}
          </p>
        )}
      </Reveal>

      {filters && <div className="mt-6">{filters}</div>}

      {articles.length === 0 ? (
        <EmptyState
          icon={FileText}
          title="No articles here yet"
          description="New pieces are published daily — check back soon or explore another topic."
          className="mt-10"
        />
      ) : (
        <Stagger className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article, i) => (
            <StaggerItem key={article.id} className="h-full">
              <ArticleCard
                article={article}
                priority={i === 0}
                className="h-full"
              />
            </StaggerItem>
          ))}
        </Stagger>
      )}
    </div>
  );
}
