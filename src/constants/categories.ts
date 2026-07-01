import { Sparkles, Cpu, Smartphone, GraduationCap, Newspaper } from "lucide-react";
import type { Category } from "@/types";

/**
 * Category definitions. Colors are all held in the blue family so the
 * homepage never looks like a template blog with random category hues.
 */
export const CATEGORIES: Category[] = [
  {
    slug: "ai",
    name: { ml: "എഐ", en: "AI", hi: "एआई" },
    description: {
      ml: "നിർമിത ബുദ്ധി, ടൂളുകൾ, പ്രോംപ്റ്റുകൾ",
      en: "Artificial intelligence, tools & prompts",
      hi: "आर्टिफिशियल इंटेलिजेंस, टूल्स और प्रॉम्प्ट",
    },
    icon: Sparkles,
    colorVar: "cat-ai",
    articleCount: 24,
  },
  {
    slug: "tech",
    name: { ml: "ടെക്നോളജി", en: "Technology", hi: "टेक्नोलॉजी" },
    description: {
      ml: "ഗാഡ്ജറ്റുകൾ, സോഫ്റ്റ്‌വെയർ, വാർത്തകൾ",
      en: "Gadgets, software & breaking tech",
      hi: "गैजेट्स, सॉफ्टवेयर और टेक न्यूज़",
    },
    icon: Cpu,
    colorVar: "cat-tech",
    articleCount: 31,
  },
  {
    slug: "digital",
    name: { ml: "ഡിജിറ്റൽ", en: "Digital", hi: "डिजिटल" },
    description: {
      ml: "ഡിജിറ്റൽ ടിപ്പുകളും ട്രിക്കുകളും",
      en: "Digital tips, tricks & resources",
      hi: "डिजिटल टिप्स और ट्रिक्स",
    },
    icon: Smartphone,
    colorVar: "cat-digital",
    articleCount: 18,
  },
  {
    slug: "tutorials",
    name: { ml: "ട്യൂട്ടോറിയലുകൾ", en: "Tutorials", hi: "ट्यूटोरियल" },
    description: {
      ml: "ഘട്ടം ഘട്ടമായുള്ള വഴികാട്ടികൾ",
      en: "Step-by-step how-to guides",
      hi: "स्टेप-बाय-स्टेप गाइड",
    },
    icon: GraduationCap,
    colorVar: "cat-tutorials",
    articleCount: 15,
  },
  {
    slug: "news",
    name: { ml: "വാർത്തകൾ", en: "News", hi: "समाचार" },
    description: {
      ml: "ഏറ്റവും പുതിയ ടെക് അപ്ഡേറ്റുകൾ",
      en: "The latest tech updates, daily",
      hi: "रोज़ाना ताज़ा टेक अपडेट",
    },
    icon: Newspaper,
    colorVar: "cat-news",
    articleCount: 27,
  },
];

export const getCategory = (slug: string): Category | undefined =>
  CATEGORIES.find((c) => c.slug === slug);
