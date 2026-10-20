import type {NoteRecord} from './types';

/** The supplied JSON specifies Asia/Seoul, regardless of the visitor's timezone. */
export function noteUpdatedAt(timestamp: string, full = false): string {
  const date = new Date(timestamp);
  if (!Number.isFinite(date.getTime())) throw new Error('Invalid note timestamp');
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Seoul', year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', ...(full ? {second: '2-digit' as const} : {}), hourCycle: 'h23',
  }).formatToParts(date);
  const value = (type: string) => parts.find(part => part.type === type)!.value;
  return `${value('year')}.${value('month')}.${value('day')} ${value('hour')}:${value('minute')}${full ? ':' + value('second') : ''}`;
}

/** Pinning affects display order only; input data and timestamps stay untouched. */
export function sortNotes(notes: readonly NoteRecord[]): readonly NoteRecord[] {
  return [...notes].sort((a, b) => Number(b.pinned) - Number(a.pinned) || Date.parse(b.updatedAt) - Date.parse(a.updatedAt));
}
