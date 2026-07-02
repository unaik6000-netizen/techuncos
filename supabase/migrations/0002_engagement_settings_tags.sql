-- Techuncos 0002 — comments, newsletter, settings, tags
-- Run once in the Supabase SQL editor (like 0001).

create extension if not exists "pgcrypto";

-- ── COMMENTS ─────────────────────────────────────────────────────
create table if not exists public.comments (
  id           uuid primary key default gen_random_uuid(),
  article_slug text not null,
  name         text not null,
  body         text not null,
  status       text not null default 'pending'
                 check (status in ('pending','approved','spam')),
  ip_hash      text,
  created_at   timestamptz not null default now()
);
create index if not exists comments_slug_status_idx
  on public.comments (article_slug, status);
create index if not exists comments_status_created_idx
  on public.comments (status, created_at desc);

-- Any anonymous insert is forced to 'pending' — a crafted request can never
-- self-approve or mark itself spam.
create or replace function public.force_comment_pending()
returns trigger as $$
begin
  new.status := 'pending';
  new.created_at := now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists comments_force_pending on public.comments;
create trigger comments_force_pending
  before insert on public.comments
  for each row execute function public.force_comment_pending();

alter table public.comments enable row level security;

drop policy if exists "Anyone can read approved comments" on public.comments;
create policy "Anyone can read approved comments"
  on public.comments for select to anon using (status = 'approved');

drop policy if exists "Anyone can submit a comment" on public.comments;
create policy "Anyone can submit a comment"
  on public.comments for insert to anon with check (true);

-- ── NEWSLETTER ───────────────────────────────────────────────────
create table if not exists public.newsletter_subscribers (
  id         uuid primary key default gen_random_uuid(),
  email      text unique not null,
  status     text not null default 'active'
               check (status in ('active','unsubscribed')),
  created_at timestamptz not null default now()
);
alter table public.newsletter_subscribers enable row level security;

-- Anon can subscribe; the list itself is private (admin/service-role only).
drop policy if exists "Anyone can subscribe" on public.newsletter_subscribers;
create policy "Anyone can subscribe"
  on public.newsletter_subscribers for insert to anon with check (true);

-- ── SETTINGS ─────────────────────────────────────────────────────
create table if not exists public.settings (
  key        text primary key,
  value      jsonb not null,
  updated_at timestamptz not null default now()
);
alter table public.settings enable row level security;

-- Settings are surfaced publicly (socials, contact, ad IDs); writes are
-- admin-only via the service-role key.
drop policy if exists "Settings are public" on public.settings;
create policy "Settings are public"
  on public.settings for select to anon using (true);

-- ── TAGS ─────────────────────────────────────────────────────────
create table if not exists public.tags (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  slug       text unique not null,
  created_at timestamptz not null default now()
);
alter table public.tags enable row level security;

drop policy if exists "Tags are public" on public.tags;
create policy "Tags are public"
  on public.tags for select to anon using (true);
