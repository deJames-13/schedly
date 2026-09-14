import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthStore } from '../../core/stores/auth.store';
import { ScheduleStore } from '../../core/stores/schedule.store';
import {
  LucideCalendar,
  LucideUpload,
  LucideClock,
  LucideUser,
  LucideArrowRight,
  LucideLogOut,
  LucideMenu,
  LucideX,
} from '@lucide/angular';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    LucideCalendar,
    LucideUpload,
    LucideClock,
    LucideUser,
    LucideArrowRight,
    LucideLogOut,
    LucideMenu,
    LucideX,
  ],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  readonly authStore = inject(AuthStore);
  readonly scheduleStore = inject(ScheduleStore);
  private readonly router = inject(Router);

  readonly mobileMenuOpen = signal(false);

  toggleMobileMenu(): void {
    this.mobileMenuOpen.update((v) => !v);
  }

  closeMobileMenu(): void {
    this.mobileMenuOpen.set(false);
  }

  handleLogout(): void {
    this.authStore.logout();
    this.closeMobileMenu();
    this.router.navigate(['/landing']);
  }
}
