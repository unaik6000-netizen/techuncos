# Testing strategy & launch checklist

## Layers

| Layer | Tooling | What it covers | Status |
|---|---|---|---|
| **Unit** | Vitest | Pure logic: `rbac`, `seo` (escapeXml/absoluteUrl/schema), `utils` (`cn`, `formatCompact`) | ✅ 10 tests passing (`npm test`) |
| **Component** | Vitest + Testing Library | Render `ArticleCard`, `LoginForm`, `Newsletter`, `CommentSection` states | ▢ recommended next |
| **Integration** | Testing Library | Auth flow (login action → session), comment submit → optimistic add | ▢ |
| **API** | Vitest / Supertest | Route handlers: 401 on `/api/admin/*` without session, rate-limit responses | ▢ (once APIs land) |
| **E2E** | Playwright | Home → article → search → login → dashboard journeys | ▢ recommended |
| **Security** | manual + `npm audit` | Auth bypass, XSS in comments/article HTML, cookie flags | ✅ manual pass (see below) |
| **Accessibility** | axe / Lighthouse | WCAG AA, keyboard, focus, contrast | ✅ manual pass |
| **Responsive** | preview @ 375/768/1024/1440 | No horizontal scroll, thumb targets | ✅ manual pass |
| **Browser** | manual | Chrome, Safari, Firefox, Edge; iOS/Android | ▢ pre-launch |

Run `npm test` in CI alongside `typecheck`, `lint`, and `build`.

## Unit test checklist (current)

- [x] `hasPermission` — super_admin all; editor blocked from settings/users; author can't publish/delete
- [x] `isRole` guards invalid strings/null
- [x] `escapeXml` escapes `& < > " '`
- [x] `absoluteUrl` normalises leading slash
- [x] `breadcrumbSchema` emits ordered positions
- [x] `cn` de-duplicates Tailwind classes; `formatCompact` shortens numbers

## Accessibility checklist

- [x] All interactive elements have visible focus (`:focus-visible` ring, never removed)
- [x] Icon-only buttons have `aria-label`; decorative icons `aria-hidden`
- [x] Forms: real `<label>`s, `aria-invalid`, `role="alert"` errors, `aria-live`
- [x] `prefers-reduced-motion` collapses animations globally
- [x] Colour contrast ≥ AA (primary text ~19:1, secondary ~9:1, accent ~8.5:1 on dark)
- [x] Skip-to-content link; semantic landmarks (`main`, `nav`, `article`, `aside`)
- [x] Malayalam gets `lang="ml"`, larger size, no letter-spacing

## Security checklist

- [x] Session cookie `httpOnly` + `Secure` (prod) + `SameSite=Lax`; not JS-readable (verified)
- [x] Edge middleware gate + server `requireUser()` guard (defence in depth)
- [x] bcrypt(12) + timing-safe `authenticate()` (no user enumeration)
- [x] Zod validation on login input and env
- [x] Article HTML rendered via typed blocks + safe inline parser (no `dangerouslySetInnerHTML` on user content); comments are plain text
- [x] External links `rel="noopener noreferrer nofollow"`
- [x] `/admin` noindex; secrets server-only; security headers in `next.config.ts`
- [ ] Rate limiting (Upstash) — pending
- [ ] File-upload validation (MIME/size/filename) — pending with media library

## Launch QA checklist

- [ ] **Homepage** — hero, trending, featured, latest, categories, prompts, Telegram, newsletter render; links work
- [ ] **Article pages** — TOC, reading progress, share, code copy, callouts, related, prev/next, comments
- [ ] **Search** — ⌘K opens, filters results *(basic client search live; full search pending)*
- [ ] **Categories** — listing pages *(pending build)*
- [ ] **Comments** — guest submit + validation *(UI live; moderation backend pending)*
- [ ] **Admin dashboard** — login gate, stats, chart, theme toggle, logout
- [ ] **Mobile / Tablet / Desktop** — 375 / 768 / 1024 / 1440, no horizontal scroll
- [ ] **SEO** — metadata, canonical, JSON-LD, sitemap, robots, RSS, OG image
- [ ] **Analytics** — GA4 events *(pending)*
- [ ] **AdSense** — units + policy pages *(pending; do not enable early)*
- [ ] **Performance** — Lighthouse ≥95, CLS <0.1
- [ ] **Security** — see checklist above
- [ ] **Accessibility** — Lighthouse a11y 100 / axe clean
