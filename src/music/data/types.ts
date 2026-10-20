export type PersonId = 'A' | 'B' | 'C' | 'D';

export type Track = Readonly<{
  id: string;
  title: string;
  artist: string;
  audioSrc: string;
  coverImage: string;
}>;
