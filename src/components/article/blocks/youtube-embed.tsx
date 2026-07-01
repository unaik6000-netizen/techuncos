"use client";

import { useState } from "react";
import { Play } from "lucide-react";

/**
 * Lazy YouTube facade — renders only a thumbnail + play button until the user
 * clicks, then swaps in the privacy-friendly nocookie iframe. Keeps heavy
 * third-party JS off the initial load (a real Core Web Vitals win).
 */
export function YouTubeEmbed({ id, title }: { id: string; title: string }) {
  const [active, setActive] = useState(false);

  return (
    <figure className="my-7 overflow-hidden rounded-xl border border-border">
      <div className="relative aspect-video w-full bg-subtle">
        {active ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1`}
            title={title}
            allow="accelerated-2d-canvas; autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        ) : (
          <button
            type="button"
            onClick={() => setActive(true)}
            className="group absolute inset-0 flex items-center justify-center"
            aria-label={`Play video: ${title}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
              alt=""
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover opacity-80 transition-opacity group-hover:opacity-100"
            />
            <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-brand-gradient text-primary-foreground shadow-lg transition-transform duration-200 group-hover:scale-110">
              <Play className="ml-0.5 h-7 w-7 fill-current" aria-hidden="true" />
            </span>
          </button>
        )}
      </div>
      <figcaption className="px-4 py-2 text-xs text-faint">{title}</figcaption>
    </figure>
  );
}
