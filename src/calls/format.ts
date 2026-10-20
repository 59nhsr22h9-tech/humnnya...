import type {CallRecord} from './types';

const directions = {incoming: '수신', outgoing: '발신', missed: '부재중'} as const;
const statuses = {completed: '통화 완료', missed: '부재중', unanswered: '응답 없음'} as const;

export function callDirection(call: CallRecord): string {return directions[call.direction];}
export function callStatus(call: CallRecord): string {return statuses[call.status];}
export function callSummary(call: CallRecord): string {
  if (call.direction === 'missed') return '부재중 전화';
  if (call.status === 'unanswered') return '발신 · 응답 없음';
  return `${callDirection(call)} 통화`;
}

function parts(timestamp: string) {
  const value = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(Z|[+-]\d{2}:\d{2})$/.exec(timestamp);
  if (!value || !Number.isFinite(Date.parse(timestamp))) throw new Error('Invalid call timestamp');
  return {year: value[1], month: value[2], day: value[3], hour: value[4], minute: value[5], second: value[6], offset: value[7]};
}

/** Preserve the wall-clock date/time encoded in the source, independent of visitor timezone. */
export function callDate(timestamp: string, full = false): string {
  const p = parts(timestamp);
  if (!full) return `${p.year}.${p.month}.${p.day}`;
  const weekday = ['일', '월', '화', '수', '목', '금', '토'][new Date(Date.UTC(Number(p.year), Number(p.month) - 1, Number(p.day))).getUTCDay()];
  return `${p.year}년 ${Number(p.month)}월 ${Number(p.day)}일 ${weekday}요일`;
}

export function callTime(timestamp: string, seconds = false): string {
  const p = parts(timestamp);
  return `${p.hour}:${p.minute}${seconds ? ':' + p.second : ''}`;
}

export function callTimezone(timestamp: string): string {
  const offset = parts(timestamp).offset;
  return offset === 'Z' ? 'UTC' : `UTC${offset}`;
}

export function callDuration(seconds: number): string {
  if (!Number.isInteger(seconds) || seconds < 0) throw new Error('Invalid call duration');
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor(seconds % 3600 / 60);
  const remainder = seconds % 60;
  return [hours ? `${hours}시간` : '', minutes ? `${minutes}분` : '', remainder || !hours && !minutes ? `${remainder}초` : ''].filter(Boolean).join(' ');
}

export function sortCalls(calls: readonly CallRecord[]): readonly CallRecord[] {
  return [...calls].sort((a, b) => Date.parse(b.timestamp) - Date.parse(a.timestamp));
}
