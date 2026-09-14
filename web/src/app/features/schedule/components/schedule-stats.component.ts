import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideCalendar, LucideCheckCircle2, LucideClock, LucideLayers } from '@lucide/angular';

@Component({
  selector: 'app-schedule-stats',
  standalone: true,
  imports: [CommonModule, LucideCalendar, LucideCheckCircle2, LucideClock, LucideLayers],
  template: `
    <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
      <div class="bg-white border border-slate-200 p-3.5 rounded-[2px] elevation-1 flex items-center gap-3">
        <div class="w-8 h-8 bg-blue-50 text-[#1A365D] rounded-[2px] flex items-center justify-center shrink-0">
          <svg lucideCalendar class="w-4 h-4"></svg>
        </div>
        <div>
          <div class="text-lg font-bold text-slate-900 leading-none">{{ totalCount() }}</div>
          <div class="text-[11px] text-slate-500 font-medium uppercase mt-0.5">Total Events</div>
        </div>
      </div>

      <div class="bg-white border border-slate-200 p-3.5 rounded-[2px] elevation-1 flex items-center gap-3">
        <div class="w-8 h-8 bg-emerald-50 text-emerald-700 rounded-[2px] flex items-center justify-center shrink-0">
          <svg lucideCheckCircle2 class="w-4 h-4"></svg>
        </div>
        <div>
          <div class="text-lg font-bold text-emerald-700 leading-none">{{ syncedCount() }}</div>
          <div class="text-[11px] text-slate-500 font-medium uppercase mt-0.5">Synced to Cloud</div>
        </div>
      </div>

      <div class="bg-white border border-slate-200 p-3.5 rounded-[2px] elevation-1 flex items-center gap-3">
        <div class="w-8 h-8 bg-amber-50 text-amber-700 rounded-[2px] flex items-center justify-center shrink-0">
          <svg lucideClock class="w-4 h-4"></svg>
        </div>
        <div>
          <div class="text-lg font-bold text-amber-700 leading-none">{{ unsyncedCount() }}</div>
          <div class="text-[11px] text-slate-500 font-medium uppercase mt-0.5">Pending Sync</div>
        </div>
      </div>

      <div class="bg-white border border-slate-200 p-3.5 rounded-[2px] elevation-1 flex items-center gap-3">
        <div class="w-8 h-8 bg-purple-50 text-purple-700 rounded-[2px] flex items-center justify-center shrink-0">
          <svg lucideLayers class="w-4 h-4"></svg>
        </div>
        <div>
          <div class="text-lg font-bold text-purple-700 leading-none">{{ categoriesCount() }}</div>
          <div class="text-[11px] text-slate-500 font-medium uppercase mt-0.5">Event Types</div>
        </div>
      </div>
    </div>
  `,
})
export class ScheduleStatsComponent {
  readonly totalCount = input<number>(0);
  readonly syncedCount = input<number>(0);
  readonly unsyncedCount = input<number>(0);
  readonly categoriesCount = input<number>(0);
}
