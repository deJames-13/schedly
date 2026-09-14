import { Component, computed, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserSubscription } from '../../../core/models/user-profile.model';

@Component({
  selector: 'app-subscription-quota',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div id="section-subscription-billing" class="p-6 sm:p-8">
      <div class="flex items-center justify-between mb-4">
        <div>
          <h2 class="text-base font-bold text-slate-900">Subscription & Quota</h2>
          <p class="text-xs text-slate-500">
            Current plan tier and document OCR consumption.
          </p>
        </div>
        <span class="px-2 py-0.5 bg-blue-50 border border-blue-200 text-[#1A365D] text-xs font-bold rounded-[2px]">
          {{ subscription().planName }}
        </span>
      </div>

      <div class="bg-slate-50 border border-slate-200 p-4 rounded-[2px] mb-4">
        <div class="flex items-center justify-between text-xs mb-2">
          <span class="font-semibold text-slate-700">Monthly Parsing Quota:</span>
          <span class="font-mono font-bold text-[#1A365D]">
            {{ subscription().parsedCount }} / {{ subscription().parsedLimit }} schedules used
          </span>
        </div>

        <!-- Quota bar -->
        <div class="w-full bg-slate-200 h-2 rounded-[1px] overflow-hidden">
          <div
            class="bg-[#1A365D] h-full transition-all duration-300"
            [style.width.%]="quotaPercent()"
            role="progressbar"
            [attr.aria-valuenow]="subscription().parsedCount"
            [attr.aria-valuemin]="0"
            [attr.aria-valuemax]="subscription().parsedLimit"
            aria-label="Monthly OCR parsing quota used"
          ></div>
        </div>

        <div class="mt-3 flex items-center justify-between text-[11px] text-slate-500">
          <span>Renews on {{ subscription().renewsOn }}</span>
          <span class="text-emerald-700 font-medium">Status: {{ subscription().status }}</span>
        </div>
      </div>

      <div class="flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-2">
        <span class="text-slate-500">Need higher document volume or custom OCR templates?</span>
        <button
          type="button"
          (click)="upgradeTier.emit()"
          class="font-semibold text-[#1A365D] hover:underline self-start sm:self-auto cursor-pointer"
        >
          Upgrade Tier &rarr;
        </button>
      </div>
    </div>
  `,
})
export class SubscriptionQuotaComponent {
  readonly subscription = input.required<UserSubscription>();
  readonly upgradeTier = output<void>();

  readonly quotaPercent = computed(() => {
    const sub = this.subscription();
    if (!sub.parsedLimit) return 0;
    return Math.min(100, Math.round((sub.parsedCount / sub.parsedLimit) * 100));
  });
}
