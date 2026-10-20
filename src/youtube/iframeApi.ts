export type YouTubePlayer = {
  pauseVideo(): void;
  getVolume(): number;
  setVolume(volume: number): void;
  destroy(): void;
};
export type YouTubeAPI = {
  Player: new (element: HTMLElement, options: {
    events: {
      onReady(): void;
      onError(event: {data: number}): void;
      onAutoplayBlocked(): void;
    };
  }) => YouTubePlayer;
};

declare global {
  interface Window {
    YT?: YouTubeAPI;
    onYouTubeIframeAPIReady?: () => void;
  }
}

let pending: Promise<YouTubeAPI> | undefined;

/** Official IFrame API; one shared script, with a retry after network failure. */
export function loadYouTubeAPI(): Promise<YouTubeAPI> {
  if (window.YT?.Player) return Promise.resolve(window.YT);
  if (pending) return pending;
  pending = new Promise<YouTubeAPI>((resolve, reject) => {
    const script = document.createElement('script');
    const previous = window.onYouTubeIframeAPIReady;
    let settled = false;
    const finish = (api?: YouTubeAPI) => {
      if (settled) return;
      settled = true;
      clearTimeout(timeout);
      script.onerror = null;
      if (window.onYouTubeIframeAPIReady === ready) window.onYouTubeIframeAPIReady = previous;
      if (api) resolve(api);
      else { script.remove(); pending = undefined; reject(new Error('YouTube API unavailable')); }
    };
    const ready = () => {
      if (window.YT?.Player) finish(window.YT);
      else finish();
      previous?.();
    };
    const timeout = window.setTimeout(() => finish(), 20000);
    window.onYouTubeIframeAPIReady = ready;
    script.src = 'https://www.youtube.com/iframe_api';
    script.async = true;
    script.onerror = () => finish();
    document.head.append(script);
  });
  return pending;
}
