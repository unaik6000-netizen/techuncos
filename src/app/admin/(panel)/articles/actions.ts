"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { articleFormSchema } from "@/schemas/article.schema";
import { requirePermission } from "@/lib/auth";
import {
  createArticleRow,
  updateArticleRow,
  deleteArticleRow,
  slugExists,
} from "@/lib/admin/articles";
import { parseMarkdownLite } from "@/lib/markdown-lite";
import { CATEGORIES } from "@/constants/categories";
import type { ArticleInsert } from "@/lib/supabase/types";

export interface ArticleFormState {
  error?: string;
}

function parseForm(formData: FormData) {
  return articleFormSchema.safeParse({
    title: formData.get("title"),
    slug: formData.get("slug"),
    subtitle: formData.get("subtitle"),
    excerpt: formData.get("excerpt"),
    category: formData.get("category"),
    authorName: formData.get("authorName"),
    cover: formData.get("cover"),
    lang: formData.get("lang"),
    tags: formData.get("tags"),
    readTime: formData.get("readTime"),
    featured: formData.get("featured") === "on",
    trending: formData.get("trending") === "on",
    status: formData.get("status"),
    body: formData.get("body"),
  });
}

function slugifyName(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const AUTHOR_COLORS = ["#38BDF8", "#22D3EE", "#818CF8"];

function toInsert(data: ReturnType<typeof parseForm>["data"]): ArticleInsert {
  if (!data) throw new Error("unreachable");
  const tags = data.tags
    ? data.tags.split(",").map((t) => t.trim()).filter(Boolean)
    : [];
  const authorSlug = slugifyName(data.authorName);

  return {
    slug: data.slug,
    title: data.title,
    subtitle: data.subtitle || null,
    excerpt: data.excerpt,
    category: data.category,
    author_name: data.authorName,
    author_slug: authorSlug,
    author_avatar_color:
      AUTHOR_COLORS[Math.abs(hashCode(authorSlug)) % AUTHOR_COLORS.length],
    author_role: null,
    author_bio: null,
    published_at: new Date().toISOString(),
    updated_at: null,
    read_time: data.readTime,
    featured: data.featured,
    trending: data.trending,
    cover: data.cover || null,
    lang: (data.lang as "ml" | "en" | "hi" | "") || null,
    tags,
    body: parseMarkdownLite(data.body, (data.lang as "ml" | "en" | "hi") || undefined),
    status: data.status,
  };
}

function hashCode(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h << 5) - h + s.charCodeAt(i);
  return h;
}

/** Purge the cache for every public surface an article change can affect, so
 *  the live site updates instantly for the next visitor. Categories are few,
 *  so revalidating all of them is cheap and covers "moved category" edits. */
function revalidatePublicPaths(slug?: string) {
  revalidatePath("/"); // homepage (featured/trending/latest)
  revalidatePath("/articles"); // all-articles listing
  for (const c of CATEGORIES) revalidatePath(`/${c.slug}`); // category pages
  if (slug) revalidatePath(`/article/${slug}`); // the article itself
  revalidatePath("/sitemap.xml"); // SEO — Google sees new URLs immediately
  revalidatePath("/rss.xml"); // RSS feed
  revalidatePath("/admin/articles"); // admin list
}

export async function createArticleAction(
  _prev: ArticleFormState,
  formData: FormData,
): Promise<ArticleFormState> {
  await requirePermission("article:create");

  const parsed = parseForm(formData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }
  if (parsed.data.status === "published") {
    await requirePermission("article:publish");
  }

  if (await slugExists(parsed.data.slug)) {
    return { error: "That slug is already in use — choose another." };
  }

  const row = await createArticleRow(toInsert(parsed.data));
  revalidatePublicPaths(row.slug);
  redirect("/admin/articles");
}

export async function updateArticleAction(
  id: string,
  _prev: ArticleFormState,
  formData: FormData,
): Promise<ArticleFormState> {
  await requirePermission("article:edit");

  const parsed = parseForm(formData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }
  if (parsed.data.status === "published") {
    await requirePermission("article:publish");
  }

  if (await slugExists(parsed.data.slug, id)) {
    return { error: "That slug is already in use — choose another." };
  }

  const row = await updateArticleRow(id, toInsert(parsed.data));
  revalidatePublicPaths(row.slug);
  redirect("/admin/articles");
}

export async function deleteArticleAction(
  id: string,
  _category: string,
  slug: string,
) {
  await requirePermission("article:delete");
  await deleteArticleRow(id);
  revalidatePublicPaths(slug);
}

export async function togglePublishAction(
  id: string,
  nextStatus: "draft" | "published",
  _category: string,
  slug: string,
) {
  if (nextStatus === "published") {
    await requirePermission("article:publish");
  } else {
    await requirePermission("article:edit");
  }
  await updateArticleRow(id, { status: nextStatus });
  revalidatePublicPaths(slug);
}
