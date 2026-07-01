import "server-only";
import bcrypt from "bcryptjs";
import { getServerEnv } from "@/lib/env";
import type { Role } from "./rbac";

/**
 * Credential store. Currently backed by env vars (single admin). To move to a
 * database later, only this file changes: replace `findUserByEmail` with a
 * Supabase query returning the same `AdminUser` shape.
 */
export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: Role;
  passwordHash: string;
}

function decodeHash(b64: string): string {
  return Buffer.from(b64, "base64").toString("utf8");
}

export function findUserByEmail(email: string): AdminUser | null {
  const env = getServerEnv();
  if (email.trim().toLowerCase() !== env.ADMIN_EMAIL.toLowerCase()) {
    return null;
  }
  return {
    id: "admin-1",
    email: env.ADMIN_EMAIL,
    name: env.ADMIN_NAME,
    role: env.ADMIN_ROLE,
    passwordHash: decodeHash(env.ADMIN_PASSWORD_HASH_B64),
  };
}

export async function verifyPassword(
  plain: string,
  hash: string,
): Promise<boolean> {
  return bcrypt.compare(plain, hash);
}

/** A valid bcrypt hash used to equalise timing when the user is unknown. */
const DUMMY_HASH = "$2b$12$C6UzMDM.H6dfI/f/IKcEeO3f6X9Q5m0lWn0Yl0Yl0Yl0Yl0Yl0Yl";

/**
 * Verify a login. Always runs a bcrypt comparison (even for unknown emails)
 * so response timing doesn't reveal whether an account exists.
 */
export async function authenticate(
  email: string,
  password: string,
): Promise<AdminUser | null> {
  const user = findUserByEmail(email);
  const ok = await verifyPassword(password, user?.passwordHash ?? DUMMY_HASH);
  return user && ok ? user : null;
}
