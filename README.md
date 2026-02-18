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

The previous deployment failed during prerender because the app mixed App Router pages with unstable React 19 RC + legacy Pages Router error rendering behavior. That combination caused Vercel to execute `.next/server/pages/_error.js` and crash with `useContext` on `null`.

What changed:

- Standardized on stable `react@18.2.0` and `react-dom@18.2.0` and enforced workspace-wide versions via root `overrides`.
- Upgraded Next.js to a patched 15.2.x release.
- Added App Router-native `app/not-found.tsx` and `app/error.tsx` handlers so `/404` prerender uses App Router boundaries.
- Isolated animation/3D dependencies (`gsap`, `three`) behind client-only dynamic imports (`ssr: false`) to avoid server execution.
- Replaced deprecated Supabase auth helper usage with `@supabase/ssr` and moved OAuth callback exchange to server route handler cookie-aware clients.

This keeps prerender deterministic and prevents Pages Router fallback logic from running in production builds.
