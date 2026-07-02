import Link from "next/link";
import { Flame } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { CategoryBadge } from "@/components/ui/badge";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { formatCompact } from "@/lib/utils";
import { getTrendingArticles } from "@/data/articles";

export async function TrendingSection() {
  const trending = (await getTrendingArticles()).slice(0, 4);

  return (
    <section aria-labelledby="trending-heading" className="container-shell py-16">
      <Reveal>
        <SectionHeading
          eyebrow="Hot right now"
          title="Trending this week"
          href="/articles?filter=trending"
          className="mb-8"
        />
      </Reveal>

      <Stagger className="grid gap-3 sm:grid-cols-2">
        {trending.map((article, i) => (
          <StaggerItem key={article.id}>
            <Link
              href={`/article/${article.slug}`}
              className="group flex items-center gap-4 rounded-card border border-border bg-card p-4 transition-colors duration-300 hover:border-border-strong"
            >
              <span
                aria-hidden="true"
                className="text-gradient w-10 shrink-0 text-center font-display text-3xl font-bold tabular-nums"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="min-w-0 flex-1">
                <div className="mb-1.5 flex items-center gap-2">
                  <CategoryBadge slug={article.category} />
                  <span className="inline-flex items-center gap-1 text-[11px] text-faint">
                    <Flame className="h-3 w-3 text-warning" aria-hidden="true" />
                    {formatCompact(article.views)}
                  </span>
                </div>
                <h3
                  {...(article.lang ? { lang: article.lang } : {})}
                  className="truncate text-sm font-medium text-foreground transition-colors group-hover:text-brand-sky"
                >
                  {article.title}
                </h3>
              </div>
            </Link>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
