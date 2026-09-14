import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideScanLine, LucideZap, LucideCalendarSync, LucideCheck } from '@lucide/angular';

@Component({
  selector: 'app-feature-grid',
  standalone: true,
  imports: [CommonModule, LucideScanLine, LucideZap, LucideCalendarSync, LucideCheck],
  template: `
    <section id="features" class="py-16 md:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-slate-200">
      <div class="text-center max-w-3xl mx-auto mb-14">
        <h2 class="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          Engineered for Precision, Speed, and Zero Friction
        </h2>
        <p class="mt-3 text-base text-slate-600 font-normal">
          Schedly replaces tedious manual calendar entry with automated document parsing and structured inline editing.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">

        <!-- Card 1: Capture -->
        <div class="bg-white border border-slate-200 p-6 rounded-[2px] elevation-1 flex flex-col justify-between">
          <div>
            <div class="w-10 h-10 bg-slate-100 text-[#1A365D] flex items-center justify-center rounded-[2px] font-bold text-base mb-5">
              <svg lucideScanLine class="w-5 h-5"></svg>
            </div>
            <h3 class="text-base font-bold text-slate-900 mb-2">
              1. Multi-Format Image Ingestion
            </h3>
            <p class="text-sm text-slate-600 leading-relaxed">
              Accepts smartphone photos, desk scans, PDFs, and whiteboard photos. Advanced normalization removes shadows, creases, and perspective distortions.
            </p>
          </div>
          <div class="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-medium text-slate-500">
            <span>Supports JPG, PNG, PDF, HEIC</span>
            <svg lucideCheck class="w-4 h-4 text-[#1A365D]"></svg>
          </div>
        </div>

        <!-- Card 2: AI OCR Extraction -->
        <div class="bg-white border border-slate-200 p-6 rounded-[2px] elevation-1 flex flex-col justify-between">
          <div>
            <div class="w-10 h-10 bg-slate-100 text-[#1A365D] flex items-center justify-center rounded-[2px] font-bold text-base mb-5">
              <svg lucideZap class="w-5 h-5"></svg>
            </div>
            <h3 class="text-base font-bold text-slate-900 mb-2">
              2. Semantic Event Parsing & Categorization
            </h3>
            <p class="text-sm text-slate-600 leading-relaxed">
              Algorithms isolate course titles, time bounds, days of the week, room numbers, and meeting locations with high precision.
            </p>
          </div>
          <div class="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-medium text-slate-500">
            <span>Inline Material UI text editing</span>
            <svg lucideCheck class="w-4 h-4 text-[#1A365D]"></svg>
          </div>
        </div>

        <!-- Card 3: Calendar Sync -->
        <div class="bg-white border border-slate-200 p-6 rounded-[2px] elevation-1 flex flex-col justify-between">
          <div>
            <div class="w-10 h-10 bg-slate-100 text-[#1A365D] flex items-center justify-center rounded-[2px] font-bold text-base mb-5">
              <svg lucideCalendarSync class="w-5 h-5"></svg>
            </div>
            <h3 class="text-base font-bold text-slate-900 mb-2">
              3. Direct Calendar Sync & ICS Export
            </h3>
            <p class="text-sm text-slate-600 leading-relaxed">
              Push all events to Google Calendar and Outlook in a single click, or download standard .ics calendar files for mobile devices.
            </p>
          </div>
          <div class="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-medium text-slate-500">
            <span>RFC 5545 Compliant .ICS</span>
            <svg lucideCheck class="w-4 h-4 text-[#1A365D]"></svg>
          </div>
        </div>

      </div>
    </section>
  `,
})
export class FeatureGridComponent {}
