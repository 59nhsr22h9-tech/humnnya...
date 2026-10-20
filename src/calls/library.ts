import A from './data/A';
import B from './data/B';
import C from './data/C';
import D from './data/D';
import {sortCalls} from './format';
import type {CallRecord} from './types';

const libraries: Readonly<Record<string, readonly CallRecord[]>> = {
  A: sortCalls(A), B: sortCalls(B), C: sortCalls(C), D: sortCalls(D),
};

export function getCallHistory(owner: string): readonly CallRecord[] {
  if (!Object.prototype.hasOwnProperty.call(libraries, owner)) throw new Error('Unknown call history owner');
  return libraries[owner];
}
