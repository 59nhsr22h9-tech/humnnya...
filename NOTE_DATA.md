# 메모 데이터

첨부한 66개 메모를 기존 메모 앱에 읽기 전용으로 연결했습니다. 최도안·임형우·윤연도는 각각 16개, 강려운은 18개입니다. 제목·본문·createdAt·updatedAt·pinned를 원본 그대로 보존합니다.

- `src/notes/source/character_notes_for_codex.json`: 첨부 원본 파일을 바이트 그대로 보관합니다.
- `src/notes/data/A.ts` ~ `D.ts`: 인물별 독립 정적 목록입니다.
- `src/notes/library.ts`, `format.ts`: 해당 인물의 메모만 선택하고, 고정 메모 우선·그룹 안에서 최근 수정순으로 정렬합니다. 원본 배열은 변경하지 않으며, 날짜는 JSON의 지정에 따라 Asia/Seoul로 표시합니다.
- `src/notes/NoteContent.tsx`, `notes.css`: iOS 메모 / One UI 노트 목록과 전체 본문 화면입니다. 제목에 인물 이름을 붙이지 않습니다.
- `scripts/test-notes.mjs`: 원본과 생성 데이터·UTF-8 본문·빈줄·공백·날짜·고정 상태 및 정렬을 검증합니다.

본문은 Markdown이나 HTML로 변환하지 않고 React 텍스트로 표시합니다. `white-space: break-spaces`로 원본 공백·탭·빈줄·줄바꿈을 보존하며 화면 너비에 맞춰 줄을 감쌉니다. 생성·편집·삭제·고정 상태 변경 기능은 없습니다. 상세 화면에서 뒤로 가면 같은 목록 위치로 돌아옵니다.

```sh
npm run test:notes
npm run build
```
