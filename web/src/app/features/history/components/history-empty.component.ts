import { Component, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideFileText, LucideUpload } from '@lucide/angular';

@Component({
  selector: 'app-history-empty',
  standalone: true,
  imports: [CommonModule, LucideFileText, LucideUpload],
  template: `
    <div class="bg-white border border-slate-200 p-12 text-center rounded-[2px] elevation-1 my-6">
      <div class="w-12 h-12 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-3">
        <svg lucideFileText class="w-6 h-6"></svg>
      </div>
      <h3 class="text-base font-bold text-slate-800">No schedules digitized yet</h3>
      <p class="text-xs text-slate-500 mt-1 max-w-sm mx-auto mb-5">
        Upload your first photo of a paper schedule or timetable to begin your personal archive.
      </p>
      <button
        type="button"
        (click)="uploadNew.emit()"
        class="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-[#1A365D] hover:bg-[#2A4365] rounded-[2px] elevation-1 transition-all cursor-pointer"
      >
        <svg lucideUpload class="w-3.5 h-3.5"></svg>
        <span>Upload Schedule Image</span>
      </button>
    </div>
  `,
})
export class HistoryEmptyComponent {
  readonly uploadNew = output<void>();
}
