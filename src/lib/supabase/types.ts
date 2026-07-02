import type { ArticleBlock, CategorySlug, Locale } from "@/types";

/**
 * Hand-written types matching the `articles` table (see
 * supabase/migrations/0001_articles.sql). Categories stay defined in code
 * (src/constants/categories.ts) since they carry React icon components that
 * can't be stored in a database column — only articles are persisted.
 *
 * NOTE: these must be `type` object literals, not `interface`s — postgrest-js's
 * generic constraints (`Row extends Record<string, unknown>`) only resolve
 * correctly against literal object types, matching how `supabase gen types`
 * itself always emits type aliases.
 */
export type ArticleRow = {
  id: string;
  slug: string;
  title: string;
  subtitle: string | null;
  excerpt: string;
  category: CategorySlug;
  author_name: string;
  author_slug: string;
  author_avatar_color: string;
  author_role: string | null;
  author_bio: string | null;
  published_at: string;
  updated_at: string | null;
  read_time: number;
  views: number;
  featured: boolean;
  trending: boolean;
  cover: string | null;
  lang: Locale | null;
  tags: string[];
  body: ArticleBlock[];
  status: "draft" | "published";
  created_at: string;
};

export type ArticleInsert = Omit<ArticleRow, "id" | "created_at" | "views"> & {
  id?: string;
  views?: number;
};

export type ArticleUpdate = Partial<ArticleInsert>;

export type CommentStatus = "pending" | "approved" | "spam";

export type CommentRow = {
  id: string;
  article_slug: string;
  name: string;
  body: string;
  status: CommentStatus;
  ip_hash: string | null;
  created_at: string;
};
export type CommentInsert = {
  article_slug: string;
  name: string;
  body: string;
  ip_hash?: string | null;
};

export type NewsletterRow = {
  id: string;
  email: string;
  status: "active" | "unsubscribed";
  created_at: string;
};
export type NewsletterInsert = { email: string };

export type SettingRow = {
  key: string;
  value: unknown;
  updated_at: string;
};
export type SettingInsert = { key: string; value: unknown };

export type TagRow = {
  id: string;
  name: string;
  slug: string;
  created_at: string;
};
export type TagInsert = { name: string; slug: string };

export type Database = {
  public: {
    Tables: {
      articles: {
        Row: ArticleRow;
        Insert: ArticleInsert;
        Update: ArticleUpdate;
        Relationships: [];
      };
      comments: {
        Row: CommentRow;
        Insert: CommentInsert;
        Update: Partial<CommentRow>;
        Relationships: [];
      };
      newsletter_subscribers: {
        Row: NewsletterRow;
        Insert: NewsletterInsert;
        Update: Partial<NewsletterRow>;
        Relationships: [];
      };
      settings: {
        Row: SettingRow;
        Insert: SettingInsert;
        Update: Partial<SettingRow>;
        Relationships: [];
      };
      tags: {
        Row: TagRow;
        Insert: TagInsert;
        Update: Partial<TagRow>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
