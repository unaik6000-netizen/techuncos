#!/usr/bin/env node
/**
 * One-time seed: inserts the original 9 launch articles into the Supabase
 * `articles` table. Safe to re-run — uses upsert on `slug`.
 * Usage: node scripts/seed-articles.mjs
 */
import { readFileSync } from "node:fs";
import { createClient } from "@supabase/supabase-js";

function loadEnv() {
  const raw = readFileSync(".env.local", "utf8");
  return Object.fromEntries(
    raw
      .split("\n")
      .filter((l) => l.includes("=") && !l.trim().startsWith("#"))
      .map((l) => {
        const i = l.indexOf("=");
        return [l.slice(0, i).trim(), l.slice(i + 1).trim()];
      }),
  );
}

const env = loadEnv();
const supabase = createClient(
  env.NEXT_PUBLIC_SUPABASE_URL,
  env.SUPABASE_SERVICE_ROLE_KEY,
);

const authors = {
  team: {
    author_name: "Techuncos",
    author_slug: "techuncos",
    author_avatar_color: "#38BDF8",
    author_role: "Editorial team",
    author_bio:
      "The Techuncos desk — decoding AI, technology and digital life for Malayali readers, every single day.",
  },
  arjun: {
    author_name: "Arjun R",
    author_slug: "arjun-r",
    author_avatar_color: "#22D3EE",
    author_role: "Tech writer",
    author_bio:
      "Engineer turned writer. Arjun breaks down complex tech into simple Malayalam anyone can follow.",
  },
  sreeja: {
    author_name: "Sreeja K",
    author_slug: "sreeja-k",
    author_avatar_color: "#818CF8",
    author_role: "AI & creative",
    author_bio:
      "Content creator and prompt tinkerer. Sreeja covers AI image tools and the craft of prompting.",
  },
};

const TAG_POOL = {
  ai: ["AI", "Tools", "Productivity"],
  tech: ["Technology", "How-to", "Android"],
  digital: ["Digital", "Privacy", "Apps"],
  tutorials: ["Tutorial", "Beginner", "Guide"],
  news: ["News", "Update"],
};

function defaultBody(excerpt) {
  return [
    { type: "paragraph", text: excerpt },
    { type: "heading", level: 2, id: "overview", text: "Overview" },
    {
      type: "paragraph",
      text: "This is a preview of the article layout. Full editorial content for this piece is published from the Techuncos admin.",
    },
    {
      type: "callout",
      variant: "info",
      text: "More on this topic is on the way. Follow our Telegram to get notified the moment it's live.",
    },
  ];
}

const neonPortraitBody = [
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
  { type: "heading", level: 2, id: "why-it-works", text: "Why each part works" },
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
  { type: "heading", level: 2, id: "variations", text: "Variations to try" },
  {
    type: "paragraph",
    text: "Swap the accent colour (electric cyan, hot magenta), or change the rim-light to a full outline glow. Keep everything else fixed so you can see exactly what each change does.",
  },
  {
    type: "linkCard",
    href: "https://t.me/techuncos",
    label: "Get more prompts on Telegram",
    description: "We drop tested prompt packs for portraits, posters and product shots every week.",
  },
  {
    type: "callout",
    variant: "success",
    text: "That's it. Paste, generate, and tweak one variable at a time. You'll have a repeatable, premium look in minutes.",
  },
];

const footballBody = [
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
  { type: "heading", level: 2, id: "how-to-watch", lang: "ml", text: "എങ്ങനെ കാണാം" },
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
];

const ARTICLES = [
  {
    slug: "neon-portrait-ai-prompt",
    title: "Neon portrait: the exact AI prompt that actually works",
    subtitle:
      "One tested, copy-paste prompt that turns any photo into a premium neon-lit portrait — with the reasoning behind every line.",
    excerpt:
      "A premium neon-identity portrait, reverse-engineered. Copy the prompt, paste it into your image model, and get a clean editorial result every time.",
    category: "ai",
    ...authors.sreeja,
    published_at: "2026-06-30",
    read_time: 6,
    views: 12400,
    featured: true,
    trending: true,
    tags: ["AI", "Prompt engineering", "Image generation", "Midjourney"],
    body: neonPortraitBody,
    status: "published",
  },
  {
    slug: "football-malayalam-guide",
    title: "ഫുട്ബോൾ മാച്ച് മലയാളത്തിൽ കാണാൻ എന്ത് ചെയ്യണം?",
    subtitle: "ലോകകപ്പ് നിങ്ങളുടെ ഭാഷയിൽ — ഏഴോളം ഭാഷകളിൽ കാണാനുള്ള വഴി.",
    excerpt: "ലോകകപ്പ് ഏഴോളം ഭാഷകളിൽ കാണാം — എങ്ങനെ എന്ന് ലളിതമായി വിശദീകരിക്കുന്നു.",
    category: "digital",
    ...authors.arjun,
    published_at: "2026-06-29",
    read_time: 4,
    views: 9800,
    featured: false,
    trending: true,
    lang: "ml",
    tags: ["ഫുട്ബോൾ", "ലോകകപ്പ്", "സ്ട്രീമിംഗ്"],
    body: footballBody,
    status: "published",
  },
  {
    slug: "legal-free-streaming-platforms",
    title: "10 legal platforms to stream movies free (AdSense-safe)",
    excerpt:
      "Skip the piracy risk. These fully legal services — MX Player, Tubi, Pluto TV and more — stream films free with nothing shady attached.",
    category: "digital",
    ...authors.team,
    published_at: "2026-06-28",
    read_time: 7,
    views: 15200,
    featured: true,
    trending: false,
    tags: TAG_POOL.digital,
    body: defaultBody(
      "Skip the piracy risk. These fully legal services — MX Player, Tubi, Pluto TV and more — stream films free with nothing shady attached.",
    ),
    status: "published",
  },
  {
    slug: "brutalist-magazine-poster-prompt",
    title: "Turn any photo into a brutalist editorial poster with one prompt",
    excerpt:
      "The selective colour-reveal magazine look, broken down into a single reusable prompt for ChatGPT and Gemini image tools.",
    category: "ai",
    ...authors.sreeja,
    published_at: "2026-06-27",
    read_time: 5,
    views: 8600,
    featured: false,
    trending: true,
    tags: TAG_POOL.ai,
    body: defaultBody(
      "The selective colour-reveal magazine look, broken down into a single reusable prompt for ChatGPT and Gemini image tools.",
    ),
    status: "published",
  },
  {
    slug: "prompt-engineering-basics-malayalam",
    title: "പ്രോംപ്റ്റ് എൻജിനീയറിങ്: തുടക്കക്കാർക്കുള്ള വഴികാട്ടി",
    excerpt:
      "നല്ല പ്രോംപ്റ്റുകൾ എങ്ങനെ എഴുതാം? കൃത്യമായ നിർദേശങ്ങൾ നൽകി മികച്ച ഫലം നേടാനുള്ള അടിസ്ഥാന പാഠങ്ങൾ.",
    category: "tutorials",
    ...authors.arjun,
    published_at: "2026-06-26",
    read_time: 8,
    views: 6100,
    featured: false,
    trending: false,
    lang: "ml",
    tags: TAG_POOL.tutorials,
    body: defaultBody(
      "നല്ല പ്രോംപ്റ്റുകൾ എങ്ങനെ എഴുതാം? കൃത്യമായ നിർദേശങ്ങൾ നൽകി മികച്ച ഫലം നേടാനുള്ള അടിസ്ഥാന പാഠങ്ങൾ.",
    ),
    status: "draft",
  },
  {
    slug: "best-ai-tools-2026",
    title: "The 12 AI tools worth your time in 2026",
    excerpt:
      "We tested dozens so you don't have to. Here are the ones that genuinely save hours — for writing, images, code and research.",
    category: "ai",
    ...authors.team,
    published_at: "2026-06-25",
    read_time: 9,
    views: 18700,
    featured: false,
    trending: true,
    tags: TAG_POOL.ai,
    body: defaultBody(
      "We tested dozens so you don't have to. Here are the ones that genuinely save hours — for writing, images, code and research.",
    ),
    status: "published",
  },
  {
    slug: "android-hidden-features",
    title: "9 hidden Android features you should be using",
    excerpt:
      "Small settings, big difference. These built-in Android tricks make your phone faster, safer and far more private.",
    category: "tech",
    ...authors.arjun,
    published_at: "2026-06-24",
    read_time: 5,
    views: 7300,
    featured: false,
    trending: false,
    tags: TAG_POOL.tech,
    body: defaultBody(
      "Small settings, big difference. These built-in Android tricks make your phone faster, safer and far more private.",
    ),
    status: "draft",
  },
  {
    slug: "whatsapp-privacy-settings",
    title: "WhatsApp privacy: the 6 settings to change today",
    excerpt:
      "A quick, practical checklist to lock down who sees your data, your status and your last-seen — in under five minutes.",
    category: "digital",
    ...authors.team,
    published_at: "2026-06-23",
    read_time: 4,
    views: 5400,
    featured: false,
    trending: false,
    tags: TAG_POOL.digital,
    body: defaultBody(
      "A quick, practical checklist to lock down who sees your data, your status and your last-seen — in under five minutes.",
    ),
    status: "draft",
  },
  {
    slug: "chatgpt-vs-gemini-2026",
    title: "ChatGPT vs Gemini in 2026: which should you actually use?",
    excerpt:
      "An honest, side-by-side comparison for real everyday tasks — not benchmarks. The answer depends on what you do most.",
    category: "tech",
    ...authors.sreeja,
    published_at: "2026-06-22",
    read_time: 10,
    views: 11200,
    featured: false,
    trending: false,
    tags: TAG_POOL.tech,
    body: defaultBody(
      "An honest, side-by-side comparison for real everyday tasks — not benchmarks. The answer depends on what you do most.",
    ),
    status: "published",
  },
];

const { data, error } = await supabase
  .from("articles")
  .upsert(ARTICLES, { onConflict: "slug" })
  .select("slug, status");

if (error) {
  console.error("Seed failed:", error.message);
  process.exit(1);
}

console.log(`Seeded ${data.length} articles:`);
for (const row of data) console.log(`  - ${row.slug} (${row.status})`);
