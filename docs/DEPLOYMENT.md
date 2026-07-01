# Deployment guide

Target platform: **Vercel** (Next.js-native, global CDN, automatic HTTPS).

## 1. Pre-flight

```bash
npm run typecheck && npm run lint && npm test && npm run build
```

All four must pass. The build should report `/sitemap.xml`, `/robots.txt`, `/rss.xml`, `/manifest.webmanifest`, `/opengraph-image`, `/icon.svg`, and `ƒ Middleware`.

## 2. Vercel

1. Push to GitHub, then "Import Project" in Vercel.
2. Framework preset: **Next.js** (auto-detected). Build command `next build`, output handled automatically.
3. Add the environment variables from [ENVIRONMENT.md](ENVIRONMENT.md) under **Settings → Environment Variables** (Production + Preview). At minimum: `NEXT_PUBLIC_SITE_URL`, `AUTH_SECRET`, `ADMIN_EMAIL`, `ADMIN_PASSWORD_HASH_B64`.
4. Deploy. Add the custom domain (`techuncos.com`) and let Vercel provision the certificate.

Security headers (HSTS, `X-Frame-Options: DENY`, `nosniff`, Referrer-Policy, Permissions-Policy) ship from `next.config.ts` — verify with `curl -I https://techuncos.com`.

## 3. Post-deploy verification

- `https://techuncos.com/robots.txt` — allows `/`, disallows `/admin` + `/api/`, references the sitemap.
- `https://techuncos.com/sitemap.xml` — lists the homepage + every article.
- `https://techuncos.com/rss.xml` — valid RSS 2.0.
- `/admin` → redirects to `/admin/login`; a bad password is rejected; a good one reaches the dashboard.
- Favicon + `manifest.webmanifest` load; OG image renders at `/opengraph-image`.
- Submit the sitemap in **Google Search Console**; verify ownership via `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`.

## 4. Third-party services (when enabling later phases)

- **Supabase:** create the project, run migrations, enable RLS on every table, set the three `*_SUPABASE_*` vars. The service-role key is server-only.
- **Cloudinary:** set `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`; use signed uploads from the admin.
- **Google Analytics 4 / AdSense:** add `NEXT_PUBLIC_ADSENSE_CLIENT_ID` and the GA id. **Do not enable AdSense until the site has original content and legal pages (Privacy/About/Contact) live** — and never add the piracy/gambling content that was previously flagged, or the AdSense account will be banned.

## 5. Rollback

Vercel keeps every deployment immutable — use **Instant Rollback** to the last green deployment from the dashboard. No data migration is involved until Supabase is wired.
