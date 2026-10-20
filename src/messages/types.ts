export type PersonId = 'A' | 'B' | 'C' | 'D';
export type MessageRecord = Readonly<{
  id: string;
  /** Original uploaded identifier, retained when imported IDs need conversation scoping. */
  sourceId?: string;
  sender: string;
  recipient: string;
  text: string;
  /** YYYY-MM-DD, Korean local date */
  date: string;
  /** HH:mm or HH:mm:ss, Korean local time */
  time: string;
}>;
export type Conversation = Readonly<{
  id: string;
  contact: Readonly<{id: string; name: string}>;
  messages: readonly MessageRecord[];
}>;
export type MessageHistory = Readonly<{
  owner: PersonId;
  conversations: readonly Conversation[];
}>;
