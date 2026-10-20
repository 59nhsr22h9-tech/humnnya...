import type {MessageHistory, MessageRecord, Conversation} from './types';
const stamp = (m: MessageRecord) => `${m.date}T${m.time.length === 5 ? m.time + ':00' : m.time}`;
export function orderedMessages(conversation: Conversation): readonly MessageRecord[] {
  return [...conversation.messages].sort((a,b)=>stamp(a).localeCompare(stamp(b)));
}
export function conversationList(history: MessageHistory): readonly Conversation[] {
  return history.conversations.filter(c=>c.messages.length>0).map(c=>({...c,messages:orderedMessages(c)})).sort((a,b)=>stamp(b.messages[b.messages.length-1]).localeCompare(stamp(a.messages[a.messages.length-1])));
}
/** Reject malformed fixed data early instead of silently showing it in the wrong phone. */
export function validateHistory(history: MessageHistory): void {
  const conversationIds=new Set<string>();
  const messageIds=new Set<string>();
  for(const c of history.conversations){
    if(!c.id || conversationIds.has(c.id) || !c.contact.id || c.contact.id===history.owner || !c.contact.name.trim()) throw new Error(`Invalid conversation in ${history.owner}`);
    conversationIds.add(c.id);
    for(const m of c.messages){
      const participants=[history.owner,c.contact.id];
      const validDate=/^\d{4}-\d{2}-\d{2}$/.test(m.date) && !Number.isNaN(Date.parse(`${m.date}T00:00:00Z`)) && new Date(`${m.date}T00:00:00Z`).toISOString().slice(0,10)===m.date;
      if(!m.id || messageIds.has(m.id) || !participants.includes(m.sender) || !participants.includes(m.recipient) || m.sender===m.recipient || !m.text.trim() || !validDate || !/^([01]\d|2[0-3]):[0-5]\d(:[0-5]\d)?$/.test(m.time)) throw new Error(`Invalid message ${m.id} in ${history.owner}/${c.id}`);
      messageIds.add(m.id);
    }
  }
}
