import A from './data/A';
import B from './data/B';
import C from './data/C';
import D from './data/D';
import type {Track,PersonId} from './data/types';
const libraries:Readonly<Record<PersonId,readonly Track[]>>={A,B,C,D};
export function getTracks(owner:string):readonly Track[]{
 if(!Object.prototype.hasOwnProperty.call(libraries,owner))throw new Error('Unknown music library owner');
 return libraries[owner as PersonId];
}
