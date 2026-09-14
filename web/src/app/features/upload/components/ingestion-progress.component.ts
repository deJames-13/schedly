import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideSparkles, LucideCheckCircle2 } from '@lucide/angular';
import { INGESTION_STEPS } from '../../../core/services/schedule-ingestion.service';

@Component({
  selector: 'app-ingestion-progress',
  standalone: true,
  imports: [CommonModule, LucideSparkles, LucideCheckCircle2],
  template: `
    <div
      id="upload-progress-panel"
      class="bg-white border border-slate-200 rounded-[2px] p-6 sm:p-8 elevation-2 transition-all"
      role="status"
      aria-live="polite"
    >
      <div class="flex flex-col sm:flex-row items-center gap-6">

        <!-- Image thumbnail preview -->
        @if (previewUrl()) {
          <div class="w-24 h-24 sm:w-28 sm:h-28 bg-slate-100 rounded-[2px] overflow-hidden border border-slate-200 shrink-0 relative">
            <img
              [src]="previewUrl()"
              [alt]="fileName()"
              class="w-full h-full object-cover"
            />
            <div class="absolute inset-0 bg-[#1A365D]/20 animate-pulse"></div>
          </div>
        }

        <div class="flex-1 w-full">
          <div class="flex items-center justify-between mb-2">
            <div class="flex items-center gap-2">
              <span class="inline-flex items-center gap-1.5 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider bg-blue-50 text-[#1A365D] border border-blue-200 rounded-[2px]">
                <svg lucideSparkles class="w-3 h-3 text-[#1A365D] animate-spin"></svg>
                <span>Synthesizing Document</span>
              </span>
              <span class="text-xs font-mono font-medium text-slate-600 truncate max-w-xs">
                {{ fileName() }}
              </span>
            </div>
            <span class="text-sm font-mono font-bold text-[#1A365D]">
              {{ percent() }}%
            </span>
          </div>

          <!-- Progress track & bar -->
          <div class="w-full bg-slate-100 h-2 rounded-[1px] overflow-hidden border border-slate-200 my-3">
            <div
              class="h-full bg-[#1A365D] transition-all duration-300 ease-out"
              [style.width.%]="percent()"
              role="progressbar"
              [attr.aria-valuenow]="percent()"
              aria-valuemin="0"
              aria-valuemax="100"
            ></div>
          </div>

          <!-- 4-step progressive status trail -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4 text-xs">
            @for (step of steps; track $index) {
              <div
                class="flex items-center gap-2 transition-opacity"
                [ngClass]="{
                  'text-emerald-700 font-semibold opacity-100': currentStep() > $index,
                  'text-[#1A365D] font-bold opacity-100 animate-pulse': currentStep() === $index,
                  'text-slate-400 opacity-50': currentStep() < $index
                }"
              >
                @if (currentStep() > $index) {
                  <svg lucideCheckCircle2 class="w-3.5 h-3.5 text-emerald-600 shrink-0"></svg>
                } @else {
                  <span class="w-3.5 h-3.5 rounded-full border border-current flex items-center justify-center text-[9px] shrink-0">
                    {{ $index + 1 }}
                  </span>
                }
                <span class="truncate">{{ step }}</span>
              </div>
            }
          </div>

        </div>
      </div>
    </div>
  `,
})
export class IngestionProgressComponent {
  readonly fileName = input.required<string>();
  readonly previewUrl = input<string | null>(null);
  readonly percent = input<number>(0);
  readonly currentStep = input<number>(0);

  readonly steps = INGESTION_STEPS;
}
