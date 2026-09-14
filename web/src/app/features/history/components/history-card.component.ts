import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideFileCheck2, LucideDownload, LucideTrash2, LucideArrowRight } from '@lucide/angular';
import { ScheduleDocument } from '../../../core/models/schedule-document.model';

@Component({
  selector: 'app-history-card',
  standalone: true,
  imports: [CommonModule, LucideFileCheck2, LucideDownload, LucideTrash2, LucideArrowRight],
  template: `
    <div
      [id]="'history-doc-' + doc().id"
      class="bg-white border border-slate-200 hover:border-[#1A365D] p-4 sm:p-5 rounded-[2px] elevation-1 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
    >
      <div class="flex items-start gap-4">
        <div class="w-10 h-10 bg-slate-100 text-[#1A365D] rounded-[2px] flex items-center justify-center font-bold shrink-0 mt-0.5 border border-slate-200">
          <svg lucideFileCheck2 class="w-5 h-5"></svg>
        </div>

        <div>
          <div class="flex flex-wrap items-center gap-2">
            <h3
              (click)="openDocument.emit(doc().id)"
              class="text-sm font-bold text-slate-900 group-hover:text-[#1A365D] transition-colors cursor-pointer"
            >
              {{ doc().title }}
            </h3>
            <span
              class="text-[10px] font-mono px-2 py-0.5 rounded-[2px] font-semibold border"
              [ngClass]="{
                'bg-emerald-50 text-emerald-800 border-emerald-200': doc().status === 'synced',
                'bg-blue-50 text-blue-800 border-blue-200': doc().status !== 'synced'
              }"
            >
              {{ doc().status === 'synced' ? 'Synced to Calendar' : 'Parsed & Ready' }}
            </span>
          </div>

          <div class="flex flex-wrap items-center gap-3 text-xs text-slate-500 mt-1 font-mono">
            <span>Source: {{ doc().sourceImageName }}</span>
            <span aria-hidden="true">•</span>
            <span>{{ doc().entriesCount }} Events</span>
            <span aria-hidden="true">•</span>
            <span>Uploaded: {{ doc().uploadedAt }}</span>
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex items-center gap-2 self-end sm:self-auto shrink-0">
        <button
          type="button"
          (click)="exportIcs.emit(doc())"
          title="Download .ICS file"
          class="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 border border-slate-200 rounded-[2px] transition-colors cursor-pointer"
          aria-label="Export ICS calendar"
        >
          <svg lucideDownload class="w-3.5 h-3.5"></svg>
        </button>

        <button
          type="button"
          (click)="deleteDocument.emit(doc().id)"
          title="Delete document archive"
          class="p-2 text-slate-400 hover:text-red-700 hover:bg-red-50 border border-slate-200 rounded-[2px] transition-colors cursor-pointer"
          aria-label="Delete document"
        >
          <svg lucideTrash2 class="w-3.5 h-3.5"></svg>
        </button>

        <button
          type="button"
          (click)="openDocument.emit(doc().id)"
          class="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-white bg-[#1A365D] hover:bg-[#2A4365] rounded-[2px] elevation-1 transition-all cursor-pointer"
        >
          <span>Open Schedule</span>
          <svg lucideArrowRight class="w-3.5 h-3.5"></svg>
        </button>
      </div>
    </div>
  `,
})
export class HistoryCardComponent {
  readonly doc = input.required<ScheduleDocument>();

  readonly openDocument = output<string>();
  readonly exportIcs = output<ScheduleDocument>();
  readonly deleteDocument = output<string>();
}
