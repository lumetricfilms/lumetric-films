// Generates a poster JPG for every self-hosted showcase video that doesn't
// have one yet, grabbing the frame at the video's preview `start` second.
// Requires ffmpeg (macOS: `brew install ffmpeg`).
// Run with: node scripts/make-posters.mjs
import { execFileSync, spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { showcaseSections } from '../src/data/showcase.js';

if (spawnSync('ffmpeg', ['-version']).error) {
  console.error('ffmpeg not found. Install it first (macOS: brew install ffmpeg).');
  process.exit(1);
}

let made = 0;
for (const section of showcaseSections) {
  for (const video of section.videos) {
    if (!video.src || !video.src.startsWith('/')) continue; // local files only
    const mp4 = `public${video.src}`;
    const poster = `public${(video.poster ?? video.src.replace(/\.[^.]+$/, '.jpg'))}`;
    if (!existsSync(mp4)) {
      console.warn(`skip ${video.id}: ${mp4} not found`);
      continue;
    }
    if (existsSync(poster)) continue;
    execFileSync('ffmpeg', [
      '-ss', String(video.start ?? 0),
      '-i', mp4,
      '-frames:v', '1',
      '-q:v', '3',
      '-vf', "scale='min(1280,iw)':-2",
      poster,
    ]);
    console.log(`wrote ${poster}`);
    made += 1;
  }
}
console.log(made ? `Done: ${made} poster(s).` : 'Nothing to do.');
