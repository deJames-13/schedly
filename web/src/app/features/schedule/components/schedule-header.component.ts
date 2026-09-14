import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideArrowLeft, LucidePlus, LucideDownload, LucideCalendarSync } from '@lucide/angular';
import { DocumentStatus } from '../../../core/models/schedule-document.model';

@Component({
  selector: 'app-schedule-header',
  standalone: true,
  imports: [CommonModule, LucideArrowLeft, LucidePlus, LucideDownload, LucideCalendarSync],
  template: `
    <div class="flex flex-col md:flex-row md:items-center justify-between pb-6 mb-6 border-b border-slate-200 gap-4">
      <div>
        <div class="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-1">
          <button
            type="button"
            (click)="backToUpload.emit()"
            class="hover:text-[#1A365D] flex items-center gap-1 font-medium cursor-pointer"
          >
            <svg lucideArrowLeft class="w-3.5 h-3.5"></svg>
            <span>Back to Ingestion</span>
          </button>
          <span>/</span>
          <span class="text-[#1A365D] font-mono">CONFIDENCE: 98.4%</span>
        </div>

        <div class="flex items-center gap-3">
          <h1 class="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            {{ title() }}
          </h1>
          <span
            class="text-[11px] font-mono px-2 py-0.5 rounded-[2px] font-semibold border"
            [ngClass]="{
              'bg-emerald-50 text-emerald-800 border-emerald-200': status() === 'synced',
              'bg-blue-50 text-blue-800 border-blue-200': status() !== 'synced'
            }"
          >
            {{ status() === 'synced' ? 'Synced to Calendar' : 'Parsed & Ready' }}
          </span>
          <span class="text-[11px] font-mono px-2 py-0.5 bg-slate-100 border border-slate-300 rounded-[2px] text-slate-700 hidden sm:inline">
            {{ totalEvents() }} Events
          </span>
        </div>
      </div>

      <!-- Action Controls -->
      <div class="flex flex-wrap items-center gap-2.5">
        <button
          id="btn-add-event-modal"
          type="button"
          (click)="openAddModal.emit()"
          class="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-[2px] hover:bg-slate-50 elevation-1 transition-all cursor-pointer"
        >
          <svg lucidePlus class="w-3.5 h-3.5"></svg>
          <span>Add Event</span>
        </button>

        <button
          id="btn-export-ics"
          type="button"
          (click)="exportIcs.emit()"
          class="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-[2px] hover:bg-slate-50 elevation-1 transition-all cursor-pointer"
          title="Download standard .ics file"
        >
          <svg lucideDownload class="w-3.5 h-3.5"></svg>
          <span>Export .ICS</span>
        </button>

        <button
          id="btn-save-and-sync-primary"
          type="button"
          (click)="saveAndSync.emit()"
          class="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-[#1A365D] hover:bg-[#2A4365] rounded-[2px] elevation-2 transition-all cursor-pointer"
        >
          <svg lucideCalendarSync class="w-4 h-4"></svg>
          <span>Save & Sync</span>
        </button>
      </div>
    </div>
  `,
})
export class ScheduleHeaderComponent {
  readonly title = input.required<string>();
  readonly status = input<DocumentStatus>('processed');
  readonly totalEvents = input<number>(0);

  readonly backToUpload = output<void>();
  readonly openAddModal = output<void>();
  readonly exportIcs = output<void>();
  readonly saveAndSync = output<void>();
}
