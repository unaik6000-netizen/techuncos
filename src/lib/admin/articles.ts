import "server-only";
import { createAdminClient } from "@/lib/supabase/admin";
import type { ArticleFull } from "@/types";
import type { ArticleInsert, ArticleRow } from "@/lib/supabase/types";

/**
 * Admin-only article queries — uses the service-role key, so unlike
 * `src/data/articles.ts` these see drafts too. Only ever called from server
 * actions/pages already gated by requireUser()/requirePermission().
 */

export interface AdminArticleRow {
  id: string;
  slug: string;
  title: string;
  category: ArticleRow["category"];
  status: ArticleRow["status"];
  featured: boolean;
  trending: boolean;
  views: number;
  publishedAt: string;
  authorName: string;
}

function toAdminRow(row: ArticleRow): AdminArticleRow {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    category: row.category,
    status: row.status,
    featured: row.featured,
    trending: row.trending,
    views: row.views,
    publishedAt: row.published_at,
    authorName: row.author_name,
  };
}

export async function listArticlesForAdmin(): Promise<AdminArticleRow[]> {
  const { data, error } = await createAdminClient()
    .from("articles")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return (data ?? []).map(toAdminRow);
}

export async function getArticleForEdit(id: string): Promise<ArticleRow | null> {
  const { data, error } = await createAdminClient()
    .from("articles")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error) throw new Error(error.message);
  return data;
}

export async function createArticleRow(
  input: ArticleInsert,
): Promise<ArticleRow> {
  const { data, error } = await createAdminClient()
    .from("articles")
    .insert(input)
    .select("*")
    .single();
  if (error) throw new Error(error.message);
  return data;
}

export async function updateArticleRow(
  id: string,
  input: Partial<ArticleInsert>,
): Promise<ArticleRow> {
  const { data, error } = await createAdminClient()
    .from("articles")
    .update(input)
    .eq("id", id)
    .select("*")
    .single();
  if (error) throw new Error(error.message);
  return data;
}

export async function deleteArticleRow(id: string): Promise<void> {
  const { error } = await createAdminClient().from("articles").delete().eq("id", id);
  if (error) throw new Error(error.message);
}

export async function slugExists(slug: string, excludeId?: string): Promise<boolean> {
  let query = createAdminClient()
    .from("articles")
    .select("id", { count: "exact", head: true })
    .eq("slug", slug);
  if (excludeId) query = query.neq("id", excludeId);
  const { count } = await query;
  return (count ?? 0) > 0;
}

/** Row shape mapped to the reading-page's ArticleFull, used for previews. */
export function rowToArticleFull(row: ArticleRow): ArticleFull {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    category: row.category,
    author: {
      name: row.author_name,
      slug: row.author_slug,
      avatarColor: row.author_avatar_color,
      role: row.author_role ?? undefined,
      bio: row.author_bio ?? undefined,
    },
    publishedAt: row.published_at,
    readTime: row.read_time,
    views: row.views,
    featured: row.featured,
    trending: row.trending,
    cover: row.cover ?? undefined,
    lang: row.lang ?? undefined,
    subtitle: row.subtitle ?? undefined,
    updatedAt: row.updated_at ?? row.published_at,
    tags: row.tags,
    body: row.body,
  };
}
