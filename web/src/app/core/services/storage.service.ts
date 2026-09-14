import { Injectable } from '@angular/core';
import { ScheduleDocument } from '../models/schedule-document.model';
import { UserProfile } from '../models/user-profile.model';
import { INITIAL_DOCUMENTS, INITIAL_USER } from '../data/initial-data';

const STORAGE_KEY_USER = 'schedly_user_profile';
const STORAGE_KEY_DOCS = 'schedly_schedule_documents';
const STORAGE_KEY_AUTH = 'schedly_is_authenticated';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }

  loadUserProfile(): UserProfile {
    if (!this.isBrowser()) return INITIAL_USER;
    try {
      const data = localStorage.getItem(STORAGE_KEY_USER);
      if (data) {
        return JSON.parse(data);
      }
    } catch {
      // Fallback on parse failure
    }
    this.saveUserProfile(INITIAL_USER);
    return INITIAL_USER;
  }

  saveUserProfile(user: UserProfile): void {
    if (!this.isBrowser()) return;
    try {
      localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(user));
    } catch {
      // Ignore quota errors
    }
  }

  loadDocuments(): ScheduleDocument[] {
    if (!this.isBrowser()) return INITIAL_DOCUMENTS;
    try {
      const data = localStorage.getItem(STORAGE_KEY_DOCS);
      if (data) {
        const parsed = JSON.parse(data);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // Fallback on parse failure
    }
    this.saveDocuments(INITIAL_DOCUMENTS);
    return INITIAL_DOCUMENTS;
  }

  saveDocuments(docs: ScheduleDocument[]): void {
    if (!this.isBrowser()) return;
    try {
      localStorage.setItem(STORAGE_KEY_DOCS, JSON.stringify(docs));
    } catch {
      // Ignore quota errors
    }
  }

  loadAuthStatus(): boolean {
    if (!this.isBrowser()) return true;
    try {
      const val = localStorage.getItem(STORAGE_KEY_AUTH);
      if (val !== null) {
        return val === 'true';
      }
    } catch {
      // Fallback
    }
    return true; // Default to true as in React draft
  }

  saveAuthStatus(status: boolean): void {
    if (!this.isBrowser()) return;
    try {
      localStorage.setItem(STORAGE_KEY_AUTH, String(status));
    } catch {
      // Ignore
    }
  }
}
