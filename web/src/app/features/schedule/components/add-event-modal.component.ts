import { Component, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LucideX, LucidePlus } from '@lucide/angular';
import { DayOfWeek, EventCategory, ScheduleEntry } from '../../../core/models/schedule-entry.model';

@Component({
  selector: 'app-add-event-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LucideX, LucidePlus],
  template: `
    <div
      class="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-add-event-title"
      (click)="onBackdropClick($event)"
      (keydown.escape)="closeModal.emit()"
    >
      <div
        class="bg-white border border-slate-300 rounded-[2px] elevation-3 w-full max-w-md p-6 my-8"
        (click)="$event.stopPropagation()"
      >
        <!-- Modal Header -->
        <div class="flex items-center justify-between pb-3 mb-4 border-b border-slate-200">
          <h3 id="modal-add-event-title" class="text-base font-bold text-slate-900">
            Add New Schedule Event
          </h3>
          <button
            type="button"
            (click)="closeModal.emit()"
            class="text-slate-400 hover:text-slate-600 p-1 rounded cursor-pointer"
            aria-label="Close dialog"
          >
            <svg lucideX class="w-4 h-4"></svg>
          </button>
        </div>

        <!-- Form -->
        <form [formGroup]="form" (ngSubmit)="onSubmit()" class="space-y-3.5 text-xs">
          <div>
            <label for="event-name" class="block text-[11px] font-semibold uppercase text-slate-600 mb-1">
              Event / Course Title *
            </label>
            <input
              id="event-name"
              type="text"
              formControlName="name"
              placeholder="e.g. Distributed Systems Lab"
              class="w-full px-3 py-2 border border-slate-300 rounded-[2px] focus:border-[#1A365D] focus:outline-none text-xs"
            />
            @if (form.controls.name.invalid && form.controls.name.touched) {
              <p class="text-[11px] text-red-600 mt-1">Title is required.</p>
            }
          </div>

          <div class="grid grid-cols-2 gap-2.5">
            <div>
              <label for="event-day" class="block text-[11px] font-semibold uppercase text-slate-600 mb-1">
                Day of Week
              </label>
              <select
                id="event-day"
                formControlName="day"
                class="w-full px-3 py-2 border border-slate-300 rounded-[2px] bg-white focus:border-[#1A365D] focus:outline-none text-xs cursor-pointer"
              >
                @for (d of days; track d) {
                  <option [value]="d">{{ d }}</option>
                }
              </select>
            </div>

            <div>
              <label for="event-date" class="block text-[11px] font-semibold uppercase text-slate-600 mb-1">
                Date
              </label>
              <input
                id="event-date"
                type="date"
                formControlName="date"
                class="w-full px-3 py-2 border border-slate-300 rounded-[2px] focus:border-[#1A365D] focus:outline-none text-xs font-mono"
              />
            </div>
          </div>

          <div class="grid grid-cols-2 gap-2.5">
            <div>
              <label for="event-start-time" class="block text-[11px] font-semibold uppercase text-slate-600 mb-1">
                Start Time
              </label>
              <input
                id="event-start-time"
                type="text"
                formControlName="startTime"
                placeholder="09:00"
                class="w-full px-3 py-2 border border-slate-300 rounded-[2px] focus:border-[#1A365D] focus:outline-none text-xs font-mono"
              />
            </div>

            <div>
              <label for="event-end-time" class="block text-[11px] font-semibold uppercase text-slate-600 mb-1">
                End Time
              </label>
              <input
                id="event-end-time"
                type="text"
                formControlName="endTime"
                placeholder="10:30"
                class="w-full px-3 py-2 border border-slate-300 rounded-[2px] focus:border-[#1A365D] focus:outline-none text-xs font-mono"
              />
            </div>
          </div>

          <div>
            <label for="event-location" class="block text-[11px] font-semibold uppercase text-slate-600 mb-1">
              Location / Room
            </label>
            <input
              id="event-location"
              type="text"
              formControlName="location"
              placeholder="e.g. Science Hall 302 / Zoom"
              class="w-full px-3 py-2 border border-slate-300 rounded-[2px] focus:border-[#1A365D] focus:outline-none text-xs"
            />
          </div>

          <div>
            <label for="event-category" class="block text-[11px] font-semibold uppercase text-slate-600 mb-1">
              Category
            </label>
            <select
              id="event-category"
              formControlName="category"
              class="w-full px-3 py-2 border border-slate-300 rounded-[2px] bg-white focus:border-[#1A365D] focus:outline-none text-xs cursor-pointer"
            >
              @for (cat of categories; track cat) {
                <option [value]="cat">{{ cat }}</option>
              }
            </select>
          </div>

          <div>
            <label for="event-notes" class="block text-[11px] font-semibold uppercase text-slate-600 mb-1">
              Notes / Remarks
            </label>
            <textarea
              id="event-notes"
              formControlName="notes"
              rows="2"
              placeholder="Bring lab equipment, submit draft by 5pm..."
              class="w-full px-3 py-2 border border-slate-300 rounded-[2px] focus:border-[#1A365D] focus:outline-none text-xs"
            ></textarea>
          </div>

          <div class="pt-3 border-t border-slate-200 flex items-center justify-end gap-2">
            <button
              type="button"
              (click)="closeModal.emit()"
              class="px-3 py-2 border border-slate-300 rounded-[2px] hover:bg-slate-50 text-slate-600 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="px-4 py-2 bg-[#1A365D] text-white font-semibold rounded-[2px] hover:bg-[#2A4365] elevation-1 cursor-pointer flex items-center gap-1.5"
            >
              <svg lucidePlus class="w-3.5 h-3.5"></svg>
              <span>Add Event</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  `,
})
export class AddEventModalComponent {
  readonly closeModal = output<void>();
  readonly createEvent = output<Omit<ScheduleEntry, 'id'>>();

  readonly days: DayOfWeek[] = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];

  readonly categories: EventCategory[] = [
    'Academic',
    'Work Shift',
    'Meeting',
    'Lab / Workshop',
    'Personal',
    'Milestone',
  ];

  readonly form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    day: new FormControl<DayOfWeek>('Monday', [Validators.required]),
    date: new FormControl('2026-09-21', [Validators.required]),
    startTime: new FormControl('10:00', [Validators.required]),
    endTime: new FormControl('11:00', [Validators.required]),
    location: new FormControl(''),
    category: new FormControl<EventCategory>('Academic', [Validators.required]),
    notes: new FormControl(''),
  });

  onBackdropClick(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.closeModal.emit();
    }
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const val = this.form.getRawValue();
    this.createEvent.emit({
      name: val.name || 'Untitled Event',
      day: val.day || 'Monday',
      date: val.date || '2026-09-21',
      startTime: val.startTime || '09:00',
      endTime: val.endTime || '10:00',
      location: val.location || 'TBD',
      category: val.category || 'Academic',
      notes: val.notes || '',
      isSynced: false,
    });
  }
}
