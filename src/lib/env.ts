import "server-only";
import { z } from "zod";

/**
 * Server-side environment validation. Parsed lazily (on first access) so a
 * missing var throws a clear runtime error instead of a cryptic failure —
 * and never blocks the build. Never import this from client or Edge code.
 */
const schema = z.object({
  AUTH_SECRET: z
    .string()
    .min(32, "AUTH_SECRET must be at least 32 characters"),
  ADMIN_EMAIL: z.string().email(),
  ADMIN_NAME: z.string().min(1).default("Admin"),
  ADMIN_ROLE: z
    .enum(["super_admin", "editor", "author"])
    .default("super_admin"),
  ADMIN_PASSWORD_HASH_B64: z.string().min(1, "ADMIN_PASSWORD_HASH_B64 is required"),
  NEXT_PUBLIC_SITE_URL: z.string().url().default("http://localhost:3000"),
});

type ServerEnv = z.infer<typeof schema>;

let cached: ServerEnv | null = null;

export function getServerEnv(): ServerEnv {
  if (cached) return cached;
  const parsed = schema.safeParse(process.env);
  if (!parsed.success) {
    const issues = parsed.error.issues
      .map((i) => `  - ${i.path.join(".")}: ${i.message}`)
      .join("\n");
    throw new Error(
      `Invalid or missing environment variables:\n${issues}\n` +
        "Copy .env.example to .env.local and fill in the values.",
    );
  }
  cached = parsed.data;
  return cached;
}
