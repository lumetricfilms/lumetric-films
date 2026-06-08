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

// Returns a thumbnail URL for a video. mqdefault (320x180) is 16:9 and always
// exists; maxresdefault (1280x720) is sharper but missing on some videos.
export function thumbnailUrl(videoId, quality = 'mqdefault') {
  return `https://i.ytimg.com/vi/${videoId}/${quality}.jpg`;
}

// Single active preview coordinator: only one tile should play its silent
// preview at a time. Starting a new preview pauses whichever was playing.
let activeStop = null;

export function setActivePreview(stopFn) {
  if (activeStop && activeStop !== stopFn) {
    try {
      activeStop();
    } catch {
      // ignore
    }
  }
  activeStop = stopFn;
}

export function clearActivePreview(stopFn) {
  if (activeStop === stopFn) {
    activeStop = null;
  }
}
