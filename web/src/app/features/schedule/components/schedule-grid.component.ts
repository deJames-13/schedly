import { Component, computed, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideCalendarSync, LucideTrash2, LucideMapPin } from '@lucide/angular';
import { DayOfWeek, EventCategory, ScheduleEntry } from '../../../core/models/schedule-entry.model';

@Component({
  selector: 'app-schedule-grid',
  standalone: true,
  imports: [CommonModule, LucideCalendarSync, LucideTrash2, LucideMapPin],
  template: `
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
      @for (day of days; track day) {
        <div class="bg-white border border-slate-200 rounded-[2px] elevation-1 flex flex-col min-h-[340px]">
          <!-- Day Column Header -->
          <div class="bg-slate-50 border-b border-slate-200 p-2.5 flex items-center justify-between">
            <span class="text-xs font-bold text-slate-900">{{ day.slice(0, 3) }}</span>
            <span class="text-[10px] font-mono text-slate-400">
              {{ getDayEntries(day).length }} items
            </span>
          </div>

          <!-- Day Events List -->
          <div class="p-2 space-y-2 flex-1 overflow-y-auto">
            @if (getDayEntries(day).length === 0) {
              <div class="h-full flex items-center justify-center text-[11px] text-slate-300 italic p-4 text-center">
                No events
              </div>
            } @else {
              @for (entry of getDayEntries(day); track entry.id) {
                <div
                  class="p-2 bg-white border border-slate-200 rounded-[2px] elevation-1 hover:border-[#1A365D] transition-all group relative"
                >
                  <div class="flex items-center justify-between mb-1">
                    <span class="text-[10px] font-mono font-bold text-[#1A365D]">
                      {{ entry.startTime }}
                    </span>
                    <span
                      class="text-[9px] font-semibold border px-1 py-0.2 rounded-[1px]"
                      [ngClass]="getCategoryBadgeClass(entry.category)"
                    >
                      {{ entry.category }}
                    </span>
                  </div>

                  <h4 class="text-xs font-bold text-slate-900 leading-tight">
                    {{ entry.name }}
                  </h4>

                  @if (entry.location) {
                    <div class="text-[10px] text-slate-500 mt-1 flex items-center gap-1">
                      <svg lucideMapPin class="w-2.5 h-2.5 shrink-0"></svg>
                      <span class="truncate">{{ entry.location }}</span>
                    </div>
                  }

                  <div class="mt-2 pt-1 border-t border-slate-100 flex items-center justify-between">
                    <button
                      type="button"
                      (click)="toggleSync.emit(entry.id)"
                      class="text-[10px] font-medium flex items-center gap-0.5 cursor-pointer"
                      [ngClass]="{
                        'text-emerald-700': entry.isSynced,
                        'text-slate-400 hover:text-slate-700': !entry.isSynced
                      }"
                      [attr.aria-label]="entry.isSynced ? 'Remove from sync' : 'Sync event'"
                    >
                      <svg lucideCalendarSync class="w-2.5 h-2.5"></svg>
                      <span>{{ entry.isSynced ? 'Synced' : 'Sync' }}</span>
                    </button>

                    <button
                      type="button"
                      (click)="deleteEntry.emit(entry.id)"
                      class="text-slate-300 hover:text-red-600 p-0.5 cursor-pointer"
                      title="Remove event"
                      [attr.aria-label]="'Delete ' + entry.name"
                    >
                      <svg lucideTrash2 class="w-2.5 h-2.5"></svg>
                    </button>
                  </div>
                </div>
              }
            }
          </div>
        </div>
      }
    </div>
  `,
})
export class ScheduleGridComponent {
  readonly entries = input.required<ScheduleEntry[]>();

  readonly toggleSync = output<string>();
  readonly deleteEntry = output<string>();

  readonly days: DayOfWeek[] = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];

  getDayEntries(day: DayOfWeek): ScheduleEntry[] {
    return this.entries().filter((e) => e.day === day);
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
