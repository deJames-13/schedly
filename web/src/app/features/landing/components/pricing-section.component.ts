import { Component, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideCheck } from '@lucide/angular';

@Component({
  selector: 'app-pricing-section',
  standalone: true,
  imports: [CommonModule, LucideCheck],
  template: `
    <section id="pricing" class="py-16 md:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div class="text-center max-w-2xl mx-auto mb-12">
        <h2 class="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          Simple, Transparent Pricing
        </h2>
        <p class="mt-2 text-sm sm:text-base text-slate-600">
          Choose the plan that matches your scheduling volume. Scale up or pause at any time.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">

        <!-- Starter Plan -->
        <div class="bg-white border border-slate-200 p-6 rounded-[2px] elevation-1 flex flex-col justify-between">
          <div>
            <span class="text-xs font-bold uppercase tracking-wider text-slate-600">Starter</span>
            <div class="mt-2 flex items-baseline gap-1">
              <span class="text-3xl font-extrabold text-slate-900">$0</span>
              <span class="text-xs text-slate-500">/ forever free</span>
            </div>
            <p class="text-xs text-slate-500 mt-2">Perfect for students and occasional schedule digitizing.</p>
            <ul class="mt-6 space-y-2.5 text-xs text-slate-700">
              <li class="flex items-center gap-2">
                <svg lucideCheck class="w-4 h-4 text-[#1A365D]"></svg> 5 schedule parses per month
              </li>
              <li class="flex items-center gap-2">
                <svg lucideCheck class="w-4 h-4 text-[#1A365D]"></svg> Standard OCR resolution
              </li>
              <li class="flex items-center gap-2">
                <svg lucideCheck class="w-4 h-4 text-[#1A365D]"></svg> Export to .ICS files
              </li>
            </ul>
          </div>
          <button
            type="button"
            (click)="selectPlan.emit('Starter')"
            class="mt-8 w-full py-2.5 px-4 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-[2px] transition-colors cursor-pointer"
          >
            Get Started Free
          </button>
        </div>

        <!-- Pro Plan (Highlighted) -->
        <div class="bg-white border-2 border-[#1A365D] p-6 rounded-[2px] elevation-2 relative flex flex-col justify-between">
          <div class="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#1A365D] text-white text-[10px] font-bold uppercase tracking-widest px-3 py-0.5 rounded-[2px]">
            Most Popular
          </div>
          <div>
            <span class="text-xs font-bold uppercase tracking-wider text-[#1A365D]">Professional</span>
            <div class="mt-2 flex items-baseline gap-1">
              <span class="text-3xl font-extrabold text-slate-900">$12</span>
              <span class="text-xs text-slate-500">/ user / month</span>
            </div>
            <p class="text-xs text-slate-500 mt-2">Designed for researchers, shift supervisors, and busy professionals.</p>
            <ul class="mt-6 space-y-2.5 text-xs text-slate-700">
              <li class="flex items-center gap-2">
                <svg lucideCheck class="w-4 h-4 text-[#1A365D]"></svg> 50 schedule parses per month
              </li>
              <li class="flex items-center gap-2">
                <svg lucideCheck class="w-4 h-4 text-[#1A365D]"></svg> Direct 2-Way Google & Outlook Sync
              </li>
              <li class="flex items-center gap-2">
                <svg lucideCheck class="w-4 h-4 text-[#1A365D]"></svg> Multi-page PDF syllabus ingestion
              </li>
              <li class="flex items-center gap-2">
                <svg lucideCheck class="w-4 h-4 text-[#1A365D]"></svg> Priority optical enhancement
              </li>
            </ul>
          </div>
          <button
            type="button"
            (click)="selectPlan.emit('Pro')"
            class="mt-8 w-full py-2.5 px-4 text-xs font-semibold text-white bg-[#1A365D] hover:bg-[#2A4365] rounded-[2px] elevation-1 transition-colors cursor-pointer"
          >
            Start 14-Day Free Trial
          </button>
        </div>

        <!-- Enterprise Plan -->
        <div class="bg-white border border-slate-200 p-6 rounded-[2px] elevation-1 flex flex-col justify-between">
          <div>
            <span class="text-xs font-bold uppercase tracking-wider text-slate-600">Enterprise</span>
            <div class="mt-2 flex items-baseline gap-1">
              <span class="text-3xl font-extrabold text-slate-900">$29</span>
              <span class="text-xs text-slate-500">/ seat / month</span>
            </div>
            <p class="text-xs text-slate-500 mt-2">Tailored for healthcare systems, universities, and enterprise teams.</p>
            <ul class="mt-6 space-y-2.5 text-xs text-slate-700">
              <li class="flex items-center gap-2">
                <svg lucideCheck class="w-4 h-4 text-[#1A365D]"></svg> Unlimited schedule parses
              </li>
              <li class="flex items-center gap-2">
                <svg lucideCheck class="w-4 h-4 text-[#1A365D]"></svg> Custom roster parsing models
              </li>
              <li class="flex items-center gap-2">
                <svg lucideCheck class="w-4 h-4 text-[#1A365D]"></svg> SSO / SAML & Team Management
              </li>
              <li class="flex items-center gap-2">
                <svg lucideCheck class="w-4 h-4 text-[#1A365D]"></svg> Dedicated SLA & HIPAA compliance
              </li>
            </ul>
          </div>
          <button
            type="button"
            (click)="contactSales.emit()"
            class="mt-8 w-full py-2.5 px-4 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-[2px] transition-colors cursor-pointer"
          >
            Contact Enterprise Sales
          </button>
        </div>

      </div>
    </section>
  `,
})
export class PricingSectionComponent {
  readonly selectPlan = output<string>();
  readonly contactSales = output<void>();
}
