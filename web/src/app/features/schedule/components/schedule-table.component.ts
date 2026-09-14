import { Component, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  LucideCalendarSync,
  LucideEdit3,
  LucideTrash2,
  LucideMapPin,
  LucideSearch,
  LucidePlus,
} from '@lucide/angular';
import { DayOfWeek, EventCategory, ScheduleEntry } from '../../../core/models/schedule-entry.model';

@Component({
  selector: 'app-schedule-table',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    LucideCalendarSync,
    LucideEdit3,
    LucideTrash2,
    LucideMapPin,
    LucideSearch,
    LucidePlus,
  ],
  template: `
    <div class="bg-white border border-slate-200 rounded-[2px] elevation-1 overflow-x-auto">
      <table class="w-full text-left border-collapse min-w-[700px]">
        <thead>
          <tr class="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-600 uppercase tracking-wider">
            <th scope="col" class="py-3 px-4 w-36">Day & Date</th>
            <th scope="col" class="py-3 px-4 w-40">Time Window</th>
            <th scope="col" class="py-3 px-4 min-w-[240px]">Event Title & Notes</th>
            <th scope="col" class="py-3 px-4 w-48">Location / Room</th>
            <th scope="col" class="py-3 px-4 w-32">Category</th>
            <th scope="col" class="py-3 px-4 text-right w-28">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-200 text-xs">
          @if (entries().length === 0) {
            <!-- Empty Filtered State -->
            <tr>
              <td colspan="6" class="py-14 text-center">
                <div class="max-w-sm mx-auto flex flex-col items-center">
                  <div class="w-10 h-10 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mb-3">
                    <svg lucideSearch class="w-5 h-5"></svg>
                  </div>
                  <h3 class="text-sm font-bold text-slate-800">No matching schedule events</h3>
                  <p class="text-xs text-slate-500 mt-1 mb-4">
                    No entries match your active query. Try changing the category filter or search term.
                  </p>
                  <div class="flex items-center gap-2">
                    <button
                      type="button"
                      (click)="clearFilter.emit()"
                      class="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-[2px] hover:bg-slate-50 cursor-pointer"
                    >
                      Clear Filters
                    </button>
                    <button
                      type="button"
                      (click)="addNewEvent.emit()"
                      class="px-3 py-1.5 text-xs font-semibold text-white bg-[#1A365D] hover:bg-[#2A4365] rounded-[2px] elevation-1 cursor-pointer flex items-center gap-1"
                    >
                      <svg lucidePlus class="w-3.5 h-3.5"></svg>
                      <span>Add Event</span>
                    </button>
                  </div>
                </div>
              </td>
            </tr>
          } @else {
            @for (entry of entries(); track entry.id) {
              <tr
                [id]="'schedule-row-' + entry.id"
                class="hover:bg-[#F8FAFC] transition-colors group"
                [ngClass]="{ 'bg-blue-50/40': highlightedId() === entry.id }"
              >
                <!-- Day & Date -->
                <td class="py-3 px-4 align-top">
                  <div class="flex flex-col">
                    <select
                      [ngModel]="entry.day"
                      (ngModelChange)="fieldChange.emit({ id: entry.id, field: 'day', value: $event })"
                      class="bg-transparent font-semibold text-slate-900 border-b border-transparent hover:border-slate-300 focus:border-[#1A365D] focus:outline-none py-0.5 cursor-pointer text-xs"
                      [attr.aria-label]="'Day of week for ' + entry.name"
                    >
                      @for (d of days; track d) {
                        <option [value]="d">{{ d }}</option>
                      }
                    </select>
                    <input
                      type="date"
                      [ngModel]="entry.date"
                      (ngModelChange)="fieldChange.emit({ id: entry.id, field: 'date', value: $event })"
                      class="text-[11px] text-slate-500 font-mono bg-transparent border-b border-transparent hover:border-slate-300 focus:border-[#1A365D] focus:outline-none"
                      [attr.aria-label]="'Date for ' + entry.name"
                    />
                  </div>
                </td>

                <!-- Time Window -->
                <td class="py-3 px-4 align-top font-mono">
                  <div class="flex items-center gap-1">
                    <input
                      type="text"
                      [ngModel]="entry.startTime"
                      (ngModelChange)="fieldChange.emit({ id: entry.id, field: 'startTime', value: $event })"
                      class="w-14 bg-transparent border-b border-transparent hover:border-slate-300 focus:border-[#1A365D] focus:outline-none font-semibold text-slate-800 text-xs"
                      placeholder="09:00"
                      [attr.aria-label]="'Start time for ' + entry.name"
                    />
                    <span class="text-slate-400" aria-hidden="true">-</span>
                    <input
                      type="text"
                      [ngModel]="entry.endTime"
                      (ngModelChange)="fieldChange.emit({ id: entry.id, field: 'endTime', value: $event })"
                      class="w-14 bg-transparent border-b border-transparent hover:border-slate-300 focus:border-[#1A365D] focus:outline-none font-semibold text-slate-800 text-xs"
                      placeholder="10:30"
                      [attr.aria-label]="'End time for ' + entry.name"
                    />
                  </div>
                </td>

                <!-- Event Title & Notes -->
                <td class="py-3 px-4 align-top">
                  <div class="flex flex-col">
                    <input
                      type="text"
                      [ngModel]="entry.name"
                      (ngModelChange)="fieldChange.emit({ id: entry.id, field: 'name', value: $event })"
                      class="w-full bg-transparent font-bold text-slate-900 text-xs border-b border-transparent hover:border-slate-300 focus:border-[#1A365D] focus:outline-none py-0.5"
                      [attr.aria-label]="'Title for ' + entry.name"
                    />
                    <input
                      type="text"
                      [ngModel]="entry.notes || ''"
                      (ngModelChange)="fieldChange.emit({ id: entry.id, field: 'notes', value: $event })"
                      placeholder="Add brief note or instructor name..."
                      class="text-[11px] text-slate-400 bg-transparent border-b border-transparent hover:border-slate-300 focus:border-[#1A365D] focus:outline-none mt-0.5"
                      [attr.aria-label]="'Notes for ' + entry.name"
                    />
                  </div>
                </td>

                <!-- Location / Room -->
                <td class="py-3 px-4 align-top">
                  <div class="flex items-center gap-1.5">
                    <svg lucideMapPin class="w-3.5 h-3.5 text-slate-400 shrink-0"></svg>
                    <input
                      type="text"
                      [ngModel]="entry.location"
                      (ngModelChange)="fieldChange.emit({ id: entry.id, field: 'location', value: $event })"
                      class="w-full bg-transparent text-slate-700 border-b border-transparent hover:border-slate-300 focus:border-[#1A365D] focus:outline-none py-0.5 text-xs"
                      [attr.aria-label]="'Location for ' + entry.name"
                    />
                  </div>
                </td>

                <!-- Category Badge -->
                <td class="py-3 px-4 align-top">
                  <select
                    [ngModel]="entry.category"
                    (ngModelChange)="fieldChange.emit({ id: entry.id, field: 'category', value: $event })"
                    class="text-[11px] font-semibold border px-2 py-0.5 rounded-[2px] cursor-pointer focus:outline-none"
                    [ngClass]="getCategoryBadgeClass(entry.category)"
                    [attr.aria-label]="'Category for ' + entry.name"
                  >
                    @for (cat of categories; track cat) {
                      <option [value]="cat">{{ cat }}</option>
                    }
                  </select>
                </td>

                <!-- Actions: Sync, Highlight, Delete -->
                <td class="py-3 px-4 align-top text-right">
                  <div class="inline-flex items-center justify-end gap-1">
                    <button
                      type="button"
                      (click)="toggleSync.emit(entry.id)"
                      [title]="entry.isSynced ? 'Synced to Calendar' : 'Sync to Calendar'"
                      class="p-1.5 rounded-[2px] transition-colors cursor-pointer"
                      [ngClass]="{
                        'text-emerald-700 bg-emerald-50 hover:bg-emerald-100': entry.isSynced,
                        'text-slate-400 hover:text-[#1A365D] hover:bg-slate-100': !entry.isSynced
                      }"
                      [attr.aria-label]="entry.isSynced ? 'Remove from calendar sync' : 'Sync to calendar'"
                    >
                      <svg lucideCalendarSync class="w-3.5 h-3.5"></svg>
                    </button>

                    <button
                      type="button"
                      (click)="toggleHighlight(entry.id)"
                      title="Highlight row"
                      class="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-[2px] cursor-pointer"
                      aria-label="Highlight row"
                    >
                      <svg lucideEdit3 class="w-3.5 h-3.5"></svg>
                    </button>

                    <button
                      type="button"
                      (click)="deleteEntry.emit(entry.id)"
                      title="Remove event"
                      class="p-1.5 text-slate-400 hover:text-red-700 hover:bg-red-50 rounded-[2px] cursor-pointer"
                      aria-label="Delete event"
                    >
                      <svg lucideTrash2 class="w-3.5 h-3.5"></svg>
                    </button>
                  </div>
                </td>
              </tr>
            }
          }
        </tbody>
      </table>
    </div>
  `,
})
export class ScheduleTableComponent {
  readonly entries = input.required<ScheduleEntry[]>();

  readonly fieldChange = output<{ id: string; field: keyof ScheduleEntry; value: any }>();
  readonly toggleSync = output<string>();
  readonly deleteEntry = output<string>();
  readonly clearFilter = output<void>();
  readonly addNewEvent = output<void>();

  readonly highlightedId = signal<string | null>(null);

  readonly days: DayOfWeek[] = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];

  readonly categories: EventCategory[] = [
    'Academic',
    'Work Shift',
    'Meeting',
    'Lab / Workshop',
    'Personal',
    'Milestone',
  ];

  toggleHighlight(id: string): void {
    this.highlightedId.update((prev) => (prev === id ? null : id));
  }

  getCategoryBadgeClass(category: EventCategory): string {
    switch (category) {
      case 'Academic':
        return 'bg-blue-50 text-blue-800 border-blue-200';
      case 'Work Shift':
        return 'bg-slate-100 text-slate-800 border-slate-300';
      case 'Meeting':
        return 'bg-amber-50 text-amber-800 border-amber-200';
      case 'Lab / Workshop':
        return 'bg-purple-50 text-purple-800 border-purple-200';
      case 'Milestone':
        return 'bg-emerald-50 text-emerald-800 border-emerald-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  }
}
