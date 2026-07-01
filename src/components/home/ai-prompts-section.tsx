import Link from "next/link";
import { Sparkles, ArrowRight, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion";

const PROMPT_TAGS = [
  "Neon portrait",
  "Brutalist poster",
  "3D icon",
  "Cinematic edit",
  "Product shot",
  "Logo mockup",
];

export function AiPromptsSection() {
  return (
    <section aria-labelledby="prompts-heading" className="container-shell py-16">
      <Reveal>
        <div className="relative overflow-hidden rounded-panel border border-border bg-card">
          {/* ambient brand glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[radial-gradient(closest-side,rgba(56,189,248,0.16),transparent)]"
          />

          <div className="relative grid gap-8 p-8 md:grid-cols-[1fr_0.9fr] md:items-center md:p-12">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-cat-ai/30 bg-cat-ai/10 px-3 py-1 text-xs font-medium text-cat-ai">
                <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                AI prompt library
              </span>

              <h2
                id="prompts-heading"
                className="mt-5 font-display text-3xl font-semibold leading-tight tracking-tight text-foreground"
              >
                Copy-paste prompts that
                <br />
                <span className="text-gradient">actually deliver.</span>
              </h2>

              <p className="mt-4 max-w-md text-[15px] leading-relaxed text-muted-foreground">
                Tested prompts for ChatGPT, Gemini and every major image model.
                Grab one, paste it, get a premium result — no trial and error.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {PROMPT_TAGS.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-border bg-subtle px-3 py-1 text-xs text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <Button asChild className="mt-8">
                <Link href="/ai">
                  Browse the library
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </Button>
            </div>

            {/* Prompt mock */}
            <div className="rounded-2xl border border-border-strong bg-background/80 p-1 backdrop-blur">
              <div className="flex items-center gap-2 border-b border-border px-4 py-2.5">
                <Terminal className="h-4 w-4 text-brand-sky" aria-hidden="true" />
                <span className="font-mono text-xs text-faint">neon-portrait.prompt</span>
                <span className="ml-auto flex gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-border-strong" />
                  <span className="h-2.5 w-2.5 rounded-full bg-border-strong" />
                  <span className="h-2.5 w-2.5 rounded-full bg-brand-sky/60" />
                </span>
              </div>
              <pre className="overflow-x-auto p-4 font-mono text-[12.5px] leading-relaxed text-muted-foreground">
                <code>
                  <span className="text-brand-cyan">Transform</span> the uploaded
                  photo into a premium{"\n"}
                  <span className="text-foreground">neon-identity portrait</span>.
                  Preserve exact{"\n"}facial identity. Add an{" "}
                  <span className="text-cat-tutorials">electric yellow</span>
                  {"\n"}rim light tracing the silhouette on a{"\n"}
                  <span className="text-foreground">pure black</span> background.
                  {"\n"}
                  <span className="text-faint">
                    {"// 4:5 · ultra-HD · no text, no logos"}
                  </span>
                </code>
              </pre>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
