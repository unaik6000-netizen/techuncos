import "server-only";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  signSession,
  verifySession,
  SESSION_COOKIE,
  sessionCookieOptions,
  type SessionPayload,
} from "./session";
import { hasPermission, type Permission } from "./rbac";

export type { SessionPayload };
export * from "./rbac";

/** Write a signed session cookie (called from the login action). */
export async function setSession(payload: SessionPayload): Promise<void> {
  const token = await signSession(payload);
  const store = await cookies();
  store.set(SESSION_COOKIE, token, sessionCookieOptions);
}

/** Remove the session cookie (secure logout). */
export async function clearSession(): Promise<void> {
  const store = await cookies();
  store.delete(SESSION_COOKIE);
}

/** Return the current admin session, or null if unauthenticated. */
export async function getCurrentUser(): Promise<SessionPayload | null> {
  const store = await cookies();
  return verifySession(store.get(SESSION_COOKIE)?.value);
}

/** Guard: require an authenticated admin, else redirect to login. */
export async function requireUser(): Promise<SessionPayload> {
  const user = await getCurrentUser();
  if (!user) redirect("/admin/login");
  return user;
}

/** Guard: require a specific permission, else redirect to the dashboard. */
export async function requirePermission(
  permission: Permission,
): Promise<SessionPayload> {
  const user = await requireUser();
  if (!hasPermission(user.role, permission)) redirect("/admin?denied=1");
  return user;
}
