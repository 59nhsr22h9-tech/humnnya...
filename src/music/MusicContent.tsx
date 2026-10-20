import {useState} from 'react';
import {ArrowLeft,Pause,Play,SkipBack,SkipForward} from 'lucide-react';
import type {Track} from './data/types';
import type {Playback} from './player';
import {DEFAULT_COVER,resolveCoverImage} from './covers';
import './music.css';
export function formatPlaybackTime(seconds:number){
 if(!Number.isFinite(seconds)||seconds<0)return '0:00';
 const whole=Math.floor(seconds);return `${Math.floor(whole/60)}:${String(whole%60).padStart(2,'0')}`;
}
type Props={tracks:readonly Track[];playback:Playback;onPlay:(id:string)=>void;onToggle:(id:string)=>void;onPrevious:()=>void;onNext:()=>void;onSeek:(seconds:number)=>void};
export default function MusicContent({tracks,playback,onPlay,onToggle,onPrevious,onNext,onSeek}:Props){
 const [view,setView]=useState<'songs'|'playing'>('songs');
 const [scrub,setScrub]=useState<number|null>(null);
 const track=tracks.find(t=>t.id===playback.trackId);
 const index=tracks.findIndex(t=>t.id===playback.trackId);
 const nowPlaying=view==='playing'&&!!track;
 const choose=(id:string)=>{setScrub(null);onPlay(id);setView('playing')};
 const position=scrub??playback.currentTime;
 const percent=playback.duration>0?Math.min(100,position/playback.duration*100):0;
 return <section className={'song-content music-dual-view'+(nowPlaying?' music-playing-view':'')} aria-label="음악 앱">
  {nowPlaying?<>
   <div className="now-playing-nav"><button className="now-back" onClick={()=>{setScrub(null);setView('songs')}}><ArrowLeft size={15}/> 노래</button><span>지금 재생 중</span></div>
   <div className="now-playing-body">
    <img key={track.id} className="now-cover" src={resolveCoverImage(track)} alt={`${track.title} 커버`} draggable={false} onError={e=>{const image=e.currentTarget;if(image.dataset.fallback!=='true'){image.dataset.fallback='true';image.src=DEFAULT_COVER}}}/>
    <div className="now-track"><h2>{track.title}</h2><p>{track.artist}</p></div>
    <div className="now-timeline">
     <input type="range" aria-label="재생 위치" min={0} max={playback.duration||1} step={0.1} value={Math.min(position,playback.duration||0)} disabled={playback.duration<=0} style={{background:`linear-gradient(to right,#65816e ${percent}%,#d7dcd6 ${percent}%)`}} onChange={e=>{const value=Number(e.target.value);setScrub(value);onSeek(value)}} onPointerUp={()=>setScrub(null)} onKeyUp={()=>setScrub(null)} onBlur={()=>setScrub(null)}/>
     <div className="now-times"><time aria-label="현재 재생 시간">{formatPlaybackTime(position)}</time><time aria-label="전체 재생 시간">{formatPlaybackTime(playback.duration)}</time></div>
    </div>
    <div className="now-controls"><button aria-label="이전 곡" onClick={()=>{setScrub(null);onPrevious()}} disabled={index<=0}><SkipBack size={23} fill="currentColor"/></button><button className="now-play" aria-label={playback.playing?'일시정지':'재생'} onClick={()=>onToggle(track.id)}>{playback.playing?<Pause size={27} fill="currentColor"/>:<Play size={27} fill="currentColor"/>}</button><button aria-label="다음 곡" onClick={()=>{setScrub(null);onNext()}} disabled={index<0||index>=tracks.length-1}><SkipForward size={23} fill="currentColor"/></button></div>
   </div>
  </>:<>
   <h2 className="songs-heading">노래</h2>
   {tracks.length===0?<p className="songs-empty">노래가 없습니다.</p>:<div className="song-list">{tracks.map(song=>{
    const selected=playback.trackId===song.id;
    return <button key={song.id} className={'song-row'+(selected?' selected-song':'')} onClick={()=>choose(song.id)} aria-label={`${song.title}, ${song.artist}, 재생`} aria-pressed={selected&&playback.playing}>
     <span className="song-label"><strong>{song.title}</strong><span>{song.artist}</span></span><span className="song-indicator" aria-hidden="true">{selected&&(playback.playing?<Play size={11} fill="currentColor"/>:<Pause size={11} fill="currentColor"/>)}</span>
    </button>
   })}</div>}
  </>}
  {playback.error&&<p className="song-error" role="alert">{playback.error}</p>}
 </section>
}
