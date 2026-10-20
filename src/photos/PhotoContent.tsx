import {useEffect,useRef,useState,type KeyboardEvent} from 'react';
import {ChevronLeft,ChevronRight,X} from 'lucide-react';
import type {Photo} from './types';
import './photos.css';
/** Extends the existing Photos app content; originals stay untouched and view-only. */
export default function PhotoContent({photos}:{photos:readonly Photo[]}){
 const [selected,setSelected]=useState<number|null>(null);
 const [failed,setFailed]=useState(false);
 const viewer=useRef<HTMLElement>(null);
 const closeButton=useRef<HTMLButtonElement>(null);
 const gridButtons=useRef<(HTMLButtonElement|null)[]>([]);
 const lastViewed=useRef<number|null>(null);
 const gesture=useRef<{x:number;y:number;id:number}|null>(null);
 const isOpen=selected!==null;
 const photo=selected!==null?photos[selected]:undefined;
 useEffect(()=>{
  if(isOpen)closeButton.current?.focus();
  else if(lastViewed.current!==null)gridButtons.current[lastViewed.current]?.focus();
 },[isOpen]);
 const open=(index:number)=>{lastViewed.current=index;setFailed(false);setSelected(index)};
 const move=(offset:number)=>{
  if(selected===null)return;
  const next=selected+offset;
  if(next>=0&&next<photos.length)open(next);
 };
 const close=()=>{gesture.current=null;setSelected(null)};
 const keyboard=(e:KeyboardEvent<HTMLElement>)=>{
  if(e.key==='Escape'){e.preventDefault();close()}
  else if(e.key==='ArrowLeft'){e.preventDefault();move(-1)}
  else if(e.key==='ArrowRight'){e.preventDefault();move(1)}
  else if(e.key==='Tab'){
   const controls=viewer.current?.querySelectorAll<HTMLButtonElement>('button:not(:disabled)');
   if(!controls?.length)return;
   const first=controls[0],last=controls[controls.length-1];
   if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}
   else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}
  }
 };
 return <>
  <section className="photo-content" aria-label="사진 보관함" inert={isOpen}>
   <div className="photo-grid">{photos.map((item,index)=><button key={item.id} ref={node=>{gridButtons.current[index]=node}} className="photo-tile" aria-label={item.alt+' 확대'} onClick={()=>open(index)}><img src={item.src} alt={item.alt} loading="lazy" decoding="async" draggable={false}/></button>)}</div>
   <p className="photo-count">{photos.length}장의 사진</p>
  </section>
  {photo&&selected!==null&&<section className="photo-viewer" ref={viewer} role="dialog" aria-modal="true" aria-label="사진 확대 화면" onKeyDown={keyboard}>
   <div className="photo-viewer-bar"><button ref={closeButton} className="photo-close" aria-label="사진 보관함으로 돌아가기" onClick={close}><X size={19}/></button><span aria-live="polite">{selected+1} / {photos.length}</span></div>
   <div className="photo-swipe" onPointerDown={e=>{
    if(!e.isPrimary||e.button!==0)return;
    e.preventDefault();
    closeButton.current?.focus({preventScroll:true});
    gesture.current={x:e.clientX,y:e.clientY,id:e.pointerId};
    e.currentTarget.setPointerCapture(e.pointerId);
   }} onPointerUp={e=>{
    const from=gesture.current;gesture.current=null;
    if(!from||from.id!==e.pointerId)return;
    const dx=e.clientX-from.x,dy=e.clientY-from.y;
    if(Math.abs(dx)>=36&&Math.abs(dx)>Math.abs(dy)*1.2)move(dx<0?1:-1);
   }} onPointerCancel={()=>{gesture.current=null}} onLostPointerCapture={()=>{gesture.current=null}}>
    <img key={photo.id} src={photo.src} alt={photo.alt} draggable={false} onError={()=>setFailed(true)}/>
    {failed&&<p className="photo-load-error" role="alert">사진을 불러올 수 없습니다.</p>}
   </div>
   <nav className="photo-viewer-navigation" aria-label="사진 이동"><button aria-label="이전 사진" disabled={selected===0} onClick={()=>move(-1)}><ChevronLeft size={21}/></button><button aria-label="다음 사진" disabled={selected===photos.length-1} onClick={()=>move(1)}><ChevronRight size={21}/></button></nav>
  </section>}
 </>
}
