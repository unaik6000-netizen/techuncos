-- Techuncos — articles table
-- Categories stay defined in code (src/constants/categories.ts) since they
-- carry React icon components; only article content is persisted here.

create extension if not exists "pgcrypto";

create table if not exists public.articles (
  id                   uuid primary key default gen_random_uuid(),
  slug                 text unique not null,
  title                text not null,
  subtitle             text,
  excerpt              text not null,
  category             text not null check (category in ('ai','tech','digital','tutorials','news')),

  author_name          text not null,
  author_slug          text not null,
  author_avatar_color  text not null default '#38BDF8',
  author_role          text,
  author_bio           text,

  published_at         timestamptz not null default now(),
  updated_at           timestamptz,
  read_time            integer not null default 1,
  views                bigint not null default 0,
  featured             boolean not null default false,
  trending             boolean not null default false,
  cover                text,
  lang                 text check (lang in ('ml','en','hi')),
  tags                 text[] not null default '{}',
  body                 jsonb not null default '[]',
  status               text not null default 'draft' check (status in ('draft','published')),

  created_at           timestamptz not null default now()
);

-- Listing/detail query performance
create index if not exists articles_status_published_at_idx
  on public.articles (status, published_at desc);
create index if not exists articles_category_status_idx
  on public.articles (category, status);
create index if not exists articles_featured_idx
  on public.articles (featured) where featured;
create index if not exists articles_trending_idx
  on public.articles (trending) where trending;

-- Keep updated_at current on every edit
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists articles_set_updated_at on public.articles;
create trigger articles_set_updated_at
  before update on public.articles
  for each row execute function public.set_updated_at();

-- Row Level Security: the public (anon key) can only ever read published
-- articles. All writes go through the service-role key from admin server
-- actions (which bypasses RLS by design), so no public write policy exists.
alter table public.articles enable row level security;

drop policy if exists "Published articles are public" on public.articles;
create policy "Published articles are public"
  on public.articles for select
  to anon
  using (status = 'published');
