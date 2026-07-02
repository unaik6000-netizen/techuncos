import { createPublicClient } from "@/lib/supabase/public";

export interface PublicComment {
  id: string;
  name: string;
  body: string;
  createdAt: string;
}

/** Approved comments for an article (RLS hides pending/spam from the public). */
export async function getApprovedComments(slug: string): Promise<PublicComment[]> {
  const { data } = await createPublicClient()
    .from("comments")
    .select("id, name, body, created_at")
    .eq("article_slug", slug)
    .eq("status", "approved")
    .order("created_at", { ascending: false });

  return (data ?? []).map((c) => ({
    id: c.id,
    name: c.name,
    body: c.body,
    createdAt: c.created_at,
  }));
}
