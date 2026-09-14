import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthStore } from '../../core/stores/auth.store';
import { ToastService } from '../../shared/services/toast.service';
import { ConnectedCalendars, UserProfile } from '../../core/models/user-profile.model';
import { UserDetailsCardComponent } from './components/user-details-card.component';
import { ConnectedCalendarsComponent } from './components/connected-calendars.component';
import { SubscriptionQuotaComponent } from './components/subscription-quota.component';
import { LucideLogOut } from '@lucide/angular';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [
    CommonModule,
    UserDetailsCardComponent,
    ConnectedCalendarsComponent,
    SubscriptionQuotaComponent,
    LucideLogOut,
  ],
  templateUrl: './profile-page.component.html',
})
export class ProfilePageComponent {
  readonly authStore = inject(AuthStore);
  private readonly toast = inject(ToastService);
  private readonly router = inject(Router);

  onUpdateField(event: { field: keyof UserProfile; value: any }): void {
    this.authStore.updateProfileField(event.field, event.value);
    this.toast.show('Profile information updated.');
  }

  onToggleCalendar(calKey: keyof ConnectedCalendars): void {
    const isConnected = this.authStore.toggleCalendar(calKey);
    const calName =
      calKey === 'googleCalendar'
        ? 'Google Calendar'
        : calKey === 'outlookCalendar'
        ? 'Microsoft Outlook'
        : 'Apple iCloud Calendar';

    this.toast.show(
      isConnected ? `Connected to ${calName}` : `Disconnected from ${calName}`
    );
  }

  onUpgradeTier(): void {
    this.router.navigate(['/landing'], { fragment: 'pricing' });
  }

  onLogout(): void {
    this.authStore.logout();
    this.toast.show('You have been signed out.');
    this.router.navigate(['/landing']);
  }
}
