import { ArrowUpRight } from "lucide-react";
import { CodeBlock } from "./blocks/code-block";
import { Callout } from "./blocks/callout";
import { YouTubeEmbed } from "./blocks/youtube-embed";
import { ImageBlock, Gallery } from "./blocks/media";
import { renderInline } from "@/lib/inline";
import type { ArticleBlock } from "@/types";

/**
 * Renders the typed block model into a styled, semantic article body.
 * Typography is tuned for both English and Malayalam (the `lang` attr on a
 * block triggers the Malayalam face + generous leading from globals.css).
 */
export function ArticleContent({ blocks }: { blocks: ArticleBlock[] }) {
  return (
    <div className="text-[17px] leading-[1.8] text-muted-foreground">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "paragraph":
            return (
              <p key={i} {...(block.lang ? { lang: block.lang } : {})} className="my-5">
                {renderInline(block.text)}
              </p>
            );

          case "heading": {
            const Tag = block.level === 2 ? "h2" : "h3";
            return (
              <Tag
                key={i}
                id={block.id}
                {...(block.lang ? { lang: block.lang } : {})}
                className={
                  block.level === 2
                    ? "mt-12 scroll-mt-24 font-display text-2xl font-semibold tracking-tight text-foreground sm:text-[26px]"
                    : "mt-9 scroll-mt-24 font-display text-xl font-semibold tracking-tight text-foreground"
                }
              >
                {block.text}
              </Tag>
            );
          }

          case "code":
            return (
              <CodeBlock
                key={i}
                code={block.code}
                language={block.language}
                filename={block.filename}
              />
            );

          case "callout":
            return (
              <Callout
                key={i}
                variant={block.variant}
                title={block.title}
                text={block.text}
                lang={block.lang}
              />
            );

          case "youtube":
            return <YouTubeEmbed key={i} id={block.id} title={block.title} />;

          case "image":
            return (
              <ImageBlock
                key={i}
                src={block.src}
                alt={block.alt}
                caption={block.caption}
              />
            );

          case "gallery":
            return <Gallery key={i} images={block.images} />;

          case "quote":
            return (
              <blockquote
                key={i}
                {...(block.lang ? { lang: block.lang } : {})}
                className="my-7 border-l-2 border-brand-sky pl-5 font-display text-xl italic leading-relaxed text-foreground"
              >
                {block.text}
                {block.cite && (
                  <cite className="mt-2 block text-sm not-italic text-faint">
                    — {block.cite}
                  </cite>
                )}
              </blockquote>
            );

          case "list": {
            const Tag = block.ordered ? "ol" : "ul";
            return (
              <Tag
                key={i}
                {...(block.lang ? { lang: block.lang } : {})}
                className={
                  block.ordered
                    ? "my-5 list-decimal space-y-2 pl-6 marker:text-faint"
                    : "my-5 list-disc space-y-2 pl-6 marker:text-brand-sky"
                }
              >
                {block.items.map((item, j) => (
                  <li key={j} className="pl-1.5">
                    {renderInline(item)}
                  </li>
                ))}
              </Tag>
            );
          }

          case "linkCard":
            return (
              <a
                key={i}
                href={block.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group my-7 flex items-center gap-4 rounded-xl border border-border bg-card p-4 transition-colors hover:border-brand-sky/40"
              >
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-foreground group-hover:text-brand-sky">
                    {block.label}
                  </p>
                  {block.description && (
                    <p className="mt-0.5 text-sm text-muted-foreground">
                      {block.description}
                    </p>
                  )}
                </div>
                <ArrowUpRight
                  className="h-5 w-5 shrink-0 text-faint transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-sky"
                  aria-hidden="true"
                />
              </a>
            );

          case "divider":
            return <hr key={i} className="my-10 rule-gradient border-0" />;

          default:
            return null;
        }
      })}
    </div>
  );
}
