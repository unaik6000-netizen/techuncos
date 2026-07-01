import type { Metadata } from "next";
import Link from "next/link";
import { ArticleListing } from "@/components/article/article-listing";
import { getArticles } from "@/data/articles";
import { buildMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const revalidate = 3600;

export const metadata: Metadata = buildMetadata({
  title: "All articles",
  description:
    "Every Techuncos article — AI, technology, digital tips and tutorials, updated daily.",
  path: "/articles",
});

const FILTERS = [
  { key: "latest", label: "Latest" },
  { key: "trending", label: "Trending" },
  { key: "popular", label: "Popular" },
] as const;

export default async function ArticlesPage({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string }>;
}) {
  const { filter = "latest" } = await searchParams;
  const active = FILTERS.some((f) => f.key === filter) ? filter : "latest";
  const articles = getArticles(active);

  const filters = (
    <div className="flex flex-wrap gap-2" role="tablist" aria-label="Sort articles">
      {FILTERS.map((f) => {
        const isActive = f.key === active;
        return (
          <Link
            key={f.key}
            href={f.key === "latest" ? "/articles" : `/articles?filter=${f.key}`}
            role="tab"
            aria-selected={isActive}
            className={cn(
              "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
              isActive
                ? "border-brand-sky/40 bg-brand-sky/10 text-brand-sky"
                : "border-border text-muted-foreground hover:border-border-strong hover:text-foreground",
            )}
          >
            {f.label}
          </Link>
        );
      })}
    </div>
  );

  return (
    <ArticleListing
      eyebrow="Browse everything"
      title="All articles"
      description="AI, technology, digital tips and tutorials — updated daily."
      articles={articles}
      filters={filters}
    />
  );
}
