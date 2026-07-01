import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { CATEGORIES } from "@/constants/categories";

export function CategoriesGrid() {
  return (
    <section aria-labelledby="categories-heading" className="container-shell py-16">
      <Reveal>
        <SectionHeading
          eyebrow="Browse by topic"
          title="Explore categories"
          description="Five focused streams, all in the language you prefer."
          className="mb-8"
        />
      </Reveal>

      <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {CATEGORIES.map((category) => {
          const Icon = category.icon;
          return (
            <StaggerItem key={category.slug} className="h-full">
              <Link
                href={`/${category.slug}`}
                className="group relative flex h-full items-start gap-4 overflow-hidden rounded-card border border-border bg-card p-5 transition-colors duration-300 hover:border-border-strong"
              >
                {/* category-tinted hover glow */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    backgroundColor: `color-mix(in srgb, var(--${category.colorVar}) 30%, transparent)`,
                  }}
                />
                <span
                  className="relative inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border"
                  style={{
                    color: `var(--${category.colorVar})`,
                    borderColor: `color-mix(in srgb, var(--${category.colorVar}) 30%, transparent)`,
                    backgroundColor: `color-mix(in srgb, var(--${category.colorVar}) 10%, transparent)`,
                  }}
                >
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>

                <div className="relative min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-base font-semibold text-foreground">
                      {category.name.en}
                    </h3>
                    <ArrowUpRight className="h-4 w-4 text-faint transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" aria-hidden="true" />
                  </div>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {category.description.en}
                  </p>
                  <p className="mt-3 text-xs tabular-nums text-faint">
                    {category.articleCount} articles
                  </p>
                </div>
              </Link>
            </StaggerItem>
          );
        })}
      </Stagger>
    </section>
  );
}
