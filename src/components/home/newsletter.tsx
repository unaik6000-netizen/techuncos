"use client";

import { useState } from "react";
import { Mail, Check, Loader2, AlertCircle } from "lucide-react";
import { Reveal } from "@/components/motion";

type Status = "idle" | "loading" | "success" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!EMAIL_RE.test(email)) {
      setError("Please enter a valid email address.");
      setStatus("error");
      return;
    }
    setError(null);
    setStatus("loading");
    // Backend wiring (Supabase) lands in the API phase. Simulate the request
    // so the success/loading UX is real and reviewable now.
    await new Promise((r) => setTimeout(r, 900));
    setStatus("success");
    setEmail("");
  };

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

          {status === "success" ? (
            <div
              role="status"
              className="mx-auto mt-7 inline-flex items-center gap-2 rounded-lg border border-success/30 bg-success/10 px-4 py-3 text-sm font-medium text-success"
            >
              <Check className="h-4 w-4" aria-hidden="true" />
              You&apos;re in! Check your inbox to confirm.
            </div>
          ) : (
            <form
              onSubmit={onSubmit}
              noValidate
              className="mx-auto mt-7 flex max-w-md flex-col gap-3 sm:flex-row"
            >
              <div className="flex-1 text-left">
                <label htmlFor="newsletter-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status === "error") setStatus("idle");
                  }}
                  placeholder="you@example.com"
                  aria-invalid={status === "error"}
                  aria-describedby={error ? "newsletter-error" : undefined}
                  className="h-12 w-full rounded-lg border border-input bg-background px-4 text-sm text-foreground placeholder:text-faint transition-colors focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/20"
                />
                {error && (
                  <p
                    id="newsletter-error"
                    role="alert"
                    className="mt-1.5 flex items-center gap-1.5 text-xs text-error"
                  >
                    <AlertCircle className="h-3.5 w-3.5" aria-hidden="true" />
                    {error}
                  </p>
                )}
              </div>
              <button
                type="submit"
                disabled={status === "loading"}
                className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-lg bg-brand-gradient px-6 text-sm font-medium text-primary-foreground transition-[filter] hover:brightness-110 disabled:opacity-70 [touch-action:manipulation]"
              >
                {status === "loading" ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                    Subscribing…
                  </>
                ) : (
                  "Subscribe"
                )}
              </button>
            </form>
          )}
        </div>
      </Reveal>
    </section>
  );
}
