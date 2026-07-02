"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { Mail, Check, Loader2, AlertCircle } from "lucide-react";
import { Reveal } from "@/components/motion";
import {
  subscribeNewsletterAction,
  type NewsletterState,
} from "@/app/(site)/actions";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-lg bg-brand-gradient px-6 text-sm font-medium text-primary-foreground transition-[filter] hover:brightness-110 disabled:opacity-70 [touch-action:manipulation]"
    >
      {pending ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
          Subscribing…
        </>
      ) : (
        "Subscribe"
      )}
    </button>
  );
}

export function Newsletter() {
  const [state, formAction] = useActionState<NewsletterState, FormData>(
    subscribeNewsletterAction,
    {},
  );

  return (
    <section aria-labelledby="newsletter-heading" className="container-shell py-16">
      <Reveal>
        <div className="mx-auto max-w-2xl rounded-panel border border-border bg-card p-8 text-center md:p-12">
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-subtle text-brand-sky">
            <Mail className="h-5 w-5" aria-hidden="true" />
          </span>

          <h2
            id="newsletter-heading"
            className="mt-5 font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
          >
            Get the weekly digest
          </h2>
          <p className="mx-auto mt-3 max-w-md text-[15px] leading-relaxed text-muted-foreground">
            One email a week. The best of AI, tech and digital — no spam, ever.
            Unsubscribe anytime.
          </p>

          {state.ok ? (
            <div
              role="status"
              className="mx-auto mt-7 inline-flex items-center gap-2 rounded-lg border border-success/30 bg-success/10 px-4 py-3 text-sm font-medium text-success"
            >
              <Check className="h-4 w-4" aria-hidden="true" />
              You&apos;re in! Thanks for subscribing.
            </div>
          ) : (
            <form
              action={formAction}
              noValidate
              className="mx-auto mt-7 flex max-w-md flex-col gap-3 sm:flex-row"
            >
              {/* honeypot */}
              <input
                type="text"
                name="company"
                tabIndex={-1}
                autoComplete="off"
                className="absolute left-[-9999px] h-0 w-0 opacity-0"
                aria-hidden="true"
              />
              <div className="flex-1 text-left">
                <label htmlFor="newsletter-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="newsletter-email"
                  name="email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  required
                  placeholder="you@example.com"
                  aria-invalid={!!state.error}
                  aria-describedby={state.error ? "newsletter-error" : undefined}
                  className="h-12 w-full rounded-lg border border-input bg-background px-4 text-sm text-foreground placeholder:text-faint transition-colors focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/20"
                />
                {state.error && (
                  <p
                    id="newsletter-error"
                    role="alert"
                    className="mt-1.5 flex items-center gap-1.5 text-xs text-error"
                  >
                    <AlertCircle className="h-3.5 w-3.5" aria-hidden="true" />
                    {state.error}
                  </p>
                )}
              </div>
              <SubmitButton />
            </form>
          )}
        </div>
      </Reveal>
    </section>
  );
}
