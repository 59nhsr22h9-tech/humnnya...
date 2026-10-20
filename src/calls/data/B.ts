import type {CallRecord} from '../types';

// Exact user-provided records; timestamps, status, and durations are unchanged.
const calls: readonly CallRecord[] = [
  {
    "id": "lim-hyeongwoo-call-026",
    "contactId": null,
    "contactName": "대학 동기",
    "timestamp": "2026-10-18T16:12:00+09:00",
    "direction": "outgoing",
    "status": "completed",
    "durationSeconds": 399
  },
  {
    "id": "lim-hyeongwoo-call-025",
    "contactId": null,
    "contactName": "집",
    "timestamp": "2026-10-12T18:58:00+09:00",
    "direction": "incoming",
    "status": "completed",
    "durationSeconds": 136
  },
  {
    "id": "lim-hyeongwoo-call-006",
    "contactId": "yoon-yeondo",
    "contactName": "윤연도",
    "timestamp": "2026-09-22T14:02:00+09:00",
    "direction": "incoming",
    "status": "completed",
    "durationSeconds": 123,
    "sharedCallId": "shared-lim-hyeongwoo-yoon-yeondo-202609221402"
  },
  {
    "id": "lim-hyeongwoo-call-024",
    "contactId": null,
    "contactName": "해수여고 교무부",
    "timestamp": "2026-09-19T12:20:00+09:00",
    "direction": "outgoing",
    "status": "completed",
    "durationSeconds": 89
  },
  {
    "id": "lim-hyeongwoo-call-023",
    "contactId": null,
    "contactName": "집",
    "timestamp": "2026-09-17T18:14:00+09:00",
    "direction": "incoming",
    "status": "completed",
    "durationSeconds": 53
  },
  {
    "id": "lim-hyeongwoo-call-022",
    "contactId": null,
    "contactName": "집",
    "timestamp": "2026-09-17T15:41:00+09:00",
    "direction": "outgoing",
    "status": "completed",
    "durationSeconds": 30
  },
  {
    "id": "lim-hyeongwoo-call-004",
    "contactId": "choi-doan",
    "contactName": "최도안",
    "timestamp": "2026-09-16T14:44:00+09:00",
    "direction": "incoming",
    "status": "completed",
    "durationSeconds": 80,
    "sharedCallId": "shared-choi-doan-lim-hyeongwoo-202609161444"
  },
  {
    "id": "lim-hyeongwoo-call-008",
    "contactId": "kang-ryeoun",
    "contactName": "강려운",
    "timestamp": "2026-09-07T15:30:00+09:00",
    "direction": "incoming",
    "status": "completed",
    "durationSeconds": 180,
    "sharedCallId": "shared-lim-hyeongwoo-kang-ryeoun-202609071530"
  },
  {
    "id": "lim-hyeongwoo-call-021",
    "contactId": null,
    "contactName": "영어과 동료",
    "timestamp": "2026-08-27T15:56:00+09:00",
    "direction": "outgoing",
    "status": "completed",
    "durationSeconds": 180
  },
  {
    "id": "lim-hyeongwoo-call-020",
    "contactId": null,
    "contactName": "대학 동기",
    "timestamp": "2026-08-21T18:41:00+09:00",
    "direction": "missed",
    "status": "missed",
    "durationSeconds": 0
  },
  {
    "id": "lim-hyeongwoo-call-019",
    "contactId": null,
    "contactName": "집",
    "timestamp": "2026-07-10T17:05:00+09:00",
    "direction": "outgoing",
    "status": "completed",
    "durationSeconds": 42
  },
  {
    "id": "lim-hyeongwoo-call-018",
    "contactId": null,
    "contactName": "해수여고 교무부",
    "timestamp": "2026-06-23T12:15:00+09:00",
    "direction": "incoming",
    "status": "completed",
    "durationSeconds": 191
  },
  {
    "id": "lim-hyeongwoo-call-017",
    "contactId": null,
    "contactName": "대학 동기",
    "timestamp": "2026-06-09T20:26:00+09:00",
    "direction": "outgoing",
    "status": "completed",
    "durationSeconds": 509
  },
  {
    "id": "lim-hyeongwoo-call-003",
    "contactId": "choi-doan",
    "contactName": "최도안",
    "timestamp": "2026-06-04T17:10:00+09:00",
    "direction": "outgoing",
    "status": "completed",
    "durationSeconds": 153,
    "sharedCallId": "shared-choi-doan-lim-hyeongwoo-202606041710"
  },
  {
    "id": "lim-hyeongwoo-call-005",
    "contactId": "yoon-yeondo",
    "contactName": "윤연도",
    "timestamp": "2026-05-21T15:48:00+09:00",
    "direction": "outgoing",
    "status": "completed",
    "durationSeconds": 43,
    "sharedCallId": "shared-lim-hyeongwoo-yoon-yeondo-202605211548"
  },
  {
    "id": "lim-hyeongwoo-call-016",
    "contactId": null,
    "contactName": "집",
    "timestamp": "2026-05-16T11:30:00+09:00",
    "direction": "incoming",
    "status": "completed",
    "durationSeconds": 102
  },
  {
    "id": "lim-hyeongwoo-call-007",
    "contactId": "kang-ryeoun",
    "contactName": "강려운",
    "timestamp": "2026-05-14T16:10:00+09:00",
    "direction": "outgoing",
    "status": "completed",
    "durationSeconds": 73,
    "sharedCallId": "shared-lim-hyeongwoo-kang-ryeoun-202605141610"
  },
  {
    "id": "lim-hyeongwoo-call-015",
    "contactId": null,
    "contactName": "영어과 동료",
    "timestamp": "2026-04-28T16:51:00+09:00",
    "direction": "incoming",
    "status": "completed",
    "durationSeconds": 162
  },
  {
    "id": "lim-hyeongwoo-call-002",
    "contactId": "choi-doan",
    "contactName": "최도안",
    "timestamp": "2026-04-23T16:05:00+09:00",
    "direction": "incoming",
    "status": "completed",
    "durationSeconds": 102,
    "sharedCallId": "shared-choi-doan-lim-hyeongwoo-202604231605"
  },
  {
    "id": "lim-hyeongwoo-call-014",
    "contactId": null,
    "contactName": "해수여고 교무부",
    "timestamp": "2026-04-03T10:07:00+09:00",
    "direction": "incoming",
    "status": "completed",
    "durationSeconds": 219
  },
  {
    "id": "lim-hyeongwoo-call-013",
    "contactId": null,
    "contactName": "집",
    "timestamp": "2026-03-25T18:01:00+09:00",
    "direction": "outgoing",
    "status": "completed",
    "durationSeconds": 84
  },
  {
    "id": "lim-hyeongwoo-call-012",
    "contactId": null,
    "contactName": "집",
    "timestamp": "2026-03-07T17:34:00+09:00",
    "direction": "incoming",
    "status": "completed",
    "durationSeconds": 121
  },
  {
    "id": "lim-hyeongwoo-call-001",
    "contactId": "choi-doan",
    "contactName": "최도안",
    "timestamp": "2026-03-06T08:05:00+09:00",
    "direction": "outgoing",
    "status": "completed",
    "durationSeconds": 143,
    "sharedCallId": "shared-choi-doan-lim-hyeongwoo-202603060805"
  },
  {
    "id": "lim-hyeongwoo-call-011",
    "contactId": null,
    "contactName": "해수여고 교무부",
    "timestamp": "2026-03-05T08:43:00+09:00",
    "direction": "incoming",
    "status": "completed",
    "durationSeconds": 74
  },
  {
    "id": "lim-hyeongwoo-call-010",
    "contactId": null,
    "contactName": "영어과 동료",
    "timestamp": "2026-03-04T15:19:00+09:00",
    "direction": "outgoing",
    "status": "completed",
    "durationSeconds": 149
  },
  {
    "id": "lim-hyeongwoo-call-009",
    "contactId": null,
    "contactName": "대학 동기",
    "timestamp": "2026-02-26T19:07:00+09:00",
    "direction": "incoming",
    "status": "completed",
    "durationSeconds": 474
  }
];

export default calls;
