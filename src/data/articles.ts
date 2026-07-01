import type { Article, ArticleBlock, ArticleFull, Author } from "@/types";

/**
 * TEMPORARY DATA SOURCE.
 * Cards read `Article` (metadata); the detail page reads `ArticleFull`
 * (metadata + body blocks). In the backend phase these functions are
 * replaced by Supabase queries returning the same shapes — no component
 * changes required.
 */

const authors: Record<string, Author> = {
  team: {
    name: "Techuncos",
    slug: "techuncos",
    avatarColor: "#38BDF8",
    role: "Editorial team",
    bio: "The Techuncos desk — decoding AI, technology and digital life for Malayali readers, every single day.",
    social: { telegram: "https://t.me/techuncos" },
  },
  arjun: {
    name: "Arjun R",
    slug: "arjun-r",
    avatarColor: "#22D3EE",
    role: "Tech writer",
    bio: "Engineer turned writer. Arjun breaks down complex tech into simple Malayalam anyone can follow.",
    social: { twitter: "https://twitter.com" },
  },
  sreeja: {
    name: "Sreeja K",
    slug: "sreeja-k",
    avatarColor: "#818CF8",
    role: "AI & creative",
    bio: "Content creator and prompt tinkerer. Sreeja covers AI image tools and the craft of prompting.",
    social: { twitter: "https://twitter.com" },
  },
};

export const ARTICLES: Article[] = [
  {
    id: "1",
    slug: "neon-portrait-ai-prompt",
    title: "Neon portrait: the exact AI prompt that actually works",
    excerpt:
      "A premium neon-identity portrait, reverse-engineered. Copy the prompt, paste it into your image model, and get a clean editorial result every time.",
    category: "ai",
    author: authors.sreeja,
    publishedAt: "2026-06-30",
    readTime: 6,
    views: 12400,
    featured: true,
    trending: true,
  },
  {
    id: "2",
    slug: "football-malayalam-guide",
    title: "ഫുട്ബോൾ മാച്ച് മലയാളത്തിൽ കാണാൻ എന്ത് ചെയ്യണം?",
    excerpt:
      "ലോകകപ്പ് ഏഴോളം ഭാഷകളിൽ കാണാം — എങ്ങനെ എന്ന് ലളിതമായി വിശദീകരിക്കുന്നു.",
    category: "digital",
    author: authors.arjun,
    publishedAt: "2026-06-29",
    readTime: 4,
    views: 9800,
    featured: false,
    trending: true,
    lang: "ml",
  },
  {
    id: "3",
    slug: "legal-free-streaming-platforms",
    title: "10 legal platforms to stream movies free (AdSense-safe)",
    excerpt:
      "Skip the piracy risk. These fully legal services — MX Player, Tubi, Pluto TV and more — stream films free with nothing shady attached.",
    category: "digital",
    author: authors.team,
    publishedAt: "2026-06-28",
    readTime: 7,
    views: 15200,
    featured: true,
    trending: false,
  },
  {
    id: "4",
    slug: "brutalist-magazine-poster-prompt",
    title: "Turn any photo into a brutalist editorial poster with one prompt",
    excerpt:
      "The selective colour-reveal magazine look, broken down into a single reusable prompt for ChatGPT and Gemini image tools.",
    category: "ai",
    author: authors.sreeja,
    publishedAt: "2026-06-27",
    readTime: 5,
    views: 8600,
    featured: false,
    trending: true,
  },
  {
    id: "5",
    slug: "prompt-engineering-basics-malayalam",
    title: "പ്രോംപ്റ്റ് എൻജിനീയറിങ്: തുടക്കക്കാർക്കുള്ള വഴികാട്ടി",
    excerpt:
      "നല്ല പ്രോംപ്റ്റുകൾ എങ്ങനെ എഴുതാം? കൃത്യമായ നിർദേശങ്ങൾ നൽകി മികച്ച ഫലം നേടാനുള്ള അടിസ്ഥാന പാഠങ്ങൾ.",
    category: "tutorials",
    author: authors.arjun,
    publishedAt: "2026-06-26",
    readTime: 8,
    views: 6100,
    featured: false,
    trending: false,
    lang: "ml",
  },
  {
    id: "6",
    slug: "best-ai-tools-2026",
    title: "The 12 AI tools worth your time in 2026",
    excerpt:
      "We tested dozens so you don't have to. Here are the ones that genuinely save hours — for writing, images, code and research.",
    category: "ai",
    author: authors.team,
    publishedAt: "2026-06-25",
    readTime: 9,
    views: 18700,
    featured: false,
    trending: true,
  },
  {
    id: "7",
    slug: "android-hidden-features",
    title: "9 hidden Android features you should be using",
    excerpt:
      "Small settings, big difference. These built-in Android tricks make your phone faster, safer and far more private.",
    category: "tech",
    author: authors.arjun,
    publishedAt: "2026-06-24",
    readTime: 5,
    views: 7300,
    featured: false,
    trending: false,
  },
  {
    id: "8",
    slug: "whatsapp-privacy-settings",
    title: "WhatsApp privacy: the 6 settings to change today",
    excerpt:
      "A quick, practical checklist to lock down who sees your data, your status and your last-seen — in under five minutes.",
    category: "digital",
    author: authors.team,
    publishedAt: "2026-06-23",
    readTime: 4,
    views: 5400,
    featured: false,
    trending: false,
  },
  {
    id: "9",
    slug: "chatgpt-vs-gemini-2026",
    title: "ChatGPT vs Gemini in 2026: which should you actually use?",
    excerpt:
      "An honest, side-by-side comparison for real everyday tasks — not benchmarks. The answer depends on what you do most.",
    category: "tech",
    author: authors.sreeja,
    publishedAt: "2026-06-22",
    readTime: 10,
    views: 11200,
    featured: false,
    trending: false,
  },
];

/** Per-article rich content. Flagship pieces get full, multi-block bodies. */
const BODIES: Record<
  string,
  { subtitle?: string; tags: string[]; body: ArticleBlock[] }
> = {
  "neon-portrait-ai-prompt": {
    subtitle:
      "One tested, copy-paste prompt that turns any photo into a premium neon-lit portrait — with the reasoning behind every line.",
    tags: ["AI", "Prompt engineering", "Image generation", "Midjourney"],
    body: [
      {
        type: "paragraph",
        text: "We use AI image tools constantly to edit and stylise photos. The single biggest problem people hit isn't the tool — it's the **prompt**. A vague instruction gives a vague result. Below is the exact prompt we use for a clean, editorial *neon-identity* portrait, plus why each part matters.",
      },
      {
        type: "callout",
        variant: "info",
        title: "Before you start",
        text: "This works in ChatGPT (image), Gemini, and most image models. Upload a clear, front-facing reference photo first, then paste the prompt below.",
      },
      { type: "heading", level: 2, id: "the-prompt", text: "The prompt" },
      {
        type: "paragraph",
        text: "Copy this whole block. Replace nothing unless you want to — it's tuned to preserve identity while restyling everything around it.",
      },
      {
        type: "code",
        language: "text",
        filename: "neon-portrait.prompt",
        code: `Transform the uploaded reference photo into a premium
neon-identity portrait. Preserve the subject's exact facial
identity, hairstyle, age and expression.

Style: ultra-detailed monochrome portrait, grayscale skin,
graphic-novel rendering, deep blacks, dramatic contrast.

Lighting: intense glowing neon-yellow rim light tracing the
entire outer silhouette — hair, shoulders, profile.

Background: pure solid black, no texture, no objects.

Composition: 4:5 vertical, chest-up, strong focus on the face.
Color: black, white, grayscale and neon-yellow only.
Important: no text, no logos, no watermarks, no extra accessories.`,
      },
      {
        type: "heading",
        level: 2,
        id: "why-it-works",
        text: "Why each part works",
      },
      {
        type: "paragraph",
        text: "Great prompts read like a brief to a designer. Here's the logic:",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "**Identity lock** — naming *exact facial identity, hairstyle, age* stops the model drifting into a generic face.",
          "**Style stack** — layering *monochrome + graphic-novel + deep blacks* compounds into one coherent look instead of a muddle.",
          "**Single accent** — restricting colour to *neon-yellow only* is what makes it read as premium, not busy.",
          "**Negative rules** — *no text, no logos* removes the artefacts models love to hallucinate.",
        ],
      },
      {
        type: "callout",
        variant: "warning",
        title: "Common mistake",
        text: "Don't pile on ten colours. The restraint (one accent on grayscale) is the entire effect. More colours = cheaper result.",
      },
      {
        type: "quote",
        text: "A prompt is just instructions. The clearer the instruction, the closer the result — exactly like giving directions to a person.",
      },
      {
        type: "heading",
        level: 2,
        id: "variations",
        text: "Variations to try",
      },
      {
        type: "paragraph",
        text: "Swap the accent colour (electric cyan, hot magenta), or change the rim-light to a full outline glow. Keep everything else fixed so you can see exactly what each change does.",
      },
      {
        type: "linkCard",
        href: "https://t.me/techuncos",
        label: "Get more prompts on Telegram",
        description:
          "We drop tested prompt packs for portraits, posters and product shots every week.",
      },
      {
        type: "callout",
        variant: "success",
        text: "That's it. Paste, generate, and tweak one variable at a time. You'll have a repeatable, premium look in minutes.",
      },
    ],
  },

  "football-malayalam-guide": {
    subtitle: "ലോകകപ്പ് നിങ്ങളുടെ ഭാഷയിൽ — ഏഴോളം ഭാഷകളിൽ കാണാനുള്ള വഴി.",
    tags: ["ഫുട്ബോൾ", "ലോകകപ്പ്", "സ്ട്രീമിംഗ്"],
    body: [
      {
        type: "paragraph",
        lang: "ml",
        text: "ലോകം ഒരു തുകൽ പന്തിനു ചുറ്റും കറങ്ങുന്ന സമയമാണിത്. 48 ഓളം ടീമുകൾ പങ്കെടുക്കുന്ന മത്സരം — എല്ലാം ചുരുങ്ങിയ സമയത്തിനുള്ളിൽ സംഭവിക്കും. ഈ കാഴ്ചകൾ നമ്മുടെ സ്വന്തം ഭാഷയിൽ കാണാൻ എന്ത് ചെയ്യണം എന്ന് നോക്കാം.",
      },
      {
        type: "callout",
        variant: "info",
        lang: "ml",
        title: "ശ്രദ്ധിക്കുക",
        text: "ഔദ്യോഗിക ബ്രോഡ്കാസ്റ്റ് ആപ്പുകൾ മാത്രം ഉപയോഗിക്കുക. പൈറസി ലിങ്കുകൾ ഒഴിവാക്കുക.",
      },
      {
        type: "heading",
        level: 2,
        id: "how-to-watch",
        lang: "ml",
        text: "എങ്ങനെ കാണാം",
      },
      {
        type: "list",
        ordered: true,
        lang: "ml",
        items: [
          "ഔദ്യോഗിക സ്ട്രീമിംഗ് ആപ്പ് തുറക്കുക.",
          "ഭാഷാ ഓപ്ഷനിൽ മലയാളം തിരഞ്ഞെടുക്കുക.",
          "മത്സരം ആരംഭിക്കുന്നതിന് മുൻപ് നോട്ടിഫിക്കേഷൻ ഓൺ ചെയ്യുക.",
        ],
      },
      {
        type: "quote",
        lang: "ml",
        text: "കാല്പന്തുകൊണ്ട് കവിതകൾ രചിക്കുന്ന കാലം — അത് നമ്മുടെ ഭാഷയിൽ കാണുമ്പോൾ ഇരട്ടി മധുരം.",
      },
      {
        type: "paragraph",
        lang: "ml",
        text: "കൂടുതൽ അപ്ഡേറ്റുകൾക്ക് ഞങ്ങളുടെ ടെലിഗ്രാം ചാനൽ [ഇവിടെ ഫോളോ ചെയ്യൂ](https://t.me/techuncos).",
      },
    ],
  },
};

/** Sensible default body for articles without hand-authored content yet. */
function defaultBody(article: Article): ArticleBlock[] {
  return [
    { type: "paragraph", text: article.excerpt },
    {
      type: "heading",
      level: 2,
      id: "overview",
      text: "Overview",
    },
    {
      type: "paragraph",
      text: "This is a preview of the article layout. Full editorial content for this piece is published from the Techuncos admin — the reading experience, typography and every content block you see here is production-ready.",
    },
    {
      type: "callout",
      variant: "info",
      text: "More on this topic is on the way. Follow our Telegram to get notified the moment it's live.",
    },
  ];
}

const TAG_POOL: Record<string, string[]> = {
  ai: ["AI", "Tools", "Productivity"],
  tech: ["Technology", "How-to", "Android"],
  digital: ["Digital", "Privacy", "Apps"],
  tutorials: ["Tutorial", "Beginner", "Guide"],
  news: ["News", "Update"],
};

/* ── Queries ──────────────────────────────────────────────────── */

export const getFeaturedArticles = () => ARTICLES.filter((a) => a.featured);
export const getTrendingArticles = () => ARTICLES.filter((a) => a.trending);
export const getLatestArticles = (limit = 6) =>
  [...ARTICLES]
    .sort((a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt))
    .slice(0, limit);
export const getHeroArticle = () => ARTICLES.find((a) => a.featured) ?? ARTICLES[0];

export const getAllSlugs = () => ARTICLES.map((a) => a.slug);

export const getArticlesByCategory = (category: string): Article[] =>
  ARTICLES.filter((a) => a.category === category).sort(
    (a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt),
  );

/** All articles, optionally filtered by a homepage "view all" facet. */
export function getArticles(filter?: string): Article[] {
  const sorted = [...ARTICLES].sort(
    (a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt),
  );
  if (filter === "trending") return sorted.filter((a) => a.trending);
  if (filter === "featured") return sorted.filter((a) => a.featured);
  if (filter === "popular")
    return [...ARTICLES].sort((a, b) => b.views - a.views);
  return sorted;
}

export function getArticleBySlug(slug: string): ArticleFull | undefined {
  const meta = ARTICLES.find((a) => a.slug === slug);
  if (!meta) return undefined;
  const rich = BODIES[slug];
  return {
    ...meta,
    subtitle: rich?.subtitle,
    updatedAt: meta.publishedAt,
    tags: rich?.tags ?? TAG_POOL[meta.category] ?? [],
    body: rich?.body ?? defaultBody(meta),
  };
}

export function getRelatedArticles(slug: string, limit = 3): Article[] {
  const current = ARTICLES.find((a) => a.slug === slug);
  if (!current) return [];
  const sameCategory = ARTICLES.filter(
    (a) => a.slug !== slug && a.category === current.category,
  );
  const others = ARTICLES.filter(
    (a) => a.slug !== slug && a.category !== current.category,
  );
  return [...sameCategory, ...others].slice(0, limit);
}

export function getAdjacentArticles(slug: string): {
  prev: Article | null;
  next: Article | null;
} {
  const ordered = [...ARTICLES].sort(
    (a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt),
  );
  const i = ordered.findIndex((a) => a.slug === slug);
  return {
    prev: i > 0 ? ordered[i - 1] : null,
    next: i >= 0 && i < ordered.length - 1 ? ordered[i + 1] : null,
  };
}
