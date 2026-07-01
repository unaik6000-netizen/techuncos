import type { Locale, NavItem } from "@/types";

/** Primary navigation — one source rendered by desktop nav, drawer & footer. */
export const NAV_ITEMS: NavItem[] = [
  { label: "AI", href: "/ai" },
  { label: "Technology", href: "/tech" },
  { label: "Digital", href: "/digital" },
  { label: "Tutorials", href: "/tutorials" },
  { label: "News", href: "/news" },
];

export const FOOTER_LINKS = {
  explore: [
    { label: "AI", href: "/ai" },
    { label: "Technology", href: "/tech" },
    { label: "Digital", href: "/digital" },
    { label: "Tutorials", href: "/tutorials" },
    { label: "News", href: "/news" },
  ],
  company: [
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "RSS Feed", href: "/rss.xml" },
  ],
} as const;

export const LOCALES: { code: Locale; label: string; short: string }[] = [
  { code: "ml", label: "മലയാളം", short: "ML" },
  { code: "en", label: "English", short: "EN" },
  { code: "hi", label: "हिन्दी", short: "HI" },
];
