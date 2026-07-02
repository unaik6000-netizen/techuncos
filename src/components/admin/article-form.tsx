"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import { AlertCircle, Loader2, Sparkles } from "lucide-react";
import { CATEGORIES } from "@/constants/categories";
import { LOCALES } from "@/constants/navigation";
import type { ArticleFormState } from "@/app/admin/(panel)/articles/actions";
import type { ArticleRow } from "@/lib/supabase/types";
import { blocksToMarkdownLite } from "@/lib/markdown-lite";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const inputClass =
  "h-11 w-full rounded-lg border border-input bg-background px-3.5 text-sm text-foreground placeholder:text-faint focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/20";
const labelClass = "mb-1.5 block text-sm font-medium text-foreground";

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-brand-gradient px-6 text-sm font-medium text-primary-foreground transition-[filter] hover:brightness-110 disabled:opacity-70"
    >
      {pending ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
          Saving…
        </>
      ) : (
        label
      )}
    </button>
  );
}

export function ArticleForm({
  action,
  article,
  submitLabel,
}: {
  action: (state: ArticleFormState, formData: FormData) => Promise<ArticleFormState>;
  article?: ArticleRow;
  submitLabel: string;
}) {
  const [state, formAction] = useActionState(action, {});
  const [title, setTitle] = useState(article?.title ?? "");
  const [slug, setSlug] = useState(article?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(!!article);

  return (
    <form action={formAction} className="space-y-6">
      {state.error && (
        <div
          role="alert"
          className="flex items-start gap-2 rounded-lg border border-error/30 bg-error/10 px-3.5 py-2.5 text-sm text-error"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          {state.error}
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="title" className={labelClass}>
            Title <span className="text-error">*</span>
          </label>
          <input
            id="title"
            name="title"
            required
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (!slugTouched) setSlug(slugify(e.target.value));
            }}
            placeholder="Neon portrait: the exact AI prompt that actually works"
            className={inputClass}
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="slug" className={labelClass}>
            URL slug <span className="text-error">*</span>
          </label>
          <div className="flex items-center gap-2">
            <span className="shrink-0 text-sm text-faint">/article/</span>
            <input
              id="slug"
              name="slug"
              required
              value={slug}
              onChange={(e) => {
                setSlugTouched(true);
                setSlug(slugify(e.target.value));
              }}
              placeholder="neon-portrait-ai-prompt"
              className={inputClass}
            />
          </div>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="subtitle" className={labelClass}>
            Subtitle
          </label>
          <input
            id="subtitle"
            name="subtitle"
            defaultValue={article?.subtitle ?? ""}
            placeholder="Optional supporting line shown under the title"
            className={inputClass}
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="excerpt" className={labelClass}>
            Excerpt <span className="text-error">*</span>
          </label>
          <textarea
            id="excerpt"
            name="excerpt"
            required
            rows={2}
            defaultValue={article?.excerpt ?? ""}
            placeholder="A one or two sentence summary — shown on cards and used as the meta description."
            className="w-full resize-y rounded-lg border border-input bg-background px-3.5 py-3 text-sm leading-relaxed text-foreground placeholder:text-faint focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/20"
          />
        </div>

        <div>
          <label htmlFor="category" className={labelClass}>
            Category <span className="text-error">*</span>
          </label>
          <select
            id="category"
            name="category"
            required
            defaultValue={article?.category ?? "ai"}
            className={inputClass}
          >
            {CATEGORIES.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.name.en}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="lang" className={labelClass}>
            Language
          </label>
          <select
            id="lang"
            name="lang"
            defaultValue={article?.lang ?? ""}
            className={inputClass}
          >
            <option value="">Default (English)</option>
            {LOCALES.filter((l) => l.code !== "en").map((l) => (
              <option key={l.code} value={l.code}>
                {l.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="authorName" className={labelClass}>
            Author <span className="text-error">*</span>
          </label>
          <input
            id="authorName"
            name="authorName"
            required
            defaultValue={article?.author_name ?? "Techuncos"}
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="readTime" className={labelClass}>
            Read time (minutes)
          </label>
          <input
            id="readTime"
            name="readTime"
            type="number"
            min={1}
            max={60}
            defaultValue={article?.read_time ?? 5}
            className={inputClass}
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="cover" className={labelClass}>
            Cover image URL
          </label>
          <input
            id="cover"
            name="cover"
            type="url"
            defaultValue={article?.cover ?? ""}
            placeholder="https://res.cloudinary.com/…  (leave blank for the branded gradient cover)"
            className={inputClass}
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="tags" className={labelClass}>
            Tags
          </label>
          <input
            id="tags"
            name="tags"
            defaultValue={article?.tags?.join(", ") ?? ""}
            placeholder="AI, Prompt engineering, Image generation"
            className={inputClass}
          />
          <p className="mt-1.5 text-xs text-faint">Comma-separated.</p>
        </div>

        <div className="flex items-center gap-3 sm:col-span-2">
          <label className="inline-flex items-center gap-2 text-sm text-foreground">
            <input
              type="checkbox"
              name="featured"
              defaultChecked={article?.featured ?? false}
              className="h-4 w-4 rounded border-input accent-[var(--brand-sky)]"
            />
            Featured
          </label>
          <label className="inline-flex items-center gap-2 text-sm text-foreground">
            <input
              type="checkbox"
              name="trending"
              defaultChecked={article?.trending ?? false}
              className="h-4 w-4 rounded border-input accent-[var(--brand-sky)]"
            />
            Trending
          </label>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="body" className={labelClass}>
            Body <span className="text-error">*</span>
          </label>
          <textarea
            id="body"
            name="body"
            required
            rows={16}
            defaultValue={article ? blocksToMarkdownLite(article.body) : ""}
            placeholder={
              "Write naturally. A blank line starts a new paragraph.\n\n" +
              "## A heading\n### A smaller heading\n> A pull quote\n- A bullet\n1. A numbered step\n\n" +
              "Inline: **bold**, *italic*, `code`, [a link](https://example.com)"
            }
            className="w-full resize-y rounded-lg border border-input bg-background px-3.5 py-3 font-mono text-[13px] leading-relaxed text-foreground placeholder:text-faint focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/20"
          />
          <p className="mt-1.5 flex items-center gap-1.5 text-xs text-faint">
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            Simple markdown — headings, quotes, lists and inline formatting only.
            Code blocks, images, galleries and embeds can be added by editing the
            article data directly for now.
          </p>
        </div>

        <div>
          <label htmlFor="status" className={labelClass}>
            Status
          </label>
          <select
            id="status"
            name="status"
            defaultValue={article?.status ?? "draft"}
            className={inputClass}
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>
      </div>

      <div className="flex items-center gap-3 border-t border-border pt-5">
        <SubmitButton label={submitLabel} />
      </div>
    </form>
  );
}
