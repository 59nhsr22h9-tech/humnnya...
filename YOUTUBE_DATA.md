# YouTube 시청기록

기존 YouTube 앱에 읽기 전용 시청기록과 스마트폰 내부 플레이어를 연결했습니다. 최도안 3개, 임형우 3개, 윤연도 2개, 강려운 3개이며, 원본 JSON의 영상 ID·원본 URL·목록 순서를 보존합니다. 시청 날짜·조회수·길이를 생성하지 않습니다.

- `src/youtube/source/character_youtube_history.json`: 첨부 원본 파일.
- `src/youtube/data/A.ts` ~ `D.ts`: 각 인물의 독립 정적 목록. `HistoryVideo`의 title/channel/thumbnailUrl/thumbnailSrc를 지원합니다.
- `src/youtube/source/metadata-verification.json`: 공식 메타데이터 조회 결과와 필드 출처.
- `src/youtube/urls.ts`: watch/youtu.be/shorts/embed/live 링크의 ID 추출, 공식 임베드 URL 생성.
- `YouTubeContent.tsx`, `youtube.css`: 스크롤 가능한 기록 목록과 선택 영상 화면.
- `YouTubePlayer.tsx`, `iframeApi.ts`: 공식 YouTube IFrame API, 16:9 인라인 플레이어와 음량 슬라이더. 공식 컨트롤로 재생·일시정지·탐색합니다. 뒤로 가기·홈·잠금·인물 전환 시 플레이어를 정지·제거합니다. 외부 재생 금지/비공개/연결 오류에는 재시도와 원본 영상 링크를 표시합니다.
- `useVideoMetadata.ts`: 브라우저에서 공식 YouTube oEmbed 메타데이터를 조회합니다. 성공한 title/author_name/thumbnail_url만 메모리에 반영하며 시청기록의 ID·순서는 바꾸지 않습니다. 방문자의 수정·추가·삭제 기능은 없습니다.

## 현재 메타데이터 확인 범위

작업 환경 프록시가 `www.youtube.com`과 `i.ytimg.com`에 HTTP CONNECT 403을 반환하여 공식 제목·채널과 실제 썸네일 응답을 확인하지 못했습니다. 제공된 제목 4개는 보존했고, 제공되지 않은 제목 7개와 채널명은 `null`입니다. 화면은 미확인 정보를 명시하며, 썸네일은 원본 JSON의 실제 YouTube 주소를 사용하고 로딩 실패 시 빈 미리보기 안내로 대체합니다. 임의의 제목·채널·사진을 넣지 않았습니다.

공식 조회가 허용된 개발 환경에서 다음 명령으로 정적 제목·채널·썸네일을 갱신한 후 다시 빌드·배포할 수 있습니다. 브라우저 조회 역시 해당 환경의 YouTube 접근 및 CORS 허용 여부에 따라 실패할 수 있으며 이 경우 제공 정보만 유지합니다.

```sh
node scripts/refresh-youtube-metadata.mjs
npm run test:youtube
npm run build
```

스크립트는 공식 oEmbed 응답만 사용하고 원본 URL과 영상 ID 일치를 검증합니다. 원본 JSON을 보존한 상태로 생성 데이터를 갱신하며, 썸네일 다운로드에 성공하면 원본 JPEG를 `public/youtube/thumbnails/`에 저장합니다.
