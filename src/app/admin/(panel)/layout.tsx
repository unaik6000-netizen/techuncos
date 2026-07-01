import { AdminShell } from "@/components/admin/admin-shell";
import { getAdminStats } from "@/data/admin";
import { requireUser } from "@/lib/auth";

/**
 * Authenticated dashboard shell. `requireUser()` is a server-side guard that
 * redirects to /admin/login when there's no valid session — defence in depth
 * behind the Edge middleware.
 */
export default async function PanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireUser();
  const { commentsPending } = getAdminStats();

  return (
    <AdminShell
      commentsPending={commentsPending}
      user={{ name: user.name, role: user.role }}
    >
      {children}
    </AdminShell>
  );
}
