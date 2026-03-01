-- One Piece Universe - Supabase PostgreSQL Schema

create table characters (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  bounty bigint,
  crew text,
  devil_fruit text,
  haki text[],
  first_episode int,
  first_chapter int,
  status text,
  image_url text,
  story jsonb
);

create table arcs (
  id uuid primary key default gen_random_uuid(),
  name text,
  start_episode int,
  end_episode int,
  start_chapter int,
  end_chapter int
);

create table episodes (
  number int primary key,
  title text,
  arc text,
  release_date date,
  is_filler boolean default false,
  manga_adaptation int,
  summary text
);

create table release_info (
  id int primary key,
  next_episode int,
  next_episode_date date,
  next_chapter int,
  next_chapter_date date
);

-- Insert sample row for release_info
insert into release_info (id, next_episode, next_episode_date, next_chapter, next_chapter_date)
values (1, 1100, '2024-04-07', 1111, '2024-04-14');
