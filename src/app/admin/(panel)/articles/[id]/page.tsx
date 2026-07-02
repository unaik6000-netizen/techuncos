import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { ArticleForm } from "@/components/admin/article-form";
import { getArticleForEdit } from "@/lib/admin/articles";
import { updateArticleAction } from "../actions";
import { requirePermission } from "@/lib/auth";

export default async function EditArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requirePermission("article:edit");
  const { id } = await params;
  const article = await getArticleForEdit(id);
  if (!article) notFound();

  const boundAction = updateArticleAction.bind(null, id);

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
          Edit article
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">{article.title}</p>
      </div>

      <ArticleForm action={boundAction} article={article} submitLabel="Save changes" />
    </div>
  );
}
