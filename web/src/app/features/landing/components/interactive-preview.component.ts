import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideSlidersHorizontal } from '@lucide/angular';

@Component({
  selector: 'app-interactive-preview',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideSlidersHorizontal],
  template: `
    <div id="hero-interactive-mockup" class="mt-14 max-w-5xl mx-auto">
      <div class="bg-white border border-slate-300 rounded-[2px] elevation-3 overflow-hidden">

        <!-- Mockup Toolbar Header -->
        <div class="bg-[#1A365D] text-white px-4 py-3 flex items-center justify-between border-b border-slate-800">
          <div class="flex items-center gap-3">
            <div class="flex items-center gap-1.5" aria-hidden="true">
              <div class="w-2.5 h-2.5 rounded-none bg-red-400"></div>
              <div class="w-2.5 h-2.5 rounded-none bg-amber-400"></div>
              <div class="w-2.5 h-2.5 rounded-none bg-emerald-400"></div>
            </div>
            <span class="text-xs font-mono font-medium tracking-wide text-slate-200">
              SCHEDLY PARSER ENGINE v2.6 // REAL-TIME CONVERSION
            </span>
          </div>

          <div class="flex items-center gap-2 text-xs text-slate-300">
            <svg lucideSlidersHorizontal class="w-3.5 h-3.5"></svg>
            <span class="hidden sm:inline">Drag slider or toggle below to compare</span>
          </div>
        </div>

        <!-- Split interactive comparison viewport -->
        <div class="relative h-[380px] sm:h-[440px] select-none overflow-hidden bg-slate-100">

          <!-- Background Layer: Clean Structured Digital UI -->
          <div class="absolute inset-0 bg-[#F8FAFC] p-4 sm:p-6 overflow-y-auto">
            <div class="flex items-center justify-between pb-3 mb-4 border-b border-slate-200">
              <div class="flex items-center gap-2">
                <span class="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[11px] font-semibold rounded-[2px]">
                  PARSED (100% CONFIDENCE)
                </span>
                <h3 class="text-sm font-bold text-slate-900">
                  WEEKLY ACADEMIC & LAB TIMETABLE
                </h3>
              </div>
              <div class="flex items-center gap-2">
                <span class="text-xs font-semibold text-[#1A365D] bg-white border border-slate-300 px-2 py-1 rounded-[2px]">
                  7 Events Extracted
                </span>
              </div>
            </div>

            <!-- Digital Structured Rows -->
            <div class="space-y-2">
              <div class="bg-white border border-slate-200 p-3 rounded-[2px] elevation-1 flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <div class="w-1.5 h-8 bg-[#1A365D]"></div>
                  <div>
                    <div class="text-xs font-bold text-slate-900">CS 401: Distributed Systems Lecture</div>
                    <div class="text-[11px] text-slate-500 font-mono">Mon • 09:00 - 10:30 AM • Science Hall 302</div>
                  </div>
                </div>
                <span class="text-[11px] font-medium bg-blue-50 text-blue-800 border border-blue-200 px-2 py-0.5 rounded-[2px]">
                  Academic
                </span>
              </div>

              <div class="bg-white border border-slate-200 p-3 rounded-[2px] elevation-1 flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <div class="w-1.5 h-8 bg-amber-600"></div>
                  <div>
                    <div class="text-xs font-bold text-slate-900">Weekly Engineering Standup & Triage</div>
                    <div class="text-[11px] text-slate-500 font-mono">Mon • 11:15 - 12:00 PM • Conf Room Alpha</div>
                  </div>
                </div>
                <span class="text-[11px] font-medium bg-amber-50 text-amber-800 border border-amber-200 px-2 py-0.5 rounded-[2px]">
                  Meeting
                </span>
              </div>

              <div class="bg-white border border-slate-200 p-3 rounded-[2px] elevation-1 flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <div class="w-1.5 h-8 bg-purple-600"></div>
                  <div>
                    <div class="text-xs font-bold text-slate-900">Robotics & Hardware Lab Session</div>
                    <div class="text-[11px] text-slate-500 font-mono">Tue • 01:00 - 03:30 PM • Annex Bay 4</div>
                  </div>
                </div>
                <span class="text-[11px] font-medium bg-purple-50 text-purple-800 border border-purple-200 px-2 py-0.5 rounded-[2px]">
                  Lab / Workshop
                </span>
              </div>

              <div class="bg-white border border-slate-200 p-3 rounded-[2px] elevation-1 flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <div class="w-1.5 h-8 bg-slate-700"></div>
                  <div>
                    <div class="text-xs font-bold text-slate-900">Shift Supervisor On-Call Duty</div>
                    <div class="text-[11px] text-slate-500 font-mono">Wed • 08:00 - 02:00 PM • Command Center</div>
                  </div>
                </div>
                <span class="text-[11px] font-medium bg-slate-100 text-slate-800 border border-slate-300 px-2 py-0.5 rounded-[2px]">
                  Work Shift
                </span>
              </div>
            </div>
          </div>

          <!-- Foreground Layer: Raw Paper Schedule (Clipped by Slider) -->
          <div
            class="absolute inset-y-0 left-0 overflow-hidden bg-[#FDFBF7] border-r-2 border-[#1A365D] shadow-2xl transition-all duration-75"
            [style.width.%]="sliderPosition()"
          >
            <div class="w-[800px] sm:w-[980px] p-4 sm:p-6 select-none relative font-mono">
              <div class="flex items-center justify-between pb-3 mb-4 border-b border-stone-300">
                <div class="flex items-center gap-2">
                  <span class="px-2 py-0.5 bg-amber-200 text-stone-900 text-[11px] font-bold rounded-none">
                    ORIGINAL PAPER ARTIFACT
                  </span>
                  <h3 class="text-xs font-bold text-stone-700 uppercase tracking-wider">
                    Rough Schedule Notes (Handwritten & Printed)
                  </h3>
                </div>
                <span class="text-xs text-stone-500 italic">Folded Paper Scan • 300 DPI</span>
              </div>

              <!-- Messy paper representation -->
              <div class="space-y-3 bg-[#FCF8EC] p-4 border border-stone-300 shadow-inner rounded-none rotate-[-0.3deg]">
                <div class="p-2 border-b border-dashed border-stone-400">
                  <div class="text-xs font-bold text-stone-800 line-through decoration-red-400">
                    9:00 - 10:15 Calculus (Rescheduled to rm 302!)
                  </div>
                  <div class="text-sm font-bold text-stone-900 bg-yellow-200 inline-block px-1">
                    &rarr; CS 401: Distributed Systems &#64; 9:00 - 10:30 SciHall 302
                  </div>
                </div>

                <div class="p-2 border-b border-dashed border-stone-400">
                  <div class="text-xs font-semibold text-stone-800">
                    Mon 11:15 Standup in Conf Room Alpha (bring slide deck!!)
                  </div>
                  <div class="text-[11px] text-stone-600 italic">
                    * Note: sync with Elena before 12
                  </div>
                </div>

                <div class="p-2 border-b border-dashed border-stone-400">
                  <div class="text-xs font-bold text-stone-800 bg-emerald-100 inline-block px-1">
                    Tuesday 13:00 - 15:30 Hardware LAB (Annex Bay 4)
                  </div>
                  <div class="text-[11px] text-stone-500">
                    [Need safety goggles & sign attendance sheet]
                  </div>
                </div>

                <div class="p-2">
                  <div class="text-xs font-bold text-stone-800">
                    Wed 08:00 - 14:00 Ops Command Shift On-Call
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Slider Controller Handle -->
          <div
            class="absolute inset-y-0 w-8 -ml-4 flex items-center justify-center cursor-ew-resize z-20 pointer-events-none"
            [style.left.%]="sliderPosition()"
          >
            <div class="w-7 h-7 bg-[#1A365D] border-2 border-white text-white rounded-[2px] flex items-center justify-center shadow-lg">
              <svg lucideSlidersHorizontal class="w-3.5 h-3.5"></svg>
            </div>
          </div>

        </div>

        <!-- Interactive Slider Controls Bar -->
        <div class="bg-slate-50 border-t border-slate-200 px-4 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div class="flex items-center gap-3">
            <label for="mockup-slider-input" class="font-semibold text-slate-700">Slide to compare:</label>
            <input
              id="mockup-slider-input"
              type="range"
              min="5"
              max="95"
              [value]="sliderPosition()"
              (input)="updateSlider($event)"
              class="w-36 sm:w-56 accent-[#1A365D] cursor-pointer"
              aria-label="Before and after schedule conversion comparison slider"
            />
            <span class="text-slate-500 font-mono">{{ sliderPosition() }}% Paper / {{ 100 - sliderPosition() }}% Schedly</span>
          </div>

          <div class="flex items-center gap-2">
            <button
              type="button"
              (click)="setSlider(90)"
              class="px-2 py-1 text-slate-600 hover:text-slate-900 border border-slate-200 bg-white rounded-[2px] cursor-pointer"
            >
              View Paper
            </button>
            <button
              type="button"
              (click)="setSlider(10)"
              class="px-2 py-1 text-slate-600 hover:text-slate-900 border border-slate-200 bg-white rounded-[2px] cursor-pointer"
            >
              View Schedly
            </button>
            <button
              type="button"
              (click)="setSlider(50)"
              class="px-2 py-1 text-[#1A365D] font-bold border border-[#1A365D] bg-slate-100 rounded-[2px] cursor-pointer"
            >
              Reset 50/50
            </button>
          </div>
        </div>

      </div>
    </div>
  `,
})
export class InteractivePreviewComponent {
  readonly sliderPosition = signal<number>(50);

  updateSlider(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.sliderPosition.set(Number(target.value));
  }

  setSlider(val: number): void {
    this.sliderPosition.set(val);
  }
}
