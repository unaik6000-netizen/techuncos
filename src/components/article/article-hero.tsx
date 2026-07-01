import { Clock, Eye } from "lucide-react";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { CategoryBadge } from "@/components/ui/badge";
import { ArticleCover } from "./article-cover";
import { AuthorAvatar } from "./author-avatar";
import { getCategory } from "@/constants/categories";
import { formatDate, formatCompact } from "@/lib/utils";
import type { ArticleFull } from "@/types";

export function ArticleHero({ article }: { article: ArticleFull }) {
  const category = getCategory(article.category);

  return (
    <header className="relative">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-72 bg-[radial-gradient(60%_100%_at_50%_0,rgba(34,211,238,0.08),transparent)]"
      />
      <div className="container-shell max-w-prose pt-8 sm:pt-12">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            {
              label: category?.name.en ?? "Articles",
              href: `/${article.category}`,
            },
            { label: article.title },
          ]}
        />

        <div className="mt-6">
          <CategoryBadge slug={article.category} />
        </div>

        <h1
          {...(article.lang ? { lang: article.lang } : {})}
          className="mt-4 font-display text-[clamp(1.9rem,4.5vw,2.9rem)] font-bold leading-[1.12] tracking-tight text-foreground"
        >
          {article.title}
        </h1>

        {article.subtitle && (
          <p
            {...(article.lang ? { lang: article.lang } : {})}
            className="mt-4 text-lg leading-relaxed text-muted-foreground"
          >
            {article.subtitle}
          </p>
        )}

        <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-3">
          <div className="flex items-center gap-2.5">
            <AuthorAvatar author={article.author} size={40} />
            <div className="leading-tight">
              <p className="text-sm font-medium text-foreground">
                {article.author.name}
              </p>
              {article.author.role && (
                <p className="text-xs text-faint">{article.author.role}</p>
              )}
            </div>
          </div>
          <span className="h-8 w-px bg-border" aria-hidden="true" />
          <div className="flex items-center gap-3 text-sm text-faint">
            <time dateTime={article.publishedAt} className="tabular-nums">
              {formatDate(article.publishedAt)}
            </time>
            <span className="inline-flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" aria-hidden="true" />
              {article.readTime} min read
            </span>
            <span className="inline-flex items-center gap-1 tabular-nums">
              <Eye className="h-3.5 w-3.5" aria-hidden="true" />
              {formatCompact(article.views)}
            </span>
          </div>
        </div>
      </div>

      <div className="container-shell mt-8 max-w-4xl">
        <div className="overflow-hidden rounded-panel border border-border">
          <ArticleCover
            category={article.category}
            title={article.title}
            src={article.cover}
            priority
            sizes="(max-width: 896px) 100vw, 896px"
          />
        </div>
      </div>
    </header>
  );
}
