import type { LucideIcon } from "lucide-react";

export type Locale = "ml" | "en" | "hi";

export type CategorySlug = "ai" | "tech" | "digital" | "tutorials" | "news";

export interface Category {
  slug: CategorySlug;
  /** Display name per locale. */
  name: Record<Locale, string>;
  description: Record<Locale, string>;
  icon: LucideIcon;
  /** CSS variable-backed Tailwind color key, e.g. "cat-ai". */
  colorVar: string;
  articleCount: number;
}

export interface Author {
  name: string;
  slug: string;
  avatarColor: string;
  role?: string;
  bio?: string;
  social?: { twitter?: string; telegram?: string };
}

/** Article metadata — the shape used by cards and listings. */
export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: CategorySlug;
  author: Author;
  /** ISO 8601 publish date. */
  publishedAt: string;
  readTime: number;
  views: number;
  featured: boolean;
  trending: boolean;
  /** Optional cover image URL; when absent, a branded gradient is rendered. */
  cover?: string;
  /** Marks Malayalam-language cards so the right font + lang attr apply. */
  lang?: Locale;
}

/* ── Rich content blocks ──────────────────────────────────────────
   A structured block model (like Portable Text / Editor.js). It's
   type-safe, styleable per-block, and maps cleanly onto whatever the
   admin editor emits later — no dangerouslySetInnerHTML on the page. */
export type ArticleBlock =
  | { type: "paragraph"; text: string; lang?: Locale }
  | { type: "heading"; level: 2 | 3; id: string; text: string; lang?: Locale }
  | { type: "code"; language: string; code: string; filename?: string }
  | { type: "image"; src: string; alt: string; caption?: string }
  | { type: "gallery"; images: { src: string; alt: string }[] }
  | { type: "quote"; text: string; cite?: string; lang?: Locale }
  | {
      type: "callout";
      variant: "info" | "warning" | "success";
      title?: string;
      text: string;
      lang?: Locale;
    }
  | { type: "youtube"; id: string; title: string }
  | { type: "list"; ordered: boolean; items: string[]; lang?: Locale }
  | { type: "linkCard"; href: string; label: string; description?: string }
  | { type: "divider" };

/** Full article — metadata plus body content. Returned by detail queries. */
export interface ArticleFull extends Article {
  subtitle?: string;
  updatedAt?: string;
  tags: string[];
  body: ArticleBlock[];
}

/** A single table-of-contents entry, derived from heading blocks. */
export interface TocItem {
  id: string;
  text: string;
  level: 2 | 3;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface SocialLink {
  label: string;
  href: string;
  icon: LucideIcon;
}
