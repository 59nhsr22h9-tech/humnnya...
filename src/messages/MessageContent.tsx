import {useState} from 'react';
import {ArrowLeft,ChevronRight} from 'lucide-react';
import {getMessageHistory} from './index';
import {conversationList,orderedMessages} from './model';
/** Read-only content inside the existing app shell; empty history preserves its empty screen. */
export default function MessageContent({owner}:{owner:string}){
 const history=getMessageHistory(owner);
 const [selected,setSelected]=useState<string|null>(null);
 const list=conversationList(history);
 const conversation=list.find(c=>c.id===selected);
 if(conversation){const messages=orderedMessages(conversation);return <section className="message-content"><button className="message-list-back" onClick={()=>setSelected(null)}><ArrowLeft size={14}/> 대화 목록</button><h3>{conversation.contact.name}</h3><div className="message-thread" role="log" aria-label={conversation.contact.name+'와의 문자 기록'}>{messages.map((m,i)=><div key={m.id}>{(i===0 || messages[i-1].date!==m.date)&&<p className="message-date">{m.date}</p>}<article className={'message-record '+(m.sender===owner?'sent':'received')}><span className="message-sender">{m.sender===owner?'나':conversation.contact.name}</span><p>{m.text}</p><time dateTime={`${m.date}T${m.time}+09:00`}>{m.time.slice(0,5)}</time></article></div>)}</div></section>}
 return <section className="message-content"><div className="conversation-list" aria-label="대화 목록">{list.map(c=>{const last=c.messages[c.messages.length-1];return <button className="conversation-row" key={c.id} onClick={()=>setSelected(c.id)}><span className="contact-initial">{c.contact.name.slice(0,1)}</span><span className="conversation-preview"><strong>{c.contact.name}</strong><span>{last.text}</span><time dateTime={`${last.date}T${last.time}+09:00`}>{last.date} {last.time.slice(0,5)}</time></span><ChevronRight size={14}/></button>})}</div></section>
}
