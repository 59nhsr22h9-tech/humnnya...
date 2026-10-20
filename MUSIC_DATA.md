# 음악 목록

- `src/music/data/A.ts`, `B.ts`, `C.ts`, `D.ts`: 인물별 독립된 고정 목록. 현재 A 최도안 13곡, B 임형우 9곡, C 윤연도 18곡, D 강려운 10곡이 포함됩니다.
- 배열에 적힌 순서가 화면과 자동 다음 곡 순서입니다. 아티스트는 파일 내 정보 및 사용자 지정값(SHINee)을 사용합니다.
- 각 곡: `{id, title, artist, audioSrc, coverImage}`. `public/audio/a/01.mp3`~`13.mp3`, `public/audio/b/01.mp3`~`09.mp3`, `public/audio/c/01.mp3`~`18.mp3`, `public/audio/d/01.mp3`~`10.mp3`는 첨부된 원본과 동일합니다.
- 목록은 고정 데이터로 빌드에 포함됩니다. 방문자용 업로드, 편집, 삭제 화면은 없습니다.
- `src/music/player.ts`: 단일 오디오 재생, 일시정지/이어 듣기, 이전·다음 곡, 진행 시간·탐색, 자동 다음 곡, 오류 처리.
- `useMusicPlayer.ts`: 휴대전화가 유지되는 동안 재생 유지. 다른 앱, 홈, 잠금 화면으로 이동해도 재생됩니다. 인물을 바꾸면 이전 폰의 재생을 종료합니다.
- `MusicContent.tsx`: 제목·아티스트만 표시하는 노래 목록과 Now Playing 재생 화면. 곡 선택 시 재생 화면으로 이동합니다.
- 마지막 곡이 끝나면 정지합니다. 브라우저를 새로고침하면 음악은 자동 재생하지 않습니다.
- 확인: `npm run test:music`, `npm run build`.

## 앨범 커버
모든 곡에 `coverImage`를 지원하며 현재는 임시 기본 이미지 `/covers/default.svg`를 사용합니다. 실제 커버를 제공하면 곡의 `coverImage`에 연결하거나 `src/music/covers.ts`의 `COVER_CATALOG`에 `coverKey(artist,title)` 키로 등록하면 자동 연결됩니다. 찾지 못하거나 이미지 로드에 실패하면 기본 커버를 표시합니다.
