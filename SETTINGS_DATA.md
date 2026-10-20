# 설정 앱 표시 데이터

인물별 설정 정보는 `src/settings/data.ts`의 `settingsProfiles`에서 수정합니다.

| 키 | 인물 | 기종 |
| --- | --- | --- |
| A | 최도안 | iPhone 13 mini |
| B | 임형우 | iPhone 15 |
| C | 윤연도 | Galaxy S25 |
| D | 강려운 | iPhone 18 Pro |

각 인물의 프로필은 서로 다른 객체이며, 다음 값들을 독립적으로 지정할 수 있습니다.

| 필드 | 의미와 형식 |
| --- | --- |
| `characterName` | 계정 영역 첫 줄의 인물 이름 |
| `deviceModel` | 기종 이름 |
| `accountSubtitle` | 계정 영역 둘째 줄의 문구. 예: `최도안의 iPhone 13 mini` |
| `wifiName` | 연결된 Wi-Fi 이름. `null`이면 연결 안 됨 |
| `bluetoothEnabled` | Bluetooth 상태. `true`는 켬, `false`는 끔 |
| `airplaneMode` | 에어플레인 모드의 표시 상태 |
| `batteryPercent` | 설정 화면에 표시할 배터리 잔량. 0~100 |
| `accountSuggestionsBadge` | 계정 제안 배지 수. 0이면 배지 없음 |
| `generalBadge` | 일반 메뉴 배지 수. 0이면 배지 없음 |
| `brightnessPercent` | 설정 화면에 표시할 밝기. 0~100 |
| `theme` | 설정 화면에 표시할 모드 이름. `라이트` 또는 `다크` |
| `textSize` | 설정 화면에 표시할 글자 크기 이름 |
| `ringtone` | 설정 화면에 표시할 벨소리 이름 |
| `wallpaperName` | 현재 배경화면을 설명하는 표시 이름 |

Wi-Fi 이름, 연결 상태, 배터리, 알림 수 등은 가상 인물을 위한 예시 값입니다. 실제 기기나 네트워크에서 가져온 정보가 아닙니다. 각 프로필은 타입과 `Object.freeze`로 읽기 전용 처리되어 있습니다.

설정 앱에는 방문자용 저장·편집 기능이 없습니다. 표시값은 프로젝트에 포함되는 고정 데이터이므로 새로고침하면 같은 값으로 표시됩니다. `localStorage`나 백엔드를 사용하지 않습니다. 수정 내용을 사이트에 반영하려면 프로젝트를 다시 빌드하고 배포하세요.

`theme`, `brightnessPercent`, `wallpaperName` 등은 설정 앱에서 보여주는 정보입니다. 이 값을 편집해도 기존 잠금 화면, 홈 화면, 배경화면, 스마트폰 외형이나 다른 앱의 데이터가 바뀌지는 않습니다. iPhone 18 Pro 관련 표시는 기존 프로젝트의 임시 콘셉트 기기를 설명하며, 확정된 하드웨어 사양을 뜻하지 않습니다.
