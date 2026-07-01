import { NextResponse, type NextRequest } from "next/server";
import { verifySession, SESSION_COOKIE } from "@/lib/auth/session";

/**
 * Edge middleware — the first line of defence for the admin. Verifies the
 * signed session cookie (jose, Edge-safe) before any admin page or admin API
 * route renders. Server-side guards (requireUser / RLS) back this up.
 */
export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get(SESSION_COOKIE)?.value;
  const session = await verifySession(token);

  // Admin API: respond 401 JSON when unauthenticated (no HTML redirect).
  if (pathname.startsWith("/api/admin")) {
    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized", code: "UNAUTHORIZED" },
        { status: 401 },
      );
    }
    return NextResponse.next();
  }

  // Admin pages.
  if (pathname.startsWith("/admin")) {
    const isLogin = pathname === "/admin/login";
    if (isLogin) {
      if (session) return NextResponse.redirect(new URL("/admin", req.url));
      return NextResponse.next();
    }
    if (!session) {
      const url = new URL("/admin/login", req.url);
      url.searchParams.set("from", pathname);
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
