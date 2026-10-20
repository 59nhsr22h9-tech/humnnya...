import type {Track} from './data/types';
export type Playback = Readonly<{trackId:string|null;playing:boolean;error:string|null;currentTime:number;duration:number}>;
export interface AudioPort {
 src:string;currentTime:number;duration:number;preload:string;
 play():Promise<void>;pause():void;load():void;
 addEventListener(type:string,listener:()=>void):void;
 removeEventListener(type:string,listener:()=>void):void;
 removeAttribute(name:string):void;
}
/** A single audio element belongs to the phone, rather than either music view. */
export class MusicPlayer {
 private state:Playback={trackId:null,playing:false,error:null,currentTime:0,duration:0};
 private listeners=new Set<()=>void>();
 private attempt=0;
 private wantsPlayback=false;
 private disposed=false;
 private onPlaying=()=>{if(this.wantsPlayback&&!this.disposed)this.update({playing:true,error:null})};
 private onPause=()=>{if(!this.disposed)this.update({playing:false})};
 private onTimeline=()=>{
  if(this.disposed)return;
  const duration=Number.isFinite(this.audio.duration)&&this.audio.duration>0?this.audio.duration:0;
  const position=Number.isFinite(this.audio.currentTime)?Math.max(0,this.audio.currentTime):0;
  this.update({duration,currentTime:duration?Math.min(position,duration):position});
 };
 private onError=()=>{if(!this.disposed){this.wantsPlayback=false;this.update({playing:false,error:'재생할 수 없습니다. 다시 눌러 주세요.'})}};
 private onEnded=()=>{
  if(this.disposed)return;
  const index=this.tracks.findIndex(t=>t.id===this.state.trackId);
  this.wantsPlayback=false;
  this.onTimeline();this.update({playing:false});
  if(index>=0&&index+1<this.tracks.length)this.start(this.tracks[index+1]);
 };
 constructor(private readonly tracks:readonly Track[],private readonly audio:AudioPort){
  audio.preload='none';
  for(const [name,listener] of this.events)audio.addEventListener(name,listener);
 }
 private get events():readonly (readonly [string,()=>void])[]{return [['playing',this.onPlaying],['pause',this.onPause],['ended',this.onEnded],['error',this.onError],['timeupdate',this.onTimeline],['loadedmetadata',this.onTimeline],['durationchange',this.onTimeline]]}
 private update(change:Partial<Playback>){this.state={...this.state,...change};for(const listener of this.listeners)listener()}
 getSnapshot=()=>this.state;
 subscribe=(listener:()=>void)=>{this.listeners.add(listener);return()=>{this.listeners.delete(listener)}};
 /** Song-list selection always plays; it never pauses an already playing selection. */
 play=(id:string)=>{
  if(this.disposed)return;
  const track=this.tracks.find(t=>t.id===id);if(!track)return;
  if(this.state.trackId===id&&this.wantsPlayback)return;
  this.start(track);
 };
 toggle=(id:string)=>{
  if(this.disposed)return;
  const track=this.tracks.find(t=>t.id===id);if(!track)return;
  if(this.state.trackId===id&&this.wantsPlayback){
   this.attempt++;this.wantsPlayback=false;this.audio.pause();this.update({playing:false});
  }else this.start(track);
 };
 next=()=>this.move(1);
 previous=()=>this.move(-1);
 private move(step:number){
  if(this.disposed)return;
  const index=this.tracks.findIndex(t=>t.id===this.state.trackId);
  if(index<0)return;
  const next=this.tracks[index+step];if(next)this.start(next);
 }
 seek=(seconds:number)=>{
  if(this.disposed||!this.state.trackId||!Number.isFinite(seconds)||this.state.duration<=0)return;
  const position=Math.max(0,Math.min(seconds,this.state.duration));
  try{this.audio.currentTime=position;this.update({currentTime:position})}catch{/* Media may not have seekable data yet; keep the last valid position. */}
 };
 private start(track:Track){
  const attempt=++this.attempt;
  const changed=this.state.trackId!==track.id;
  this.wantsPlayback=false;
  if(changed){
   this.audio.pause();this.audio.src=track.audioSrc;this.audio.load();
   this.update({trackId:track.id,playing:false,error:null,currentTime:0,duration:0});
  }else{
   if(this.state.duration>0&&this.audio.currentTime>=this.state.duration){this.audio.currentTime=0;this.update({currentTime:0})}
   this.update({playing:false,error:null});
  }
  this.wantsPlayback=true;
  void this.audio.play().then(()=>{
   if(!this.disposed&&attempt===this.attempt&&this.wantsPlayback)this.update({playing:true});
  }).catch(()=>{
   if(!this.disposed&&attempt===this.attempt){this.wantsPlayback=false;this.update({playing:false,error:'재생할 수 없습니다. 다시 눌러 주세요.'})}
  });
 }
 dispose(){
  this.disposed=true;this.attempt++;this.wantsPlayback=false;
  for(const [name,listener] of this.events)this.audio.removeEventListener(name,listener);
  this.audio.pause();this.audio.removeAttribute('src');this.audio.load();this.listeners.clear();
 }
}
