import A from './data/A';
import B from './data/B';
import C from './data/C';
import D from './data/D';
import type {MessageHistory, PersonId} from './types';
import {validateHistory} from './model';
const histories: Readonly<Record<PersonId, MessageHistory>> = {A,B,C,D};
for(const [owner,history] of Object.entries(histories)){
 if(history.owner!==owner) throw new Error('Message history owner mismatch');
 validateHistory(history);
}
export function getMessageHistory(owner: string): MessageHistory {
 if(!Object.prototype.hasOwnProperty.call(histories,owner)) throw new Error('Unknown message history owner');
 return histories[owner as PersonId];
}
