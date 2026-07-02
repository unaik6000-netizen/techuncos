import { SectionHeading } from "@/components/ui/section-heading";
import { ArticleCard } from "@/components/article/article-card";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { getLatestArticles } from "@/data/articles";

export async function LatestSection() {
  const latest = await getLatestArticles(6);

  return (
    <section
      id="latest"
      aria-labelledby="latest-heading"
      className="container-shell scroll-mt-20 py-16"
    >
      <Reveal>
        <SectionHeading
          eyebrow="Fresh off the press"
          title="Latest articles"
          href="/articles"
          className="mb-8"
        />
      </Reveal>

      <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {latest.map((article, i) => (
          <StaggerItem key={article.id} className="h-full">
            <ArticleCard article={article} priority={i === 0} className="h-full" />
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
