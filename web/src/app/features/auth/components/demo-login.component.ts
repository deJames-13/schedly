import { Component, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideShieldCheck } from '@lucide/angular';

@Component({
  selector: 'app-demo-login',
  standalone: true,
  imports: [CommonModule, LucideShieldCheck],
  template: `
    <div class="mt-6 pt-6 border-t border-slate-200">
      <div class="bg-slate-50 border border-slate-200 p-3 rounded-[2px] flex items-center justify-between">
        <div class="flex items-center gap-2">
          <svg lucideShieldCheck class="w-4 h-4 text-[#1A365D]"></svg>
          <div class="text-[11px]">
            <span class="font-bold text-slate-800">Need immediate evaluation access?</span>
            <p class="text-slate-500">Sign in with a pre-configured Stanford Faculty test profile.</p>
          </div>
        </div>
        <button
          id="btn-demo-signin"
          type="button"
          (click)="demoSignIn.emit()"
          class="shrink-0 ml-2 px-2.5 py-1 text-xs font-semibold text-[#1A365D] bg-white border border-slate-300 hover:bg-slate-100 rounded-[2px] elevation-1 transition-all cursor-pointer"
        >
          Quick Demo Login
        </button>
      </div>
    </div>
  `,
})
export class DemoLoginComponent {
  readonly demoSignIn = output<void>();
}
