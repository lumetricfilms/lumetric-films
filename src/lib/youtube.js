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
    const previous = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      if (typeof previous === 'function') {
        previous();
      }
      resolve(window.YT);
    };

    if (!document.querySelector('script[data-youtube-iframe-api]')) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      tag.async = true;
      tag.dataset.youtubeIframeApi = 'true';
      document.head.appendChild(tag);
    }
  });

  return apiPromise;
}

// Returns a thumbnail URL for a video. maxresdefault (1280x720) is sharp;
// callers fall back to hqdefault (which always exists) on error.
export function thumbnailUrl(videoId, quality = 'maxresdefault') {
  return `https://i.ytimg.com/vi/${videoId}/${quality}.jpg`;
}
