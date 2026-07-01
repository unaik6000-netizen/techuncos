import { ARTICLES } from "./articles";
import { CATEGORIES } from "@/constants/categories";

/**
 * TEMPORARY analytics/counts for the admin dashboard. Replaced by Supabase
 * aggregate queries in the backend phase — same shape, no UI changes.
 */
export interface AdminStats {
  totalArticles: number;
  published: number;
  drafts: number;
  categories: number;
  commentsPending: number;
  subscribers: number;
  viewsSeries: number[];
  viewsTotal: number;
  viewsDeltaPct: number;
}

export function getAdminStats(): AdminStats {
  const totalArticles = ARTICLES.length;
  // Mock split until article `status` is stored in the DB.
  const drafts = 3;
  const published = totalArticles;

  const viewsSeries = [
    820, 910, 780, 1120, 1340, 1210, 1580, 1490, 1720, 1650, 1890, 2040, 1980,
    2260,
  ];
  const viewsTotal = viewsSeries.reduce((a, b) => a + b, 0);
  const prevWeek = viewsSeries.slice(0, 7).reduce((a, b) => a + b, 0);
  const thisWeek = viewsSeries.slice(7).reduce((a, b) => a + b, 0);
  const viewsDeltaPct = Math.round(((thisWeek - prevWeek) / prevWeek) * 100);

  return {
    totalArticles,
    published,
    drafts,
    categories: CATEGORIES.length,
    commentsPending: 5,
    subscribers: 1284,
    viewsSeries,
    viewsTotal,
    viewsDeltaPct,
  };
}

export type ActivityKind = "publish" | "comment" | "edit" | "subscriber";

export interface ActivityItem {
  id: string;
  kind: ActivityKind;
  text: string;
  time: string;
}

export const RECENT_ACTIVITY: ActivityItem[] = [
  {
    id: "a1",
    kind: "publish",
    text: "Published “Neon portrait: the exact AI prompt”",
    time: "2h ago",
  },
  {
    id: "a2",
    kind: "comment",
    text: "New comment awaiting moderation from Nikhil",
    time: "3h ago",
  },
  {
    id: "a3",
    kind: "subscriber",
    text: "12 new newsletter subscribers today",
    time: "5h ago",
  },
  {
    id: "a4",
    kind: "edit",
    text: "Edited “10 legal platforms to stream movies free”",
    time: "Yesterday",
  },
  {
    id: "a5",
    kind: "publish",
    text: "Scheduled “ChatGPT vs Gemini in 2026” for Jul 3",
    time: "Yesterday",
  },
];
