import { isSelfHosted } from '../lib/video.js';
import NativePreview from './NativePreview.jsx';
import YouTubePreview from './YouTubePreview.jsx';

// Silent looping tile preview. Videos with an MP4 `src` play through the
// native <video> element; the rest fall back to their YouTube embed, so the
// portfolio can migrate to self-hosted files one video at a time.
export default function LivePreviewPlayer(props) {
  const Player = isSelfHosted(props.video) ? NativePreview : YouTubePreview;
  return <Player {...props} />;
}
