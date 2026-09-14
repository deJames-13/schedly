import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthStore } from '../../core/stores/auth.store';
import { ToastService } from '../../shared/services/toast.service';
import { AuthFormComponent } from './components/auth-form.component';
import { DemoLoginComponent } from './components/demo-login.component';

@Component({
  selector: 'app-auth-page',
  standalone: true,
  imports: [CommonModule, AuthFormComponent, DemoLoginComponent],
  templateUrl: './auth-page.component.html',
})
export class AuthPageComponent {
  private readonly router = inject(Router);
  private readonly authStore = inject(AuthStore);
  private readonly toastService = inject(ToastService);

  onAuthSuccess(userData: { name?: string; email: string }): void {
    this.authStore.login(userData);
    this.toastService.show(`Welcome back, ${userData.name || 'User'}!`);
    this.router.navigate(['/upload']);
  }

  onDemoSignIn(): void {
    this.authStore.login({
      name: 'Dr. Sarah Jenkins',
      email: 's.jenkins@stanford.edu',
    });
    this.toastService.show('Logged in as Dr. Sarah Jenkins (Stanford Faculty Demo)');
    this.router.navigate(['/upload']);
  }

  onCancel(): void {
    this.router.navigate(['/landing']);
  }
}
