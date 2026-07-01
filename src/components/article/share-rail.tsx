"use client";

import { useEffect, useState } from "react";
import { Send, Facebook, Twitter, Link2, Check, MessageCircle } from "lucide-react";

function useShareTargets(path: string, title: string) {
  const [url, setUrl] = useState("");
  useEffect(() => {
    setUrl(`${window.location.origin}${path}`);
  }, [path]);

  const enc = encodeURIComponent;
  return {
    url,
    targets: [
      {
        label: "WhatsApp",
        icon: MessageCircle,
        href: `https://wa.me/?text=${enc(`${title} ${url}`)}`,
      },
      {
        label: "Telegram",
        icon: Send,
        href: `https://t.me/share/url?url=${enc(url)}&text=${enc(title)}`,
      },
      {
        label: "Facebook",
        icon: Facebook,
        href: `https://www.facebook.com/sharer/sharer.php?u=${enc(url)}`,
      },
      {
        label: "X",
        icon: Twitter,
        href: `https://twitter.com/intent/tweet?url=${enc(url)}&text=${enc(title)}`,
      },
    ],
  };
}

function CopyButton({ url, className }: { url: string; className: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* no-op */
    }
  };
  return (
    <button
      type="button"
      onClick={copy}
      aria-label={copied ? "Link copied" : "Copy link"}
      className={className}
    >
      {copied ? (
        <Check className="h-[18px] w-[18px] text-success" aria-hidden="true" />
      ) : (
        <Link2 className="h-[18px] w-[18px]" aria-hidden="true" />
      )}
    </button>
  );
}

const railBtn =
  "inline-flex h-11 w-11 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-brand-sky/40 hover:text-brand-sky";

/** Desktop: sticky vertical share rail in the left margin. */
export function ShareRail({ path, title }: { path: string; title: string }) {
  const { url, targets } = useShareTargets(path, title);
  return (
    <div className="sticky top-24 flex flex-col items-center gap-3">
      <span className="text-[10px] font-medium uppercase tracking-wider text-faint">
        Share
      </span>
      {targets.map((t) => (
        <a
          key={t.label}
          href={t.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Share on ${t.label}`}
          className={railBtn}
        >
          <t.icon className="h-[18px] w-[18px]" aria-hidden="true" />
        </a>
      ))}
      <CopyButton url={url} className={railBtn} />
    </div>
  );
}

/** Mobile: fixed bottom share bar (thumb-reach), respects safe area. */
export function MobileShareBar({ path, title }: { path: string; title: string }) {
  const { url, targets } = useShareTargets(path, title);
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/80 backdrop-blur-xl lg:hidden">
      <div className="mx-auto flex max-w-md items-center justify-around px-4 pb-[env(safe-area-inset-bottom)] pt-2">
        {targets.map((t) => (
          <a
            key={t.label}
            href={t.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Share on ${t.label}`}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-brand-sky"
          >
            <t.icon className="h-5 w-5" aria-hidden="true" />
          </a>
        ))}
        <CopyButton
          url={url}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-brand-sky"
        />
      </div>
    </div>
  );
}
