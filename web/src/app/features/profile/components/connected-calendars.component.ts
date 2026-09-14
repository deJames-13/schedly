import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConnectedCalendars } from '../../../core/models/user-profile.model';

@Component({
  selector: 'app-connected-calendars',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div id="section-connected-calendars" class="p-6 sm:p-8">
      <div class="mb-6">
        <h2 class="text-base font-bold text-slate-900">Connected Calendars</h2>
        <p class="text-xs text-slate-500">
          Enable two-way synchronization to automatically push extracted physical agendas into your daily calendars.
        </p>
      </div>

      <div class="space-y-4">
        <!-- Google Calendar Switch -->
        <div class="flex items-center justify-between p-3.5 border border-slate-200 rounded-[2px] bg-[#F8FAFC]">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 bg-white border border-slate-200 rounded-[2px] flex items-center justify-center shadow-xs shrink-0">
              <svg class="w-4 h-4" viewBox="0 0 24 24" aria-hidden="true">
                <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"/>
                <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.24v3.15C3.26 21.36 7.33 24 12 24z"/>
                <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.24C.45 8.16 0 9.97 0 12s.45 3.84 1.24 5.42l4.04-3.15z"/>
                <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.24 6.58l4.04 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
              </svg>
            </div>
            <div>
              <h3 class="text-xs font-bold text-slate-900">Google Calendar</h3>
              <p class="text-[11px] text-slate-500">Syncs to primary calendar at {{ email() }}</p>
            </div>
          </div>

          <button
            id="toggle-google-calendar"
            type="button"
            role="switch"
            [attr.aria-checked]="calendars().googleCalendar"
            (click)="toggleCalendar.emit('googleCalendar')"
            class="w-11 h-6 flex items-center rounded-none p-0.5 transition-colors cursor-pointer border"
            [ngClass]="{
              'bg-[#1A365D] border-[#1A365D]': calendars().googleCalendar,
              'bg-slate-200 border-slate-300': !calendars().googleCalendar
            }"
            aria-label="Toggle Google Calendar sync"
          >
            <div
              class="bg-white w-5 h-5 rounded-none shadow-sm transform transition-transform"
              [ngClass]="{
                'translate-x-5': calendars().googleCalendar,
                'translate-x-0': !calendars().googleCalendar
              }"
            ></div>
          </button>
        </div>

        <!-- Outlook Switch -->
        <div class="flex items-center justify-between p-3.5 border border-slate-200 rounded-[2px] bg-[#F8FAFC]">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 bg-blue-700 text-white rounded-[2px] flex items-center justify-center font-bold text-xs shadow-xs shrink-0">
              O
            </div>
            <div>
              <h3 class="text-xs font-bold text-slate-900">Microsoft Outlook / Office 365</h3>
              <p class="text-[11px] text-slate-500">Direct integration for corporate Exchange mailboxes</p>
            </div>
          </div>

          <button
            id="toggle-outlook-calendar"
            type="button"
            role="switch"
            [attr.aria-checked]="calendars().outlookCalendar"
            (click)="toggleCalendar.emit('outlookCalendar')"
            class="w-11 h-6 flex items-center rounded-none p-0.5 transition-colors cursor-pointer border"
            [ngClass]="{
              'bg-[#1A365D] border-[#1A365D]': calendars().outlookCalendar,
              'bg-slate-200 border-slate-300': !calendars().outlookCalendar
            }"
            aria-label="Toggle Microsoft Outlook sync"
          >
            <div
              class="bg-white w-5 h-5 rounded-none shadow-sm transform transition-transform"
              [ngClass]="{
                'translate-x-5': calendars().outlookCalendar,
                'translate-x-0': !calendars().outlookCalendar
              }"
            ></div>
          </button>
        </div>

        <!-- Apple iCloud Calendar Switch -->
        <div class="flex items-center justify-between p-3.5 border border-slate-200 rounded-[2px] bg-[#F8FAFC]">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 bg-slate-800 text-white rounded-[2px] flex items-center justify-center text-xs shadow-xs shrink-0">
              
            </div>
            <div>
              <h3 class="text-xs font-bold text-slate-900">Apple iCloud Calendar</h3>
              <p class="text-[11px] text-slate-500">Auto-publishes subscribed CalDAV events to macOS & iOS</p>
            </div>
          </div>

          <button
            id="toggle-apple-calendar"
            type="button"
            role="switch"
            [attr.aria-checked]="calendars().appleCalendar"
            (click)="toggleCalendar.emit('appleCalendar')"
            class="w-11 h-6 flex items-center rounded-none p-0.5 transition-colors cursor-pointer border"
            [ngClass]="{
              'bg-[#1A365D] border-[#1A365D]': calendars().appleCalendar,
              'bg-slate-200 border-slate-300': !calendars().appleCalendar
            }"
            aria-label="Toggle Apple Calendar sync"
          >
            <div
              class="bg-white w-5 h-5 rounded-none shadow-sm transform transition-transform"
              [ngClass]="{
                'translate-x-5': calendars().appleCalendar,
                'translate-x-0': !calendars().appleCalendar
              }"
            ></div>
          </button>
        </div>
      </div>
    </div>
  `,
})
export class ConnectedCalendarsComponent {
  readonly calendars = input.required<ConnectedCalendars>();
  readonly email = input<string>('');

  readonly toggleCalendar = output<keyof ConnectedCalendars>();
}
