import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleListing } from "@/components/article/article-listing";
import { JsonLd } from "@/components/seo/json-ld";
import { CATEGORIES, getCategory } from "@/constants/categories";
import { getArticlesByCategory } from "@/data/articles";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";

export const revalidate = 3600;
export const dynamicParams = false;

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const cat = getCategory(category);
  if (!cat) return { title: "Not found" };
  return buildMetadata({
    title: `${cat.name.en} articles`,
    description: cat.description.en,
    path: `/${cat.slug}`,
  });
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const cat = getCategory(category);
  if (!cat) notFound();

  const articles = await getArticlesByCategory(cat.slug);

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: cat.name.en, path: `/${cat.slug}` },
        ])}
      />
      <ArticleListing
        eyebrow={cat.name.en}
        title={`${cat.name.en} articles`}
        description={cat.description.en}
        articles={articles}
      />
    </>
  );
}
