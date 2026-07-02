import "server-only";
import { createAdminClient } from "@/lib/supabase/admin";
import type { CommentRow, CommentStatus } from "@/lib/supabase/types";

/** Admin comment moderation — service-role, so all statuses are visible. */

export async function listComments(
  status?: CommentStatus,
): Promise<CommentRow[]> {
  let query = createAdminClient()
    .from("comments")
    .select("*")
    .order("created_at", { ascending: false });
  if (status) query = query.eq("status", status);
  const { data, error } = await query;
  if (error) throw new Error(error.message);
  return data ?? [];
}

export async function countPendingComments(): Promise<number> {
  const { count } = await createAdminClient()
    .from("comments")
    .select("id", { count: "exact", head: true })
    .eq("status", "pending");
  return count ?? 0;
}

export async function setCommentStatus(
  id: string,
  status: CommentStatus,
): Promise<void> {
  const { error } = await createAdminClient()
    .from("comments")
    .update({ status })
    .eq("id", id);
  if (error) throw new Error(error.message);
}

export async function deleteComment(id: string): Promise<void> {
  const { error } = await createAdminClient()
    .from("comments")
    .delete()
    .eq("id", id);
  if (error) throw new Error(error.message);
}
