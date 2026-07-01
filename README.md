# Techuncos

A premium, Malayalam-first publication for AI, technology and digital know-how — built to feel like Apple / Linear / Vercel, not a WordPress blog.

- **Framework:** Next.js 15 (App Router) · React 19 · TypeScript (strict)
- **Styling:** Tailwind CSS 3.4 · Framer Motion · Lucide icons
- **Theme:** dark-first, logo-derived cyan→blue on navy-black
- **Auth:** JWT session cookies (`jose`) + bcrypt, RBAC, Edge middleware
- **Planned backend:** Supabase (Postgres + RLS) · Cloudinary (media)

## Quick start

```bash
npm install
cp .env.example .env.local     # then fill in the values
npm run dev                    # http://localhost:3000
```

Admin panel: `/admin` (redirects to `/admin/login`).
Dev credentials live in `.env.local` — see [docs/ENVIRONMENT.md](docs/ENVIRONMENT.md).

## Scripts

| Script | Purpose |
|---|---|
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint (next/core-web-vitals) |
| `npm run typecheck` | `tsc --noEmit` |
| `npm test` | Run the Vitest unit suite |
| `node scripts/hash-password.mjs "pw"` | Generate an admin password hash |

## Folder structure

```
src/
├── app/
│   ├── layout.tsx            # Root layout (fonts, metadata) — no chrome
│   ├── (site)/               # Public route group (navbar + footer)
│   │   ├── page.tsx          # Homepage
│   │   └── article/[slug]/   # Article detail (SSG + ISR)
│   ├── admin/                # Admin (noindex)
│   │   ├── login/            # Public login page (no shell)
│   │   ├── (panel)/          # Auth-gated dashboard shell
│   │   └── actions.ts        # login / logout server actions
│   ├── sitemap.ts robots.ts manifest.ts opengraph-image.tsx icon.svg
│   ├── rss.xml/route.ts
│   ├── not-found.tsx global-error.tsx
│   └── globals.css           # Design tokens (dark + admin light)
├── components/
│   ├── ui/ layout/ home/ article/ admin/ motion/ seo/
├── lib/
│   ├── auth/ (session · rbac · users · index)  seo.ts  env.ts
│   ├── utils.ts  motion.ts  inline.tsx  admin-nav.ts
├── data/         # articles.ts, admin.ts  (typed mock → Supabase later)
├── constants/    # site, categories, navigation
├── schemas/      # Zod schemas (shared client + server)
├── types/        # Domain + content-block types
└── middleware.ts # Edge auth gate for /admin + /api/admin
```

Boundary that matters: **`data/` + `services/` (I/O) vs `lib/` (pure logic)**. Components read typed query functions in `data/`, never a data source directly — so swapping mock data for Supabase touches one folder.

## Documentation

- [Environment variables](docs/ENVIRONMENT.md)
- [Deployment guide](docs/DEPLOYMENT.md)
- [Testing strategy & launch checklist](docs/TESTING.md)
- [Maintenance, backup & update guide](docs/MAINTENANCE.md)

## Status

Built & verified: homepage, article system, admin shell + dashboard, authentication (RBAC), SEO infrastructure.
Pending (mock-data or not yet wired): Supabase backend, article listing/category/search pages, remaining admin CRUD sections, AdSense/Analytics/i18n. See the docs for the roadmap.
