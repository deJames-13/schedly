import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { App } from './app';
import { ScheduleStore } from './core/stores/schedule.store';
import { AuthStore } from './core/stores/auth.store';
import { IcsExportService } from './core/services/ics-export.service';
import { SAMPLE_ENTRIES } from './core/data/initial-data';

describe('App Root', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('should create the application root', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should contain header and router outlet', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-header')).toBeTruthy();
    expect(compiled.querySelector('router-outlet')).toBeTruthy();
    expect(compiled.querySelector('app-toast')).toBeTruthy();
  });
});

describe('ScheduleStore', () => {
  let store: ScheduleStore;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    store = TestBed.inject(ScheduleStore);
  });

  it('should initialize with documents and active document', () => {
    expect(store.documents().length).toBeGreaterThan(0);
    expect(store.currentDocument()).toBeTruthy();
  });

  it('should filter entries by category and search query', () => {
    store.setSearchQuery('Lecture');
    expect(store.filteredEntries().every((e) => e.name.includes('Lecture'))).toBe(true);

    store.setSearchQuery('');
    store.setFilterCategory('Meeting');
    expect(store.filteredEntries().every((e) => e.category === 'Meeting')).toBe(true);
  });

  it('should toggle entry synchronization status', () => {
    const firstEntry = store.entries()[0];
    const initialSync = !!firstEntry.isSynced;
    const nextSync = store.toggleEntrySync(firstEntry.id);
    expect(nextSync).toBe(!initialSync);
  });

  it('should add a custom entry to active schedule', () => {
    const initialCount = store.totalEntriesCount();
    store.addEntry({
      name: 'Test Algorithmic Seminar',
      day: 'Wednesday',
      date: '2026-09-23',
      startTime: '14:00',
      endTime: '15:30',
      location: 'Room 401',
      category: 'Academic',
      notes: 'Bring proof worksheet',
      isSynced: false,
    });
    expect(store.totalEntriesCount()).toBe(initialCount + 1);
  });
});

describe('IcsExportService', () => {
  let icsService: IcsExportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    icsService = TestBed.inject(IcsExportService);
  });

  it('should generate valid RFC 5545 iCalendar content', () => {
    const ics = icsService.generateIcsContent(SAMPLE_ENTRIES.slice(0, 2), 'Test Calendar');
    expect(ics).toContain('BEGIN:VCALENDAR');
    expect(ics).toContain('VERSION:2.0');
    expect(ics).toContain('BEGIN:VEVENT');
    expect(ics).toContain('SUMMARY:CS 401: Distributed Systems Lecture');
    expect(ics).toContain('END:VEVENT');
    expect(ics).toContain('END:VCALENDAR');
  });
});
