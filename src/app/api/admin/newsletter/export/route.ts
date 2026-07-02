import { requireUser } from "@/lib/auth";
import { listSubscribers, subscribersToCsv } from "@/lib/admin/newsletter";

/** CSV export of newsletter subscribers. Double-gated: middleware blocks
 *  /api/admin/* without a session, and requireUser() re-checks here. */
export async function GET() {
  await requireUser();
  const rows = await listSubscribers();
  const csv = subscribersToCsv(rows);
  const date = new Date().toISOString().slice(0, 10);

  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="techuncos-subscribers-${date}.csv"`,
    },
  });
}
