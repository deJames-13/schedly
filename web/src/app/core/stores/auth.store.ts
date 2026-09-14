import { Injectable, computed, effect, inject, signal } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { ConnectedCalendars, UserProfile } from '../models/user-profile.model';

@Injectable({
  providedIn: 'root',
})
export class AuthStore {
  private readonly storage = inject(StorageService);

  readonly currentUser = signal<UserProfile>(this.storage.loadUserProfile());
  readonly isAuthenticated = signal<boolean>(this.storage.loadAuthStatus());

  readonly userName = computed(() => this.currentUser().name);
  readonly userEmail = computed(() => this.currentUser().email);
  readonly userRole = computed(() => this.currentUser().role);
  readonly userAvatar = computed(() => this.currentUser().avatarUrl);
  readonly subscription = computed(() => this.currentUser().subscription);
  readonly connectedCalendars = computed(() => this.currentUser().connectedCalendars);

  constructor() {
    effect(() => {
      this.storage.saveUserProfile(this.currentUser());
    });
    effect(() => {
      this.storage.saveAuthStatus(this.isAuthenticated());
    });
  }

  login(userData?: { name?: string; email?: string }): void {
    this.isAuthenticated.set(true);
    if (userData) {
      this.currentUser.update((prev) => ({
        ...prev,
        name: userData.name || prev.name,
        email: userData.email || prev.email,
      }));
    }
  }

  logout(): void {
    this.isAuthenticated.set(false);
  }

  updateUser(updated: UserProfile): void {
    this.currentUser.set(updated);
  }

  updateProfileField<K extends keyof UserProfile>(field: K, value: UserProfile[K]): void {
    this.currentUser.update((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  toggleCalendar(calendarKey: keyof ConnectedCalendars): boolean {
    let nextState = false;
    this.currentUser.update((prev) => {
      nextState = !prev.connectedCalendars[calendarKey];
      return {
        ...prev,
        connectedCalendars: {
          ...prev.connectedCalendars,
          [calendarKey]: nextState,
        },
      };
    });
    return nextState;
  }

  incrementParsedCount(): void {
    this.currentUser.update((prev) => ({
      ...prev,
      subscription: {
        ...prev.subscription,
        parsedCount: prev.subscription.parsedCount + 1,
      },
    }));
  }
}
