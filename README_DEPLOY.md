# Deployment Notes

## Vercel (Monorepo)

1. In Vercel project settings, set **Root Directory** to `apps/web`.
2. Keep **Framework Preset** as **Next.js**.
3. Keep **Output Directory** empty/default (do **not** set `apps/web/.next` or any custom path).
4. Use the default Next.js build command for that root (`next build`).

## Why this matters

If the project is built from the repository root, Vercel looks for `.next` at `/vercel/path0/.next` and fails because this app outputs to `apps/web/.next`.
