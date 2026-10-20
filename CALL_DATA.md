# 통화 기록

기존 전화 앱에 첨부한 108개 기록을 읽기 전용으로 연결했습니다. 최도안 29건, 임형우 26건, 윤연도 24건, 강려운 29건입니다. 원본의 연락처 이름·ID·timestamp·direction·status·durationSeconds·sharedCallId를 보존합니다.

- `src/calls/source/all_character_call_logs.json`: 첨부 원본 파일.
- `src/calls/data/A.ts` ~ `D.ts`: 인물별 독립 정적 데이터. 다른 인물의 기록과 합치지 않습니다.
- `src/calls/library.ts`: 해당 인물의 기록만 선택해 timestamp의 실제 시각 기준 내림차순으로 반환합니다. 정렬 과정에서 원본 배열을 변경하지 않습니다.
- `src/calls/format.ts`: 원본에 적힌 시간대의 날짜·시각을 유지하는 표시 함수와 통화 길이·상태 표시. 방문자의 시간대로 바꾸거나 상대 날짜를 만들지 않습니다.
- `src/calls/CallContent.tsx`, `calls.css`: iOS 최근 통화 / Galaxy One UI 최근기록 화면, 부재중 필터, 개별 통화 상세 정보. 부재중은 붉은색이며 발신 응답 없음과 구분합니다.
- `scripts/test-calls.mjs`: 원본과 생성 데이터 비교, 인물별 건수, 공유 통화 17쌍의 날짜·시간·길이·방향·상대 일치 및 표시 함수 검증.

`unanswered`는 전화를 걸었지만 상대가 받지 않은 경우이며, `durationSeconds`는 연결된 통화의 길이입니다. 원본의 0초도 그대로 표시합니다. 전화번호를 생성하지 않으며 실제 전화 걸기·업로드·추가·수정·삭제 기능은 없습니다.

```sh
npm run test:calls
npm run build
```
