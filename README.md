# Lumetric Films

Cinematic video and photography portfolio for Lumetric Films. Built with React,
Vite, and Tailwind CSS. The live site runs on Vercel: https://lumetric-films.vercel.app

## Run it locally

You need Node.js 18 or newer installed (https://nodejs.org). Then, from this
folder, in a terminal:

```bash
npm install      # one time only, downloads the dependencies
npm run dev      # starts the local development server
```

Open the address it prints (usually http://localhost:5173). The page reloads
automatically every time you save a file. Press Ctrl+C in the terminal to stop.

Running locally does not affect the live Vercel site in any way. It is the same
code; you are just previewing it on your own computer.

## Other commands

```bash
npm run build    # makes the optimized production files in dist/
npm run preview  # serves that production build locally to double check it
```

## Editing the content

- **Videos**: `src/data/showcase.js`. Each entry has `youTubeId` (from the watch
  URL), `start` / `end` (seconds of the silent looping preview), `layout`
  (`full` or `half`), and `title` / `role` captions. Clicking a video opens it
  full size from the beginning. Videos are embedded from YouTube; do not commit
  large video files to this repository.
- **Pricing**: `src/data/pricing.js`. All video and photography packages, the
  add-ons, and the tab labels of the unified Pricing section.
- **Photography**: `src/data/projects.js` plus the JPGs in `public/photography/`.

## Deployment

The live site deploys on Vercel from this repository. The Vite `base` is `/` so
it works at the Vercel root domain and when running locally.
