-- Pathfinder Supabase schema
create extension if not exists "uuid-ossp";

create table if not exists users (
  id uuid primary key references auth.users(id) on delete cascade,
  email text unique not null,
  role text not null check (role in ('candidate', 'recruiter', 'company_admin', 'platform_admin')),
  created_at timestamptz not null default now()
);

create table if not exists profiles (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references users(id) on delete cascade,
  full_name text,
  headline text,
  bio text,
  linkedin_url text,
  github_url text,
  portfolio_url text,
  psychometric jsonb default '{}'::jsonb,
  career_goals jsonb default '[]'::jsonb,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists career_vectors (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references users(id) on delete cascade,
  vector jsonb not null,
  score numeric(5,2) not null,
  trajectory_prediction jsonb,
  salary_band jsonb,
  generated_at timestamptz default now()
);

create table if not exists resumes (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references users(id) on delete cascade,
  storage_path text not null,
  parsed_data jsonb default '{}'::jsonb,
  active_version_id uuid,
  created_at timestamptz default now()
);

create table if not exists resume_versions (
  id uuid primary key default uuid_generate_v4(),
  resume_id uuid not null references resumes(id) on delete cascade,
  variant text not null,
  content jsonb not null,
  ats_score numeric(5,2),
  recruiter_score numeric(5,2),
  ab_bucket text,
  created_at timestamptz default now()
);

alter table resumes add constraint resumes_active_version_fk foreign key (active_version_id) references resume_versions(id);

create table if not exists cover_letters (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references users(id) on delete cascade,
  job_id uuid,
  content text not null,
  created_at timestamptz default now()
);

create table if not exists companies (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  industry text,
  size_band text,
  culture_vector jsonb,
  created_at timestamptz default now()
);

create table if not exists jobs (
  id uuid primary key default uuid_generate_v4(),
  company_id uuid not null references companies(id) on delete cascade,
  title text not null,
  description text not null,
  employment_type text,
  location text,
  salary_min integer,
  salary_max integer,
  job_vector jsonb not null,
  status text not null default 'open',
  created_at timestamptz default now()
);

create table if not exists applications (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references users(id) on delete cascade,
  job_id uuid not null references jobs(id) on delete cascade,
  status text not null default 'submitted',
  created_at timestamptz default now(),
  unique(user_id, job_id)
);

create table if not exists skills (
  id uuid primary key default uuid_generate_v4(),
  name text unique not null,
  category text,
  created_at timestamptz default now()
);

create table if not exists user_skills (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references users(id) on delete cascade,
  skill_id uuid not null references skills(id) on delete cascade,
  level smallint not null check (level between 1 and 5),
  inferred boolean default false,
  unique(user_id, skill_id)
);

create table if not exists job_skills (
  id uuid primary key default uuid_generate_v4(),
  job_id uuid not null references jobs(id) on delete cascade,
  skill_id uuid not null references skills(id) on delete cascade,
  importance smallint not null check (importance between 1 and 5),
  unique(job_id, skill_id)
);

create table if not exists fit_scores (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references users(id) on delete cascade,
  job_id uuid not null references jobs(id) on delete cascade,
  fit_score numeric(5,2) not null,
  success_probability numeric(5,2),
  hiring_probability numeric(5,2),
  explanation jsonb,
  generated_at timestamptz default now(),
  unique(user_id, job_id)
);

create table if not exists messages (
  id uuid primary key default uuid_generate_v4(),
  sender_id uuid not null references users(id) on delete cascade,
  recipient_id uuid not null references users(id) on delete cascade,
  body text not null,
  read_at timestamptz,
  created_at timestamptz default now()
);

create table if not exists notifications (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references users(id) on delete cascade,
  title text not null,
  body text not null,
  read_at timestamptz,
  created_at timestamptz default now()
);

create table if not exists learning_paths (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references users(id) on delete cascade,
  title text not null,
  competencies jsonb not null,
  actions jsonb not null,
  created_at timestamptz default now()
);

create table if not exists recommendations (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references users(id) on delete cascade,
  type text not null,
  payload jsonb not null,
  created_at timestamptz default now()
);

create table if not exists payments (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references users(id) on delete cascade,
  provider text not null,
  plan text not null,
  amount_cents integer not null,
  currency text not null,
  status text not null,
  created_at timestamptz default now()
);

-- Enable RLS
alter table users enable row level security;
alter table profiles enable row level security;
alter table career_vectors enable row level security;
alter table resumes enable row level security;
alter table resume_versions enable row level security;
alter table cover_letters enable row level security;
alter table jobs enable row level security;
alter table companies enable row level security;
alter table applications enable row level security;
alter table user_skills enable row level security;
alter table fit_scores enable row level security;
alter table messages enable row level security;
alter table notifications enable row level security;
alter table learning_paths enable row level security;
alter table recommendations enable row level security;
alter table payments enable row level security;

-- Candidate self-access
create policy "users self read" on users for select using (auth.uid() = id);
create policy "profiles self manage" on profiles for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "career_vectors self read" on career_vectors for select using (auth.uid() = user_id);
create policy "career_vectors self insert" on career_vectors for insert with check (auth.uid() = user_id);
create policy "resumes self manage" on resumes for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "resume_versions via resume ownership" on resume_versions for all using (
  exists(select 1 from resumes r where r.id = resume_id and r.user_id = auth.uid())
) with check (
  exists(select 1 from resumes r where r.id = resume_id and r.user_id = auth.uid())
);
create policy "cover letters self manage" on cover_letters for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "applications self manage" on applications for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "user skills self manage" on user_skills for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "fit scores self read" on fit_scores for select using (auth.uid() = user_id);
create policy "messages own" on messages for all using (auth.uid() in (sender_id, recipient_id)) with check (auth.uid() = sender_id);
create policy "notifications self" on notifications for select using (auth.uid() = user_id);
create policy "learning paths self" on learning_paths for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "recommendations self" on recommendations for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "payments self read" on payments for select using (auth.uid() = user_id);

-- Recruiter visibility
create policy "jobs readable by authenticated" on jobs for select to authenticated using (true);
create policy "companies readable by authenticated" on companies for select to authenticated using (true);
create policy "fit scores recruiter read" on fit_scores for select to authenticated using (
  exists(select 1 from jobs j join users u on u.id = auth.uid() where j.id = fit_scores.job_id and u.role in ('recruiter','company_admin','platform_admin'))
);
