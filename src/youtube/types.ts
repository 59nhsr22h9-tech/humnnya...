export type HistoryVideo = Readonly<{
  id: string;
  videoId: string;
  originalUrl: string;
  title: string | null;
  channel: string | null;
  thumbnailUrl: string;
  thumbnailSrc?: string;
  order: number;
}>;
