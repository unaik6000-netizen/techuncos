import Link from "next/link";
import { MessageSquare } from "lucide-react";
import { EmptyState } from "@/components/ui/empty-state";
import { FadeIn } from "@/components/motion";
import { CommentModerationRow } from "@/components/admin/comment-moderation-row";
import { listComments } from "@/lib/admin/comments";
import { requirePermission } from "@/lib/auth";
import { cn } from "@/lib/utils";
import type { CommentStatus } from "@/lib/supabase/types";

export const dynamic = "force-dynamic";

const FILTERS: { key: string; label: string }[] = [
  { key: "pending", label: "Pending" },
  { key: "approved", label: "Approved" },
  { key: "spam", label: "Spam" },
  { key: "all", label: "All" },
];

export default async function AdminCommentsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  await requirePermission("comment:moderate");
  const { status = "pending" } = await searchParams;
  const active = FILTERS.some((f) => f.key === status) ? status : "pending";
  const comments = await listComments(
    active === "all" ? undefined : (active as CommentStatus),
  );

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <FadeIn>
        <h1 className="font-display text-2xl font-semibold tracking-tight text-foreground">
          Comments
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Review, approve or remove reader comments.
        </p>
      </FadeIn>

      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter comments">
        {FILTERS.map((f) => (
          <Link
            key={f.key}
            href={`/admin/comments?status=${f.key}`}
            role="tab"
            aria-selected={f.key === active}
            className={cn(
              "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
              f.key === active
                ? "border-brand-sky/40 bg-brand-sky/10 text-brand-sky"
                : "border-border text-muted-foreground hover:border-border-strong hover:text-foreground",
            )}
          >
            {f.label}
          </Link>
        ))}
      </div>

      {comments.length === 0 ? (
        <EmptyState
          icon={MessageSquare}
          title={`No ${active === "all" ? "" : active} comments`}
          description="When readers comment, they'll show up here for moderation."
        />
      ) : (
        <ul className="space-y-3">
          {comments.map((c) => (
            <CommentModerationRow key={c.id} comment={c} />
          ))}
        </ul>
      )}
    </div>
  );
}
