"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Check, Ban, Trash2, ExternalLink, RotateCcw } from "lucide-react";
import { useToast } from "@/components/ui/toast";
import { formatDate, cn } from "@/lib/utils";
import {
  moderateCommentAction,
  deleteCommentAction,
} from "@/app/admin/(panel)/comments/actions";
import type { CommentRow } from "@/lib/supabase/types";

const STATUS_STYLES: Record<string, string> = {
  pending: "border-warning/30 bg-warning/10 text-warning",
  approved: "border-success/30 bg-success/10 text-success",
  spam: "border-error/30 bg-error/10 text-error",
};

export function CommentModerationRow({ comment }: { comment: CommentRow }) {
  const [pending, startTransition] = useTransition();
  const { toast } = useToast();
  const router = useRouter();

  const run = (fn: () => Promise<void>, msg: string) =>
    startTransition(async () => {
      try {
        await fn();
        toast(msg, "success");
        router.refresh();
      } catch {
        toast("Action failed. Try again.", "error");
      }
    });

  return (
    <li className="rounded-card border border-border bg-card p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-medium text-foreground">{comment.name}</span>
            <span
              className={cn(
                "rounded-full border px-2 py-0.5 text-[11px] font-medium capitalize",
                STATUS_STYLES[comment.status],
              )}
            >
              {comment.status}
            </span>
            <span className="text-xs text-faint">{formatDate(comment.created_at)}</span>
          </div>
          <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
            {comment.body}
          </p>
          <Link
            href={`/article/${comment.article_slug}`}
            target="_blank"
            className="mt-1.5 inline-flex items-center gap-1 text-xs text-faint transition-colors hover:text-brand-sky"
          >
            <ExternalLink className="h-3 w-3" aria-hidden="true" />
            {comment.article_slug}
          </Link>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap gap-2 border-t border-border pt-3">
        {comment.status !== "approved" && (
          <button
            type="button"
            disabled={pending}
            onClick={() =>
              run(
                () => moderateCommentAction(comment.id, "approved", comment.article_slug),
                "Comment approved",
              )
            }
            className="inline-flex items-center gap-1.5 rounded-lg border border-success/30 bg-success/10 px-3 py-1.5 text-xs font-medium text-success transition-colors hover:bg-success/15 disabled:opacity-60"
          >
            <Check className="h-3.5 w-3.5" aria-hidden="true" />
            Approve
          </button>
        )}
        {comment.status === "approved" && (
          <button
            type="button"
            disabled={pending}
            onClick={() =>
              run(
                () => moderateCommentAction(comment.id, "pending", comment.article_slug),
                "Moved back to pending",
              )
            }
            className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted disabled:opacity-60"
          >
            <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
            Unapprove
          </button>
        )}
        {comment.status !== "spam" && (
          <button
            type="button"
            disabled={pending}
            onClick={() =>
              run(
                () => moderateCommentAction(comment.id, "spam", comment.article_slug),
                "Marked as spam",
              )
            }
            className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted disabled:opacity-60"
          >
            <Ban className="h-3.5 w-3.5" aria-hidden="true" />
            Spam
          </button>
        )}
        <button
          type="button"
          disabled={pending}
          onClick={() =>
            run(
              () => deleteCommentAction(comment.id, comment.article_slug),
              "Comment deleted",
            )
          }
          className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-faint transition-colors hover:bg-error/10 hover:text-error disabled:opacity-60"
        >
          <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
          Delete
        </button>
      </div>
    </li>
  );
}
