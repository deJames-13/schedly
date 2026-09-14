import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ScheduleDocument } from '../models/schedule-document.model';
import { ScheduleEntry } from '../models/schedule-entry.model';
import { PRESET_SAMPLE_TEMPLATES } from '../data/initial-data';

export interface IngestionProgressState {
  isProcessing: boolean;
  stepIndex: number;
  percent: number;
  statusText: string;
}

export const INGESTION_STEPS = [
  'Scanning document geometry & contrast...',
  'Optical Character Recognition (OCR) running...',
  'Classifying days, time intervals & rooms...',
  'Synthesizing calendar agenda data structure...',
];

@Injectable({
  providedIn: 'root',
})
export class ScheduleIngestionService {
  /**
   * Progressive client-side OCR analysis simulation with pluggable backend seam.
   */
  startSimulatedIngestion(
    fileName: string,
    previewUrl: string,
    customEntries?: ScheduleEntry[],
    onProgress?: (state: IngestionProgressState) => void
  ): Promise<ScheduleDocument> {
    return new Promise((resolve) => {
      onProgress?.({
        isProcessing: true,
        stepIndex: 0,
        percent: 15,
        statusText: INGESTION_STEPS[0],
      });

      const t1 = setTimeout(() => {
        onProgress?.({
          isProcessing: true,
          stepIndex: 1,
          percent: 40,
          statusText: INGESTION_STEPS[1],
        });
      }, 500);

      const t2 = setTimeout(() => {
        onProgress?.({
          isProcessing: true,
          stepIndex: 2,
          percent: 75,
          statusText: INGESTION_STEPS[2],
        });
      }, 1200);

      const t3 = setTimeout(() => {
        onProgress?.({
          isProcessing: true,
          stepIndex: 3,
          percent: 95,
          statusText: INGESTION_STEPS[3],
        });
      }, 1800);

      const t4 = setTimeout(() => {
        onProgress?.({
          isProcessing: false,
          stepIndex: 3,
          percent: 100,
          statusText: 'Complete',
        });

        const fallbackEntries = PRESET_SAMPLE_TEMPLATES[0].entries;
        const entriesToUse = customEntries && customEntries.length > 0 ? customEntries : fallbackEntries;

        const cleanTitle = fileName
          .replace(/\.[^/.]+$/, '')
          .replace(/[_-]/g, ' ')
          .replace(/\b\w/g, (l) => l.toUpperCase());

        const newDoc: ScheduleDocument = {
          id: `doc-${Date.now()}`,
          title: cleanTitle || 'Digitized Schedule',
          uploadedAt: new Date().toLocaleString([], { dateStyle: 'short', timeStyle: 'short' }),
          sourceImageName: fileName,
          sourceImageUrl: previewUrl,
          entriesCount: entriesToUse.length,
          entries: entriesToUse,
          status: 'processed',
        };

        resolve(newDoc);
      }, 2300);
    });
  }

  /**
   * Extension Seam: When connecting to a live backend (NestJS or Google Gemini API),
   * implement this method using HttpClient or GoogleGenAI.
   */
  parseViaApi(file: File): Observable<ScheduleDocument> {
    const subject = new Subject<ScheduleDocument>();
    // Ready for HTTP POST /api/schedule/parse
    return subject.asObservable();
  }
}
