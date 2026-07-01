import { Reveal } from "@/components/motion";

/** Consistent header + readable prose column for static/legal pages. */
export function PageShell({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="container-shell max-w-prose py-12 sm:py-16">
      <Reveal>
        {eyebrow && (
          <div className="mb-2 flex items-center gap-2">
            <span className="h-px w-6 bg-brand-gradient" />
            <span className="text-xs font-medium uppercase tracking-[0.14em] text-brand-sky">
              {eyebrow}
            </span>
          </div>
        )}
        <h1 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          {title}
        </h1>
        {intro && (
          <p className="mt-3 text-lg leading-relaxed text-muted-foreground">
            {intro}
          </p>
        )}
      </Reveal>
      <div className="mt-8 space-y-5 text-[15px] leading-relaxed text-muted-foreground [&_h2]:mt-8 [&_h2]:font-display [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-foreground [&_p_a]:text-brand-sky [&_p_a]:underline [&_p_a]:underline-offset-2 [&_p_a:hover]:text-brand-cyan">
        {children}
      </div>
    </div>
  );
}
