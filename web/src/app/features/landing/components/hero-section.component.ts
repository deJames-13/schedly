import { Component, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideSparkles, LucideArrowRight, LucideFileSpreadsheet, LucideCheck } from '@lucide/angular';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [CommonModule, LucideSparkles, LucideArrowRight, LucideFileSpreadsheet, LucideCheck],
  template: `
    <div class="max-w-4xl mx-auto text-center">
      <div class="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 border border-slate-200 rounded-[2px] text-xs font-semibold tracking-wide text-[#1A365D] mb-6">
        <svg lucideSparkles class="w-3.5 h-3.5 text-[#1A365D]"></svg>
        <span>AI-POWERED OPTICAL SCHEDULE PARSING</span>
      </div>

      <h1 class="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15] mb-6">
        Transform Your Physical Schedules into
        <span class="text-[#1A365D] underline decoration-slate-300 underline-offset-8">
          Digital Clarity
        </span>
        in Seconds
      </h1>

      <p class="text-lg sm:text-xl text-slate-600 font-normal leading-relaxed max-w-2xl mx-auto mb-10">
        Snap a photo of messy paper timetables, whiteboard shift rosters, or printed syllabi. Schedly extracts structured calendar events ready for instant inline editing and two-way calendar sync.
      </p>

      <div class="flex flex-col sm:flex-row items-center justify-center gap-3.5">
        <button
          id="hero-cta-get-started"
          type="button"
          (click)="getStarted.emit()"
          class="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#1A365D] hover:bg-[#2A4365] text-white text-sm font-semibold rounded-[2px] elevation-2 transition-all cursor-pointer focus:ring-2 focus:ring-[#1A365D]"
        >
          <span>Get Started</span>
          <svg lucideArrowRight class="w-4 h-4"></svg>
        </button>

        <button
          id="hero-cta-explore-demo"
          type="button"
          (click)="loadDemo.emit('preset-academic')"
          class="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 text-sm font-semibold rounded-[2px] elevation-1 transition-all cursor-pointer"
        >
          <svg lucideFileSpreadsheet class="w-4 h-4 text-slate-600"></svg>
          <span>Load Sample Schedule</span>
        </button>
      </div>

      <!-- Micro trust indicators -->
      <div class="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs font-medium text-slate-500">
        <span class="flex items-center gap-1.5">
          <svg lucideCheck class="w-4 h-4 text-[#1A365D]"></svg> No credit card required
        </span>
        <span class="flex items-center gap-1.5">
          <svg lucideCheck class="w-4 h-4 text-[#1A365D]"></svg> Google, Outlook & Apple Sync
        </span>
        <span class="flex items-center gap-1.5">
          <svg lucideCheck class="w-4 h-4 text-[#1A365D]"></svg> Clean .ICS export
        </span>
      </div>
    </div>
  `,
})
export class HeroSectionComponent {
  readonly getStarted = output<void>();
  readonly loadDemo = output<string>();
}
