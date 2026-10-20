import type {NoteRecord} from '../types';

// Original author-supplied notes; preserve text, whitespace, dates and pinned state.
const notes: readonly NoteRecord[] = [
  {
    "id": "kang-ryeoun-note-018",
    "title": "말",
    "body": "괜찮냐고 물어보면 괜찮다고 대답하게 됨\n\n그래서 진짜 괜찮은지 생각할 시간이 없어짐\n\n내일은 그냥 수업 잘 듣자",
    "createdAt": "2026-10-18T23:29:00+09:00",
    "updatedAt": "2026-10-18T23:29:00+09:00",
    "pinned": false
  },
  {
    "id": "kang-ryeoun-note-017",
    "title": "내일",
    "body": "수학 문제집\n사회 프린트\n미술 물통\n친구한테 빌린 펜\n\n하나라도 까먹으면 진짜 귀찮아짐",
    "createdAt": "2026-10-13T22:06:00+09:00",
    "updatedAt": "2026-10-13T22:06:00+09:00",
    "pinned": false
  },
  {
    "id": "kang-ryeoun-note-016",
    "title": "전화",
    "body": "아빠한테 또 연락함\n못 받음\n\n내일은 연락이 오려나\n일단 폰 소리 켜 두기",
    "createdAt": "2026-09-27T22:08:00+09:00",
    "updatedAt": "2026-09-27T22:08:00+09:00",
    "pinned": false
  },
  {
    "id": "kang-ryeoun-note-015",
    "title": "영어 수행",
    "body": "가족 이야기 말고 책 이야기 해도 됨\n임쌤이 감점 없다고 하셨음\n\n아예 다른 주제로 바꾸자",
    "createdAt": "2026-09-07T20:38:00+09:00",
    "updatedAt": "2026-09-07T20:38:00+09:00",
    "pinned": false
  },
  {
    "id": "kang-ryeoun-note-014",
    "title": "아빠한테 물어볼 거",
    "body": "뉴스에 나온 얘기가 맞는지\n러시아에 다시 갈 수 있는지\n왜 자꾸 괜찮다고만 하는지\n\n전화 받으면 물어보기\n근데 첫 번째부터 물어봐도 되나",
    "createdAt": "2026-09-05T21:37:00+09:00",
    "updatedAt": "2026-09-05T21:37:00+09:00",
    "pinned": true
  },
  {
    "id": "kang-ryeoun-note-013",
    "title": "뉴스",
    "body": "아빠 이름 검색하지 말기\n\n근데 검색 안 하면 더 궁금함\n\n내가 뭘 알아야 하는지 모르겠다",
    "createdAt": "2026-09-02T23:12:00+09:00",
    "updatedAt": "2026-09-02T23:12:00+09:00",
    "pinned": false
  },
  {
    "id": "kang-ryeoun-note-012",
    "title": "옛날 사진",
    "body": "러시아 때 친구한테 거리 사진 부탁함\n단체사진 말고 그냥 거리\n\n그 길에 있던 가게 아직 있나",
    "createdAt": "2026-08-19T22:40:00+09:00",
    "updatedAt": "2026-08-19T22:40:00+09:00",
    "pinned": false
  },
  {
    "id": "kang-ryeoun-note-011",
    "title": "사진",
    "body": "창문 사진\n눈 왔던 길\n지도에 모스크바 표시된 거\n\n사진은 멀쩡한데 그때 기분이 잘 생각이 안 난다",
    "createdAt": "2026-08-08T23:19:00+09:00",
    "updatedAt": "2026-08-08T23:19:00+09:00",
    "pinned": false
  },
  {
    "id": "kang-ryeoun-note-010",
    "title": "방학",
    "body": "영어 과제\n미술 과제\n충전기 챙기기\n\n다 해 놓고 하루 정도는 그냥 아무것도 안 하고 싶다",
    "createdAt": "2026-07-16T21:53:00+09:00",
    "updatedAt": "2026-07-16T21:53:00+09:00",
    "pinned": false
  },
  {
    "id": "kang-ryeoun-note-009",
    "title": "그때 창문",
    "body": "러시아에 있을 때 창문이 두꺼웠다\n저녁 되면 건너편 집에 불이 하나씩 켜짐\n\n그 사진 아직 지우지 않았나 봄",
    "createdAt": "2026-06-22T00:21:00+09:00",
    "updatedAt": "2026-06-22T00:21:00+09:00",
    "pinned": false
  },
  {
    "id": "kang-ryeoun-note-008",
    "title": "싫은 질문",
    "body": "왜 러시아에 있었냐고 물어보면\n그냥 살았다고 하면 되는데\n그다음 질문이 꼭 나옴\n\n나도 무슨 말부터 해야 할지 모르겠어",
    "createdAt": "2026-06-10T23:08:00+09:00",
    "updatedAt": "2026-06-10T23:08:00+09:00",
    "pinned": false
  },
  {
    "id": "kang-ryeoun-note-007",
    "title": "오늘",
    "body": "점심 맛있었음\n친구가 펜 빌려줌\n버스 안 놓침\n\n진짜 별거 없는데 좀 괜찮은 하루였어",
    "createdAt": "2026-06-05T20:17:00+09:00",
    "updatedAt": "2026-06-05T20:17:00+09:00",
    "pinned": false
  },
  {
    "id": "kang-ryeoun-note-006",
    "title": "그림 설명",
    "body": "그림에 없는 얘기는 안 쓰기\n그림에 있는 얘기는 어떻게 설명하지\n\n그냥 두세 문장만 쓰자",
    "createdAt": "2026-05-29T21:04:00+09:00",
    "updatedAt": "2026-05-29T21:04:00+09:00",
    "pinned": false
  },
  {
    "id": "kang-ryeoun-note-005",
    "title": "영어 발표",
    "body": "첫 문장 외우기\n너무 빨리 말하지 말기\n끝에 인사 빼먹지 말기\n\n왜 외워 놓으면 교실에서 까먹을까",
    "createdAt": "2026-05-14T22:31:00+09:00",
    "updatedAt": "2026-05-14T22:31:00+09:00",
    "pinned": false
  },
  {
    "id": "kang-ryeoun-note-004",
    "title": "스케치북",
    "body": "미술실에 있음\n내일 찾기\n\n가방 세 번이나 뒤졌는데 진짜 거기 있었네",
    "createdAt": "2026-04-17T21:11:00+09:00",
    "updatedAt": "2026-04-17T21:11:00+09:00",
    "pinned": false
  },
  {
    "id": "kang-ryeoun-note-003",
    "title": "자리",
    "body": "창가 자리는 오후에 빛이 너무 많이 들어옴\n그래도 복도 쪽보다는 나은 듯\n\n다음 자리 바꿀 때는 아무 데나 앉아도 괜찮을 것 같음",
    "createdAt": "2026-03-25T19:48:00+09:00",
    "updatedAt": "2026-03-25T19:48:00+09:00",
    "pinned": false
  },
  {
    "id": "kang-ryeoun-note-002",
    "title": "생활기록부",
    "body": "러시아에서 다닌 학교 기간 적기\n양식 다시 보기\n모르는 건 담임쌤한테 물어보기\n\n괜히 자세히 쓸 필요 없다고 하셨음",
    "createdAt": "2026-03-18T20:05:00+09:00",
    "updatedAt": "2026-03-18T20:05:00+09:00",
    "pinned": false
  },
  {
    "id": "kang-ryeoun-note-001",
    "title": "학교 준비",
    "body": "시간표 사진 저장하기\n실내화\n필통\n국어 프린트\n\n교실 너무 빨리 가지 말기",
    "createdAt": "2026-03-02T20:16:00+09:00",
    "updatedAt": "2026-03-02T20:16:00+09:00",
    "pinned": true
  }
];

export default notes;
