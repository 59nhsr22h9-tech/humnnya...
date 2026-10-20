import A from './data/A';
import B from './data/B';
import C from './data/C';
import D from './data/D';
import {sortNotes} from './format';
import type {NoteRecord} from './types';

const libraries: Readonly<Record<string, readonly NoteRecord[]>> = {
  A: sortNotes(A), B: sortNotes(B), C: sortNotes(C), D: sortNotes(D),
};

export function getNotes(owner: string): readonly NoteRecord[] {
  if (!Object.prototype.hasOwnProperty.call(libraries, owner)) throw new Error('Unknown notes owner');
  return libraries[owner];
}
