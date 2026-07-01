import { Fragment, type ReactNode } from "react";
import { ExternalLink } from "lucide-react";

/**
 * Renders a limited, safe inline syntax inside article text — no HTML
 * injection. Supports:
 *   [label](https://url)  → clickable link (external opens in new tab)
 *   **bold**              → <strong>
 *   *italic*              → <em>
 *   `code`                → inline <code>
 * Anything else renders as plain text.
 */
const TOKEN =
  /(\[[^\]]+\]\((?:https?:\/\/|\/)[^)]+\))|(\*\*[^*]+\*\*)|(\*[^*]+\*)|(`[^`]+`)/g;

function isExternal(href: string) {
  return /^https?:\/\//.test(href);
}

export function renderInline(text: string): ReactNode {
  const parts = text.split(TOKEN).filter((p) => p !== undefined && p !== "");

  return parts.map((part, i) => {
    // Link: [label](href)
    const link = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(part);
    if (link) {
      const [, label, href] = link;
      const external = isExternal(href);
      return (
        <a
          key={i}
          href={href}
          {...(external
            ? { target: "_blank", rel: "noopener noreferrer nofollow" }
            : {})}
          className="inline-flex items-center gap-0.5 font-medium text-brand-sky underline decoration-brand-sky/30 underline-offset-2 transition-colors hover:decoration-brand-sky"
        >
          {label}
          {external && (
            <ExternalLink className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          )}
        </a>
      );
    }

    // Bold: **text**
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold text-foreground">
          {part.slice(2, -2)}
        </strong>
      );
    }

    // Inline code: `text`
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code
          key={i}
          className="rounded bg-muted px-1.5 py-0.5 font-mono text-[0.85em] text-brand-cyan"
        >
          {part.slice(1, -1)}
        </code>
      );
    }

    return <Fragment key={i}>{part}</Fragment>;
  });
}
