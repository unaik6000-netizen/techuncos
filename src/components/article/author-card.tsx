import Link from "next/link";
import { Send, Twitter } from "lucide-react";
import { AuthorAvatar } from "./author-avatar";
import type { Author } from "@/types";

export function AuthorCard({ author }: { author: Author }) {
  return (
    <aside className="mt-12 rounded-panel border border-border bg-card p-6">
      <div className="flex items-start gap-4">
        <AuthorAvatar author={author} size={56} />
        <div className="min-w-0 flex-1">
          <p className="text-xs uppercase tracking-wider text-faint">
            Written by
          </p>
          <p className="mt-0.5 font-display text-lg font-semibold text-foreground">
            {author.name}
          </p>
          {author.bio && (
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {author.bio}
            </p>
          )}
          {(author.social?.telegram || author.social?.twitter) && (
            <div className="mt-3 flex gap-2">
              {author.social?.telegram && (
                <Link
                  href={author.social.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${author.name} on Telegram`}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-brand-sky/40 hover:text-brand-sky"
                >
                  <Send className="h-4 w-4" aria-hidden="true" />
                </Link>
              )}
              {author.social?.twitter && (
                <Link
                  href={author.social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${author.name} on X`}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-brand-sky/40 hover:text-brand-sky"
                >
                  <Twitter className="h-4 w-4" aria-hidden="true" />
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
