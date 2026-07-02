import { Hero } from "@/components/home/hero";
import { TrendingSection } from "@/components/home/trending-section";
import { FeaturedSection } from "@/components/home/featured-section";
import { LatestSection } from "@/components/home/latest-section";
import { CategoriesGrid } from "@/components/home/categories-grid";
import { AiPromptsSection } from "@/components/home/ai-prompts-section";
import { TelegramCta } from "@/components/home/telegram-cta";
import { Newsletter } from "@/components/home/newsletter";
import { JsonLd } from "@/components/seo/json-ld";
import { getHeroArticle } from "@/data/articles";
import { organizationSchema, websiteSchema } from "@/lib/seo";

/** Homepage refreshes at most hourly (ISR) — content is live from Supabase. */
export const revalidate = 3600;

export default async function HomePage() {
  const heroArticle = await getHeroArticle();

  return (
    <>
      <JsonLd data={[organizationSchema(), websiteSchema()]} />
      {heroArticle && <Hero featured={heroArticle} />}
      <TrendingSection />
      <FeaturedSection />
      <LatestSection />
      <CategoriesGrid />
      <AiPromptsSection />
      <TelegramCta />
      <Newsletter />
    </>
  );
}
