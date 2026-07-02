"use server";

import { createPublicClient } from "@/lib/supabase/public";
import { commentSchema, newsletterSchema } from "@/schemas/comment.schema";

export interface CommentState {
  ok?: boolean;
  error?: string;
}

/**
 * Public comment submission. Inserts via the anon client, so RLS + the
 * BEFORE INSERT trigger guarantee the comment is stored as `pending` (it
 * won't appear on the site until an admin approves it). Honeypot field traps
 * bots without a CAPTCHA.
 */
export async function submitCommentAction(
  _prev: CommentState,
  formData: FormData,
): Promise<CommentState> {
  if (formData.get("company")) return { ok: true }; // honeypot: silently drop

  const parsed = commentSchema.safeParse({
    articleSlug: formData.get("articleSlug"),
    name: formData.get("name"),
    body: formData.get("body"),
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  const supabase = createPublicClient();
  const { error } = await supabase.from("comments").insert({
    article_slug: parsed.data.articleSlug,
    name: parsed.data.name?.trim() || "Guest",
    body: parsed.data.body,
  });

  if (error) return { error: "Couldn't post your comment. Please try again." };
  return { ok: true };
}

export interface NewsletterState {
  ok?: boolean;
  error?: string;
}

/** Public newsletter signup. Duplicate emails are treated as success. */
export async function subscribeNewsletterAction(
  _prev: NewsletterState,
  formData: FormData,
): Promise<NewsletterState> {
  if (formData.get("company")) return { ok: true }; // honeypot

  const parsed = newsletterSchema.safeParse({ email: formData.get("email") });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid email" };
  }

  const supabase = createPublicClient();
  const { error } = await supabase
    .from("newsletter_subscribers")
    .insert({ email: parsed.data.email });

  // 23505 = unique violation → already subscribed, which is fine.
  if (error && error.code !== "23505") {
    return { error: "Couldn't subscribe right now. Please try again." };
  }
  return { ok: true };
}
