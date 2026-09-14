export type DayOfWeek = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';

export type EventCategory =
  | 'Academic'
  | 'Work Shift'
  | 'Meeting'
  | 'Lab / Workshop'
  | 'Personal'
  | 'Milestone';

export interface ScheduleEntry {
  id: string;
  name: string;
  day: DayOfWeek;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  category: EventCategory;
  notes?: string;
  isSynced?: boolean;
}
