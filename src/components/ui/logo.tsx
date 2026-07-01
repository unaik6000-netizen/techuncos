import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * Techuncos wordmark + circuit-T mark, rendered as inline SVG so it stays
 * crisp at any size and adapts to the theme. "TECH" in the brand gradient,
 * "UNCOS" in foreground — echoing the logo.
 */
export function Logo({
  className,
  showWordmark = true,
}: {
  className?: string;
  showWordmark?: boolean;
}) {
  return (
    <Link
      href="/"
      aria-label="Techuncos home"
      className={cn(
        "group inline-flex items-center gap-2.5 rounded-md focus-visible:outline-none",
        className,
      )}
    >
      <svg
        width="30"
        height="30"
        viewBox="0 0 40 40"
        fill="none"
        aria-hidden="true"
        className="shrink-0 transition-transform duration-300 group-hover:scale-105"
      >
        <defs>
          <linearGradient id="tu-mark" x1="8" y1="6" x2="32" y2="34">
            <stop offset="0" stopColor="#22D3EE" />
            <stop offset="0.5" stopColor="#38BDF8" />
            <stop offset="1" stopColor="#3B82F6" />
          </linearGradient>
        </defs>
        {/* circuit dots */}
        <circle cx="7" cy="11" r="2.4" fill="url(#tu-mark)" />
        <circle cx="7" cy="19" r="2.4" fill="url(#tu-mark)" />
        <circle cx="7" cy="27" r="2.4" fill="url(#tu-mark)" />
        <path
          d="M10 11h9M10 19h9M10 27h9"
          stroke="url(#tu-mark)"
          strokeWidth="2"
          strokeLinecap="round"
        />
        {/* T */}
        <path
          d="M17 8H35M26 8V33"
          stroke="url(#tu-mark)"
          strokeWidth="4.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {showWordmark && (
        <span className="font-display text-[19px] font-bold tracking-tight">
          <span className="text-gradient">Tech</span>
          <span className="text-foreground">uncos</span>
        </span>
      )}
    </Link>
  );
}
