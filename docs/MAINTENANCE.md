# Maintenance, backup & update guide

## Routine maintenance

| Cadence | Task |
|---|---|
| Per PR | `npm run typecheck && npm run lint && npm test && npm run build` must pass |
| Weekly | Review `npm audit`; triage Dependabot/security advisories |
| Monthly | `npm outdated`; bump patch/minor deps; re-run the full check |
| Quarterly | Review Lighthouse + Core Web Vitals in Search Console; prune unused code |

### Adding content (current, pre-CMS)

Articles live in `src/data/articles.ts` as typed objects (`Article` metadata + `BODIES` blocks). Add an entry + optional rich body; the homepage, sitemap, and RSS pick it up automatically. Once the Supabase CMS lands, this file is replaced by DB queries returning the same shapes.

### Adding a category / nav item

Edit `src/constants/categories.ts` and `src/constants/navigation.ts` — both are single sources rendered everywhere. Keep category colours in the blue family (design rule).

## Update guide (dependencies)

1. `npm outdated` to see what's behind.
2. Bump **patch/minor** freely: `npm update`.
3. **Major** bumps (Next, React, Tailwind, Framer): read the changelog, update on a branch, run the full check suite, and smoke-test `/`, `/article/[slug]`, `/admin`.
4. `next` security advisories: bump immediately within the same major (`npm i "next@<16>"`), rebuild, redeploy.
5. Never bypass Git hooks or skip the build check to ship.

## Backup strategy

**Today (no database):** the entire site is code + typed data in Git. Git *is* the backup — protect it: enable branch protection on `main`, keep the GitHub repo private with 2FA, and rely on Vercel's immutable deployment history for rollback.

**After Supabase is wired:**
- Enable **Supabase automated daily backups** (Point-in-Time Recovery on Pro).
- Weekly `pg_dump` export to off-site storage (e.g. a separate bucket) for a second copy.
- Store the schema as versioned SQL migrations in the repo (`supabase/migrations/`) so the structure is reproducible.
- Cloudinary media is itself durable storage; keep the source URLs in the DB so assets are re-linkable.
- Quarterly **restore drill**: restore the latest backup into a scratch project and confirm the app boots against it.

## Monitoring readiness

- Vercel Analytics / Speed Insights for real-user Core Web Vitals.
- Google Search Console for indexing + sitemap health.
- (Recommended) an error-tracking service (Sentry) once traffic warrants — wire into `global-error.tsx` and API routes.

## Incident quick reference

| Symptom | First check |
|---|---|
| Admin locked out | Rotate `ADMIN_PASSWORD_HASH_B64`, redeploy |
| All sessions should end | Rotate `AUTH_SECRET`, redeploy |
| Build fails on Vercel | Re-run `npm run build` locally; check env vars are set in Vercel |
| Wrong file tracing / bloated output | `outputFileTracingRoot` is pinned in `next.config.ts` |
| Bad deploy live | Vercel → Instant Rollback to last green |
