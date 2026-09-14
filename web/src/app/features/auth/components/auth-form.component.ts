import { Component, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LucideUser, LucideMail, LucideLock, LucideArrowRight } from '@lucide/angular';

@Component({
  selector: 'app-auth-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LucideUser, LucideMail, LucideLock, LucideArrowRight],
  template: `
    <!-- Mode Switcher Tabs -->
    <div class="grid grid-cols-2 p-1 bg-slate-100 rounded-[2px] mb-6 border border-slate-200">
      <button
        id="auth-toggle-login"
        type="button"
        (click)="setMode('login')"
        class="py-2 text-xs font-semibold rounded-[2px] transition-all cursor-pointer"
        [ngClass]="{
          'bg-white text-[#1A365D] elevation-1 font-bold': mode() === 'login',
          'text-slate-600 hover:text-slate-900': mode() !== 'login'
        }"
      >
        Sign In
      </button>
      <button
        id="auth-toggle-signup"
        type="button"
        (click)="setMode('signup')"
        class="py-2 text-xs font-semibold rounded-[2px] transition-all cursor-pointer"
        [ngClass]="{
          'bg-white text-[#1A365D] elevation-1 font-bold': mode() === 'signup',
          'text-slate-600 hover:text-slate-900': mode() !== 'signup'
        }"
      >
        Create Account
      </button>
    </div>

    <!-- Error Alert if any -->
    @if (errorMessage()) {
      <div
        class="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-[2px] flex items-center justify-between"
        role="alert"
      >
        <span>{{ errorMessage() }}</span>
        <button
          type="button"
          (click)="errorMessage.set(null)"
          class="text-red-500 hover:text-red-800 text-sm font-bold"
          aria-label="Dismiss error"
        >
          &times;
        </button>
      </div>
    }

    <!-- Reactive Form -->
    <form [formGroup]="form" (ngSubmit)="onSubmit()" class="space-y-4" novalidate>
      @if (mode() === 'signup') {
        <div>
          <label for="auth-name" class="block text-xs font-semibold text-slate-700 mb-1">
            Full Name
          </label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <svg lucideUser class="w-4 h-4"></svg>
            </div>
            <input
              id="auth-name"
              type="text"
              formControlName="name"
              placeholder="e.g. Dr. Eleanor Vance"
              class="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-white border border-slate-300 rounded-[2px] focus:border-[#1A365D] focus:ring-1 focus:ring-[#1A365D] transition-colors"
            />
          </div>
          @if (form.controls.name.invalid && form.controls.name.touched) {
            <p class="text-[11px] text-red-600 mt-1">Name is required for registration.</p>
          }
        </div>
      }

      <div>
        <label for="auth-email" class="block text-xs font-semibold text-slate-700 mb-1">
          Work Email Address
        </label>
        <div class="relative">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <svg lucideMail class="w-4 h-4"></svg>
          </div>
          <input
            id="auth-email"
            type="email"
            formControlName="email"
            placeholder="name&#64;institution.edu"
            class="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-white border border-slate-300 rounded-[2px] focus:border-[#1A365D] focus:ring-1 focus:ring-[#1A365D] transition-colors"
          />
        </div>
        @if (form.controls.email.invalid && form.controls.email.touched) {
          <p class="text-[11px] text-red-600 mt-1">Please enter a valid email address.</p>
        }
      </div>

      <div>
        <label for="auth-password" class="block text-xs font-semibold text-slate-700 mb-1">
          Account Password
        </label>
        <div class="relative">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <svg lucideLock class="w-4 h-4"></svg>
          </div>
          <input
            id="auth-password"
            type="password"
            formControlName="password"
            placeholder="••••••••"
            class="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-white border border-slate-300 rounded-[2px] focus:border-[#1A365D] focus:ring-1 focus:ring-[#1A365D] transition-colors"
          />
        </div>
        @if (form.controls.password.invalid && form.controls.password.touched) {
          <p class="text-[11px] text-red-600 mt-1">Password must be at least 6 characters.</p>
        }
      </div>

      <button
        id="auth-submit-btn"
        type="submit"
        class="w-full mt-2 py-2.5 px-4 text-xs sm:text-sm font-semibold text-white bg-[#1A365D] hover:bg-[#2A4365] rounded-[2px] elevation-1 transition-all flex items-center justify-center gap-2 cursor-pointer"
      >
        <span>{{ mode() === 'login' ? 'Sign In to Workspace' : 'Create Schedly Account' }}</span>
        <svg lucideArrowRight class="w-4 h-4"></svg>
      </button>
    </form>
  `,
})
export class AuthFormComponent {
  readonly mode = signal<'login' | 'signup'>('login');
  readonly errorMessage = signal<string | null>(null);

  readonly formSubmitted = output<{ name?: string; email: string }>();

  readonly form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  setMode(newMode: 'login' | 'signup'): void {
    this.mode.set(newMode);
    this.errorMessage.set(null);
    if (newMode === 'login') {
      this.form.controls.name.clearValidators();
    } else {
      this.form.controls.name.setValidators([Validators.required]);
    }
    this.form.controls.name.updateValueAndValidity();
  }

  onSubmit(): void {
    if (this.mode() === 'login') {
      this.form.controls.name.clearValidators();
      this.form.controls.name.updateValueAndValidity();
    }

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.errorMessage.set('Please provide all required fields correctly to continue.');
      return;
    }

    this.errorMessage.set(null);
    const val = this.form.getRawValue();
    this.formSubmitted.emit({
      name: this.mode() === 'signup' ? (val.name || undefined) : 'Marcus Vance',
      email: val.email || 'm.vance@schedly.internal',
    });
  }
}
