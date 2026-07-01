import type { Metadata } from "next";

/**
 * Thin admin root layout — applies to ALL /admin routes including the login
 * page (which must NOT render the dashboard shell). Keeps the whole admin
 * area out of search indexes. The authenticated shell lives in (panel).
 */
export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
