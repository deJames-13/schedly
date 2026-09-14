import { ScheduleEntry } from './schedule-entry.model';

export type DocumentStatus = 'analyzing' | 'processed' | 'synced';

export interface ScheduleDocument {
  id: string;
  title: string;
  uploadedAt: string;
  sourceImageName: string;
  sourceImageUrl?: string;
  entriesCount: number;
  entries: ScheduleEntry[];
  status: DocumentStatus;
}
