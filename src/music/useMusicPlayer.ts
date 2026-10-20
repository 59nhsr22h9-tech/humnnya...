import {useEffect,useState} from 'react';
import {MusicPlayer,type Playback} from './player';
import type {Track} from './data/types';
const idle:Playback={trackId:null,playing:false,error:null,currentTime:0,duration:0};
export function useMusicPlayer(tracks:readonly Track[]){
 const [player,setPlayer]=useState<MusicPlayer|null>(null);
 const [playback,setPlayback]=useState<Playback>(idle);
 useEffect(()=>{
  const instance=new MusicPlayer(tracks,new Audio());
  setPlayer(instance);setPlayback(instance.getSnapshot());
  const unsubscribe=instance.subscribe(()=>setPlayback(instance.getSnapshot()));
  return()=>{unsubscribe();instance.dispose()};
 },[tracks]);
 return {playback,play:(id:string)=>player?.play(id),toggle:(id:string)=>player?.toggle(id),previous:()=>player?.previous(),next:()=>player?.next(),seek:(seconds:number)=>player?.seek(seconds)};
}
