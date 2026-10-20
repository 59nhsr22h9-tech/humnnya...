import type {Photo} from '../types';

// Source: ../source/all_character_photos.json; original records follow the supplied order.
const photos: readonly Photo[] = [
  {
    "id": "yoon-yeondo-photo-001",
    "src": "/photos/yoon-yeondo/01_sketches_paint.jpeg",
    "alt": "스케치, 그림 도구, 돋보기가 있는 작업대",
    "order": 1
  },
  {
    "id": "yoon-yeondo-photo-002",
    "src": "/photos/yoon-yeondo/02_rolled_papers.jpeg",
    "alt": "여러 종이와 말아 놓은 그림이 쌓인 작업실 선반",
    "order": 2
  },
  {
    "id": "yoon-yeondo-photo-003",
    "src": "/photos/yoon-yeondo/03_blurred_people.jpeg",
    "alt": "푸른빛으로 흐릿하게 보이는 여러 인물의 이미지",
    "order": 3
  }
];

export default photos;
