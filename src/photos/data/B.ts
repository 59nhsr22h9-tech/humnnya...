import type {Photo} from '../types';

// Source: ../source/all_character_photos.json; original records follow the supplied order.
const photos: readonly Photo[] = [
  {
    "id": "lim-hyeongwoo-photo-001",
    "src": "/photos/lim-hyeongwoo/01_beatles_photo.jpeg",
    "alt": "비틀즈 공연 장면의 흑백 사진",
    "order": 1
  },
  {
    "id": "lim-hyeongwoo-photo-002",
    "src": "/photos/lim-hyeongwoo/02_polaroid_notes.jpeg",
    "alt": "손글씨 노트와 여러 장의 폴라로이드 사진",
    "order": 2
  },
  {
    "id": "lim-hyeongwoo-photo-003",
    "src": "/photos/lim-hyeongwoo/03_bridge_at_dusk.jpeg",
    "alt": "해 질 녘 이동 중에 바라본 다리와 도시의 불빛",
    "order": 3
  }
];

export default photos;
