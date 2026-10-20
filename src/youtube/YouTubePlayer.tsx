import {useEffect, useRef, useState} from 'react';
import {ExternalLink, RotateCcw, Volume2} from 'lucide-react';
import {loadYouTubeAPI, type YouTubePlayer as Player} from './iframeApi';
import {createYouTubeEmbedUrl} from './urls';
import type {HistoryVideo} from './types';

function errorMessage(code: number): string {
  if (code === 101 || code === 150) return '이 영상은 YouTube에서 외부 재생을 허용하지 않습니다.';
  if (code === 100) return '삭제되었거나 비공개로 전환되어 이 영상을 재생할 수 없습니다.';
  if (code === 153) return 'YouTube에서 이 사이트의 재생 요청을 확인하지 못했습니다.';
  return '이 영상을 여기서 재생할 수 없습니다. YouTube에서 확인해 주세요.';
}

export default function YouTubePlayer({video}: {video: HistoryVideo}) {
  const host = useRef<HTMLDivElement>(null);
  const activePlayer = useRef<Player | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const [volume, setVolume] = useState(100);

  useEffect(() => {
    const container = host.current;
    if (!container) return;
    let disposed = false;
    let player: Player | undefined;
    setError(null);
    setLoading(true);
    setAutoplayBlocked(false);
    // The iframe is owned by this effect so the API can safely remove it on destroy.
    const iframe = document.createElement('iframe');
    const url = new URL(createYouTubeEmbedUrl(video.videoId, window.location.origin));
    url.searchParams.set('autoplay', '1');
    url.searchParams.set('fs', '0');
    iframe.src = url.toString();
    iframe.title = video.title ? `${video.title} · YouTube 플레이어` : 'YouTube 영상 플레이어';
    iframe.allow = 'autoplay; encrypted-media; accelerometer; gyroscope';
    iframe.referrerPolicy = 'strict-origin-when-cross-origin';
    iframe.allowFullscreen = false;
    container.replaceChildren(iframe);
    const stop = () => {
      clearTimeout(readyTimeout);
      try { player?.pauseVideo(); } catch { /* The iframe may already be unavailable. */ }
      try { player?.destroy(); } catch { /* Removing the frame still stops its media. */ }
      player = undefined;
      activePlayer.current = undefined;
      iframe.src = 'about:blank';
      container.replaceChildren();
    };
    const readyTimeout = window.setTimeout(() => {
      if (disposed) return;
      setLoading(false);
      setError('YouTube 플레이어가 응답하지 않습니다. 잠시 후 다시 시도해 주세요.');
      stop();
    }, 25000);
    loadYouTubeAPI().then(api => {
      if (disposed) return;
      player = new api.Player(iframe, {events: {
        onReady: () => {
          if (disposed) return;
          clearTimeout(readyTimeout);
          setLoading(false);
          try { setVolume(player?.getVolume() ?? 100); } catch { /* Native controls remain available. */ }
        },
        onAutoplayBlocked: () => { if (!disposed) {clearTimeout(readyTimeout); setLoading(false); setAutoplayBlocked(true);} },
        onError: event => {
          if (disposed) return;
          setLoading(false);
          setError(errorMessage(event.data));
          stop();
        },
      }});
      activePlayer.current = player;
    }).catch(() => {
      if (disposed) return;
      setLoading(false);
      setError('YouTube 플레이어에 연결할 수 없습니다. 연결 상태를 확인한 뒤 다시 시도해 주세요.');
      stop();
    });
    return () => { disposed = true; stop(); };
  }, [video.videoId, attempt]);

  return <>
    <div className="yt-player-frame" aria-busy={loading}>
      <div className="yt-iframe-host" ref={host}/>
      {loading && !error && <span className="yt-loading" role="status">YouTube 연결 중…</span>}
      {error && <div className="yt-player-error"><span>재생할 수 없음</span></div>}
    </div>
    {autoplayBlocked && !error && <p className="yt-play-hint">영상의 재생 버튼을 눌러 시청하세요.</p>}
    {!error && <label className="yt-volume"><Volume2 size={13}/><span>음량</span><input aria-label="영상 음량" type="range" min="0" max="100" step="1" value={volume} disabled={loading} onChange={event => {
      const value = Number(event.target.value);
      setVolume(value);
      activePlayer.current?.setVolume(value);
    }}/></label>}
    {error && <div className="yt-error-message" role="alert"><p>{error}</p><div>
      <button onClick={() => setAttempt(n => n + 1)}><RotateCcw size={12}/>다시 시도</button>
      <a href={video.originalUrl} target="_blank" rel="noopener noreferrer">YouTube에서 보기 <ExternalLink size={12}/></a>
    </div></div>}
  </>;
}
