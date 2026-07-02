import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ArticleForm } from "@/components/admin/article-form";
import { createArticleAction } from "../actions";
import { requirePermission } from "@/lib/auth";

export default async function NewArticlePage() {
  await requirePermission("article:create");

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <Link
        href="/admin/articles"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Back to articles
      </Link>

      <div>
        <h1 className="font-display text-2xl font-semibold tracking-tight text-foreground">
          New article
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Fill in the details below, then save as a draft or publish immediately.
        </p>
      </div>

      <ArticleForm action={createArticleAction} submitLabel="Create article" />
    </div>
  );
}
