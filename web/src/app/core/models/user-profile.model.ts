export interface ConnectedCalendars {
  googleCalendar: boolean;
  outlookCalendar: boolean;
  appleCalendar: boolean;
}

export interface UserSubscription {
  planName: string;
  tier: 'Free' | 'Pro' | 'Enterprise';
  status: 'Active' | 'Trial' | 'Past Due';
  renewsOn: string;
  parsedCount: number;
  parsedLimit: number;
}

export interface UserProfile {
  name: string;
  email: string;
  role: string;
  organization: string;
  avatarUrl: string;
  connectedCalendars: ConnectedCalendars;
  subscription: UserSubscription;
}
