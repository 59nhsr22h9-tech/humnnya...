import type {CallRecord} from '../types';

// Exact user-provided records; timestamps, status, and durations are unchanged.
const calls: readonly CallRecord[] = [
  {
    "id": "kang-ryeoun-call-029",
    "contactId": null,
    "contactName": "같은 반 친구",
    "timestamp": "2026-10-13T18:42:00+09:00",
    "direction": "incoming",
    "status": "completed",
    "durationSeconds": 173
  },
  {
    "id": "kang-ryeoun-call-028",
    "contactId": null,
    "contactName": "1학년 3반 반장",
    "timestamp": "2026-10-08T15:55:00+09:00",
    "direction": "incoming",
    "status": "completed",
    "durationSeconds": 43
  },
  {
    "id": "kang-ryeoun-call-027",
    "contactId": null,
    "contactName": "러시아 때 친구",
    "timestamp": "2026-09-29T20:41:00+09:00",
    "direction": "incoming",
    "status": "completed",
    "durationSeconds": 258
  },
  {
    "id": "kang-ryeoun-call-026",
    "contactId": null,
    "contactName": "아빠",
    "timestamp": "2026-09-27T18:06:00+09:00",
    "direction": "outgoing",
    "status": "unanswered",
    "durationSeconds": 0
  },
  {
    "id": "kang-ryeoun-call-025",
    "contactId": null,
    "contactName": "아빠",
    "timestamp": "2026-09-16T17:32:00+09:00",
    "direction": "outgoing",
    "status": "unanswered",
    "durationSeconds": 0
  },
  {
    "id": "kang-ryeoun-call-008",
    "contactId": "yoon-yeondo",
    "contactName": "윤연도",
    "timestamp": "2026-09-09T16:32:00+09:00",
    "direction": "outgoing",
    "status": "completed",
    "durationSeconds": 123,
    "sharedCallId": "shared-yoon-yeondo-kang-ryeoun-202609091632"
  },
  {
    "id": "kang-ryeoun-call-006",
    "contactId": "lim-hyeongwoo",
    "contactName": "임형우",
    "timestamp": "2026-09-07T15:30:00+09:00",
    "direction": "outgoing",
    "status": "completed",
    "durationSeconds": 180,
    "sharedCallId": "shared-lim-hyeongwoo-kang-ryeoun-202609071530"
  },
  {
    "id": "kang-ryeoun-call-024",
    "contactId": null,
    "contactName": "아빠",
    "timestamp": "2026-09-05T14:02:00+09:00",
    "direction": "outgoing",
    "status": "unanswered",
    "durationSeconds": 0
  },
  {
    "id": "kang-ryeoun-call-004",
    "contactId": "choi-doan",
    "contactName": "최도안",
    "timestamp": "2026-09-04T16:12:00+09:00",
    "direction": "outgoing",
    "status": "unanswered",
    "durationSeconds": 0,
    "sharedCallId": "shared-choi-doan-kang-ryeoun-202609041612"
  },
  {
    "id": "kang-ryeoun-call-023",
    "contactId": null,
    "contactName": "아빠",
    "timestamp": "2026-09-02T19:28:00+09:00",
    "direction": "missed",
    "status": "missed",
    "durationSeconds": 0
  },
  {
    "id": "kang-ryeoun-call-022",
    "contactId": null,
    "contactName": "아빠",
    "timestamp": "2026-08-29T11:48:00+09:00",
    "direction": "incoming",
    "status": "completed",
    "durationSeconds": 79
  },
  {
    "id": "kang-ryeoun-call-021",
    "contactId": null,
    "contactName": "러시아 때 친구",
    "timestamp": "2026-08-19T19:03:00+09:00",
    "direction": "outgoing",
    "status": "completed",
    "durationSeconds": 315
  },
  {
    "id": "kang-ryeoun-call-020",
    "contactId": null,
    "contactName": "같은 반 친구",
    "timestamp": "2026-07-20T16:53:00+09:00",
    "direction": "outgoing",
    "status": "completed",
    "durationSeconds": 222
  },
  {
    "id": "kang-ryeoun-call-019",
    "contactId": null,
    "contactName": "아빠",
    "timestamp": "2026-07-04T20:06:00+09:00",
    "direction": "incoming",
    "status": "completed",
    "durationSeconds": 58
  },
  {
    "id": "kang-ryeoun-call-003",
    "contactId": "choi-doan",
    "contactName": "최도안",
    "timestamp": "2026-06-11T15:50:00+09:00",
    "direction": "incoming",
    "status": "completed",
    "durationSeconds": 198,
    "sharedCallId": "shared-choi-doan-kang-ryeoun-202606111550"
  },
  {
    "id": "kang-ryeoun-call-018",
    "contactId": null,
    "contactName": "같은 반 친구",
    "timestamp": "2026-06-10T17:09:00+09:00",
    "direction": "incoming",
    "status": "completed",
    "durationSeconds": 167
  },
  {
    "id": "kang-ryeoun-call-017",
    "contactId": null,
    "contactName": "러시아 때 친구",
    "timestamp": "2026-05-19T21:05:00+09:00",
    "direction": "incoming",
    "status": "completed",
    "durationSeconds": 612
  },
  {
    "id": "kang-ryeoun-call-005",
    "contactId": "lim-hyeongwoo",
    "contactName": "임형우",
    "timestamp": "2026-05-14T16:10:00+09:00",
    "direction": "incoming",
    "status": "completed",
    "durationSeconds": 73,
    "sharedCallId": "shared-lim-hyeongwoo-kang-ryeoun-202605141610"
  },
  {
    "id": "kang-ryeoun-call-016",
    "contactId": null,
    "contactName": "아빠",
    "timestamp": "2026-05-05T12:24:00+09:00",
    "direction": "outgoing",
    "status": "completed",
    "durationSeconds": 159
  },
  {
    "id": "kang-ryeoun-call-015",
    "contactId": null,
    "contactName": "1학년 3반 반장",
    "timestamp": "2026-04-28T16:22:00+09:00",
    "direction": "outgoing",
    "status": "completed",
    "durationSeconds": 48
  },
  {
    "id": "kang-ryeoun-call-014",
    "contactId": null,
    "contactName": "같은 반 친구",
    "timestamp": "2026-04-17T18:15:00+09:00",
    "direction": "incoming",
    "status": "completed",
    "durationSeconds": 186
  },
  {
    "id": "kang-ryeoun-call-007",
    "contactId": "yoon-yeondo",
    "contactName": "윤연도",
    "timestamp": "2026-04-17T16:20:00+09:00",
    "direction": "incoming",
    "status": "completed",
    "durationSeconds": 47,
    "sharedCallId": "shared-yoon-yeondo-kang-ryeoun-202604171620"
  },
  {
    "id": "kang-ryeoun-call-002",
    "contactId": "choi-doan",
    "contactName": "최도안",
    "timestamp": "2026-04-09T16:10:00+09:00",
    "direction": "incoming",
    "status": "completed",
    "durationSeconds": 85,
    "sharedCallId": "shared-choi-doan-kang-ryeoun-202604091610"
  },
  {
    "id": "kang-ryeoun-call-013",
    "contactId": null,
    "contactName": "아빠",
    "timestamp": "2026-03-28T18:19:00+09:00",
    "direction": "incoming",
    "status": "completed",
    "durationSeconds": 104
  },
  {
    "id": "kang-ryeoun-call-001",
    "contactId": "choi-doan",
    "contactName": "최도안",
    "timestamp": "2026-03-18T16:41:00+09:00",
    "direction": "outgoing",
    "status": "completed",
    "durationSeconds": 132,
    "sharedCallId": "shared-choi-doan-kang-ryeoun-202603181641"
  },
  {
    "id": "kang-ryeoun-call-012",
    "contactId": null,
    "contactName": "1학년 3반 반장",
    "timestamp": "2026-03-12T17:50:00+09:00",
    "direction": "incoming",
    "status": "completed",
    "durationSeconds": 62
  },
  {
    "id": "kang-ryeoun-call-011",
    "contactId": null,
    "contactName": "같은 반 친구",
    "timestamp": "2026-03-06T16:18:00+09:00",
    "direction": "outgoing",
    "status": "completed",
    "durationSeconds": 201
  },
  {
    "id": "kang-ryeoun-call-010",
    "contactId": null,
    "contactName": "러시아 때 친구",
    "timestamp": "2026-02-25T22:07:00+09:00",
    "direction": "incoming",
    "status": "completed",
    "durationSeconds": 528
  },
  {
    "id": "kang-ryeoun-call-009",
    "contactId": null,
    "contactName": "아빠",
    "timestamp": "2026-02-22T19:46:00+09:00",
    "direction": "incoming",
    "status": "completed",
    "durationSeconds": 185
  }
];

export default calls;
