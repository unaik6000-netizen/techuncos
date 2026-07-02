"use server";

import { revalidatePath } from "next/cache";
import { requirePermission } from "@/lib/auth";
import { setCommentStatus, deleteComment } from "@/lib/admin/comments";
import type { CommentStatus } from "@/lib/supabase/types";

export async function moderateCommentAction(
  id: string,
  status: CommentStatus,
  articleSlug: string,
) {
  await requirePermission("comment:moderate");
  await setCommentStatus(id, status);
  revalidatePath("/admin/comments");
  revalidatePath(`/article/${articleSlug}`);
}

export async function deleteCommentAction(id: string, articleSlug: string) {
  await requirePermission("comment:moderate");
  await deleteComment(id);
  revalidatePath("/admin/comments");
  revalidatePath(`/article/${articleSlug}`);
}
