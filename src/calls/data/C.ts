import type {CallRecord} from '../types';

// Exact user-provided records; timestamps, status, and durations are unchanged.
const calls: readonly CallRecord[] = [
  {
    "id": "yoon-yeondo-call-024",
    "contactId": null,
    "contactName": "전시자료실",
    "timestamp": "2026-10-18T11:39:00+09:00",
    "direction": "outgoing",
    "status": "completed",
    "durationSeconds": 94
  },
  {
    "id": "yoon-yeondo-call-023",
    "contactId": null,
    "contactName": "오래된 지인",
    "timestamp": "2026-10-14T18:36:00+09:00",
    "direction": "missed",
    "status": "missed",
    "durationSeconds": 0
  },
  {
    "id": "yoon-yeondo-call-022",
    "contactId": null,
    "contactName": "미술부 부장",
    "timestamp": "2026-10-07T16:48:00+09:00",
    "direction": "outgoing",
    "status": "completed",
    "durationSeconds": 25
  },
  {
    "id": "yoon-yeondo-call-021",
    "contactId": null,
    "contactName": "해수여고 교무부",
    "timestamp": "2026-10-06T14:18:00+09:00",
    "direction": "incoming",
    "status": "completed",
    "durationSeconds": 128
  },
  {
    "id": "yoon-yeondo-call-020",
    "contactId": null,
    "contactName": "전시자료실",
    "timestamp": "2026-09-23T11:35:00+09:00",
    "direction": "incoming",
    "status": "completed",
    "durationSeconds": 56
  },
  {
    "id": "yoon-yeondo-call-005",
    "contactId": "lim-hyeongwoo",
    "contactName": "임형우",
    "timestamp": "2026-09-22T14:02:00+09:00",
    "direction": "outgoing",
    "status": "completed",
    "durationSeconds": 123,
    "sharedCallId": "shared-lim-hyeongwoo-yoon-yeondo-202609221402"
  },
  {
    "id": "yoon-yeondo-call-019",
    "contactId": null,
    "contactName": "오래된 지인",
    "timestamp": "2026-09-17T19:02:00+09:00",
    "direction": "outgoing",
    "status": "completed",
    "durationSeconds": 47
  },
  {
    "id": "yoon-yeondo-call-003",
    "contactId": "choi-doan",
    "contactName": "최도안",
    "timestamp": "2026-09-16T17:25:00+09:00",
    "direction": "outgoing",
    "status": "unanswered",
    "durationSeconds": 0,
    "sharedCallId": "shared-choi-doan-yoon-yeondo-202609161725"
  },
  {
    "id": "yoon-yeondo-call-007",
    "contactId": "kang-ryeoun",
    "contactName": "강려운",
    "timestamp": "2026-09-09T16:32:00+09:00",
    "direction": "incoming",
    "status": "completed",
    "durationSeconds": 123,
    "sharedCallId": "shared-yoon-yeondo-kang-ryeoun-202609091632"
  },
  {
    "id": "yoon-yeondo-call-018",
    "contactId": null,
    "contactName": "화방",
    "timestamp": "2026-08-25T16:05:00+09:00",
    "direction": "incoming",
    "status": "completed",
    "durationSeconds": 88
  },
  {
    "id": "yoon-yeondo-call-017",
    "contactId": null,
    "contactName": "화방",
    "timestamp": "2026-07-14T13:01:00+09:00",
    "direction": "outgoing",
    "status": "completed",
    "durationSeconds": 76
  },
  {
    "id": "yoon-yeondo-call-016",
    "contactId": null,
    "contactName": "전시자료실",
    "timestamp": "2026-07-02T10:48:00+09:00",
    "direction": "incoming",
    "status": "completed",
    "durationSeconds": 114
  },
  {
    "id": "yoon-yeondo-call-015",
    "contactId": null,
    "contactName": "미술부 부장",
    "timestamp": "2026-06-22T16:54:00+09:00",
    "direction": "outgoing",
    "status": "completed",
    "durationSeconds": 36
  },
  {
    "id": "yoon-yeondo-call-014",
    "contactId": null,
    "contactName": "오래된 지인",
    "timestamp": "2026-06-07T13:43:00+09:00",
    "direction": "incoming",
    "status": "completed",
    "durationSeconds": 331
  },
  {
    "id": "yoon-yeondo-call-004",
    "contactId": "lim-hyeongwoo",
    "contactName": "임형우",
    "timestamp": "2026-05-21T15:48:00+09:00",
    "direction": "incoming",
    "status": "completed",
    "durationSeconds": 43,
    "sharedCallId": "shared-lim-hyeongwoo-yoon-yeondo-202605211548"
  },
  {
    "id": "yoon-yeondo-call-013",
    "contactId": null,
    "contactName": "해수여고 교무부",
    "timestamp": "2026-05-18T15:22:00+09:00",
    "direction": "incoming",
    "status": "completed",
    "durationSeconds": 95
  },
  {
    "id": "yoon-yeondo-call-002",
    "contactId": "choi-doan",
    "contactName": "최도안",
    "timestamp": "2026-05-08T16:40:00+09:00",
    "direction": "outgoing",
    "status": "completed",
    "durationSeconds": 56,
    "sharedCallId": "shared-choi-doan-yoon-yeondo-202605081640"
  },
  {
    "id": "yoon-yeondo-call-012",
    "contactId": null,
    "contactName": "화방",
    "timestamp": "2026-04-22T14:40:00+09:00",
    "direction": "incoming",
    "status": "completed",
    "durationSeconds": 61
  },
  {
    "id": "yoon-yeondo-call-006",
    "contactId": "kang-ryeoun",
    "contactName": "강려운",
    "timestamp": "2026-04-17T16:20:00+09:00",
    "direction": "outgoing",
    "status": "completed",
    "durationSeconds": 47,
    "sharedCallId": "shared-yoon-yeondo-kang-ryeoun-202604171620"
  },
  {
    "id": "yoon-yeondo-call-011",
    "contactId": null,
    "contactName": "미술부 부장",
    "timestamp": "2026-03-31T15:16:00+09:00",
    "direction": "incoming",
    "status": "completed",
    "durationSeconds": 29
  },
  {
    "id": "yoon-yeondo-call-010",
    "contactId": null,
    "contactName": "오래된 지인",
    "timestamp": "2026-03-28T17:11:00+09:00",
    "direction": "missed",
    "status": "missed",
    "durationSeconds": 0
  },
  {
    "id": "yoon-yeondo-call-009",
    "contactId": null,
    "contactName": "화방",
    "timestamp": "2026-03-23T13:08:00+09:00",
    "direction": "outgoing",
    "status": "completed",
    "durationSeconds": 92
  },
  {
    "id": "yoon-yeondo-call-001",
    "contactId": "choi-doan",
    "contactName": "최도안",
    "timestamp": "2026-03-11T14:33:00+09:00",
    "direction": "incoming",
    "status": "completed",
    "durationSeconds": 108,
    "sharedCallId": "shared-choi-doan-yoon-yeondo-202603111433"
  },
  {
    "id": "yoon-yeondo-call-008",
    "contactId": null,
    "contactName": "해수여고 교무부",
    "timestamp": "2026-03-04T09:27:00+09:00",
    "direction": "incoming",
    "status": "completed",
    "durationSeconds": 47
  }
];

export default calls;
