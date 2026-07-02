import type { MetadataRoute } from "next";
import { getArticles } from "@/data/articles";
import { CATEGORIES } from "@/constants/categories";
import { siteUrl } from "@/lib/seo";

/**
 * Auto-generated sitemap. Rebuilds from the data source, so new articles and
 * categories appear automatically. Only routes that actually exist are listed.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: siteUrl, lastModified: now, changeFrequency: "daily", priority: 1 },
    {
      url: `${siteUrl}/articles`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    ...["about", "contact", "privacy"].map((p) => ({
      url: `${siteUrl}/${p}`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    })),
  ];

  const categories: MetadataRoute.Sitemap = CATEGORIES.map((c) => ({
    url: `${siteUrl}/${c.slug}`,
    lastModified: now,
    changeFrequency: "daily",
    priority: 0.8,
  }));

  const allArticles = await getArticles();
  const articles: MetadataRoute.Sitemap = allArticles.map((a) => ({
    url: `${siteUrl}/article/${a.slug}`,
    lastModified: new Date(a.publishedAt),
    changeFrequency: "weekly",
    priority: a.featured ? 0.9 : 0.7,
  }));

  return [...staticRoutes, ...categories, ...articles];
}
