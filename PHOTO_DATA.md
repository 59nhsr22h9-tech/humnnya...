# 사진 데이터

기존 사진 앱에 인물별 원본 JPEG 세 장씩, 총 열두 장을 연결했습니다. 사진 목록은 인물별로 독립적이며 첨부 JSON의 `order` 순서대로 표시합니다.

| 인물 | 데이터 | 원본 사진 폴더 | 순서 |
| --- | --- | --- | --- |
| 최도안 | `src/photos/data/A.ts` | `public/photos/choi-doan/` | 밤거리 → 국기 행사장 → 오래된 휴대전화 문자 사진 |
| 임형우 | `src/photos/data/B.ts` | `public/photos/lim-hyeongwoo/` | 비틀즈 공연 사진 → 손글씨와 폴라로이드 → 해 질 녘 다리 |
| 윤연도 | `src/photos/data/C.ts` | `public/photos/yoon-yeondo/` | 스케치 작업대 → 작업실 선반 → 흐릿한 인물들 |
| 강려운 | `src/photos/data/D.ts` | `public/photos/kang-ryeoun/` | 해 질 녘 창문 → 모스크바 야간 지도 → 눈 덮인 아파트 |

- `src/photos/source/`: 첨부 JSON 원본. `choi_doan_photos.json`은 기존 그대로 보존하며, 새 ZIP의 `all_character_photos.json`과 개별 인물 JSON도 보관합니다.
- `src/photos/data/A.ts` ~ `D.ts`: 원본 id/src/alt/order를 보존한 표시 데이터. 최도안의 기존 데이터는 변경하지 않았습니다.
- `public/photos/`: 원본 JPEG 파일. 재인코딩이나 해상도 변경을 하지 않았습니다.
- `src/photos/library.ts`: 현재 휴대전화에 해당하는 인물의 독립 목록만 반환합니다.
- `PhotoContent.tsx`, `photos.css`: 기존 앱 안의 격자 및 확대 화면. 좌우 스와이프, 화살표 버튼, 키보드 좌우 방향키로 이동하고 닫기/Escape로 격자에 돌아옵니다. 처음·마지막에서는 목록 경계를 넘지 않습니다.

격자와 확대 화면 모두 `object-fit: contain`으로 원본 비율을 유지합니다. 촬영 날짜·위치·EXIF 정보는 표시하지 않습니다. 방문자용 업로드·편집·삭제 기능은 없습니다.
