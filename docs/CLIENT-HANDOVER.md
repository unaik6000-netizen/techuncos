# Techuncos — Client Handover

## 1. Project overview

Techuncos is a premium, Malayalam-first publication for AI, technology and digital know-how, built on Next.js 15 with a dark, brand-driven design system. It is fast, SEO-optimised, accessible, and structured for enterprise maintenance.

- **Live surfaces:** Homepage, category pages, all-articles listing, article reading pages, About/Contact/Privacy, and a secure admin dashboard.
- **Design language:** dark-first, logo-derived cyan→blue on navy-black; Space Grotesk + Inter + Anek Malayalam.

## 2. Features (delivered)

| Area | What's included |
|---|---|
| Content | Article reading experience (TOC, reading progress, share rail, code/callout/quote/gallery/YouTube blocks, related, prev/next), category pages, all-articles listing with Latest/Trending/Popular filters |
| Discovery | ⌘K instant search, category browsing, trending & featured surfaces, RSS feed |
| Engagement | Guest comments (validation + honeypot), social sharing (WhatsApp/Telegram/FB/X/copy), newsletter signup, Telegram CTAs |
| Admin | Secure login (JWT + bcrypt), RBAC (Super Admin / Editor / Author), dashboard with stats + analytics chart, dark/light mode |
| SEO | Dynamic metadata, canonical URLs, Open Graph + Twitter, JSON-LD (Article/Breadcrumb/Organization/WebSite), sitemap, robots, generated OG image |
| Platform | Custom 404 + 500, PWA manifest, favicon, security headers, i18n-ready architecture (ML/EN/HI) |

## 3. Folder structure

See [README.md](../README.md#folder-structure).

## 4. Admin user guide

1. Go to `/admin` → you'll be sent to `/admin/login`.
2. Sign in with the admin email + password (set in environment variables — see [ENVIRONMENT.md](ENVIRONMENT.md)).
3. The **dashboard** shows totals, a 14-day views chart, recent activity and quick actions.
4. The sidebar groups Content, Community and Configure sections. Use the **theme toggle** (top-right) for dark/light, and the **avatar menu** to sign out. Sessions expire after 8 hours.

> Note: the article editor, media library and moderation queues are scaffolded in the navigation and will be wired to the database in the backend phase (see roadmap). Today the site is content-managed in code.

## 5. Content publishing guide (current, pre-database)

Until the Supabase CMS is connected, articles are managed in `src/data/articles.ts`:

1. Add an entry to the `ARTICLES` array (id, slug, title, excerpt, category, author, date, readTime, views, featured/trending flags).
2. For a full article, add a matching entry to `BODIES` with typed content blocks (paragraph, heading, code, callout, quote, list, image, gallery, youtube, linkCard).
3. Commit and deploy — the homepage, category pages, sitemap and RSS update automatically.

**Content rules:** keep it original; never link to piracy or gambling/"signals" content — it will get the AdSense account banned. Category colours stay in the blue family.

## 6. Backup procedure

See [MAINTENANCE.md](MAINTENANCE.md#backup-strategy). Today: Git is the source of truth (protect `main`, enable 2FA). After Supabase: daily automated backups + weekly `pg_dump` + versioned migrations + a quarterly restore drill.

## 7. Maintenance

See [MAINTENANCE.md](MAINTENANCE.md) — routine checks, dependency updates, incident quick-reference.

## 8. Production launch checklist

- [ ] Set all env vars in Vercel (`AUTH_SECRET`, admin creds, `NEXT_PUBLIC_SITE_URL`) — [ENVIRONMENT.md](ENVIRONMENT.md)
- [ ] `npm run typecheck && npm run lint && npm test && npm run build` all green
- [ ] Deploy to Vercel, connect `techuncos.com`, verify SSL (auto)
- [ ] Confirm `/robots.txt`, `/sitemap.xml`, `/rss.xml`, `/manifest.webmanifest`, `/opengraph-image`, favicon
- [ ] Submit sitemap in Google Search Console; add verification token
- [ ] Publish 15–20 original articles + ensure About/Contact/Privacy are live **before** applying to AdSense
- [ ] Run Lighthouse on the live URL; confirm Performance/SEO/Accessibility/Best-Practices
- [ ] Change the admin password from the dev default

## 9. Future enhancement roadmap

**Backend & CMS (next priority)**
- Wire Supabase (Postgres + RLS), migrate `data/` to live queries, connect the admin CRUD sections (article editor, media library, comment moderation, categories/tags, newsletter export, settings).
- Cloudinary for image uploads.

**Growth**
- Full i18n routing (`/ml /en /hi`) with `next-intl` + hreflang; translated article bodies.
- Advanced search (Atlas/Algolia), search suggestions, recent/trending queries.
- Google Analytics 4 + AdSense units (after content + policy pages are live).
- Telegram auto-post on publish; newsletter double opt-in + provider (Resend/Mailchimp).
- Rate limiting (Upstash), audit logs, PWA service worker / push notifications.

**Deferred by policy**
- The Aviator section stays a separate concern and must not carry gambling "signals" on the AdSense domain.
