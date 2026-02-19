# Deployment Notes

## Vercel (Monorepo)

For this monorepo, set the Vercel **Project Root Directory** to:

- `apps/web`

If the project root is left at the repository root, Vercel may look for Next.js build output in the wrong place (for example, `/vercel/path0/.next`) and fail with:

- `The Next.js output directory .next was not found at /vercel/path0/.next`

Build scripts to keep:

- Root: `npm run build --workspace @pathfinder/web`
- `apps/web`: `next build`
