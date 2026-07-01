# Environment variables

Copy `.env.example` → `.env.local` and fill in. Server-only secrets must **never** be prefixed `NEXT_PUBLIC_`. Validated at runtime by `src/lib/env.ts` (Zod) — a missing/invalid value throws a clear error instead of failing silently.

| Variable | Scope | Required | Description |
|---|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | public | yes (prod) | Canonical origin, e.g. `https://techuncos.com`. Drives canonical URLs, sitemap, RSS, OG. |
| `AUTH_SECRET` | server | **yes** | Session-signing secret, ≥32 chars. Generate: `openssl rand -base64 48`. |
| `ADMIN_EMAIL` | server | yes | Admin login email. |
| `ADMIN_NAME` | server | no | Display name (default "Admin"). |
| `ADMIN_ROLE` | server | no | `super_admin` \| `editor` \| `author` (default `super_admin`). |
| `ADMIN_PASSWORD_HASH_B64` | server | **yes** | bcrypt hash of the password, **base64-encoded**. Generate: `node scripts/hash-password.mjs "YourPassword"`. |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | public | no | Search Console meta-tag token. |
| `NEXT_PUBLIC_ADSENSE_CLIENT_ID` | public | no | AdSense publisher ID (`ca-pub-…`) — used once ads are enabled. |
| `NEXT_PUBLIC_SUPABASE_URL` | public | later | Supabase project URL (backend phase). |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | public | later | Supabase anon key (RLS-gated). |
| `SUPABASE_SERVICE_ROLE_KEY` | server | later | **Server-only.** Never expose to the client. |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | public | later | Cloudinary cloud name for media. |
| `TELEGRAM_BOT_TOKEN` | server | later | Bot token for auto-posting on publish. |
| `TELEGRAM_CHANNEL_INFO` / `TELEGRAM_CHANNEL_MAIN` | server | later | Target channels. |

## Why the password hash is base64-encoded

bcrypt hashes contain `$` sequences that `dotenv-expand` would try to interpolate (e.g. `$VAMV…` → empty). Base64-encoding sidesteps that entirely; `src/lib/auth/users.ts` decodes it before `bcrypt.compare`.

## Rotating the admin password / secret

1. `node scripts/hash-password.mjs "NewStrongPassword"` → paste the output into `ADMIN_PASSWORD_HASH_B64`.
2. To force all sessions to log out, rotate `AUTH_SECRET` (invalidates every existing JWT).
3. Redeploy so the new values load.
