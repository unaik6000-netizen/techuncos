"use client";

import { useActionState, useEffect, useRef } from "react";
import { MessageCircle, Send, Check, AlertCircle, Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";
import { submitCommentAction, type CommentState } from "@/app/(site)/actions";
import { formatDate } from "@/lib/utils";
import type { PublicComment } from "@/data/comments";

function initials(name: string) {
  return name.slice(0, 2).toUpperCase();
}

const COLORS = ["#22D3EE", "#818CF8", "#38BDF8", "#2DD4BF"];
function colorFor(name: string) {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h << 5) - h + name.charCodeAt(i);
  return COLORS[Math.abs(h) % COLORS.length];
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex h-10 shrink-0 items-center gap-2 rounded-lg bg-brand-gradient px-4 text-sm font-medium text-primary-foreground transition-[filter] hover:brightness-110 disabled:opacity-70 [touch-action:manipulation]"
    >
      {pending ? (
        <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
      ) : (
        <Send className="h-4 w-4" aria-hidden="true" />
      )}
      Post comment
    </button>
  );
}

export function CommentSection({
  slug,
  comments,
}: {
  slug: string;
  comments: PublicComment[];
}) {
  const [state, formAction] = useActionState<CommentState, FormData>(
    submitCommentAction,
    {},
  );
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.ok) formRef.current?.reset();
  }, [state.ok]);

  return (
    <section
      aria-labelledby="comments-heading"
      className="mt-12 border-t border-border pt-10"
    >
      <h2
        id="comments-heading"
        className="flex items-center gap-2 font-display text-xl font-semibold text-foreground"
      >
        <MessageCircle className="h-5 w-5 text-brand-sky" aria-hidden="true" />
        Comments
        <span className="text-base font-normal text-faint">({comments.length})</span>
      </h2>

      <form ref={formRef} action={formAction} className="mt-6" noValidate>
        <input type="hidden" name="articleSlug" value={slug} />
        {/* honeypot */}
        <input
          type="text"
          name="company"
          tabIndex={-1}
          autoComplete="off"
          className="absolute left-[-9999px] h-0 w-0 opacity-0"
          aria-hidden="true"
        />

        <div className="mb-3">
          <label htmlFor="c-name" className="sr-only">
            Your name (optional)
          </label>
          <input
            id="c-name"
            name="name"
            placeholder="Your name (optional)"
            autoComplete="name"
            className="h-11 w-full max-w-xs rounded-lg border border-input bg-background px-3.5 text-sm text-foreground placeholder:text-faint focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/20"
          />
        </div>

        <label htmlFor="c-body" className="sr-only">
          Add a comment
        </label>
        <textarea
          id="c-body"
          name="body"
          required
          placeholder="Share your thoughts…"
          rows={3}
          className="w-full resize-y rounded-lg border border-input bg-background px-3.5 py-3 text-sm leading-relaxed text-foreground placeholder:text-faint focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/20"
        />

        <div className="mt-2 flex items-center justify-between gap-3">
          <div aria-live="polite" className="min-h-[20px] text-xs">
            {state.error && (
              <span role="alert" className="inline-flex items-center gap-1 text-error">
                <AlertCircle className="h-3.5 w-3.5" aria-hidden="true" />
                {state.error}
              </span>
            )}
            {state.ok && (
              <span className="inline-flex items-center gap-1 text-success">
                <Check className="h-3.5 w-3.5" aria-hidden="true" />
                Submitted — your comment will appear once approved.
              </span>
            )}
          </div>
          <SubmitButton />
        </div>
      </form>

      {comments.length > 0 && (
        <ul className="mt-8 space-y-6">
          {comments.map((c) => (
            <li key={c.id} className="flex gap-3">
              <span
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-medium text-background"
                style={{ backgroundColor: colorFor(c.name) }}
                aria-hidden="true"
              >
                {initials(c.name)}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-foreground">{c.name}</span>
                  <span className="text-xs text-faint">{formatDate(c.createdAt)}</span>
                </div>
                <p className="mt-1 text-[15px] leading-relaxed text-muted-foreground">
                  {c.body}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}

      <p className="mt-6 text-xs text-faint">
        Comments are moderated before appearing publicly. Be kind and stay on topic.
      </p>
    </section>
  );
}
