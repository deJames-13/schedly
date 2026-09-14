import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ScheduleStore } from '../../core/stores/schedule.store';
import { IcsExportService } from '../../core/services/ics-export.service';
import { ToastService } from '../../shared/services/toast.service';
import { ScheduleEntry } from '../../core/models/schedule-entry.model';
import { ScheduleHeaderComponent } from './components/schedule-header.component';
import { ScheduleStatsComponent } from './components/schedule-stats.component';
import { ScheduleToolbarComponent } from './components/schedule-toolbar.component';
import { ScheduleTableComponent } from './components/schedule-table.component';
import { ScheduleGridComponent } from './components/schedule-grid.component';
import { AddEventModalComponent } from './components/add-event-modal.component';
import { LucideCalendar, LucideCalendarSync, LucideUpload } from '@lucide/angular';

@Component({
  selector: 'app-schedule-view',
  standalone: true,
  imports: [
    CommonModule,
    ScheduleHeaderComponent,
    ScheduleStatsComponent,
    ScheduleToolbarComponent,
    ScheduleTableComponent,
    ScheduleGridComponent,
    AddEventModalComponent,
    LucideCalendar,
    LucideCalendarSync,
    LucideUpload,
  ],
  templateUrl: './schedule-view.component.html',
})
export class ScheduleViewComponent {
  readonly scheduleStore = inject(ScheduleStore);
  private readonly icsExport = inject(IcsExportService);
  private readonly toast = inject(ToastService);
  private readonly router = inject(Router);

  readonly showAddModal = signal(false);

  readonly distinctCategoriesCount = computed(() => {
    const cats = new Set(this.scheduleStore.entries().map((e) => e.category));
    return cats.size;
  });

  handleFieldChange(event: { id: string; field: keyof ScheduleEntry; value: any }): void {
    this.scheduleStore.updateEntryField(event.id, event.field, event.value);
  }

  handleToggleSync(entryId: string): void {
    const isNowSynced = this.scheduleStore.toggleEntrySync(entryId);
    const entry = this.scheduleStore.entries().find((e) => e.id === entryId);
    const title = entry?.name || 'Event';
    this.toast.show(
      isNowSynced
        ? `Synced "${title}" to connected calendars.`
        : `Removed "${title}" from calendar sync.`
    );
  }

  handleDeleteEntry(entryId: string): void {
    const entry = this.scheduleStore.entries().find((e) => e.id === entryId);
    this.scheduleStore.deleteEntry(entryId);
    this.toast.show(`Removed event "${entry?.name || ''}"`);
  }

  handleSaveAndSync(): void {
    const count = this.scheduleStore.saveAndSyncAll();
    this.toast.show(
      `Successfully saved and synced ${count} events with Google Calendar & Outlook!`
    );
  }

  handleExportIcs(): void {
    const doc = this.scheduleStore.currentDocument();
    const entries = this.scheduleStore.entries();
    if (!doc || entries.length === 0) {
      this.toast.show('No events available to export.', 'info');
      return;
    }
    this.icsExport.downloadIcsFile(entries, `${doc.title.replace(/\s+/g, '_')}.ics`);
    this.toast.show('Downloaded .ICS file for instant calendar import.');
  }

  handleCreateEvent(draft: Omit<ScheduleEntry, 'id'>): void {
    const created = this.scheduleStore.addEntry(draft);
    this.showAddModal.set(false);
    this.toast.show(`Added "${created.name}" to schedule.`);
  }

  navigateToUpload(): void {
    this.router.navigate(['/upload']);
  }
}
