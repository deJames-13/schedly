import { Injectable, computed, effect, inject, signal } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { ScheduleDocument } from '../models/schedule-document.model';
import { EventCategory, ScheduleEntry } from '../models/schedule-entry.model';

@Injectable({
  providedIn: 'root',
})
export class ScheduleStore {
  private readonly storage = inject(StorageService);

  readonly documents = signal<ScheduleDocument[]>(this.storage.loadDocuments());
  readonly currentDocumentId = signal<string | null>(
    this.documents().length > 0 ? this.documents()[0].id : null
  );

  readonly searchQuery = signal<string>('');
  readonly filterCategory = signal<string>('all');
  readonly activeView = signal<'table' | 'grid'>('table');

  readonly currentDocument = computed<ScheduleDocument | null>(() => {
    const id = this.currentDocumentId();
    const docs = this.documents();
    if (!id) return docs[0] || null;
    return docs.find((d) => d.id === id) || docs[0] || null;
  });

  readonly entries = computed<ScheduleEntry[]>(() => {
    return this.currentDocument()?.entries || [];
  });

  readonly filteredEntries = computed<ScheduleEntry[]>(() => {
    const list = this.entries();
    const q = this.searchQuery().trim().toLowerCase();
    const cat = this.filterCategory();

    return list.filter((item) => {
      const matchSearch =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.location.toLowerCase().includes(q) ||
        (item.notes && item.notes.toLowerCase().includes(q)) ||
        item.day.toLowerCase().includes(q);

      const matchCat = cat === 'all' || item.category === cat;
      return matchSearch && matchCat;
    });
  });

  readonly totalEntriesCount = computed(() => this.entries().length);
  readonly syncedEntriesCount = computed(
    () => this.entries().filter((e) => e.isSynced).length
  );
  readonly unsyncedEntriesCount = computed(
    () => this.totalEntriesCount() - this.syncedEntriesCount()
  );

  constructor() {
    effect(() => {
      this.storage.saveDocuments(this.documents());
    });
  }

  selectDocument(docId: string): void {
    this.currentDocumentId.set(docId);
  }

  addDocument(newDoc: ScheduleDocument): void {
    this.documents.update((prev) => [newDoc, ...prev]);
    this.currentDocumentId.set(newDoc.id);
  }

  updateDocument(updatedDoc: ScheduleDocument): void {
    this.documents.update((prev) =>
      prev.map((d) => (d.id === updatedDoc.id ? updatedDoc : d))
    );
  }

  deleteDocument(docId: string): void {
    this.documents.update((prev) => prev.filter((d) => d.id !== docId));
    if (this.currentDocumentId() === docId) {
      const remaining = this.documents();
      this.currentDocumentId.set(remaining.length > 0 ? remaining[0].id : null);
    }
  }

  updateEntryField(id: string, field: keyof ScheduleEntry, value: any): void {
    const doc = this.currentDocument();
    if (!doc) return;

    const updatedEntries = doc.entries.map((entry) =>
      entry.id === id ? { ...entry, [field]: value } : entry
    );

    const updatedDoc: ScheduleDocument = {
      ...doc,
      entries: updatedEntries,
      entriesCount: updatedEntries.length,
    };

    this.updateDocument(updatedDoc);
  }

  deleteEntry(id: string): void {
    const doc = this.currentDocument();
    if (!doc) return;

    const updatedEntries = doc.entries.filter((entry) => entry.id !== id);
    const updatedDoc: ScheduleDocument = {
      ...doc,
      entries: updatedEntries,
      entriesCount: updatedEntries.length,
    };

    this.updateDocument(updatedDoc);
  }

  toggleEntrySync(id: string): boolean {
    const doc = this.currentDocument();
    if (!doc) return false;

    let nextState = false;
    const updatedEntries = doc.entries.map((entry) => {
      if (entry.id === id) {
        nextState = !entry.isSynced;
        return { ...entry, isSynced: nextState };
      }
      return entry;
    });

    const allSynced = updatedEntries.every((e) => e.isSynced);
    const updatedDoc: ScheduleDocument = {
      ...doc,
      entries: updatedEntries,
      status: allSynced ? 'synced' : 'processed',
    };

    this.updateDocument(updatedDoc);
    return nextState;
  }

  addEntry(entryDraft: Omit<ScheduleEntry, 'id'>): ScheduleEntry {
    const doc = this.currentDocument();
    const newEntry: ScheduleEntry = {
      ...entryDraft,
      id: `sch-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      isSynced: false,
    };

    if (!doc) return newEntry;

    const updatedEntries = [...doc.entries, newEntry];
    const updatedDoc: ScheduleDocument = {
      ...doc,
      entries: updatedEntries,
      entriesCount: updatedEntries.length,
      status: 'processed',
    };

    this.updateDocument(updatedDoc);
    return newEntry;
  }

  saveAndSyncAll(): number {
    const doc = this.currentDocument();
    if (!doc) return 0;

    const updatedEntries = doc.entries.map((e) => ({ ...e, isSynced: true }));
    const updatedDoc: ScheduleDocument = {
      ...doc,
      entries: updatedEntries,
      entriesCount: updatedEntries.length,
      status: 'synced',
    };

    this.updateDocument(updatedDoc);
    return updatedEntries.length;
  }

  setSearchQuery(q: string): void {
    this.searchQuery.set(q);
  }

  setFilterCategory(cat: string): void {
    this.filterCategory.set(cat);
  }

  setActiveView(view: 'table' | 'grid'): void {
    this.activeView.set(view);
  }
}
