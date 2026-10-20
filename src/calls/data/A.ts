import type {CallRecord} from '../types';

// Exact user-provided records; timestamps, status, and durations are unchanged.
const calls: readonly CallRecord[] = [
  {
    "id": "choi-doan-call-029",
    "contactId": null,
    "contactName": "모스크바 공관 동료",
    "timestamp": "2026-10-17T09:41:00+09:00",
    "direction": "outgoing",
    "status": "completed",
    "durationSeconds": 58
  },
  {
    "id": "choi-doan-call-028",
    "contactId": null,
    "contactName": "본부 연락 담당",
    "timestamp": "2026-10-16T18:02:00+09:00",
    "direction": "missed",
    "status": "missed",
    "durationSeconds": 0
  },
  {
    "id": "choi-doan-call-007",
    "contactId": "yoon-yeondo",
    "contactName": "윤연도",
    "timestamp": "2026-09-16T17:25:00+09:00",
    "direction": "missed",
    "status": "missed",
    "durationSeconds": 0,
    "sharedCallId": "shared-choi-doan-yoon-yeondo-202609161725"
  },
  {
    "id": "choi-doan-call-004",
    "contactId": "lim-hyeongwoo",
    "contactName": "임형우",
    "timestamp": "2026-09-16T14:44:00+09:00",
    "direction": "outgoing",
    "status": "completed",
    "durationSeconds": 80,
    "sharedCallId": "shared-choi-doan-lim-hyeongwoo-202609161444"
  },
  {
    "id": "choi-doan-call-027",
    "contactId": null,
    "contactName": "해수여고 교무부",
    "timestamp": "2026-09-11T13:32:00+09:00",
    "direction": "incoming",
    "status": "completed",
    "durationSeconds": 75
  },
  {
    "id": "choi-doan-call-026",
    "contactId": null,
    "contactName": "본부 연락 담당",
    "timestamp": "2026-09-06T10:44:00+09:00",
    "direction": "outgoing",
    "status": "completed",
    "durationSeconds": 186
  },
  {
    "id": "choi-doan-call-011",
    "contactId": "kang-ryeoun",
    "contactName": "강려운",
    "timestamp": "2026-09-04T16:12:00+09:00",
    "direction": "missed",
    "status": "missed",
    "durationSeconds": 0,
    "sharedCallId": "shared-choi-doan-kang-ryeoun-202609041612"
  },
  {
    "id": "choi-doan-call-025",
    "contactId": null,
    "contactName": "모스크바 공관 동료",
    "timestamp": "2026-09-03T21:10:00+09:00",
    "direction": "incoming",
    "status": "completed",
    "durationSeconds": 423
  },
  {
    "id": "choi-doan-call-024",
    "contactId": null,
    "contactName": "해수여고 교무부",
    "timestamp": "2026-08-25T16:16:00+09:00",
    "direction": "incoming",
    "status": "completed",
    "durationSeconds": 91
  },
  {
    "id": "choi-doan-call-023",
    "contactId": null,
    "contactName": "본부 연락 담당",
    "timestamp": "2026-08-11T08:48:00+09:00",
    "direction": "outgoing",
    "status": "completed",
    "durationSeconds": 207
  },
  {
    "id": "choi-doan-call-022",
    "contactId": null,
    "contactName": "모스크바 공관 동료",
    "timestamp": "2026-07-19T15:18:00+09:00",
    "direction": "missed",
    "status": "missed",
    "durationSeconds": 0
  },
  {
    "id": "choi-doan-call-021",
    "contactId": null,
    "contactName": "본부 연락 담당",
    "timestamp": "2026-07-03T17:06:00+09:00",
    "direction": "incoming",
    "status": "completed",
    "durationSeconds": 110
  },
  {
    "id": "choi-doan-call-020",
    "contactId": null,
    "contactName": "모스크바 공관 동료",
    "timestamp": "2026-06-13T20:21:00+09:00",
    "direction": "incoming",
    "status": "completed",
    "durationSeconds": 226
  },
  {
    "id": "choi-doan-call-019",
    "contactId": null,
    "contactName": "본부 연락 담당",
    "timestamp": "2026-06-12T18:48:00+09:00",
    "direction": "outgoing",
    "status": "completed",
    "durationSeconds": 312
  },
  {
    "id": "choi-doan-call-010",
    "contactId": "kang-ryeoun",
    "contactName": "강려운",
    "timestamp": "2026-06-11T15:50:00+09:00",
    "direction": "outgoing",
    "status": "completed",
    "durationSeconds": 198,
    "sharedCallId": "shared-choi-doan-kang-ryeoun-202606111550"
  },
  {
    "id": "choi-doan-call-003",
    "contactId": "lim-hyeongwoo",
    "contactName": "임형우",
    "timestamp": "2026-06-04T17:10:00+09:00",
    "direction": "incoming",
    "status": "completed",
    "durationSeconds": 153,
    "sharedCallId": "shared-choi-doan-lim-hyeongwoo-202606041710"
  },
  {
    "id": "choi-doan-call-018",
    "contactId": null,
    "contactName": "본부 연락 담당",
    "timestamp": "2026-05-18T12:03:00+09:00",
    "direction": "incoming",
    "status": "completed",
    "durationSeconds": 220
  },
  {
    "id": "choi-doan-call-006",
    "contactId": "yoon-yeondo",
    "contactName": "윤연도",
    "timestamp": "2026-05-08T16:40:00+09:00",
    "direction": "incoming",
    "status": "completed",
    "durationSeconds": 56,
    "sharedCallId": "shared-choi-doan-yoon-yeondo-202605081640"
  },
  {
    "id": "choi-doan-call-002",
    "contactId": "lim-hyeongwoo",
    "contactName": "임형우",
    "timestamp": "2026-04-23T16:05:00+09:00",
    "direction": "outgoing",
    "status": "completed",
    "durationSeconds": 102,
    "sharedCallId": "shared-choi-doan-lim-hyeongwoo-202604231605"
  },
  {
    "id": "choi-doan-call-017",
    "contactId": null,
    "contactName": "해수여고 교무부",
    "timestamp": "2026-04-17T16:52:00+09:00",
    "direction": "outgoing",
    "status": "completed",
    "durationSeconds": 78
  },
  {
    "id": "choi-doan-call-016",
    "contactId": null,
    "contactName": "본부 연락 담당",
    "timestamp": "2026-04-11T13:27:00+09:00",
    "direction": "missed",
    "status": "missed",
    "durationSeconds": 0
  },
  {
    "id": "choi-doan-call-009",
    "contactId": "kang-ryeoun",
    "contactName": "강려운",
    "timestamp": "2026-04-09T16:10:00+09:00",
    "direction": "outgoing",
    "status": "completed",
    "durationSeconds": 85,
    "sharedCallId": "shared-choi-doan-kang-ryeoun-202604091610"
  },
  {
    "id": "choi-doan-call-015",
    "contactId": null,
    "contactName": "모스크바 공관 동료",
    "timestamp": "2026-03-21T18:12:00+09:00",
    "direction": "incoming",
    "status": "completed",
    "durationSeconds": 385
  },
  {
    "id": "choi-doan-call-008",
    "contactId": "kang-ryeoun",
    "contactName": "강려운",
    "timestamp": "2026-03-18T16:41:00+09:00",
    "direction": "incoming",
    "status": "completed",
    "durationSeconds": 132,
    "sharedCallId": "shared-choi-doan-kang-ryeoun-202603181641"
  },
  {
    "id": "choi-doan-call-005",
    "contactId": "yoon-yeondo",
    "contactName": "윤연도",
    "timestamp": "2026-03-11T14:33:00+09:00",
    "direction": "outgoing",
    "status": "completed",
    "durationSeconds": 108,
    "sharedCallId": "shared-choi-doan-yoon-yeondo-202603111433"
  },
  {
    "id": "choi-doan-call-001",
    "contactId": "lim-hyeongwoo",
    "contactName": "임형우",
    "timestamp": "2026-03-06T08:05:00+09:00",
    "direction": "incoming",
    "status": "completed",
    "durationSeconds": 143,
    "sharedCallId": "shared-choi-doan-lim-hyeongwoo-202603060805"
  },
  {
    "id": "choi-doan-call-014",
    "contactId": null,
    "contactName": "해수여고 교무부",
    "timestamp": "2026-03-03T09:08:00+09:00",
    "direction": "incoming",
    "status": "completed",
    "durationSeconds": 68
  },
  {
    "id": "choi-doan-call-013",
    "contactId": null,
    "contactName": "본부 연락 담당",
    "timestamp": "2026-02-24T11:18:00+09:00",
    "direction": "outgoing",
    "status": "completed",
    "durationSeconds": 372
  },
  {
    "id": "choi-doan-call-012",
    "contactId": null,
    "contactName": "모스크바 공관 동료",
    "timestamp": "2026-02-19T20:14:00+09:00",
    "direction": "incoming",
    "status": "completed",
    "durationSeconds": 266
  }
];

export default calls;
