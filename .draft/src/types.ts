export type DayOfWeek = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';

export type EventCategory = 'Academic' | 'Work Shift' | 'Meeting' | 'Lab / Workshop' | 'Personal' | 'Milestone';

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

export interface ScheduleDocument {
  id: string;
  title: string;
  uploadedAt: string;
  sourceImageName: string;
  sourceImageUrl?: string;
  entriesCount: number;
  entries: ScheduleEntry[];
  status: 'analyzing' | 'processed' | 'synced';
}

export interface UserProfile {
  name: string;
  email: string;
  role: string;
  organization: string;
  avatarUrl: string;
  connectedCalendars: {
    googleCalendar: boolean;
    outlookCalendar: boolean;
    appleCalendar: boolean;
  };
  subscription: {
    planName: string;
    tier: 'Free' | 'Pro' | 'Enterprise';
    status: 'Active' | 'Trial' | 'Past Due';
    renewsOn: string;
    parsedCount: number;
    parsedLimit: number;
  };
}

export type ActiveScreen = 'landing' | 'auth' | 'upload' | 'schedule_view' | 'history' | 'profile';
