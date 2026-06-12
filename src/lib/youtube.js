// Loads the YouTube IFrame Player API exactly once and resolves with window.YT
// when it is ready. Safe to call from many components concurrently.
let apiPromise = null;

export function loadYouTubeApi() {
  if (typeof window === 'undefined') {
    return Promise.resolve(null);
  }
  if (window.YT && typeof window.YT.Player === 'function') {
    return Promise.resolve(window.YT);
  }
  if (apiPromise) {
    return apiPromise;
  }

  apiPromise = new Promise((resolve) => {
    let settled = false;
    const settle = (value) => {
      if (settled) return;
      settled = true;
      // On failure, clear the cached promise so a later call can retry.
      if (!value) apiPromise = null;
      resolve(value);
    };

    const previous = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      if (typeof previous === 'function') {
        previous();
      }
      settle(window.YT);
    };

    if (!document.querySelector('script[data-youtube-iframe-api]')) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      tag.async = true;
      tag.dataset.youtubeIframeApi = 'true';
      tag.onerror = () => {
        // Remove the dead tag so a retry re-creates it (and fails fast
        // instead of waiting out the timeout below).
        tag.remove();
        settle(null);
      };
      document.head.appendChild(tag);
    }

    // Blocked script (privacy extension, restrictive network) may neither load
    // nor error; give callers a fallback path instead of hanging forever. The
    // loader stub sets window.YT before Player exists, so check for Player.
    window.setTimeout(() => settle(window.YT?.Player ? window.YT : null), 8000);
  });

  return apiPromise;
}

// Returns a thumbnail URL for a video. maxresdefault (1280x720) is sharp;
// callers fall back to hqdefault (which always exists) on error.
export function thumbnailUrl(videoId, quality = 'maxresdefault') {
  return `https://i.ytimg.com/vi/${videoId}/${quality}.jpg`;
}
