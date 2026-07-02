import Link from "next/link";
import { PlusCircle, FileText } from "lucide-react";
import { EmptyState } from "@/components/ui/empty-state";
import { FadeIn } from "@/components/motion";
import { ArticleRow } from "@/components/admin/article-row";
import { listArticlesForAdmin } from "@/lib/admin/articles";
import { requireUser } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function AdminArticlesPage() {
  await requireUser();
  const articles = await listArticlesForAdmin();

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <FadeIn className="flex items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-semibold tracking-tight text-foreground">
            Articles
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {articles.length} total — manage drafts and published content.
          </p>
        </div>
        <Link
          href="/admin/articles/new"
          className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-lg bg-brand-gradient px-5 text-sm font-medium text-primary-foreground transition-[filter] hover:brightness-110"
        >
          <PlusCircle className="h-4 w-4" aria-hidden="true" />
          New article
        </Link>
      </FadeIn>

      {articles.length === 0 ? (
        <EmptyState
          icon={FileText}
          title="No articles yet"
          description="Create your first article to get the site publishing."
          action={
            <Link
              href="/admin/articles/new"
              className="inline-flex h-10 items-center gap-2 rounded-lg bg-brand-gradient px-4 text-sm font-medium text-primary-foreground"
            >
              <PlusCircle className="h-4 w-4" aria-hidden="true" />
              New article
            </Link>
          }
        />
      ) : (
        <div className="overflow-hidden rounded-card border border-border bg-card">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs uppercase tracking-wider text-faint">
                <th className="px-4 py-3 font-medium">Title</th>
                <th className="hidden px-4 py-3 font-medium sm:table-cell">Category</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="hidden px-4 py-3 font-medium sm:table-cell">Views</th>
                <th className="px-4 py-3 font-medium">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {articles.map((article) => (
                <ArticleRow key={article.id} article={article} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
