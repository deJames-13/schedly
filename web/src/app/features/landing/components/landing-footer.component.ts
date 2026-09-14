import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-landing-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer class="border-t border-slate-200 py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4">
      <div class="flex items-center gap-2">
        <div class="w-5 h-5 bg-[#1A365D] text-white flex items-center justify-center rounded-[2px] text-[10px] font-bold">
          S
        </div>
        <span class="font-semibold text-slate-700">SCHEDLY SYSTEM</span>
        <span>© 2026. All rights reserved.</span>
      </div>
      <div class="flex items-center gap-6">
        <button
          type="button"
          (click)="scrollToTop()"
          class="hover:text-slate-800 cursor-pointer focus:outline-none"
        >
          Back to Top
        </button>
        <span class="hover:text-slate-800 cursor-pointer">Security & Privacy</span>
        <span class="hover:text-slate-800 cursor-pointer">Terms of Service</span>
      </div>
    </footer>
  `,
})
export class LandingFooterComponent {
  scrollToTop(): void {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
}
