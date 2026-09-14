import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideCheckCircle2, LucideSparkles } from '@lucide/angular';

@Component({
  selector: 'app-ocr-guidelines',
  standalone: true,
  imports: [CommonModule, LucideCheckCircle2, LucideSparkles],
  template: `
    <div class="mt-8 bg-slate-50 border border-slate-200 p-5 rounded-[2px] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div class="flex items-start gap-3">
        <div class="w-8 h-8 bg-white border border-slate-200 text-[#1A365D] rounded-[2px] flex items-center justify-center shrink-0 shadow-xs">
          <svg lucideSparkles class="w-4 h-4 text-[#1A365D]"></svg>
        </div>
        <div>
          <h4 class="text-xs font-bold text-slate-900">Tips for Optimal OCR Recognition</h4>
          <p class="text-xs text-slate-500 mt-0.5">
            Ensure clear focus, flat paper surface, and sufficient lighting for maximum character extraction accuracy.
          </p>
        </div>
      </div>

      <div class="flex flex-wrap items-center gap-4 text-xs text-slate-600">
        <span class="flex items-center gap-1">
          <svg lucideCheckCircle2 class="w-3.5 h-3.5 text-emerald-600"></svg> No glare / reflections
        </span>
        <span class="flex items-center gap-1">
          <svg lucideCheckCircle2 class="w-3.5 h-3.5 text-emerald-600"></svg> Full borders visible
        </span>
        <span class="flex items-center gap-1">
          <svg lucideCheckCircle2 class="w-3.5 h-3.5 text-emerald-600"></svg> High contrast text
        </span>
      </div>
    </div>
  `,
})
export class OcrGuidelinesComponent {}
