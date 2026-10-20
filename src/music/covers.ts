import type {Track} from './data/types';

export const DEFAULT_COVER = '/covers/default.svg';

/** Consistent artist/title keys for matching verified local album artwork. */
export function coverKey(artist: string, title: string): string {
  const normalize = (value: string) => value.normalize('NFKC').trim().replace(/\s+/g, ' ').toLowerCase();
  return `${normalize(artist)}::${normalize(title)}`;
}

/**
 * Add verified cover paths here to connect matching songs automatically.
 * Example entry: [coverKey('Artist', 'Song title')]: '/covers/album.jpg'.
 * Direct track.coverImage paths always take priority over the shared catalog.
 */
export const COVER_CATALOG: Readonly<Record<string, string>> = Object.freeze({});

export function resolveCoverImage(track: Track): string {
  const explicit = track.coverImage.trim();
  if (explicit && explicit !== DEFAULT_COVER) return explicit;
  return COVER_CATALOG[coverKey(track.artist, track.title)] || DEFAULT_COVER;
}
