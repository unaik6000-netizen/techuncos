import { Mail, Download } from "lucide-react";
import { EmptyState } from "@/components/ui/empty-state";
import { FadeIn } from "@/components/motion";
import { listSubscribers } from "@/lib/admin/newsletter";
import { requireUser } from "@/lib/auth";
import { formatDate, cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function AdminNewsletterPage() {
  await requireUser();
  const subscribers = await listSubscribers();
  const active = subscribers.filter((s) => s.status === "active").length;

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <FadeIn className="flex items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-semibold tracking-tight text-foreground">
            Newsletter
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {active} active {active === 1 ? "subscriber" : "subscribers"} of{" "}
            {subscribers.length} total.
          </p>
        </div>
        {subscribers.length > 0 && (
          // eslint-disable-next-line @next/next/no-html-link-for-pages -- file download, not a page nav
          <a
            href="/api/admin/newsletter/export"
            download
            className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-lg border border-border-strong px-4 text-sm font-medium text-foreground transition-colors hover:bg-muted"
          >
            <Download className="h-4 w-4" aria-hidden="true" />
            Export CSV
          </a>
        )}
      </FadeIn>

      {subscribers.length === 0 ? (
        <EmptyState
          icon={Mail}
          title="No subscribers yet"
          description="Signups from the homepage newsletter form will appear here."
        />
      ) : (
        <div className="overflow-hidden rounded-card border border-border bg-card">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs uppercase tracking-wider text-faint">
                <th className="px-4 py-3 font-medium">Email</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="hidden px-4 py-3 font-medium sm:table-cell">
                  Subscribed
                </th>
              </tr>
            </thead>
            <tbody>
              {subscribers.map((s) => (
                <tr key={s.id} className="border-b border-border last:border-0">
                  <td className="px-4 py-3 text-foreground">{s.email}</td>
                  <td className="px-4 py-3">
                    <span
                      className={cn(
                        "rounded-full border px-2 py-0.5 text-[11px] font-medium capitalize",
                        s.status === "active"
                          ? "border-success/30 bg-success/10 text-success"
                          : "border-border text-faint",
                      )}
                    >
                      {s.status}
                    </span>
                  </td>
                  <td className="hidden px-4 py-3 text-muted-foreground sm:table-cell">
                    {formatDate(s.created_at)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
