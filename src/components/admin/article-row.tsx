"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Pencil,
  Eye,
  Trash2,
  CircleCheck,
  CircleDashed,
  Flame,
  Star,
} from "lucide-react";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { CategoryBadge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/toast";
import { formatCompact, cn } from "@/lib/utils";
import { deleteArticleAction, togglePublishAction } from "@/app/admin/(panel)/articles/actions";
import type { AdminArticleRow } from "@/lib/admin/articles";

export function ArticleRow({ article }: { article: AdminArticleRow }) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pending, startTransition] = useTransition();
  const { toast } = useToast();
  const router = useRouter();
  const isPublished = article.status === "published";

  const handleDelete = () => {
    startTransition(async () => {
      try {
        await deleteArticleAction(article.id, article.category, article.slug);
        toast(`Deleted "${article.title}"`, "success");
        router.refresh();
      } catch {
        toast("Couldn't delete this article. Try again.", "error");
      } finally {
        setConfirmOpen(false);
      }
    });
  };

  const handleTogglePublish = () => {
    startTransition(async () => {
      try {
        await togglePublishAction(
          article.id,
          isPublished ? "draft" : "published",
          article.category,
          article.slug,
        );
        toast(isPublished ? "Moved to drafts" : "Published", "success");
        router.refresh();
      } catch {
        toast("Couldn't update status. Try again.", "error");
      }
    });
  };

  return (
    <>
      <tr className="border-b border-border last:border-0 hover:bg-muted/40">
        <td className="max-w-[280px] px-4 py-3">
          <div className="flex items-center gap-1.5">
            {article.featured && (
              <Star className="h-3.5 w-3.5 shrink-0 text-warning" aria-label="Featured" />
            )}
            {article.trending && (
              <Flame className="h-3.5 w-3.5 shrink-0 text-error" aria-label="Trending" />
            )}
            <span className="truncate text-sm font-medium text-foreground">
              {article.title}
            </span>
          </div>
          <p className="mt-0.5 text-xs text-faint">{article.authorName}</p>
        </td>
        <td className="hidden px-4 py-3 sm:table-cell">
          <CategoryBadge slug={article.category} />
        </td>
        <td className="px-4 py-3">
          <button
            type="button"
            onClick={handleTogglePublish}
            disabled={pending}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium transition-colors disabled:opacity-60",
              isPublished
                ? "border-success/30 bg-success/10 text-success hover:bg-success/15"
                : "border-warning/30 bg-warning/10 text-warning hover:bg-warning/15",
            )}
          >
            {isPublished ? (
              <CircleCheck className="h-3.5 w-3.5" aria-hidden="true" />
            ) : (
              <CircleDashed className="h-3.5 w-3.5" aria-hidden="true" />
            )}
            {isPublished ? "Published" : "Draft"}
          </button>
        </td>
        <td className="hidden px-4 py-3 text-sm tabular-nums text-muted-foreground sm:table-cell">
          {formatCompact(article.views)}
        </td>
        <td className="px-4 py-3">
          <div className="flex items-center justify-end gap-1">
            {isPublished && (
              <Link
                href={`/article/${article.slug}`}
                target="_blank"
                aria-label="Preview"
                className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-faint transition-colors hover:bg-muted hover:text-foreground"
              >
                <Eye className="h-4 w-4" aria-hidden="true" />
              </Link>
            )}
            <Link
              href={`/admin/articles/${article.id}`}
              aria-label="Edit"
              className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-faint transition-colors hover:bg-muted hover:text-foreground"
            >
              <Pencil className="h-4 w-4" aria-hidden="true" />
            </Link>
            <button
              type="button"
              onClick={() => setConfirmOpen(true)}
              aria-label="Delete"
              className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-faint transition-colors hover:bg-error/10 hover:text-error"
            >
              <Trash2 className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </td>
      </tr>

      <ConfirmDialog
        open={confirmOpen}
        title="Delete this article?"
        description={`"${article.title}" will be permanently removed. This can't be undone.`}
        pending={pending}
        onConfirm={handleDelete}
        onCancel={() => setConfirmOpen(false)}
      />
    </>
  );
}
