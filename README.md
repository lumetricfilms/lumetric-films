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

- **Videos**: `src/data/showcase.js`. Each entry has `start` / `end` (seconds
  of the silent looping preview), `layout` (`full` or `half`), and `title` /
  `role` captions. Clicking a video opens it full size from the beginning.

### Self-hosting a video (instead of YouTube)

1. Export an MP4 (H.264 + AAC, 1080p, ~4–6 Mbps is plenty) and drop it in
   `public/videos/`, named after the entry's id — e.g.
   `public/videos/puri-numb.mp4`.
2. Add `src: '/videos/puri-numb.mp4'` to that entry in `showcase.js`. The
   `youTubeId` can stay (it's ignored once `src` exists) or be deleted.
3. Generate the poster image: `node scripts/make-posters.mjs` (needs ffmpeg:
   `brew install ffmpeg`). It grabs the frame at the preview `start` second.
4. Commit and push — previews, hover-scrub, and the theater player all work
   the same as with YouTube.

**File-size rules**: GitHub rejects files over 100 MB, so keep repo-hosted
MP4s comfortably under that (a 3–4 minute 1080p video is fine; a 30–45 minute
full show is not). Also note Vercel's free tier includes 100 GB/month of
bandwidth; a few short portfolio MP4s are fine, many long ones are not.

**Full-length shows live on Cloudflare R2** (bucket `lumetric-videos`,
public at `https://pub-f28b13e3d40748758fec68cce995c20a.r2.dev/` — free
egress, ~10GB free storage). To add another full show: transcode it for
streaming (`ffmpeg -i master.mov -c:v libx264 -crf 23 -maxrate 3M -bufsize 6M
-vf "scale=1920:-2" -c:a aac -b:a 160k -movflags +faststart out.mp4`), upload
it to the bucket (R2 dashboard or any S3 tool), and put the public URL in the
entry's `src`. Keep a small local `previewSrc` clip for the tile.

**Caching rule**: `/videos/` and `/photography/` are served with a one-year
immutable cache (vercel.json). If you ever REPLACE a file's content, rename
it (e.g. `-v2`) and update the data — same-name replacements will look stale
to returning visitors for up to a year.

**Long shows (`previewSrc`)**: even when the theater uses a big self-hosted
file (or YouTube), the tile preview should be a small dedicated clip — tiles
that point at the big file stream tens of MB on scroll. Extract just the
preview stamp and set `previewSrc` (plus `poster`) on the entry, e.g.:

```bash
ffmpeg -ss 1953 -i master.mp4 -t 11 -an -c:v libx264 -crf 23 \
  -vf "scale=1920:-2" -movflags +faststart public/videos/<id>-preview.mp4
```
- **Pricing**: `src/data/pricing.js`. All video and photography packages, the
  add-ons, and the tab labels of the unified Pricing section.
- **Photography**: `src/data/projects.js` plus the JPGs in `public/photography/`.

## Deployment

The live site deploys on Vercel from this repository. The Vite `base` is `/` so
it works at the Vercel root domain and when running locally.
