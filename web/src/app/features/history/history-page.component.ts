import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ScheduleStore } from '../../core/stores/schedule.store';
import { IcsExportService } from '../../core/services/ics-export.service';
import { ToastService } from '../../shared/services/toast.service';
import { ScheduleDocument } from '../../core/models/schedule-document.model';
import { HistoryCardComponent } from './components/history-card.component';
import { HistoryEmptyComponent } from './components/history-empty.component';
import { LucideClock, LucideUpload } from '@lucide/angular';

@Component({
  selector: 'app-history-page',
  standalone: true,
  imports: [CommonModule, HistoryCardComponent, HistoryEmptyComponent, LucideClock, LucideUpload],
  templateUrl: './history-page.component.html',
})
export class HistoryPageComponent {
  readonly scheduleStore = inject(ScheduleStore);
  private readonly icsExport = inject(IcsExportService);
  private readonly toast = inject(ToastService);
  private readonly router = inject(Router);

  onOpenDocument(docId: string): void {
    this.scheduleStore.selectDocument(docId);
    this.router.navigate(['/schedule']);
  }

  onDeleteDocument(docId: string): void {
    const doc = this.scheduleStore.documents().find((d) => d.id === docId);
    this.scheduleStore.deleteDocument(docId);
    this.toast.show(`Deleted "${doc?.title || 'Document'}" from archives.`);
  }

  onExportIcs(doc: ScheduleDocument): void {
    if (!doc.entries || doc.entries.length === 0) {
      this.toast.show('Document has no schedule events to export.', 'info');
      return;
    }
    this.icsExport.downloadIcsFile(doc.entries, `${doc.title.replace(/\s+/g, '_')}.ics`);
    this.toast.show(`Exported .ICS for "${doc.title}"`);
  }

  navigateToUpload(): void {
    this.router.navigate(['/upload']);
  }
}
