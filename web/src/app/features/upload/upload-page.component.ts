import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ScheduleStore } from '../../core/stores/schedule.store';
import { AuthStore } from '../../core/stores/auth.store';
import { ToastService } from '../../shared/services/toast.service';
import {
  ScheduleIngestionService,
  IngestionProgressState,
} from '../../core/services/schedule-ingestion.service';
import { PRESET_SAMPLE_TEMPLATES } from '../../core/data/initial-data';
import { FileDropzoneComponent } from './components/file-dropzone.component';
import { IngestionProgressComponent } from './components/ingestion-progress.component';
import { UploadPresetsComponent } from './components/upload-presets.component';
import { OcrGuidelinesComponent } from './components/ocr-guidelines.component';
import { LucideLayers, LucideClock, LucideAlertCircle } from '@lucide/angular';

@Component({
  selector: 'app-upload-page',
  standalone: true,
  imports: [
    CommonModule,
    FileDropzoneComponent,
    IngestionProgressComponent,
    UploadPresetsComponent,
    OcrGuidelinesComponent,
    LucideLayers,
    LucideClock,
    LucideAlertCircle,
  ],
  templateUrl: './upload-page.component.html',
})
export class UploadPageComponent {
  private readonly router = inject(Router);
  private readonly scheduleStore = inject(ScheduleStore);
  private readonly authStore = inject(AuthStore);
  private readonly toastService = inject(ToastService);
  private readonly ingestionService = inject(ScheduleIngestionService);

  readonly isProcessing = signal(false);
  readonly progressPercent = signal(0);
  readonly progressStep = signal(0);
  readonly currentFileName = signal<string>('');
  readonly filePreviewUrl = signal<string | null>(null);
  readonly errorMessage = signal<string | null>(null);

  async handleFileDropped(event: { file: File; dataUrl: string }): Promise<void> {
    this.currentFileName.set(event.file.name);
    this.filePreviewUrl.set(event.dataUrl);
    this.errorMessage.set(null);

    await this.runAnalysis(event.file.name, event.dataUrl);
  }

  async handleSelectPreset(presetId: string): Promise<void> {
    const preset = PRESET_SAMPLE_TEMPLATES.find((p) => p.id === presetId);
    if (!preset) return;

    this.currentFileName.set(preset.previewName);
    this.filePreviewUrl.set(preset.sampleFilePreview);
    this.errorMessage.set(null);

    await this.runAnalysis(preset.previewName, preset.sampleFilePreview, preset.entries);
  }

  private async runAnalysis(
    fileName: string,
    previewUrl: string,
    entries?: any[]
  ): Promise<void> {
    this.isProcessing.set(true);
    this.progressPercent.set(10);
    this.progressStep.set(0);

    try {
      const doc = await this.ingestionService.startSimulatedIngestion(
        fileName,
        previewUrl,
        entries,
        (state: IngestionProgressState) => {
          this.progressPercent.set(state.percent);
          this.progressStep.set(state.stepIndex);
        }
      );

      this.scheduleStore.addDocument(doc);
      this.authStore.incrementParsedCount();
      this.toastService.show(
        `Document "${doc.title}" digitized with ${doc.entries.length} structured events.`
      );
      this.router.navigate(['/schedule']);
    } catch (err: any) {
      this.errorMessage.set(err?.message || 'Failed to process document. Please try again.');
      this.toastService.show('Parsing failed. Please check the file.', 'error');
    } finally {
      this.isProcessing.set(false);
    }
  }

  navigateToHistory(): void {
    this.router.navigate(['/history']);
  }
}
