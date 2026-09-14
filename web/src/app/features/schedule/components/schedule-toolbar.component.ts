import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideSearch, LucideFilter, LucideEdit3, LucideX } from '@lucide/angular';
import { EventCategory } from '../../../core/models/schedule-entry.model';

@Component({
  selector: 'app-schedule-toolbar',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideSearch, LucideFilter, LucideEdit3, LucideX],
  template: `
    <div class="bg-white border border-slate-200 p-3.5 rounded-[2px] elevation-1 mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
      <div class="flex flex-wrap items-center gap-3 flex-1">
        <!-- Search Input -->
        <div class="relative flex-1 min-w-[200px] max-w-sm">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <svg lucideSearch class="w-4 h-4"></svg>
          </div>
          <input
            id="input-search-schedule"
            type="text"
            [ngModel]="searchQuery()"
            (ngModelChange)="searchChange.emit($event)"
            placeholder="Search event, room, day, or notes..."
            class="w-full pl-9 pr-8 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-[2px] focus:bg-white focus:border-[#1A365D] focus:outline-none transition-colors"
          />
          @if (searchQuery()) {
            <button
              type="button"
              (click)="searchChange.emit('')"
              class="absolute inset-y-0 right-0 pr-2.5 flex items-center text-slate-400 hover:text-slate-700"
              aria-label="Clear search"
            >
              <svg lucideX class="w-3.5 h-3.5"></svg>
            </button>
          }
        </div>

        <!-- Category Filter -->
        <div class="flex items-center gap-1.5 text-xs">
          <svg lucideFilter class="w-3.5 h-3.5 text-slate-500"></svg>
          <label for="select-filter-category" class="sr-only">Filter by Category</label>
          <select
            id="select-filter-category"
            [ngModel]="filterCategory()"
            (ngModelChange)="categoryChange.emit($event)"
            class="bg-white border border-slate-300 rounded-[2px] px-2 py-1.5 text-xs text-slate-700 focus:outline-none focus:border-[#1A365D] cursor-pointer"
          >
            <option value="all">All Categories ({{ totalCount() }})</option>
            @for (cat of categories; track cat) {
              <option [value]="cat">{{ cat }}</option>
            }
          </select>
        </div>
      </div>

      <!-- View Switcher -->
      <div class="flex items-center gap-1 bg-slate-100 p-1 rounded-[2px] border border-slate-200 self-start sm:self-auto" role="group" aria-label="View Mode">
        <button
          id="btn-view-table"
          type="button"
          (click)="viewChange.emit('table')"
          class="px-3 py-1 text-xs font-semibold rounded-[2px] transition-colors cursor-pointer"
          [ngClass]="{
            'bg-white text-[#1A365D] elevation-1': activeView() === 'table',
            'text-slate-600 hover:text-slate-900': activeView() !== 'table'
          }"
          [attr.aria-pressed]="activeView() === 'table'"
        >
          Structured Table
        </button>
        <button
          id="btn-view-grid"
          type="button"
          (click)="viewChange.emit('grid')"
          class="px-3 py-1 text-xs font-semibold rounded-[2px] transition-colors cursor-pointer"
          [ngClass]="{
            'bg-white text-[#1A365D] elevation-1': activeView() === 'grid',
            'text-slate-600 hover:text-slate-900': activeView() !== 'grid'
          }"
          [attr.aria-pressed]="activeView() === 'grid'"
        >
          Weekly Grid
        </button>
      </div>
    </div>

    <!-- Sub-bar Helper notice -->
    <div class="mb-3 text-[11px] text-slate-500 flex flex-wrap items-center justify-between gap-2">
      <span class="flex items-center gap-1">
        <svg lucideEdit3 class="w-3 h-3 text-[#1A365D]"></svg>
        Click directly on any table cell to edit inline with real-time buffering.
      </span>
      <span class="font-mono text-slate-400">
        Showing {{ filteredCount() }} of {{ totalCount() }} items
      </span>
    </div>
  `,
})
export class ScheduleToolbarComponent {
  readonly searchQuery = input<string>('');
  readonly filterCategory = input<string>('all');
  readonly activeView = input<'table' | 'grid'>('table');
  readonly totalCount = input<number>(0);
  readonly filteredCount = input<number>(0);

  readonly searchChange = output<string>();
  readonly categoryChange = output<string>();
  readonly viewChange = output<'table' | 'grid'>();

  readonly categories: EventCategory[] = [
    'Academic',
    'Work Shift',
    'Meeting',
    'Lab / Workshop',
    'Personal',
    'Milestone',
  ];
}
