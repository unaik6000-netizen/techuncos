import { cn } from "@/lib/utils";
import { getCategory } from "@/constants/categories";
import type { CategorySlug, Locale } from "@/types";

/**
 * Category badge. Colour is driven by the category token and rendered as a
 * translucent tint + matching text, so every category reads as part of the
 * same blue-family system.
 */
export function CategoryBadge({
  slug,
  locale = "en",
  className,
}: {
  slug: CategorySlug;
  locale?: Locale;
  className?: string;
}) {
  const category = getCategory(slug);
  if (!category) return null;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wide",
        className,
      )}
      style={{
        color: `var(--${category.colorVar})`,
        borderColor: `color-mix(in srgb, var(--${category.colorVar}) 35%, transparent)`,
        backgroundColor: `color-mix(in srgb, var(--${category.colorVar}) 12%, transparent)`,
      }}
    >
      {category.name[locale]}
    </span>
  );
}
