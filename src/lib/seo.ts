import type { Metadata } from "next";
import { SITE, SOCIALS } from "@/constants/site";

/** Canonical site origin — env-aware, trailing slash stripped. */
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? SITE.url).replace(
  /\/+$/,
  "",
);

/** Build an absolute URL from a path. */
export const absoluteUrl = (path = "") =>
  `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;

interface BuildMetaOptions {
  title?: string;
  description?: string;
  /** Path for the canonical URL, e.g. "/article/foo". */
  path: string;
  images?: string[];
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  tags?: string[];
  locale?: string;
}

/**
 * Single source of truth for page metadata — guarantees every page gets a
 * canonical URL, Open Graph and Twitter card built consistently.
 */
export function buildMetadata({
  title,
  description = SITE.description,
  path,
  images,
  type = "website",
  publishedTime,
  modifiedTime,
  authors,
  tags,
  locale = "en_IN",
}: BuildMetaOptions): Metadata {
  // When no image is supplied, the generated opengraph-image (file convention)
  // is used automatically — so we never point at a missing static asset.
  const ogImages = images?.map((url) => ({
    url,
    width: 1200,
    height: 630,
    alt: title ?? SITE.name,
  }));

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      url: absoluteUrl(path),
      siteName: SITE.name,
      title: title ?? SITE.name,
      description,
      locale,
      ...(ogImages ? { images: ogImages } : {}),
      ...(type === "article"
        ? { publishedTime, modifiedTime, authors, tags }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: title ?? SITE.name,
      description,
      ...(images ? { images } : {}),
    },
  };
}

/* ── JSON-LD structured data builders ─────────────────────────────── */

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.name,
    url: siteUrl,
    logo: absoluteUrl("/opengraph-image"),
    description: SITE.description,
    email: SITE.email,
    sameAs: SOCIALS.map((s) => s.href),
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.name,
    url: siteUrl,
    description: SITE.description,
    inLanguage: ["ml", "en", "hi"],
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteUrl}/search?q={query}`,
      },
      "query-input": "required name=query",
    },
  };
}

export function articleSchema(a: {
  title: string;
  description: string;
  path: string;
  publishedAt: string;
  updatedAt?: string;
  author: string;
  image?: string;
  lang?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: a.title,
    description: a.description,
    datePublished: a.publishedAt,
    dateModified: a.updatedAt ?? a.publishedAt,
    author: { "@type": "Organization", name: a.author },
    publisher: {
      "@type": "Organization",
      name: SITE.name,
      logo: { "@type": "ImageObject", url: absoluteUrl("/opengraph-image") },
    },
    image: [absoluteUrl(a.image ?? "/opengraph-image")],
    inLanguage: a.lang ?? "en",
    mainEntityOfPage: { "@type": "WebPage", "@id": absoluteUrl(a.path) },
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function faqSchema(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

/** Escape a string for safe inclusion in XML (RSS/sitemap). */
export function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
