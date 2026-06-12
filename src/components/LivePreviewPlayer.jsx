import { isSelfHosted, posterFor } from '../lib/video.js';
import NativePreview from './NativePreview.jsx';
import YouTubePreview from './YouTubePreview.jsx';

// Silent looping tile preview. Three source tiers per video:
//   src        — fully self-hosted MP4: native preview AND native theater.
//   previewSrc — a small self-hosted clip of just the preview stamp (used for
//                shows too long to host in the repo): native preview, while
//                the theater click keeps using YouTube.
//   youTubeId  — full YouTube fallback for both.
export default function LivePreviewPlayer(props) {
  const { video } = props;
  if (isSelfHosted(video)) return <NativePreview {...props} />;
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
  return <YouTubePreview {...props} />;
}
