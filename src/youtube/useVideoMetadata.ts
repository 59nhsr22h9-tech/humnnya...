import {useEffect, useState} from 'react';
import type {HistoryVideo} from './types';

type Verified = {title: string; channel: string; thumbnailUrl: string};
const cache = new Map<string, Verified>();

/** Try the official oEmbed endpoint in the visitor's browser; fixed history never changes. */
export default function useVideoMetadata(videos: readonly HistoryVideo[]): readonly HistoryVideo[] {
  const [resolved, setResolved] = useState<readonly HistoryVideo[]>(() => videos.map(video => ({...video, ...cache.get(video.videoId)})));
  useEffect(() => {
    let disposed = false;
    const controllers: AbortController[] = [];
    const timers: number[] = [];
    setResolved(videos.map(video => ({...video, ...cache.get(video.videoId)})));
    for (const video of videos) {
      if (video.title && video.channel || cache.has(video.videoId)) continue;
      const controller = new AbortController();
      controllers.push(controller);
      const timer = window.setTimeout(() => controller.abort(), 8000);
      timers.push(timer);
      const endpoint = new URL('https://www.youtube.com/oembed');
      endpoint.searchParams.set('url', `https://www.youtube.com/watch?v=${video.videoId}`);
      endpoint.searchParams.set('format', 'json');
      fetch(endpoint, {signal: controller.signal, credentials: 'omit'}).then(async response => {
        if (!response.ok) throw new Error('Metadata unavailable');
        const data: unknown = await response.json();
        if (!data || typeof data !== 'object') return;
        const item = data as Record<string, unknown>;
        if (item.provider_name !== 'YouTube' || typeof item.title !== 'string' || !item.title.trim() ||
          typeof item.author_name !== 'string' || !item.author_name.trim() || typeof item.html !== 'string' ||
          !item.html.includes(`/embed/${video.videoId}`)) return;
        const verified: Verified = {title: item.title, channel: item.author_name, thumbnailUrl: video.thumbnailUrl};
        if (typeof item.thumbnail_url === 'string') {
          const thumb = new URL(item.thumbnail_url);
          if (thumb.protocol === 'https:' && thumb.hostname === 'i.ytimg.com') verified.thumbnailUrl = thumb.href;
        }
        if (disposed) return;
        cache.set(video.videoId, verified);
        setResolved(current => current.map(record => record.id === video.id ? {...record, ...verified} : record));
      }).catch(() => {
        // Keep the user's title or an explicit unknown label; never fabricate metadata.
      }).finally(() => clearTimeout(timer));
    }
    return () => {disposed = true; controllers.forEach(controller => controller.abort()); timers.forEach(clearTimeout);};
  }, [videos]);
  return resolved;
}
