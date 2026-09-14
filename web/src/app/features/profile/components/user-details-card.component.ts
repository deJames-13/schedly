import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideCamera } from '@lucide/angular';
import { UserProfile } from '../../../core/models/user-profile.model';

@Component({
  selector: 'app-user-details-card',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideCamera],
  template: `
    <div id="section-user-details" class="p-6 sm:p-8">
      <div class="flex items-center justify-between mb-6">
        <div>
          <h2 class="text-base font-bold text-slate-900">User Details</h2>
          <p class="text-xs text-slate-500">
            Personal identity associated with calendar author tags.
          </p>
        </div>
        <span class="text-[10px] font-mono uppercase bg-slate-100 px-2 py-0.5 rounded-[2px] text-slate-600">
          Inline Editable
        </span>
      </div>

      <div class="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-6">
        <!-- Avatar with Minimal Frame -->
        <div class="relative group">
          <img
            [src]="user().avatarUrl"
            [alt]="user().name"
            class="w-20 h-20 rounded-[2px] object-cover border border-slate-300"
          />
          <button
            type="button"
            (click)="onChangeAvatar()"
            class="absolute inset-0 bg-slate-900/60 text-white rounded-[2px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-xs cursor-pointer"
            title="Change Avatar URL"
            aria-label="Change Avatar Photo"
          >
            <svg lucideCamera class="w-4 h-4"></svg>
          </button>
        </div>

        <!-- Quick Summary -->
        <div class="flex-1 space-y-1">
          <h3 class="text-base font-bold text-slate-900">{{ user().name }}</h3>
          <p class="text-xs text-slate-600">{{ user().role }}</p>
          <p class="text-xs font-mono text-slate-400">{{ user().email }}</p>
        </div>
      </div>

      <!-- Form Fields with Material Floating Label Bottom-Border Accent -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
        <div>
          <label for="input-profile-name" class="block text-[11px] font-semibold uppercase text-slate-600 mb-1">
            Full Display Name
          </label>
          <input
            id="input-profile-name"
            type="text"
            [ngModel]="user().name"
            (ngModelChange)="updateField.emit({ field: 'name', value: $event })"
            class="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-[2px] focus:bg-white focus:border-[#1A365D] focus:outline-none transition-all font-medium text-slate-900 text-xs"
          />
        </div>

        <div>
          <label for="input-profile-email" class="block text-[11px] font-semibold uppercase text-slate-600 mb-1">
            Email Address
          </label>
          <input
            id="input-profile-email"
            type="email"
            [ngModel]="user().email"
            (ngModelChange)="updateField.emit({ field: 'email', value: $event })"
            class="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-[2px] focus:bg-white focus:border-[#1A365D] focus:outline-none transition-all font-medium text-slate-900 text-xs"
          />
        </div>

        <div>
          <label for="input-profile-role" class="block text-[11px] font-semibold uppercase text-slate-600 mb-1">
            Role / Title
          </label>
          <input
            id="input-profile-role"
            type="text"
            [ngModel]="user().role"
            (ngModelChange)="updateField.emit({ field: 'role', value: $event })"
            class="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-[2px] focus:bg-white focus:border-[#1A365D] focus:outline-none transition-all font-medium text-slate-900 text-xs"
          />
        </div>

        <div>
          <label for="input-profile-org" class="block text-[11px] font-semibold uppercase text-slate-600 mb-1">
            Organization / Institution
          </label>
          <input
            id="input-profile-org"
            type="text"
            [ngModel]="user().organization"
            (ngModelChange)="updateField.emit({ field: 'organization', value: $event })"
            class="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-[2px] focus:bg-white focus:border-[#1A365D] focus:outline-none transition-all font-medium text-slate-900 text-xs"
          />
        </div>
      </div>
    </div>
  `,
})
export class UserDetailsCardComponent {
  readonly user = input.required<UserProfile>();
  readonly updateField = output<{ field: keyof UserProfile; value: any }>();

  onChangeAvatar(): void {
    const newAvatar = prompt('Enter image URL for avatar:', this.user().avatarUrl);
    if (newAvatar) {
      this.updateField.emit({ field: 'avatarUrl', value: newAvatar });
    }
  }
}
