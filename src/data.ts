export type AppId='music'|'messages'|'youtube'|'notes'|'phone'|'photos'|'settings';
export type Widget={type:'weather'|'music'|'photos'|'calendar';col:number;row:number;width:number;height:number};
export type Person={id:string;name:string;role:string;model:string;device:'mini'|'iphone'|'galaxy'|'concept';wallpaper:string;city:string;temp:number;apps:AppId[];dock:AppId[];widgets:Widget[];data:Record<Exclude<AppId,'messages'|'settings'>,unknown[]>};
const data=():Record<Exclude<AppId,'messages'|'settings'>,unknown[]>=>({music:[],youtube:[],notes:[],phone:[],photos:[]});
const weather=():Widget=>({type:'weather',col:1,row:1,width:2,height:2});
export const people:Person[]=[
{id:'A',name:'최도안',role:'필름에 하루를 담는 사람',model:'iPhone 13 mini',device:'mini',wallpaper:'wallpaper-a',city:'서초구 서초동',temp:14,apps:['photos','music','messages','youtube','notes','phone','settings'],dock:['phone','messages','music'],widgets:[weather()],data:data()},
{id:'B',name:'임형우',role:'음악과 함께 걷는 사람',model:'iPhone 15',device:'iphone',wallpaper:'wallpaper-b',city:'서대문구 연희동',temp:19,apps:['music','youtube','notes','photos','messages','phone','settings'],dock:['phone','music','messages'],widgets:[weather()],data:data()},
{id:'C',name:'윤연도',role:'새로운 영감을 모으는 사람',model:'Samsung Galaxy S25',device:'galaxy',wallpaper:'wallpaper-c',city:'서대문구 연희동',temp:21,apps:['notes','photos','youtube','messages','music','phone','settings'],dock:['phone','messages','photos'],widgets:[weather()],data:data()},
{id:'D',name:'강려운',role:'다음 장면을 상상하는 사람',model:'iPhone 18 Pro',device:'concept',wallpaper:'wallpaper-d',city:'서대문구 홍은2동',temp:14,apps:['notes','music','photos','youtube','phone','messages','settings'],dock:['phone','messages','music'],widgets:[weather()],data:data()}
];
export const appNames:Record<AppId,string>={music:'음악',messages:'메시지',youtube:'YouTube',notes:'메모',phone:'전화',photos:'사진',settings:'설정'};
