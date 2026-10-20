export type CallRecord = Readonly<{
  id: string;
  contactId: string | null;
  contactName: string;
  timestamp: string;
  direction: 'incoming' | 'outgoing' | 'missed';
  status: 'completed' | 'missed' | 'unanswered';
  durationSeconds: number;
  sharedCallId?: string;
}>;
