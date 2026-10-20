import {useRef, useState} from 'react';
import {ChevronLeft, Play} from 'lucide-react';
import type {HistoryVideo} from './types';
import YouTubePlayer from './YouTubePlayer';
import useVideoMetadata from './useVideoMetadata';
import './youtube.css';

function Thumbnail({video}: {video: HistoryVideo}) {
  const [failed, setFailed] = useState(false);
  return <span className="yt-thumbnail">{failed
    ? <span className="yt-thumbnail-missing"><Play size={22}/><span>미리보기 없음</span></span>
    : <img src={video.thumbnailSrc || video.thumbnailUrl} alt="" loading="lazy" decoding="async" onError={() => setFailed(true)}/>}</span>;
}

export default function YouTubeContent({videos}: {videos: readonly HistoryVideo[]}) {
  const resolved = useVideoMetadata(videos);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = resolved.find(video => video.id === selectedId);
  const list = useRef<HTMLDivElement>(null);
  const scroll = useRef(0);
  const lastSelected = useRef<string | null>(null);
  const heading = useRef<HTMLButtonElement>(null);
  const open = (video: HistoryVideo) => {
    scroll.current = list.current?.scrollTop || 0;
    lastSelected.current = video.id;
    setSelectedId(video.id);
    requestAnimationFrame(() => heading.current?.focus());
  };
  const back = () => {
    setSelectedId(null);
    requestAnimationFrame(() => {
      if (list.current) {
        list.current.scrollTop = scroll.current;
        const row = [...list.current.querySelectorAll<HTMLButtonElement>('button[data-video]')].find(b => b.dataset.video === lastSelected.current);
        row?.focus({preventScroll: true});
      }
    });
  };
  return <section className="yt-app" aria-label="YouTube">
    {selected ? <>
      <div className="yt-watch-bar"><button ref={heading} onClick={back} className="yt-history-back"><ChevronLeft size={18}/>기록</button><span>YouTube</span></div>
      <div className="yt-watch-scroll">
        <YouTubePlayer key={selected.id} video={selected}/>
        <div className="yt-watch-details"><h2>{selected.title || '제목을 확인할 수 없는 영상'}</h2><p>{selected.channel || '채널 정보 미확인'}</p></div>
      </div>
    </> : <>
      <div className="yt-brand"><span><Play size={13} fill="white" strokeWidth={0}/></span>YouTube</div>
      <h2 className="yt-history-title">기록</h2>
      <div className="yt-history-list" ref={list}>
        {resolved.map(video => <button key={video.id} data-video={video.id} className="yt-history-row" onClick={() => open(video)} aria-label={(video.title || '제목을 확인할 수 없는 영상') + ' 재생'}>
          <Thumbnail video={video}/><span className="yt-video-label"><strong>{video.title || '제목을 확인할 수 없는 영상'}</strong><span>{video.channel || '채널 정보 미확인'}</span></span>
        </button>)}
        {videos.length === 0 && <p className="yt-empty">시청 기록이 없습니다.</p>}
      </div>
    </>}
  </section>;
}
