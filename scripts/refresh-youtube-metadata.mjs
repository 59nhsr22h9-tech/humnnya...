// Run from the project root: node scripts/refresh-youtube-metadata.mjs
// Author-maintained static data only. No keys or visitor editing are required.
import {execFile} from 'node:child_process';
import {promisify} from 'node:util';
import {readFile,mkdir,writeFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import path from 'node:path';

const execute=promisify(execFile);
const root=fileURLToPath(new URL('../',import.meta.url));
const source=path.join(root,'src/youtube/source');
const input=JSON.parse(await readFile(path.join(source,'character_youtube_history.json'),'utf8'));
const owners={'choi-doan':'A','lim-hyeongwoo':'B','yoon-yeondo':'C','kang-ryeoun':'D'};
const offline=process.argv.includes('--offline');
const idPattern=/^[A-Za-z0-9_-]{11}$/;
function extractId(value){
 let url;
 try{url=new URL(value)}catch{return null}
 if(!['https:','http:'].includes(url.protocol)||url.username||url.password||url.port)return null;
 const parts=url.pathname.split('/').filter(Boolean);
 let id=null;
 if(['youtu.be','www.youtu.be'].includes(url.hostname)&&parts.length===1)id=parts[0];
 else if(['youtube.com','www.youtube.com','m.youtube.com','music.youtube.com','youtube-nocookie.com','www.youtube-nocookie.com'].includes(url.hostname)){
  if(parts.length===1&&parts[0]==='watch'&&url.searchParams.getAll('v').length===1)id=url.searchParams.get('v');
  else if(parts.length===2&&['shorts','embed','live'].includes(parts[0]))id=parts[1];
 }
 return id&&idPattern.test(id)?id:null;
}
await Promise.all([mkdir(path.join(source,'oembed'),{recursive:true}),mkdir(path.join(root,'public/youtube/thumbnails'),{recursive:true}),mkdir(path.join(root,'src/youtube/data'),{recursive:true})]);
async function get(url){
 const {stdout}=await execute('curl',['--fail','--silent','--show-error','--location','--retry','0','--connect-timeout','10','--max-time','15',url],{encoding:'buffer',maxBuffer:8*1024*1024});
 return stdout;
}
const report=[];
for(const [characterId,letter] of Object.entries(owners)){
 const videos=await Promise.all([...input.characters[characterId].videos].sort((a,b)=>a.order-b.order).map(async item=>{
  if(!idPattern.test(item.videoId)||extractId(item.originalUrl)!==item.videoId)throw new Error('Original URL and video ID disagree: '+item.id);
  if(item.watchUrl&&extractId(item.watchUrl)!==item.videoId)throw new Error('Watch URL and video ID disagree: '+item.id);
  const result={id:item.id,videoId:item.videoId,originalUrl:item.originalUrl,title:typeof item.title==='string'?item.title:null,channel:null,thumbnailUrl:item.thumbnailUrl,order:item.order};
  const note={videoId:item.videoId,metadata:'unverified',titleSource:result.title?'user-provided-unverified':'unavailable',channelSource:'unavailable',thumbnail:'remote-unverified'};
  if(offline){
   note.metadataError='No official response obtained. Environment proxy rejected the official www.youtube.com/oembed endpoint with HTTP CONNECT 403; further network requests stopped.';
   note.thumbnailError='Not downloaded or verified; original user-supplied YouTube thumbnail URL preserved.';
   report.push(note);
   return result;
  }
  try{
   const endpoint=new URL('https://www.youtube.com/oembed');
   endpoint.searchParams.set('url',`https://www.youtube.com/watch?v=${item.videoId}`);
   endpoint.searchParams.set('format','json');
   const raw=await get(endpoint.href);
   const data=JSON.parse(raw.toString('utf8'));
   if(data.provider_name!=='YouTube'||typeof data.title!=='string'||typeof data.author_name!=='string')throw new Error('Incomplete official oEmbed response');
   if(data.html&&!data.html.includes('/embed/'+item.videoId))throw new Error('Official response has a different video ID');
   await writeFile(path.join(source,'oembed',item.videoId+'.json'),raw);
   result.title=data.title;
   result.channel=data.author_name;
   if(typeof data.thumbnail_url==='string')result.thumbnailUrl=data.thumbnail_url;
   note.metadata='verified';
   note.titleSource='YouTube official oEmbed';
   note.channelSource='YouTube official oEmbed';
   note.title=data.title;
   note.channel=data.author_name;
  }catch(error){note.metadataError=String(error.message).slice(0,400)}
  try{
   const image=await get(result.thumbnailUrl);
   if(image[0]!==0xff||image[1]!==0xd8)throw new Error('Thumbnail response is not a JPEG');
   await writeFile(path.join(root,'public/youtube/thumbnails',item.videoId+'.jpg'),image);
   result.thumbnailSrc='/youtube/thumbnails/'+item.videoId+'.jpg';
   note.thumbnail='cached-original';
   note.thumbnailBytes=image.length;
  }catch(error){note.thumbnailError=String(error.message).slice(0,400)}
  report.push(note);
  return result;
 }));
 const output="import type {HistoryVideo} from '../types';\n\n// User-selected links. See source/metadata-verification.json for field provenance.\nconst videos: readonly HistoryVideo[] = "+JSON.stringify(videos,null,2)+";\n\nexport default videos;\n";
 await writeFile(path.join(root,'src/youtube/data',letter+'.ts'),output);
}
await writeFile(path.join(source,'metadata-verification.json'),JSON.stringify({method:'YouTube official oEmbed',endpoint:'https://www.youtube.com/oembed',mode:offline?'offline-after-environment-proxy-denial':'official-network-refresh',checkedAt:new Date().toISOString(),videos:report},null,2)+'\n');
console.log(JSON.stringify(report,null,2));
