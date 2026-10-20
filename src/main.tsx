import {useState,useEffect} from 'react';
import {ChevronRight} from 'lucide-react';
import {createRoot} from 'react-dom/client';
import {people} from './data';
import Phone from './Phone';
import './style.css';
function App(){
 const [selected,setSelected]=useState('A');
 const [viewport,setViewport]=useState({width:window.innerWidth,height:window.innerHeight});
 useEffect(()=>{const resize=()=>setViewport({width:window.innerWidth,height:window.innerHeight});window.addEventListener('resize',resize);return()=>window.removeEventListener('resize',resize)},[]);
 const person=people.find(p=>p.id===selected)!;
 const dimensions={mini:[264,549],iphone:[284,583],galaxy:[282,608],concept:[290,600]}[person.device];
 const scale=Math.max(.25,Math.min((viewport.width-120)/dimensions[0],(viewport.height-104)/dimensions[1],1.5));
 return <main className="phone-only"><section className="isolated-phone" aria-label={person.model} style={{width:dimensions[0]*scale,height:dimensions[1]*scale}}><div className="phone-scale" style={{transform:`scale(${scale})`}}><Phone key={person.id} person={person}/></div><button className="next-person" aria-label="다음 인물의 휴대전화" onClick={()=>setSelected(people[(people.findIndex(p=>p.id===selected)+1)%people.length].id)}><ChevronRight size={30} strokeWidth={1.5}/></button></section><nav className="device-switcher" aria-label="휴대전화 선택">{people.map((p,i)=><button key={p.id} className={p.id===selected?'current':''} aria-label={`${i+1}번 휴대전화: ${p.model}`} aria-pressed={p.id===selected} onClick={()=>setSelected(p.id)}><span/></button>)}</nav></main>
}
createRoot(document.getElementById('root')!).render(<App/>);
