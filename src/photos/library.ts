import A from './data/A';
import B from './data/B';
import C from './data/C';
import D from './data/D';
import type {Photo} from './types';

const libraries: Readonly<Record<string, readonly Photo[]>> = {A, B, C, D};

export function getPhotos(owner: string): readonly Photo[] {
  if (!Object.prototype.hasOwnProperty.call(libraries, owner)) {
    throw new Error('Unknown photo library owner');
  }
  return libraries[owner];
}
