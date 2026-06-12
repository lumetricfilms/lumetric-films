import { thumbnailUrl } from './youtube.js';

// A video entry is self-hosted when it has a `src` (an MP4 in public/videos/
// or any absolute URL); otherwise it falls back to its YouTube embed. This
// lets the portfolio migrate file by file without ever breaking.
export function isSelfHosted(video) {
  return Boolean(video.src);
}

// Poster image for a video: explicit `poster`, else the convention
// <src>.mp4 -> <src>.jpg (see scripts/make-posters.mjs), else the YouTube thumb.
export function posterFor(video, ytQuality = 'hqdefault') {
  if (video.poster) return video.poster;
  if (video.src) return video.src.replace(/\.[^.]+$/, '.jpg');
  return thumbnailUrl(video.youTubeId, ytQuality);
}

// The page a video can be watched on outside the site (used by the lightbox
// fallback and structured data). Self-hosted videos have no external page.
export function watchUrl(video) {
  return video.youTubeId ? `https://www.youtube.com/watch?v=${video.youTubeId}` : null;
}
