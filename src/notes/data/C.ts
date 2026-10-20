import type {NoteRecord} from '../types';

// Original author-supplied notes; preserve text, whitespace, dates and pinned state.
const notes: readonly NoteRecord[] = [
  {
    "id": "yoon-yeondo-note-016",
    "title": "그림 목록",
    "body": "1. 첫 번째 그림: 보관\n2. 두 번째 그림: 보관\n3. 세 번째 그림:\n\n세 번째는 제목을 정하지 않음.",
    "createdAt": "2026-10-17T22:38:00+09:00",
    "updatedAt": "2026-10-17T22:38:00+09:00",
    "pinned": false
  },
  {
    "id": "yoon-yeondo-note-015",
    "title": "수납장",
    "body": "열쇠 확인.\n작업물은 잠금장치 있는 서랍에.\n새 종이는 바닥에 두지 말 것.",
    "createdAt": "2026-10-06T18:21:00+09:00",
    "updatedAt": "2026-10-06T18:21:00+09:00",
    "pinned": true
  },
  {
    "id": "yoon-yeondo-note-014",
    "title": "자료실",
    "body": "요청한 자료 확인.\n빠진 페이지 없음.\n\n열어 보지 않을 것.",
    "createdAt": "2026-09-23T21:05:00+09:00",
    "updatedAt": "2026-09-23T21:05:00+09:00",
    "pinned": false
  },
  {
    "id": "yoon-yeondo-note-013",
    "title": "낯익은 표지",
    "body": "교무실에서 본 책.\n러시아어 제목.\n전시 도록.\n\n오래전에 보았다.",
    "createdAt": "2026-09-16T23:07:00+09:00",
    "updatedAt": "2026-09-16T23:07:00+09:00",
    "pinned": false
  },
  {
    "id": "yoon-yeondo-note-012",
    "title": "제출함",
    "body": "강려운 학생: 미술실 문 옆 제출함.\n내일 확인.",
    "createdAt": "2026-09-09T18:22:00+09:00",
    "updatedAt": "2026-09-09T18:22:00+09:00",
    "pinned": false
  },
  {
    "id": "yoon-yeondo-note-011",
    "title": "화방",
    "body": "목탄 추가 주문.\n종이는 표면 확인 후 결정.\n색보다 두께.",
    "createdAt": "2026-08-25T19:44:00+09:00",
    "updatedAt": "2026-08-25T19:44:00+09:00",
    "pinned": false
  },
  {
    "id": "yoon-yeondo-note-010",
    "title": "도록",
    "body": "버리지 않았다.\n찾지 않았다.\n\n둘은 다르다.",
    "createdAt": "2026-07-20T21:26:00+09:00",
    "updatedAt": "2026-07-20T21:26:00+09:00",
    "pinned": false
  },
  {
    "id": "yoon-yeondo-note-009",
    "title": "말아 둔 종이",
    "body": "앞쪽 두 개는 완성본.\n뒤쪽 세 개는 연습.\n습기 확인.\n\n펴 보지 말 것.",
    "createdAt": "2026-07-09T18:03:00+09:00",
    "updatedAt": "2026-07-09T18:03:00+09:00",
    "pinned": false
  },
  {
    "id": "yoon-yeondo-note-008",
    "title": "과제 안내",
    "body": "그림을 설명하는 문장 2~3개.\n평가 항목 외의 이야기는 요구하지 않는다.\n\n빈칸은 빈칸으로 남겨 둘 수 있다.",
    "createdAt": "2026-06-16T17:47:00+09:00",
    "updatedAt": "2026-06-16T17:47:00+09:00",
    "pinned": false
  },
  {
    "id": "yoon-yeondo-note-007",
    "title": "모서리",
    "body": "한쪽은 지나치게 어둡다.\n지우지 말 것.\n\n다시 그릴 이유도 없다.",
    "createdAt": "2026-06-03T23:19:00+09:00",
    "updatedAt": "2026-06-03T23:19:00+09:00",
    "pinned": false
  },
  {
    "id": "yoon-yeondo-note-006",
    "title": "설명문",
    "body": "작품명: 미정\n재료: 목탄, 종이\n제작 연도:\n설명:",
    "createdAt": "2026-05-21T20:14:00+09:00",
    "updatedAt": "2026-05-21T20:14:00+09:00",
    "pinned": false
  },
  {
    "id": "yoon-yeondo-note-005",
    "title": "학교 전시",
    "body": "작품 크기 재기.\n압정 대신 테이프.\n설명문 초안 삭제.\n\n벽을 먼저 확인할 것.",
    "createdAt": "2026-05-08T19:11:00+09:00",
    "updatedAt": "2026-05-08T19:11:00+09:00",
    "pinned": false
  },
  {
    "id": "yoon-yeondo-note-004",
    "title": "스케치북",
    "body": "강려운 학생 것.\n미술실 수납장 위.\n\n내일 전달.",
    "createdAt": "2026-04-17T18:16:00+09:00",
    "updatedAt": "2026-04-17T18:16:00+09:00",
    "pinned": false
  },
  {
    "id": "yoon-yeondo-note-003",
    "title": "종이",
    "body": "쉽게 접히는 종이.\n잘 펴지지 않는 종이.\n\n어느 쪽이든 자국은 남는다.",
    "createdAt": "2026-03-27T22:18:00+09:00",
    "updatedAt": "2026-03-27T22:18:00+09:00",
    "pinned": false
  },
  {
    "id": "yoon-yeondo-note-002",
    "title": "자료",
    "body": "1학년 수업 자료: 책상 왼쪽.\n이름 없는 종이는 따로 보관.",
    "createdAt": "2026-03-11T16:40:00+09:00",
    "updatedAt": "2026-03-11T16:40:00+09:00",
    "pinned": false
  },
  {
    "id": "yoon-yeondo-note-001",
    "title": "미술실",
    "body": "목탄 14개\n지우개 6개\n마스킹테이프 부족\n압정 교체\n\n오른쪽 선반 정리.",
    "createdAt": "2026-02-28T16:32:00+09:00",
    "updatedAt": "2026-02-28T16:32:00+09:00",
    "pinned": true
  }
];

export default notes;
