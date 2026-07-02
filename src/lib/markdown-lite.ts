import type { ArticleBlock, Locale } from "@/types";

/**
 * A tiny, forgiving markdown-lite parser for the admin article editor.
 * Converts plain text into the same typed `ArticleBlock[]` the reading page
 * already renders — so admins write natural text, not raw JSON, and the
 * output is indistinguishable from a hand-authored article.
 *
 * Supported syntax (one construct per line/paragraph):
 *   ## Heading        -> heading level 2
 *   ### Heading       -> heading level 3
 *   > Quote text      -> blockquote
 *   - item / 1. item  -> list (consecutive lines grouped)
 *   blank-line breaks -> paragraphs
 * Inline **bold**, *italic*, `code`, [label](url) already render via
 * src/lib/inline.tsx — no extra handling needed here.
 *
 * This is intentionally simple (not a full rich-text editor) — it unblocks
 * real publishing today and can be swapped for a WYSIWYG editor later
 * without changing the stored data shape.
 */
export function parseMarkdownLite(text: string, lang?: Locale): ArticleBlock[] {
  const lines = text.replace(/\r\n/g, "\n").split("\n");
  const blocks: ArticleBlock[] = [];
  let paragraphBuf: string[] = [];
  let listBuf: { ordered: boolean; items: string[] } | null = null;
  let headingCounter = 0;

  const flushParagraph = () => {
    if (paragraphBuf.length) {
      blocks.push({ type: "paragraph", text: paragraphBuf.join(" "), lang });
      paragraphBuf = [];
    }
  };
  const flushList = () => {
    if (listBuf) {
      blocks.push({ type: "list", ordered: listBuf.ordered, items: listBuf.items, lang });
      listBuf = null;
    }
  };

  for (const rawLine of lines) {
    const line = rawLine.trim();

    if (line === "") {
      flushParagraph();
      flushList();
      continue;
    }

    const h2 = /^##\s+(.*)/.exec(line);
    const h3 = /^###\s+(.*)/.exec(line);
    const quote = /^>\s?(.*)/.exec(line);
    const ordered = /^\d+\.\s+(.*)/.exec(line);
    const unordered = /^[-*]\s+(.*)/.exec(line);

    if (h2 || h3) {
      flushParagraph();
      flushList();
      headingCounter += 1;
      const headingText = (h2 ?? h3)![1];
      blocks.push({
        type: "heading",
        level: h2 ? 2 : 3,
        id: `section-${headingCounter}-${slugify(headingText)}`,
        text: headingText,
        lang,
      });
      continue;
    }

    if (quote) {
      flushParagraph();
      flushList();
      blocks.push({ type: "quote", text: quote[1], lang });
      continue;
    }

    if (ordered || unordered) {
      flushParagraph();
      const isOrdered = !!ordered;
      const itemText = (ordered ?? unordered)![1];
      if (!listBuf || listBuf.ordered !== isOrdered) {
        flushList();
        listBuf = { ordered: isOrdered, items: [] };
      }
      listBuf.items.push(itemText);
      continue;
    }

    flushList();
    paragraphBuf.push(line);
  }

  flushParagraph();
  flushList();
  return blocks;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40);
}

/** Reverse of parseMarkdownLite — used to populate the edit form's textarea. */
export function blocksToMarkdownLite(blocks: ArticleBlock[]): string {
  return blocks
    .map((b) => {
      switch (b.type) {
        case "heading":
          return `${b.level === 2 ? "##" : "###"} ${b.text}`;
        case "paragraph":
          return b.text;
        case "quote":
          return `> ${b.text}`;
        case "list":
          return b.items
            .map((item, i) => (b.ordered ? `${i + 1}. ${item}` : `- ${item}`))
            .join("\n");
        default:
          return "";
      }
    })
    .filter(Boolean)
    .join("\n\n");
}
