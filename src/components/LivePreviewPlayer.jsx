import { isSelfHosted, posterFor } from '../lib/video.js';
import NativePreview from './NativePreview.jsx';
import YouTubePreview from './YouTubePreview.jsx';

// Silent looping tile preview. Source tiers per video:
//   previewSrc — a small self-hosted clip of just the preview stamp; the
//                fastest tile source, so it wins whenever present (the
//                theater then uses src if set, else YouTube).
//   src        — fully self-hosted MP4: native preview AND native theater.
//   youTubeId  — full YouTube fallback for both.
export default function LivePreviewPlayer(props) {
  const { video } = props;
  if (video.previewSrc) {
    // The clip IS the stamp: loop the whole file from 0.
    const clip = {
      ...video,
      src: video.previewSrc,
      start: 0,
      end: undefined,
      poster: posterFor(video),
    };
    return <NativePreview {...props} video={clip} />;
  }
  if (isSelfHosted(video)) return <NativePreview {...props} />;
  return <YouTubePreview {...props} />;
}
