import { cn } from "@/lib/utils";
import type { Author } from "@/types";

/** Initials avatar tinted with the author's brand colour. */
export function AuthorAvatar({
  author,
  size = 40,
  className,
}: {
  author: Author;
  size?: number;
  className?: string;
}) {
  const initials = author.name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-full font-medium text-background",
        className,
      )}
      style={{
        width: size,
        height: size,
        backgroundColor: author.avatarColor,
        fontSize: size * 0.4,
      }}
      aria-hidden="true"
    >
      {initials}
    </span>
  );
}
