import { Component, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideArrowRight } from '@lucide/angular';
import { PRESET_SAMPLE_TEMPLATES } from '../../../core/data/initial-data';

@Component({
  selector: 'app-upload-presets',
  standalone: true,
  imports: [CommonModule, LucideArrowRight],
  template: `
    <div class="mt-10 pt-8 border-t border-slate-200">
      <div class="flex items-center justify-between mb-4">
        <div>
          <h3 class="text-sm font-bold text-slate-900">
            Or test with sample timetable photos
          </h3>
          <p class="text-xs text-slate-500">
            No camera or photo on hand? Choose a sample scan below to run the parser pipeline immediately.
          </p>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        @for (preset of presets; track preset.id) {
          <div
            (click)="selectPreset.emit(preset.id)"
            class="bg-white border border-slate-200 hover:border-[#1A365D] p-4 rounded-[2px] elevation-1 cursor-pointer transition-all group flex flex-col justify-between"
            role="button"
            tabindex="0"
            (keydown.enter)="selectPreset.emit(preset.id)"
            (keydown.space)="selectPreset.emit(preset.id)"
          >
            <div>
              <div class="flex items-center justify-between mb-2">
                <span class="text-[10px] font-bold uppercase tracking-wider text-[#1A365D] bg-blue-50 px-2 py-0.5 rounded-[2px]">
                  Sample {{ $index + 1 }}
                </span>
                <span class="text-xs text-slate-400 font-mono">{{ preset.entriesCount }} events</span>
              </div>
              <h4 class="text-xs font-bold text-slate-900 group-hover:text-[#1A365D] transition-colors">
                {{ preset.title.split('(')[0].trim() }}
              </h4>
              <p class="text-[11px] text-slate-500 mt-1 line-clamp-2">
                {{ preset.description }}
              </p>
            </div>

            <div class="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-[#1A365D]">
              <span class="text-[11px]">Parse Sample</span>
              <svg lucideArrowRight class="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform"></svg>
            </div>
          </div>
        }
      </div>
    </div>
  `,
})
export class UploadPresetsComponent {
  readonly presets = PRESET_SAMPLE_TEMPLATES;
  readonly selectPreset = output<string>();
}
