import A from './data/A';
import B from './data/B';
import C from './data/C';
import D from './data/D';
import type {HistoryVideo} from './types';

const libraries: Readonly<Record<string, readonly HistoryVideo[]>> = {A, B, C, D};

export function getYouTubeHistory(owner: string): readonly HistoryVideo[] {
  if (!Object.prototype.hasOwnProperty.call(libraries, owner)) {
    throw new Error('Unknown YouTube history owner');
  }
  return libraries[owner];
}
