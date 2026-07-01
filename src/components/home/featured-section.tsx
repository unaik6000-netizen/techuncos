import { SectionHeading } from "@/components/ui/section-heading";
import { ArticleCard } from "@/components/article/article-card";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { getFeaturedArticles } from "@/data/articles";

export function FeaturedSection() {
  const featured = getFeaturedArticles().slice(0, 2);
  if (featured.length === 0) return null;

  return (
    <section
      aria-labelledby="featured-heading"
      className="relative border-y border-border bg-subtle/40 py-16"
    >
      <div className="container-shell">
        <Reveal>
          <SectionHeading
            eyebrow="Editor's picks"
            title="Featured stories"
            description="Hand-selected reads worth your full attention."
            href="/articles?filter=featured"
            className="mb-8"
          />
        </Reveal>

        <Stagger className="grid gap-6 md:grid-cols-2">
          {featured.map((article) => (
            <StaggerItem key={article.id}>
              <ArticleCard article={article} className="h-full" />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
