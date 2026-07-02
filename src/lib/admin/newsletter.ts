import "server-only";
import { createAdminClient } from "@/lib/supabase/admin";
import type { NewsletterRow } from "@/lib/supabase/types";

export async function listSubscribers(): Promise<NewsletterRow[]> {
  const { data, error } = await createAdminClient()
    .from("newsletter_subscribers")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return data ?? [];
}

/** Build a CSV export of active subscribers. */
export function subscribersToCsv(rows: NewsletterRow[]): string {
  const header = "email,status,subscribed_at";
  const lines = rows.map(
    (r) => `${escapeCsv(r.email)},${r.status},${r.created_at}`,
  );
  return [header, ...lines].join("\n");
}

function escapeCsv(value: string): string {
  return /[",\n]/.test(value) ? `"${value.replace(/"/g, '""')}"` : value;
}
