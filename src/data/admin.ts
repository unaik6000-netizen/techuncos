import { createAdminClient } from "@/lib/supabase/admin";
import { countPendingComments } from "@/lib/admin/comments";
import { CATEGORIES } from "@/constants/categories";

/**
 * Admin-only aggregate stats — uses the service-role client so drafts are
 * counted too (RLS would otherwise hide them). Views trend is still a
 * placeholder until real analytics events are wired in.
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

export async function getAdminStats(): Promise<AdminStats> {
  const supabase = createAdminClient();

  const [
    { count: totalArticles },
    { count: published },
    { count: drafts },
    commentsPending,
    { count: subscribers },
  ] = await Promise.all([
    supabase.from("articles").select("id", { count: "exact", head: true }),
    supabase
      .from("articles")
      .select("id", { count: "exact", head: true })
      .eq("status", "published"),
    supabase
      .from("articles")
      .select("id", { count: "exact", head: true })
      .eq("status", "draft"),
    countPendingComments(),
    supabase
      .from("newsletter_subscribers")
      .select("id", { count: "exact", head: true })
      .eq("status", "active"),
  ]);

  // Placeholder trend until real view-tracking events exist.
  const viewsSeries = [
    820, 910, 780, 1120, 1340, 1210, 1580, 1490, 1720, 1650, 1890, 2040, 1980,
    2260,
  ];
  const viewsTotal = viewsSeries.reduce((a, b) => a + b, 0);
  const prevWeek = viewsSeries.slice(0, 7).reduce((a, b) => a + b, 0);
  const thisWeek = viewsSeries.slice(7).reduce((a, b) => a + b, 0);
  const viewsDeltaPct = Math.round(((thisWeek - prevWeek) / prevWeek) * 100);

  return {
    totalArticles: totalArticles ?? 0,
    published: published ?? 0,
    drafts: drafts ?? 0,
    categories: CATEGORIES.length,
    commentsPending,
    subscribers: subscribers ?? 0,
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
