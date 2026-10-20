# 문자 기록 전달 형식

기존 스마트폰/홈/메시지 앱 진입 화면은 유지합니다. 현재 최도안(A) 6개 대화방·87개 문자, 임형우(B) 7개 대화방·112개 문자, 윤연도(C) 8개 대화방·121개 문자, 강려운(D) 7개 대화방·146개 문자가 기본 기록으로 포함되어 있습니다. 기록이 있는 경우 대화 목록과 읽기 전용 채팅방을 표시합니다.

## 인물별 고정 파일
- A 최도안: `src/messages/data/A.ts`
- B 임형우: `src/messages/data/B.ts`
- C 윤연도: `src/messages/data/C.ts`
- D 강려운: `src/messages/data/D.ts`

각 파일은 별도의 owner와 conversations 배열을 가집니다. 사이트 빌드에 포함되며 새로고침이나 브라우저 변경으로 지워지지 않습니다. 수정한 파일은 다시 빌드/배포해야 사이트에 반영됩니다. 방문자용 작성/수정/삭제, 관리자 화면, 서버 저장소는 없습니다.

## 채팅으로 보내기
다음 항목을 작성해서 전달하면 됩니다. 한 인물에게 여러 상대를 지정할 수 있습니다. 실제 문자 내용은 받은 그대로 반영합니다.

```text
인물: A / 최도안
대화 상대 이름: [이름]
대화 상대 ID: [고유 ID, 예: contact-01]

날짜: YYYY-MM-DD
시간: HH:mm
발신자: A 또는 대화 상대 ID
수신자: 대화 상대 ID 또는 A
내용: [작성한 문자 원문]
```

각 문자를 위 형식으로 반복합니다. 한국 시간 기준이며 `HH:mm:ss`도 가능합니다. 여러 줄 내용도 지원합니다. B/C/D는 인물 ID를 바꾸면 됩니다. 한 사건의 대화를 두 인물 폰에 모두 넣으려면 두 인물의 기록에 각각 포함해야 합니다. 한 파일을 수정해도 다른 인물에게 자동 복사되지 않습니다.

## 직접 파일에 넣기
다음은 자리표시자 템플릿이며 기본 콘텐츠로 삽입되어 있지 않습니다. 대괄호 부분과 날짜/시간을 실제 값으로 바꿔야 합니다.

```ts
import type {MessageHistory} from '../types';
const history = {
  owner: 'A',
  conversations: [{
    id: '[대화 고유 ID]',
    contact: {id: '[상대 ID]', name: '[상대 이름]'},
    messages: [{
      id: '[문자 고유 ID]',
      sender: 'A',
      recipient: '[상대 ID]',
      text: '[작성한 문자 원문]',
      date: 'YYYY-MM-DD',
      time: 'HH:mm'
    }]
  }]
} as const satisfies MessageHistory;
export default history;
```

- 수신 문자는 sender를 상대 ID로, recipient를 소유 인물 ID로 지정합니다.
- 날짜는 유효한 `YYYY-MM-DD`, 시간은 24시간제입니다.
- 대화 ID와 문자 ID는 해당 인물 파일 안에서 중복되면 안 됩니다.
- 대화 목록은 최신 문자 순, 채팅방은 오래된 문자 순입니다. 같은 시각이면 입력 순서를 유지합니다.
- 문자 없는 대화는 목록에 표시하지 않습니다.
- 사용자에게 받은 원문은 일반 텍스트로 표시하며 HTML로 실행하지 않습니다.

## 코드 연결
`src/messages/types.ts`는 형식, `model.ts`는 검증/정렬, `index.ts`는 인물 파일 연결, `MessageContent.tsx`는 기존 앱 안에 들어가는 읽기 전용 콘텐츠입니다. `Phone.tsx`는 기존 앱 화면에서 이 콘텐츠만 연결합니다.

## 최도안 JSON 원본
`src/messages/source/choi_doan_messages.json`에 첨부 원본을 그대로 보관합니다. `data/A.ts`는 이 원본에서 기존 형식으로 변환한 표시 데이터입니다. `contactName`은 상대 이름, `owner`는 A, `contact`는 contactId로 연결하며 수신자는 반대쪽으로 지정합니다. `sentAt`의 +09:00 날짜와 초 단위 시간은 그대로 분리했습니다. 원본 내용·ID·날짜·시간은 변경하지 않았습니다. 이 자료를 수정할 때는 원본과 표시 데이터를 함께 일치시킨 후 다시 검증·배포하세요.

## 임형우 JSON 원본
`src/messages/source/lim_hyeongwoo_messages.json`에 첨부 원본을 그대로 보관하며 `data/B.ts`는 기존 형식으로 변환한 표시 데이터입니다. 원문·ID·contactName·sentAt의 날짜와 시간을 모두 보존합니다. owner는 B, contact는 contactId로 연결하고 수신자는 반대쪽입니다. 최도안과의 공유 문자 18개는 A 기기의 원문·날짜·시간과 동일하며 발신/수신 방향만 반대로 대응합니다.

## 윤연도 JSON 원본
`src/messages/source/yoon_yeondo_messages.json`에 첨부 원본을 그대로 보관하며 `data/C.ts`는 표시용 변환 데이터입니다. 원문·ID·contactName·sentAt의 날짜와 시간을 모두 보존합니다. owner는 C, contact는 contactId로 연결하고 수신자는 반대쪽입니다. 최도안과의 15개 문자와 임형우와의 20개 문자는 기존 A/B 기기 기록과 내용·시간이 정확히 일치하고 발신/수신 방향만 반대임을 검증했습니다.

윤연도 원본에서 여러 대화방에 같은 문자 ID가 사용되어 내부 id는 `대화방ID::원본ID`로 구분하고, 원본 식별자는 `sourceId`에 그대로 보관합니다. 본문·발신자·수신자·날짜·시간은 변하지 않습니다.

## 강려운 JSON 원본
`src/messages/source/kang_ryeoun_messages_codex.json`에 첨부 원본을 그대로 보관하며 `data/D.ts`는 표시용 변환 데이터입니다. 7개 대화방의 146개 문자는 원문·contactName·발신/수신·날짜·시간을 보존했습니다. 내부 id는 `대화방ID::문자ID`, `sourceId`는 원본 ID입니다. 최도안 20개·임형우 17개·윤연도 19개 공유 문자는 기존 기기와 내용·날짜·시간이 같고 발신/수신 방향만 반대임을 검증했습니다.
