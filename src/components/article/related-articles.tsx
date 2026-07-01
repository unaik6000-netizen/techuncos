import { SectionHeading } from "@/components/ui/section-heading";
import { ArticleCard } from "./article-card";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import type { Article } from "@/types";

export function RelatedArticles({ articles }: { articles: Article[] }) {
  if (articles.length === 0) return null;

  return (
    <section
      aria-labelledby="related-heading"
      className="container-shell mt-20 border-t border-border pt-14"
    >
      <Reveal>
        <SectionHeading eyebrow="Keep reading" title="Related articles" className="mb-8" />
      </Reveal>
      <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <StaggerItem key={article.id} className="h-full">
            <ArticleCard article={article} className="h-full" />
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
