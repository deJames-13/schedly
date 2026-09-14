import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ScheduleStore } from '../../core/stores/schedule.store';
import { PRESET_SAMPLE_TEMPLATES } from '../../core/data/initial-data';
import { ScheduleDocument } from '../../core/models/schedule-document.model';
import { HeroSectionComponent } from './components/hero-section.component';
import { InteractivePreviewComponent } from './components/interactive-preview.component';
import { FeatureGridComponent } from './components/feature-grid.component';
import { PresetTemplatesComponent } from './components/preset-templates.component';
import { PricingSectionComponent } from './components/pricing-section.component';
import { LandingFooterComponent } from './components/landing-footer.component';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [
    CommonModule,
    HeroSectionComponent,
    InteractivePreviewComponent,
    FeatureGridComponent,
    PresetTemplatesComponent,
    PricingSectionComponent,
    LandingFooterComponent,
  ],
  templateUrl: './landing-page.component.html',
})
export class LandingPageComponent {
  private readonly router = inject(Router);
  private readonly scheduleStore = inject(ScheduleStore);

  onGetStarted(): void {
    this.router.navigate(['/upload']);
  }

  onOpenAuth(): void {
    this.router.navigate(['/auth']);
  }

  onSelectPreset(presetId: string): void {
    const preset = PRESET_SAMPLE_TEMPLATES.find((p) => p.id === presetId);
    if (preset) {
      const doc: ScheduleDocument = {
        id: `preset-doc-${Date.now()}`,
        title: preset.title.split('(')[0].trim(),
        uploadedAt: new Date().toLocaleString([], { dateStyle: 'short', timeStyle: 'short' }),
        sourceImageName: preset.previewName,
        sourceImageUrl: preset.sampleFilePreview,
        entriesCount: preset.entries.length,
        entries: preset.entries,
        status: 'processed',
      };
      this.scheduleStore.addDocument(doc);
      this.router.navigate(['/schedule']);
    }
  }
}
