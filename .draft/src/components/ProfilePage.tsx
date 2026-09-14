import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Building2, 
  Calendar, 
  CreditCard, 
  LogOut, 
  Check, 
  Camera, 
  Shield, 
  ExternalLink,
  CheckCircle2,
  Bell
} from 'lucide-react';
import { UserProfile } from '../types';

interface ProfilePageProps {
  user: UserProfile;
  onUpdateUser: (updated: UserProfile) => void;
  onLogout: () => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({
  user,
  onUpdateUser,
  onLogout,
}) => {
  const [profile, setProfile] = useState<UserProfile>(user);
  const [isSaved, setIsSaved] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleProfileFieldChange = (field: keyof UserProfile, value: any) => {
    const updated = { ...profile, [field]: value };
    setProfile(updated);
    onUpdateUser(updated);
    setIsSaved(true);
    showNotification('Profile information updated.');
  };

  const handleToggleCalendar = (key: keyof UserProfile['connectedCalendars']) => {
    const nextState = !profile.connectedCalendars[key];
    const updated = {
      ...profile,
      connectedCalendars: {
        ...profile.connectedCalendars,
        [key]: nextState,
      },
    };
    setProfile(updated);
    onUpdateUser(updated);
    const calName =
      key === 'googleCalendar' ? 'Google Calendar' : key === 'outlookCalendar' ? 'Microsoft Outlook' : 'Apple Calendar';
    showNotification(nextState ? `Connected to ${calName}` : `Disconnected from ${calName}`);
  };

  return (
    <div id="profile-page-container" className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Toast */}
      {toastMessage && (
        <div 
          id="profile-toast"
          className="fixed bottom-6 right-6 z-50 bg-[#1A365D] text-white px-4 py-3 rounded-[2px] elevation-3 flex items-center gap-2.5 text-xs font-medium border border-slate-700 animate-in fade-in"
        >
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Page Header */}
      <div className="pb-6 mb-8 border-b border-slate-200">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          Account Settings & Integrations
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Manage your personal profile, linked calendar services, and enterprise quotas.
        </p>
      </div>

      {/* Settings Card */}
      <div className="bg-white border border-slate-200 rounded-[2px] elevation-1 divide-y divide-slate-200">
        
        {/* Section 1: User Details (Inline Editable) */}
        <div id="section-user-details" className="p-6 sm:p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                User Details
              </h2>
              <p className="text-xs text-slate-500">
                Personal identity associated with calendar author tags.
              </p>
            </div>
            <span className="text-[10px] font-mono uppercase bg-slate-100 px-2 py-0.5 rounded-[2px] text-slate-600">
              Inline Editable
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-6">
            {/* Avatar with Minimal Frame */}
            <div className="relative group">
              <img
                src={profile.avatarUrl}
                alt={profile.name}
                className="w-20 h-20 rounded-[2px] object-cover border border-slate-300"
              />
              <button
                type="button"
                onClick={() => {
                  const newAvatar = prompt('Enter image URL for avatar:', profile.avatarUrl);
                  if (newAvatar) handleProfileFieldChange('avatarUrl', newAvatar);
                }}
                className="absolute inset-0 bg-slate-900/60 text-white rounded-[2px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-xs"
                title="Change Avatar URL"
              >
                <Camera className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Summary */}
            <div className="flex-1 space-y-1">
              <h3 className="text-base font-bold text-slate-900">{profile.name}</h3>
              <p className="text-xs text-slate-600">{profile.role}</p>
              <p className="text-xs font-mono text-slate-400">{profile.email}</p>
            </div>
          </div>

          {/* Form Fields with Material Floating Label Bottom-Border Accent */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-[11px] font-semibold uppercase text-slate-600 mb-1">
                Full Display Name
              </label>
              <input
                id="input-profile-name"
                type="text"
                value={profile.name}
                onChange={(e) => handleProfileFieldChange('name', e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-[2px] focus:bg-white focus:border-[#1A365D] focus:outline-none transition-all font-medium text-slate-900"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold uppercase text-slate-600 mb-1">
                Email Address
              </label>
              <input
                id="input-profile-email"
                type="email"
                value={profile.email}
                onChange={(e) => handleProfileFieldChange('email', e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-[2px] focus:bg-white focus:border-[#1A365D] focus:outline-none transition-all font-medium text-slate-900"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold uppercase text-slate-600 mb-1">
                Role / Title
              </label>
              <input
                id="input-profile-role"
                type="text"
                value={profile.role}
                onChange={(e) => handleProfileFieldChange('role', e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-[2px] focus:bg-white focus:border-[#1A365D] focus:outline-none transition-all font-medium text-slate-900"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold uppercase text-slate-600 mb-1">
                Organization / Institution
              </label>
              <input
                id="input-profile-org"
                type="text"
                value={profile.organization}
                onChange={(e) => handleProfileFieldChange('organization', e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-[2px] focus:bg-white focus:border-[#1A365D] focus:outline-none transition-all font-medium text-slate-900"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Connected Calendars (Simple Toggle Switches) */}
        <div id="section-connected-calendars" className="p-6 sm:p-8">
          <div className="mb-6">
            <h2 className="text-base font-bold text-slate-900">
              Connected Calendars
            </h2>
            <p className="text-xs text-slate-500">
              Enable two-way synchronization to automatically push extracted physical agendas into your daily calendars.
            </p>
          </div>

          <div className="space-y-4">
            
            {/* Google Calendar Switch */}
            <div className="flex items-center justify-between p-3.5 border border-slate-200 rounded-[2px] bg-[#F8FAFC]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white border border-slate-200 rounded-[2px] flex items-center justify-center shadow-xs">
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"/>
                    <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.24v3.15C3.26 21.36 7.33 24 12 24z"/>
                    <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.24C.45 8.16 0 9.97 0 12s.45 3.84 1.24 5.42l4.04-3.15z"/>
                    <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.24 6.58l4.04 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
                  </svg>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Google Calendar</h4>
                  <p className="text-[11px] text-slate-500">Syncs to primary calendar at {profile.email}</p>
                </div>
              </div>

              {/* Minimal Material Toggle Switch */}
              <button
                id="toggle-google-calendar"
                type="button"
                onClick={() => handleToggleCalendar('googleCalendar')}
                className={`w-11 h-6 flex items-center rounded-none p-0.5 transition-colors cursor-pointer border ${
                  profile.connectedCalendars.googleCalendar
                    ? 'bg-[#1A365D] border-[#1A365D]'
                    : 'bg-slate-200 border-slate-300'
                }`}
              >
                <div
                  className={`bg-white w-5 h-5 rounded-none shadow-sm transform transition-transform ${
                    profile.connectedCalendars.googleCalendar ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Outlook Switch */}
            <div className="flex items-center justify-between p-3.5 border border-slate-200 rounded-[2px] bg-[#F8FAFC]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-700 text-white rounded-[2px] flex items-center justify-center font-bold text-xs shadow-xs">
                  O
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Microsoft Outlook / Office 365</h4>
                  <p className="text-[11px] text-slate-500">Direct integration for corporate Exchange mailboxes</p>
                </div>
              </div>

              <button
                id="toggle-outlook-calendar"
                type="button"
                onClick={() => handleToggleCalendar('outlookCalendar')}
                className={`w-11 h-6 flex items-center rounded-none p-0.5 transition-colors cursor-pointer border ${
                  profile.connectedCalendars.outlookCalendar
                    ? 'bg-[#1A365D] border-[#1A365D]'
                    : 'bg-slate-200 border-slate-300'
                }`}
              >
                <div
                  className={`bg-white w-5 h-5 rounded-none shadow-sm transform transition-transform ${
                    profile.connectedCalendars.outlookCalendar ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Apple Calendar Switch */}
            <div className="flex items-center justify-between p-3.5 border border-slate-200 rounded-[2px] bg-[#F8FAFC]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-slate-800 text-white rounded-[2px] flex items-center justify-center text-xs shadow-xs">
                  
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Apple iCloud Calendar</h4>
                  <p className="text-[11px] text-slate-500">Auto-publishes subscribed CalDAV events to macOS & iOS</p>
                </div>
              </div>

              <button
                id="toggle-apple-calendar"
                type="button"
                onClick={() => handleToggleCalendar('appleCalendar')}
                className={`w-11 h-6 flex items-center rounded-none p-0.5 transition-colors cursor-pointer border ${
                  profile.connectedCalendars.appleCalendar
                    ? 'bg-[#1A365D] border-[#1A365D]'
                    : 'bg-slate-200 border-slate-300'
                }`}
              >
                <div
                  className={`bg-white w-5 h-5 rounded-none shadow-sm transform transition-transform ${
                    profile.connectedCalendars.appleCalendar ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

          </div>
        </div>

        {/* Section 3: Subscription / Billing Status */}
        <div id="section-subscription-billing" className="p-6 sm:p-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Subscription & Quota
              </h2>
              <p className="text-xs text-slate-500">
                Current plan tier and document OCR consumption.
              </p>
            </div>
            <span className="px-2 py-0.5 bg-blue-50 border border-blue-200 text-[#1A365D] text-xs font-bold rounded-[2px]">
              {profile.subscription.planName}
            </span>
          </div>

          <div className="bg-slate-50 border border-slate-200 p-4 rounded-[2px] mb-4">
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="font-semibold text-slate-700">Monthly Parsing Quota:</span>
              <span className="font-mono font-bold text-[#1A365D]">
                {profile.subscription.parsedCount} / {profile.subscription.parsedLimit} schedules used
              </span>
            </div>

            {/* Quota bar */}
            <div className="w-full bg-slate-200 h-2 rounded-[1px] overflow-hidden">
              <div
                className="bg-[#1A365D] h-full"
                style={{
                  width: `${(profile.subscription.parsedCount / profile.subscription.parsedLimit) * 100}%`,
                }}
              />
            </div>

            <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500">
              <span>Renews on {profile.subscription.renewsOn}</span>
              <span className="text-emerald-700 font-medium">Status: {profile.subscription.status}</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-500">Need higher document volume or custom OCR templates?</span>
            <button
              onClick={() => alert('Enterprise upgrade portal: contact enterprise-sales@schedly.com')}
              className="font-semibold text-[#1A365D] hover:underline"
            >
              Upgrade Tier →
            </button>
          </div>
        </div>

        {/* Section 4: Muted Log Out Button */}
        <div id="section-logout-footer" className="p-6 sm:p-8 bg-[#F8FAFC] flex items-center justify-between">
          <div>
            <h4 className="text-xs font-bold text-slate-800">Sign Out of Session</h4>
            <p className="text-[11px] text-slate-500">
              Clear current authentication token and return to visitor portal.
            </p>
          </div>

          <button
            id="btn-profile-logout"
            type="button"
            onClick={onLogout}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-600 bg-white border border-slate-300 hover:text-red-700 hover:border-red-300 hover:bg-red-50 rounded-[2px] transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Log Out</span>
          </button>
        </div>

      </div>

    </div>
  );
};
