const VIDEO_ID = /^[A-Za-z0-9_-]{11}$/;
const YOUTUBE_HOSTS = new Set([
  'youtube.com', 'www.youtube.com', 'm.youtube.com', 'music.youtube.com',
  'youtube-nocookie.com', 'www.youtube-nocookie.com',
]);
const SHORT_HOSTS = new Set(['youtu.be', 'www.youtu.be']);

/** Read an ID only from a supported official YouTube URL, never an arbitrary host. */
export function extractYouTubeVideoId(input: string): string | null {
  if (typeof input !== 'string') return null;
  const value = input.trim();
  if (!value || /\s/.test(value)) return null;

  let url: URL;
  try { url = new URL(value); } catch { return null; }
  if (!['https:', 'http:'].includes(url.protocol) || url.username || url.password || url.port) {
    return null;
  }

  let candidate: string | null = null;
  const path = url.pathname.split('/').filter(Boolean);
  if (SHORT_HOSTS.has(url.hostname) && path.length === 1) {
    candidate = path[0];
  } else if (YOUTUBE_HOSTS.has(url.hostname)) {
    if (path.length === 1 && path[0] === 'watch' && url.searchParams.getAll('v').length === 1) {
      candidate = url.searchParams.get('v');
    } else if (path.length === 2 && ['shorts', 'embed', 'live'].includes(path[0])) {
      candidate = path[1];
    }
  }

  return candidate && VIDEO_ID.test(candidate) ? candidate : null;
}

/** Build the official inline player URL with a real HTTP origin for iframe API events. */
export function createYouTubeEmbedUrl(videoId: string, origin: string): string {
  if (!VIDEO_ID.test(videoId)) throw new TypeError('Invalid YouTube video ID');
  let site: URL;
  try { site = new URL(origin); } catch { throw new TypeError('Invalid player origin'); }
  if (!['https:', 'http:'].includes(site.protocol) || site.username || site.password ||
      site.pathname !== '/' || site.search || site.hash) {
    throw new TypeError('Invalid player origin');
  }

  const url = new URL(`https://www.youtube-nocookie.com/embed/${videoId}`);
  url.searchParams.set('playsinline', '1');
  url.searchParams.set('controls', '1');
  url.searchParams.set('enablejsapi', '1');
  url.searchParams.set('origin', site.origin);
  url.searchParams.set('rel', '0');
  return url.toString();
}
