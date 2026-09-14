import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../services/toast.service';
import { LucideCheckCircle2, LucideAlertCircle, LucideInfo, LucideX } from '@lucide/angular';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule, LucideCheckCircle2, LucideAlertCircle, LucideInfo, LucideX],
  template: `
    <div
      class="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none"
      role="region"
      aria-label="Notifications"
    >
      @for (toast of toastService.toasts(); track toast.id) {
        <div
          class="pointer-events-auto bg-[#1A365D] text-white px-4 py-3 rounded-[2px] shadow-lg flex items-center justify-between gap-3 text-xs font-medium border border-slate-700 transition-all transform duration-200 ease-out translate-y-0 opacity-100"
          role="status"
          aria-live="polite"
        >
          <div class="flex items-center gap-2.5">
            @if (toast.type === 'success') {
              <svg lucideCheckCircle2 class="w-4 h-4 text-emerald-400 shrink-0"></svg>
            } @else if (toast.type === 'error') {
              <svg lucideAlertCircle class="w-4 h-4 text-rose-400 shrink-0"></svg>
            } @else {
              <svg lucideInfo class="w-4 h-4 text-sky-400 shrink-0"></svg>
            }
            <span class="leading-snug">{{ toast.message }}</span>
          </div>

          <button
            type="button"
            (click)="toastService.remove(toast.id)"
            class="text-slate-400 hover:text-white p-1 rounded focus:outline-none focus:ring-1 focus:ring-white"
            aria-label="Dismiss notification"
          >
            <svg lucideX class="w-3.5 h-3.5"></svg>
          </button>
        </div>
      }
    </div>
  `,
})
export class ToastComponent {
  readonly toastService = inject(ToastService);
}
