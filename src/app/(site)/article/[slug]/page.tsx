import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ReadingProgress } from "@/components/article/reading-progress";
import { ArticleHero } from "@/components/article/article-hero";
import { ArticleContent } from "@/components/article/article-content";
import { TableOfContents } from "@/components/article/table-of-contents";
import { ShareRail, MobileShareBar } from "@/components/article/share-rail";
import { AuthorCard } from "@/components/article/author-card";
import { ArticleNavigation } from "@/components/article/article-navigation";
import { RelatedArticles } from "@/components/article/related-articles";
import { CommentSection } from "@/components/article/comment-section";
import { JsonLd } from "@/components/seo/json-ld";
import {
  getArticleBySlug,
  getAllSlugs,
  getRelatedArticles,
  getAdjacentArticles,
} from "@/data/articles";
import { getCategory } from "@/constants/categories";
import { buildMetadata, articleSchema, breadcrumbSchema } from "@/lib/seo";
import type { ArticleBlock, TocItem } from "@/types";

export const revalidate = 3600;
export const dynamicParams = true;

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return { title: "Article not found" };

  return buildMetadata({
    title: article.title,
    description: article.excerpt,
    path: `/article/${slug}`,
    type: "article",
    images: article.cover ? [article.cover] : undefined,
    publishedTime: article.publishedAt,
    modifiedTime: article.updatedAt,
    authors: [article.author.name],
    tags: article.tags,
    locale: article.lang === "ml" ? "ml_IN" : "en_IN",
  });
}

const isHeading = (
  b: ArticleBlock,
): b is Extract<ArticleBlock, { type: "heading" }> => b.type === "heading";

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const category = getCategory(article.category);
  const related = getRelatedArticles(slug, 3);
  const { prev, next } = getAdjacentArticles(slug);
  const path = `/article/${slug}`;

  const toc: TocItem[] = article.body
    .filter(isHeading)
    .map((h) => ({ id: h.id, text: h.text, level: h.level }));

  const schema = [
    articleSchema({
      title: article.title,
      description: article.excerpt,
      path,
      publishedAt: article.publishedAt,
      updatedAt: article.updatedAt,
      author: article.author.name,
      image: article.cover,
      lang: article.lang,
    }),
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: category?.name.en ?? "Articles", path: `/${article.category}` },
      { name: article.title, path },
    ]),
  ];

  return (
    <>
      <JsonLd data={schema} />

      <ReadingProgress />
      <ArticleHero article={article} />

      <div className="container-shell mt-10">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-x-10 lg:grid-cols-[3rem_minmax(0,44rem)_15rem] lg:justify-center">
          <div className="hidden lg:block">
            <ShareRail path={path} title={article.title} />
          </div>

          <article className="min-w-0">
            <ArticleContent blocks={article.body} />

            {article.tags.length > 0 && (
              <div className="mt-10 flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-border bg-subtle px-3 py-1 text-xs text-muted-foreground"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            <AuthorCard author={article.author} />
            <CommentSection />
          </article>

          <aside className="hidden lg:block">
            <TableOfContents items={toc} />
          </aside>
        </div>
      </div>

      <ArticleNavigation prev={prev} next={next} />
      <RelatedArticles articles={related} />

      <MobileShareBar path={path} title={article.title} />
      <div className="h-16 lg:hidden" aria-hidden="true" />
    </>
  );
}
