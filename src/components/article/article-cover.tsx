import Image from "next/image";
import { getCategory } from "@/constants/categories";
import { cn } from "@/lib/utils";
import type { CategorySlug } from "@/types";

/**
 * Article cover. Uses next/image when a real cover URL exists; otherwise
 * renders an on-brand gradient panel with the category icon as a watermark,
 * so the grid never shows a broken image and layout never shifts.
 */
export function ArticleCover({
  category,
  title,
  src,
  className,
  sizes,
  priority,
}: {
  category: CategorySlug;
  title: string;
  src?: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  const cat = getCategory(category);
  const Icon = cat?.icon;
  const color = cat ? `var(--${cat.colorVar})` : "var(--primary)";

  return (
    <div
      className={cn(
        "relative aspect-[16/9] w-full overflow-hidden bg-subtle",
        className,
      )}
    >
      {src ? (
        <Image
          src={src}
          alt={title}
          fill
          sizes={sizes ?? "(max-width: 768px) 100vw, 33vw"}
          priority={priority}
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
        />
      ) : (
        <div
          className="absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-[1.04]"
          style={{
            backgroundImage: `radial-gradient(120% 120% at 78% 18%, color-mix(in srgb, ${color} 26%, transparent) 0%, transparent 55%), linear-gradient(160deg, #0f1b2e 0%, #0a1220 100%)`,
          }}
        >
          {Icon && (
            <Icon
              className="absolute right-4 top-4 h-20 w-20 opacity-[0.14]"
              style={{ color }}
              strokeWidth={1.25}
              aria-hidden="true"
            />
          )}
        </div>
      )}
      <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/[0.04]" />
    </div>
  );
}
