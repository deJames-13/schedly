import { Injectable } from '@angular/core';
import { ScheduleEntry } from '../models/schedule-entry.model';

@Injectable({
  providedIn: 'root',
})
export class IcsExportService {
  private formatIcsDate(dateStr: string, timeStr: string): string {
    const cleanDate = dateStr || '2026-09-21';
    const parts = cleanDate.split('-');
    const year = parts[0] || '2026';
    const month = (parts[1] || '09').padStart(2, '0');
    const day = (parts[2] || '21').padStart(2, '0');

    const timeParts = (timeStr || '09:00').split(':');
    const hour = (timeParts[0] || '09').padStart(2, '0');
    const min = (timeParts[1] || '00').padStart(2, '0');

    return `${year}${month}${day}T${hour}${min}00`;
  }

  generateIcsContent(entries: ScheduleEntry[], calendarName: string = 'Schedly Schedule'): string {
    const lines = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Schedly//Schedule Management System//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      `X-WR-CALNAME:${calendarName}`,
    ];

    for (const entry of entries) {
      const dtStart = this.formatIcsDate(entry.date, entry.startTime);
      const dtEnd = this.formatIcsDate(entry.date, entry.endTime);

      lines.push('BEGIN:VEVENT');
      lines.push(`UID:${entry.id}@schedly.app`);
      lines.push(`DTSTAMP:${this.formatIcsDate(new Date().toISOString().split('T')[0], '00:00')}Z`);
      lines.push(`DTSTART:${dtStart}`);
      lines.push(`DTEND:${dtEnd}`);
      lines.push(`SUMMARY:${entry.name}`);
      if (entry.location) {
        lines.push(`LOCATION:${entry.location}`);
      }
      lines.push(`CATEGORIES:${entry.category}`);
      if (entry.notes) {
        lines.push(`DESCRIPTION:${entry.notes.replace(/\n/g, '\\n')}`);
      }
      lines.push('STATUS:CONFIRMED');
      lines.push('END:VEVENT');
    }

    lines.push('END:VCALENDAR');
    return lines.join('\r\n');
  }

  downloadIcsFile(entries: ScheduleEntry[], filename: string = 'schedule.ics'): void {
    const content = this.generateIcsContent(entries, filename.replace(/\.ics$/i, ''));
    const blob = new Blob([content], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename.endsWith('.ics') ? filename : `${filename}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
}
