import { Component, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideChevronRight, LucideArrowRight } from '@lucide/angular';
import { PRESET_SAMPLE_TEMPLATES } from '../../../core/data/initial-data';

@Component({
  selector: 'app-preset-templates',
  standalone: true,
  imports: [CommonModule, LucideChevronRight, LucideArrowRight],
  template: `
    <section id="sample-presets-section" class="py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-slate-200 bg-[#F8FAFC]">
      <div class="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <span class="text-xs font-bold uppercase tracking-wider text-[#1A365D]">Instant Interactive Prototypes</span>
          <h2 class="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
            Test with Real-World Physical Schedule Templates
          </h2>
          <p class="text-sm text-slate-600 mt-1">
            Select any pre-scanned schedule below to experience the Schedly parsing and editing workflow instantly.
          </p>
        </div>
        <button
          type="button"
          (click)="uploadOwn.emit()"
          class="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1A365D] hover:underline cursor-pointer"
        >
          <span>Or upload your own image</span>
          <svg lucideChevronRight class="w-4 h-4"></svg>
        </button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
        @for (preset of presets; track preset.id) {
          <div
            (click)="selectPreset.emit(preset.id)"
            class="bg-white border border-slate-200 p-5 rounded-[2px] hover:border-[#1A365D] elevation-1 cursor-pointer transition-all group"
            role="button"
            tabindex="0"
            (keydown.enter)="selectPreset.emit(preset.id)"
            (keydown.space)="selectPreset.emit(preset.id)"
          >
            <div class="flex items-center justify-between mb-2">
              <span
                class="text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-[2px]"
                [ngClass]="{
                  'text-[#1A365D] bg-blue-50': preset.id === 'preset-academic',
                  'text-emerald-800 bg-emerald-50': preset.id === 'preset-medical',
                  'text-purple-800 bg-purple-50': preset.id === 'preset-conference'
                }"
              >
                {{ preset.id === 'preset-academic' ? 'University & College' : preset.id === 'preset-medical' ? 'Healthcare & Shifts' : 'Corporate Events' }}
              </span>
              <span class="text-xs text-slate-400 font-mono">{{ preset.entriesCount }} Events</span>
            </div>
            <h3 class="text-sm font-bold text-slate-900 group-hover:text-[#1A365D] transition-colors">
              {{ preset.title.split('(')[0].trim() }}
            </h3>
            <p class="text-xs text-slate-500 mt-1 line-clamp-2">
              {{ preset.description }}
            </p>
            <div class="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-[#1A365D]">
              <span>Load & Review Parse</span>
              <svg lucideArrowRight class="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform"></svg>
            </div>
          </div>
        }
      </div>
    </section>
  `,
})
export class PresetTemplatesComponent {
  readonly presets = PRESET_SAMPLE_TEMPLATES;
  readonly selectPreset = output<string>();
  readonly uploadOwn = output<void>();
}
