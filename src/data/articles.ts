import { createPublicClient } from "@/lib/supabase/public";
import type { Article, ArticleFull, Author, CategorySlug } from "@/types";
import type { ArticleRow } from "@/lib/supabase/types";

/**
 * PUBLIC read layer — queries Supabase with the anon key, so Row Level
 * Security guarantees only `status = 'published'` rows are ever returned
 * here, regardless of what a caller asks for. Admin (draft-inclusive) reads
 * live in `src/lib/admin/articles.ts`, using the service-role key.
 */

function toAuthor(row: ArticleRow): Author {
  return {
    name: row.author_name,
    slug: row.author_slug,
    avatarColor: row.author_avatar_color,
    role: row.author_role ?? undefined,
    bio: row.author_bio ?? undefined,
  };
}

function toArticle(row: ArticleRow): Article {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    category: row.category,
    author: toAuthor(row),
    publishedAt: row.published_at,
    readTime: row.read_time,
    views: row.views,
    featured: row.featured,
    trending: row.trending,
    cover: row.cover ?? undefined,
    lang: row.lang ?? undefined,
  };
}

function toArticleFull(row: ArticleRow): ArticleFull {
  return {
    ...toArticle(row),
    subtitle: row.subtitle ?? undefined,
    updatedAt: row.updated_at ?? row.published_at,
    tags: row.tags,
    body: row.body,
  };
}

const client = () => createPublicClient();

export async function getFeaturedArticles(): Promise<Article[]> {
  const { data } = await client()
    .from("articles")
    .select("*")
    .eq("status", "published")
    .eq("featured", true)
    .order("published_at", { ascending: false });
  return (data ?? []).map(toArticle);
}

export async function getTrendingArticles(): Promise<Article[]> {
  const { data } = await client()
    .from("articles")
    .select("*")
    .eq("status", "published")
    .eq("trending", true)
    .order("published_at", { ascending: false });
  return (data ?? []).map(toArticle);
}

export async function getLatestArticles(limit = 6): Promise<Article[]> {
  const { data } = await client()
    .from("articles")
    .select("*")
    .eq("status", "published")
    .order("published_at", { ascending: false })
    .limit(limit);
  return (data ?? []).map(toArticle);
}

export async function getHeroArticle(): Promise<Article | undefined> {
  const featured = await getFeaturedArticles();
  if (featured.length > 0) return featured[0];
  const latest = await getLatestArticles(1);
  return latest[0];
}

export async function getAllSlugs(): Promise<string[]> {
  const { data } = await client()
    .from("articles")
    .select("slug")
    .eq("status", "published")
    .returns<{ slug: string }[]>();
  return (data ?? []).map((r) => r.slug);
}

export async function getArticlesByCategory(category: CategorySlug): Promise<Article[]> {
  const { data } = await client()
    .from("articles")
    .select("*")
    .eq("status", "published")
    .eq("category", category)
    .order("published_at", { ascending: false });
  return (data ?? []).map(toArticle);
}

/** All published articles, optionally filtered by a homepage "view all" facet. */
export async function getArticles(filter?: string): Promise<Article[]> {
  if (filter === "popular") {
    const { data } = await client()
      .from("articles")
      .select("*")
      .eq("status", "published")
      .order("views", { ascending: false });
    return (data ?? []).map(toArticle);
  }
  if (filter === "trending") return getTrendingArticles();
  if (filter === "featured") return getFeaturedArticles();
  return getLatestArticles(1000);
}

export async function getArticleBySlug(slug: string): Promise<ArticleFull | undefined> {
  const { data } = await client()
    .from("articles")
    .select("*")
    .eq("status", "published")
    .eq("slug", slug)
    .maybeSingle();
  return data ? toArticleFull(data) : undefined;
}

export async function getRelatedArticles(slug: string, limit = 3): Promise<Article[]> {
  const current = await getArticleBySlug(slug);
  if (!current) return [];

  const { data: sameCategory } = await client()
    .from("articles")
    .select("*")
    .eq("status", "published")
    .eq("category", current.category)
    .neq("slug", slug)
    .order("published_at", { ascending: false })
    .limit(limit);

  const results = (sameCategory ?? []).map(toArticle);
  if (results.length >= limit) return results.slice(0, limit);

  const { data: others } = await client()
    .from("articles")
    .select("*")
    .eq("status", "published")
    .neq("category", current.category)
    .neq("slug", slug)
    .order("published_at", { ascending: false })
    .limit(limit - results.length);

  return [...results, ...(others ?? []).map(toArticle)];
}

export async function getAdjacentArticles(
  slug: string,
): Promise<{ prev: Article | null; next: Article | null }> {
  const { data } = await client()
    .from("articles")
    .select("*")
    .eq("status", "published")
    .order("published_at", { ascending: false });

  const ordered = (data ?? []).map(toArticle);
  const i = ordered.findIndex((a) => a.slug === slug);
  return {
    prev: i > 0 ? ordered[i - 1] : null,
    next: i >= 0 && i < ordered.length - 1 ? ordered[i + 1] : null,
  };
}
