# Pathfinder

Pathfinder is a production-focused **Career Intelligence Platform** built as a monorepo. It analyzes real competencies, computes a Career Vector Score, improves CV and cover letters, and performs AI-powered opportunity matching.

## Stack

- **Frontend**: Next.js 15 (App Router), TypeScript, TailwindCSS, ShadCN-style UI primitives, Framer Motion, GSAP, Three.js
- **Backend**: Supabase (Postgres/Auth/Storage), Next.js API routes
- **AI Services**:
  - FastAPI microservice for CV analysis and generation
  - Django orchestration service for ML workflow control-plane
- **Infra**: Vercel + Supabase

## Monorepo Structure

```txt
.
├── apps/
│   └── web/                     # Next.js app
├── services/
│   ├── ai-engine/               # FastAPI AI endpoints
│   └── ml-orchestrator/         # Django ML orchestration
├── supabase/
│   └── schema.sql               # DB schema + RLS policies
├── .env.example
└── README.md
```

## Core Features Implemented

- Candidate Intelligence Profile foundations + Career Vector Score pipeline endpoint
- AI CV & cover letter generation endpoints
- Smart job fit scoring endpoint (vector similarity)
- Candidate dashboard and recruiter dashboard UIs
- Job board UI with fit scoring display
- Resume builder UI with variant generation actions
- Landing page with 3D hero and GSAP reveal animations
- Supabase schema with required tables and RLS policies

## Local Development

### 1) Install dependencies

```bash
npm install
```

### 2) Configure environment

```bash
cp .env.example .env
```

Set Supabase and AI service values.

### 3) Run the web app

```bash
npm run dev
```

Open `http://localhost:3000`.

### 4) Run the FastAPI AI service

```bash
cd services/ai-engine
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --host 0.0.0.0 --port 8001 --reload
```

### 5) Run the Django orchestrator

```bash
cd services/ml-orchestrator
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver 0.0.0.0:8002
```

## Supabase Setup

1. Create Supabase project.
2. Run SQL from `supabase/schema.sql` in SQL editor.
3. Configure Auth providers:
   - Email/password
   - Google
   - Microsoft
   - LinkedIn
   - Meta (Facebook)
   - X (Twitter)
4. Create Storage bucket for CV uploads (e.g. `documents`).

## Deployment

### Vercel (web)

1. Import repo.
2. Set root project to monorepo and build for `apps/web`.
3. Configure env vars from `.env.example`.
4. Deploy.

### Supabase

- Apply schema and RLS
- Configure OAuth providers
- Configure storage policies for authenticated upload/read

### AI Service

Deploy `services/ai-engine` as containerized FastAPI service and set `AI_SERVICE_URL` in Vercel.

## Performance Guidance

- Use SSR and selective streaming in App Router pages.
- Add cache tags to expensive route handlers.
- Run CV parsing and scoring in async background queue.
- Store embeddings and vectors for ANN search.

## Next Build Steps

- Add pgvector columns and Supabase vector indexes.
- Integrate real embedding model and RAG pipeline.
- Add recruiter messaging and pipeline workflows.
- Implement payment-gated premium features.

## Build Failure Fix (Vercel prerender `/404`)

The prior Vercel failures were caused by **React 19 RC behavior in a mixed SSR/prerender path**. During `/404` prerender, Next.js fell back to Pages Router internals (`.next/server/pages/_error.js`) while parts of the app were rendered with a different React dispatcher context, producing `Cannot read properties of null (reading "useContext")`.

### Why React 19 RC caused crashes

- React 19 RC is not the stable baseline expected by mixed Next.js runtime paths used in this repo.
- In monorepos, RC + mixed semver ranges can resolve to multiple React copies, so server-rendered components may execute with a different dispatcher instance than the one providing context.
- When that happens, any hook call (`useContext`, `useMemo`, etc.) can crash at prerender time because the active dispatcher is `null`.

### Stabilization actions

- Pinned `react` and `react-dom` to `18.2.0` in root and `apps/web`, plus root `overrides` to force a single React runtime across all workspaces.
- Upgraded `next` to `^15.3.0` to remove the `next@15.2.4` vulnerability warning.
- Kept Supabase SSR integration on `@supabase/ssr` (and removed any use of deprecated auth helpers).
- Standardized App Router error boundaries with lightweight `app/error.tsx` and `app/not-found.tsx` so `/404` prerender resolves through App Router instead of legacy Pages fallback.
- Added root `vercel.json` install/build directives for deterministic Vercel behavior.
- Lockfile regeneration is required after dependency changes to keep installs reproducible in CI and Vercel.

These changes keep SSR prerender deterministic and eliminate the React dispatcher mismatch that triggered Vercel build instability.
