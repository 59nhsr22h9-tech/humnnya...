export type NoteRecord = Readonly<{
  id: string;
  title: string;
  body: string;
  createdAt: string;
  updatedAt: string;
  pinned: boolean;
}>;
