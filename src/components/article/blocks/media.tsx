import Image from "next/image";
import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Renders a real image via next/image, or an on-brand gradient placeholder
 * when the src uses the `placeholder:` scheme — so demo articles never show
 * a broken image and layout never shifts.
 */
function Media({
  src,
  alt,
  className,
  sizes,
}: {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
}) {
  const isPlaceholder = src.startsWith("placeholder:");

  if (isPlaceholder) {
    return (
      <div
        className={cn(
          "flex items-center justify-center bg-[linear-gradient(160deg,#0f1b2e,#0a1220)]",
          className,
        )}
      >
        <ImageIcon
          className="h-10 w-10 text-brand-sky/25"
          strokeWidth={1.25}
          aria-hidden="true"
        />
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes ?? "(max-width: 768px) 100vw, 720px"}
      className={cn("object-cover", className)}
    />
  );
}

export function ImageBlock({
  src,
  alt,
  caption,
}: {
  src: string;
  alt: string;
  caption?: string;
}) {
  return (
    <figure className="my-7">
      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl border border-border">
        <Media src={src} alt={alt} />
      </div>
      {caption && (
        <figcaption className="mt-2 text-center text-sm text-faint">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

export function Gallery({
  images,
}: {
  images: { src: string; alt: string }[];
}) {
  return (
    <div className="my-7 grid grid-cols-2 gap-3 sm:grid-cols-3">
      {images.map((img, i) => (
        <div
          key={i}
          className="relative aspect-square overflow-hidden rounded-lg border border-border"
        >
          <Media src={img.src} alt={img.alt} sizes="(max-width: 640px) 50vw, 240px" />
        </div>
      ))}
    </div>
  );
}
