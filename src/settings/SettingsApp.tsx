import {useRef,useState} from 'react';
import {Accessibility,ArrowLeft,BatteryFull,Bell,Bluetooth,ChevronRight,ChevronDown,Cloud,ContactRound,Globe,Info,Keyboard,LockKeyhole,Monitor,Plane,Search,Settings,ShieldCheck,Smartphone,Sparkles,Sun,UserRound,Volume2,Wallpaper,Wifi,X, type LucideIcon} from 'lucide-react';
import {getSettingsProfile,type SettingsProfile} from './data';
import './settings.css';
type PageId='account'|'suggestions'|'airplane'|'wifi'|'bluetooth'|'battery'|'general'|'accessibility'|'display'|'wallpaper'|'connections'|'sound'|'notifications'|'features'|'deviceInfo'|'keyboard'|'language'|'datetime'|'storage'|'about';
type MenuItem={id:PageId;label:string;icon:LucideIcon;color:string;value?:(p:SettingsProfile)=>string;badge?:(p:SettingsProfile)=>number;detail?:string;toggle?:(p:SettingsProfile)=>boolean};
const entries:Record<string,MenuItem>={
 airplane:{id:'airplane',label:'에어플레인 모드',icon:Plane,color:'#f4a02d',toggle:p=>p.airplaneMode},
 wifi:{id:'wifi',label:'Wi-Fi',icon:Wifi,color:'#3983f5',value:p=>p.wifiName??'연결 안 됨'},
 bluetooth:{id:'bluetooth',label:'Bluetooth',icon:Bluetooth,color:'#3983f5',value:p=>p.bluetoothEnabled?'켬':'끔'},
 battery:{id:'battery',label:'배터리',icon:BatteryFull,color:'#43ad69',value:p=>`${p.batteryPercent}%`},
 general:{id:'general',label:'일반',icon:Settings,color:'#8e929b',badge:p=>p.generalBadge},
 accessibility:{id:'accessibility',label:'손쉬운 사용',icon:Accessibility,color:'#4084ee'},
 display:{id:'display',label:'디스플레이 및 밝기',icon:Sun,color:'#4188f4'},
 wallpaper:{id:'wallpaper',label:'배경화면',icon:Wallpaper,color:'#65abb4'},
 connections:{id:'connections',label:'연결',icon:Wifi,color:'#407dec',detail:'Wi-Fi · Bluetooth · 비행기 탑승 모드'},
 sound:{id:'sound',label:'소리 및 진동',icon:Volume2,color:'#8d6ed1',detail:'소리 모드 · 벨소리'},
 notifications:{id:'notifications',label:'알림',icon:Bell,color:'#dc7f54',detail:'앱 알림 · 잠금화면 알림'},
 features:{id:'features',label:'유용한 기능',icon:Sparkles,color:'#dda645',detail:'모션 및 제스처'},
 deviceInfo:{id:'deviceInfo',label:'휴대전화 정보',icon:Info,color:'#8a929c'},
};
const iosGroups:MenuItem[][]=[['airplane','wifi','bluetooth','battery'].map(k=>entries[k]),['general','accessibility','display','wallpaper'].map(k=>entries[k])];
const galaxyGroups:MenuItem[][]=[['connections','sound','notifications'].map(k=>entries[k]),[
 {...entries.display,label:'디스플레이',detail:'밝기 · 화면 모드'},
 {...entries.wallpaper,label:'배경화면 및 스타일',detail:'배경화면 · 컬러 팔레트'},
 {...entries.battery,detail:'배터리 사용량'}],
 [entries.features,{...entries.accessibility,label:'접근성',detail:'시각 · 청각 보조'},{...entries.general,label:'일반 관리',detail:'언어 · 키보드 · 날짜 및 시간'},entries.deviceInfo]];
function Badge({count}:{count:number}){return count>0?<span className="settings-badge" aria-label={`알림 ${count}개`}>{count}</span>:null}
function StaticSwitch({checked,label}:{checked:boolean;label:string}){return <span className={'settings-switch'+(checked?' on':'')} role="img" aria-label={`${label}: ${checked?'켬':'끔'}`}><i/></span>}
function MenuRow({item,profile,open,oneUI}:{item:MenuItem;profile:SettingsProfile;open:(id:PageId)=>void;oneUI:boolean}){
 const Icon=item.icon;
 return <button className="settings-row" onClick={()=>open(item.id)}><span className="settings-menu-icon" style={{background:item.color,color:oneUI?item.color:undefined}}><Icon size={16} strokeWidth={1.9}/></span><span className="settings-row-copy"><span>{item.label}</span>{oneUI&&item.detail&&<small>{item.detail}</small>}</span><span className="settings-row-end">{item.badge&&<Badge count={item.badge(profile)}/>} {item.toggle?<StaticSwitch checked={item.toggle(profile)} label={item.label}/>:<>{item.value&&<span className="settings-row-value">{item.value(profile)}</span>}<ChevronRight size={12}/></>}</span></button>
}
type DetailRow={label:string;value?:string;toggle?:boolean;target?:PageId};
function detailRows(page:PageId,p:SettingsProfile,oneUI:boolean):DetailRow[]{
 switch(page){
 case 'account':return [{label:'이름',value:p.characterName},{label:'기기',value:p.deviceModel},{label:oneUI?'Samsung account':'Apple 계정',value:p.characterName},{label:oneUI?'계정 및 백업':'iCloud',value:'사용 중'},{label:'로그인 및 보안',value:'보호됨'}];
 case 'suggestions':return [{label:oneUI?'계정 알림':'Apple 계정 제안',value:`${p.accountSuggestionsBadge}개`},{label:'계정 상태',value:p.accountSuggestionsBadge?'확인할 제안 있음':'최신 상태'}];
 case 'airplane':return [{label:oneUI?'비행기 탑승 모드':'에어플레인 모드',toggle:p.airplaneMode}];
 case 'wifi':return [{label:'Wi-Fi',toggle:!!p.wifiName},{label:'연결된 네트워크',value:p.wifiName??'연결 안 됨'},{label:'자동 연결',value:p.wifiName?'켬':'끔'}];
 case 'bluetooth':return [{label:'Bluetooth',toggle:p.bluetoothEnabled},{label:'기기 이름',value:`${p.characterName}의 ${p.deviceModel}`},{label:'연결 상태',value:p.bluetoothEnabled?'켬':'끔'}];
 case 'battery':return [{label:'배터리 잔량',value:`${p.batteryPercent}%`},{label:oneUI?'절전 모드':'저전력 모드',toggle:false},{label:'충전 상태',value:'충전 중이 아님'}];
 case 'general':return [{label:oneUI?'휴대전화 정보':'정보',target:'deviceInfo'},{label:'언어 및 지역',target:'language'},{label:'날짜 및 시간',target:'datetime'},{label:'키보드',target:'keyboard'},...(!oneUI?[{label:'iPhone 저장 공간',target:'storage' as const}]:[])];
 case 'deviceInfo':return [{label:'이름',value:`${p.characterName}의 ${p.deviceModel}`},{label:'모델명',value:p.deviceModel},{label:'계정 이름',value:p.characterName}];
 case 'accessibility':return [{label:oneUI?'TalkBack':'VoiceOver',toggle:false},{label:'확대',toggle:false},{label:'텍스트 크기',value:p.textSize},{label:'동작 줄이기',toggle:false},{label:'오디오 및 시각 효과',value:'기본'}];
 case 'display':return [{label:'화면 스타일',value:p.theme},{label:'밝기',value:`${p.brightnessPercent}%`},{label:'자동 밝기',toggle:true},{label:'텍스트 크기',value:p.textSize},{label:oneUI?'편안하게 화면 보기':'Night Shift',toggle:false}];
 case 'wallpaper':return [{label:'현재 배경화면',value:p.wallpaperName},{label:'적용 화면',value:'잠금 화면 및 홈 화면'}];
 case 'connections':return [{label:'Wi-Fi',value:p.wifiName??'연결 안 됨',target:'wifi'},{label:'Bluetooth',value:p.bluetoothEnabled?'켬':'끔',target:'bluetooth'},{label:'비행기 탑승 모드',target:'airplane'},{label:'모바일 네트워크',value:'사용 가능'},{label:'모바일 핫스팟',value:'끔'}];
 case 'sound':return [{label:'소리 모드',value:'소리'},{label:'벨소리',value:p.ringtone},{label:'진동',value:'기본'},{label:'시스템 소리',value:'기본'}];
 case 'notifications':return [{label:'앱 알림',value:'허용'},{label:'잠금화면 알림',value:'아이콘만 표시'},{label:'방해 금지',toggle:false}];
 case 'features':return [{label:'모션 및 제스처',value:'기본'},{label:'한 손 조작 모드',toggle:false},{label:'화면 캡처',value:'사용 가능'}];
 case 'keyboard':return [{label:'키보드',value:oneUI?'삼성 키보드':'한국어 · 영어'},{label:'자동 수정',toggle:true},{label:'자동 완성',toggle:true}];
 case 'language':return [{label:'언어',value:'한국어'},{label:'지역',value:'대한민국'}];
 case 'datetime':return [{label:'자동으로 설정',toggle:true},{label:'시간대',value:'서울'}];
 case 'storage':return [{label:'저장 공간',value:'기기 내 콘텐츠'},{label:'관리 상태',value:'읽기 전용'}];
 default:return [];
 }
}
const pageTitles:Partial<Record<PageId,string>>={account:'계정',suggestions:'계정 제안',airplane:'에어플레인 모드',wifi:'Wi-Fi',bluetooth:'Bluetooth',battery:'배터리',general:'일반',accessibility:'손쉬운 사용',display:'디스플레이 및 밝기',wallpaper:'배경화면',connections:'연결',sound:'소리 및 진동',notifications:'알림',features:'유용한 기능',deviceInfo:'정보',keyboard:'키보드',language:'언어 및 지역',datetime:'날짜 및 시간',storage:'iPhone 저장 공간'};
export default function SettingsApp({owner,oneUI}:{owner:string;oneUI:boolean}){
 const profile=getSettingsProfile(owner);
 const [stack,setStack]=useState<PageId[]>([]);
 const [query,setQuery]=useState('');
 const scroll=useRef<HTMLDivElement>(null);
 const page=stack[stack.length-1];
 const open=(id:PageId)=>{setStack(s=>[...s,id]);scroll.current?.scrollTo({top:0})};
 const back=()=>{setStack(s=>s.slice(0,-1));scroll.current?.scrollTo({top:0})};
 const title=page?(oneUI&&page==='general'?'일반 관리':oneUI&&page==='accessibility'?'접근성':oneUI&&page==='display'?'디스플레이':oneUI&&page==='wallpaper'?'배경화면 및 스타일':oneUI&&page==='airplane'?'비행기 탑승 모드':pageTitles[page]):'설정';
 const groups=oneUI?galaxyGroups:iosGroups;
 const filteredGroups=groups.map(g=>g.filter(item=>(item.label+' '+(item.detail??'')).toLowerCase().includes(query.toLowerCase().trim()))).filter(g=>g.length);
 return <section className={'settings-app '+(oneUI?'settings-oneui':'settings-ios')} aria-label={oneUI?'One UI 설정':'iOS 설정'}>
  {page&&<button className="settings-back" onClick={back}><ArrowLeft size={14}/>{stack.length===1?'설정':'뒤로'}</button>}
  <div className="settings-scroll" ref={scroll}>
   <h2 className={page?'settings-page-title':'settings-main-title'}>{title}</h2>
   {!page?<>
    <label className="settings-search"><Search size={13}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="검색" aria-label="설정 검색"/>{query&&<button aria-label="검색 지우기" onClick={()=>setQuery('')}><X size={12}/></button>}</label>
    {!query.trim()&&<div className="settings-group settings-account-group"><button className="settings-account" onClick={()=>open('account')}><span className="settings-avatar"><UserRound size={26} strokeWidth={1.5}/></span><span className="settings-account-copy"><strong>{profile.characterName}</strong><small>{profile.accountSubtitle}</small></span><ChevronRight size={13}/></button>{profile.accountSuggestionsBadge>0&&<button className="settings-suggestion" onClick={()=>open('suggestions')}><span>{oneUI?'계정 알림':'Apple 계정 제안'}</span><Badge count={profile.accountSuggestionsBadge}/><ChevronRight size={12}/></button>}</div>}
    {filteredGroups.map((group,index)=><div className="settings-group" key={index}>{group.map(item=><MenuRow key={item.id} item={item} profile={profile} open={open} oneUI={oneUI}/>)}</div>)}
    {!filteredGroups.length&&<p className="settings-empty">검색 결과가 없습니다.</p>}
   </>:<>
    <div className="settings-group settings-detail-group">{detailRows(page,profile,oneUI).map(row=>row.target?<button key={row.label} className="settings-detail-row" onClick={()=>open(row.target!)}><span>{row.label}</span><span className="settings-detail-value">{row.value}<ChevronRight size={12}/></span></button>:<div key={row.label} className="settings-detail-row"><span>{row.label}</span>{row.toggle!==undefined?<StaticSwitch checked={row.toggle} label={row.label}/>:<span className="settings-detail-value">{row.value}</span>}</div>)}</div>
    {page==='display'&&<div className="settings-brightness" aria-label={`밝기 ${profile.brightnessPercent}%`}><Sun size={14}/><span><i style={{width:`${profile.brightnessPercent}%`}}/></span><Sun size={19}/></div>}
    {page==='wallpaper'&&<div className={'settings-wallpaper-preview wallpaper-preview-'+owner.toLowerCase()} aria-label="현재 배경화면 미리보기"/>}
    <p className="settings-readonly">미리보기 설정입니다. 실제 기기 값은 변경되지 않습니다.</p>
   </>}
  </div>
 </section>
}
