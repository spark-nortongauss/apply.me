# Deployment Notes

## Vercel (Monorepo)

This repository is configured to deploy from the repository root via `vercel.json`.

- Install command: `npm install`
- Build command: `npm run build --workspace @pathfinder/web`
- Output directory: `apps/web/.next`

If your Vercel project is instead configured with **Root Directory = `apps/web`**, remove the root-level output override and use default Next.js settings for that app-rooted project.
