import React, { useState } from 'react';
import { 
  ArrowRight, 
  ScanLine, 
  Sparkles, 
  CalendarSync, 
  Check, 
  SlidersHorizontal,
  FileSpreadsheet,
  Zap,
  ShieldCheck,
  Smartphone,
  ChevronRight
} from 'lucide-react';
import { ActiveScreen } from '../types';

interface LandingPageProps {
  onGetStarted: () => void;
  onOpenAuth: () => void;
  onSelectSamplePreset: (presetId: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onGetStarted,
  onOpenAuth,
  onSelectSamplePreset,
}) => {
  // Interactive before-and-after conversion preview slider
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const [activeTab, setActiveTab] = useState<'preview' | 'features' | 'pricing'>('preview');

  return (
    <div id="landing-page-container" className="min-h-screen bg-white">
      
      {/* 1. Hero Section */}
      <section id="hero-section" className="pt-12 pb-16 md:pt-20 md:pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-slate-200">
        <div className="max-w-4xl mx-auto text-center">
          
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 border border-slate-200 rounded-[2px] text-xs font-semibold tracking-wide text-[#1A365D] mb-6">
            <Sparkles className="w-3.5 h-3.5 text-[#1A365D]" />
            <span>AI-POWERED OPTICAL SCHEDULE PARSING</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15] mb-6">
            Transform Your Physical Schedules into{' '}
            <span className="text-[#1A365D] underline decoration-slate-300 underline-offset-8">
              Digital Clarity
            </span>{' '}
            in Seconds
          </h1>

          <p className="text-lg sm:text-xl text-slate-600 font-normal leading-relaxed max-w-2xl mx-auto mb-10">
            Snap a photo of messy paper timetables, whiteboard shift rosters, or printed syllabi. Schedly extracts structured calendar events ready for instant inline editing and two-way calendar sync.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <button
              id="hero-cta-get-started"
              onClick={onGetStarted}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#1A365D] hover:bg-[#2A4365] text-white text-sm font-semibold rounded-[2px] elevation-2 transition-all cursor-pointer"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              id="hero-cta-explore-demo"
              onClick={() => onSelectSamplePreset('preset-academic')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 text-sm font-semibold rounded-[2px] elevation-1 transition-all cursor-pointer"
            >
              <FileSpreadsheet className="w-4 h-4 text-slate-600" />
              <span>Load Sample Schedule</span>
            </button>
          </div>

          {/* Micro trust indicators */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs font-medium text-slate-500">
            <span className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-[#1A365D]" /> No credit card required
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-[#1A365D]" /> Google, Outlook & Apple Sync
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-[#1A365D]" /> Clean .ICS export
            </span>
          </div>

        </div>

        {/* 2. Visuals: Sleek Minimal Mockup (Paper Schedule -> Clean Digital UI) */}
        <div id="hero-interactive-mockup" className="mt-14 max-w-5xl mx-auto">
          <div className="bg-white border border-slate-300 rounded-[2px] elevation-3 overflow-hidden">
            
            {/* Mockup Toolbar Header */}
            <div className="bg-[#1A365D] text-white px-4 py-3 flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-none bg-red-400" />
                  <div className="w-2.5 h-2.5 rounded-none bg-amber-400" />
                  <div className="w-2.5 h-2.5 rounded-none bg-emerald-400" />
                </div>
                <span className="text-xs font-mono font-medium tracking-wide text-slate-200">
                  SCHEDLY PARSER ENGINE v2.6 // REAL-TIME CONVERSION
                </span>
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-300">
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Drag slider or toggle below to compare</span>
              </div>
            </div>

            {/* Side-by-side or split interactive comparison */}
            <div className="relative h-[380px] sm:h-[440px] select-none overflow-hidden bg-slate-100">
              
              {/* Background Layer: Clean Structured Digital UI */}
              <div className="absolute inset-0 bg-[#F8FAFC] p-4 sm:p-6 overflow-y-auto">
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-200">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[11px] font-semibold rounded-[2px]">
                      PARSED (100% CONFIDENCE)
                    </span>
                    <h3 className="text-sm font-bold text-slate-900">
                      WEEKLY ACADEMIC & LAB TIMETABLE
                    </h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-[#1A365D] bg-white border border-slate-300 px-2 py-1 rounded-[2px]">
                      7 Events Extracted
                    </span>
                  </div>
                </div>

                {/* Digital Structured Rows */}
                <div className="space-y-2">
                  <div className="bg-white border border-slate-200 p-3 rounded-[2px] elevation-1 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-1.5 h-8 bg-[#1A365D]" />
                      <div>
                        <div className="text-xs font-bold text-slate-900">CS 401: Distributed Systems Lecture</div>
                        <div className="text-[11px] text-slate-500 font-mono">Mon • 09:00 - 10:30 AM • Science Hall 302</div>
                      </div>
                    </div>
                    <span className="text-[11px] font-medium bg-blue-50 text-blue-800 border border-blue-200 px-2 py-0.5 rounded-[2px]">
                      Academic
                    </span>
                  </div>

                  <div className="bg-white border border-slate-200 p-3 rounded-[2px] elevation-1 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-1.5 h-8 bg-amber-600" />
                      <div>
                        <div className="text-xs font-bold text-slate-900">Weekly Engineering Standup & Triage</div>
                        <div className="text-[11px] text-slate-500 font-mono">Mon • 11:15 - 12:00 PM • Conf Room Alpha</div>
                      </div>
                    </div>
                    <span className="text-[11px] font-medium bg-amber-50 text-amber-800 border border-amber-200 px-2 py-0.5 rounded-[2px]">
                      Meeting
                    </span>
                  </div>

                  <div className="bg-white border border-slate-200 p-3 rounded-[2px] elevation-1 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-1.5 h-8 bg-purple-600" />
                      <div>
                        <div className="text-xs font-bold text-slate-900">Robotics & Hardware Lab Session</div>
                        <div className="text-[11px] text-slate-500 font-mono">Tue • 01:00 - 03:30 PM • Annex Bay 4</div>
                      </div>
                    </div>
                    <span className="text-[11px] font-medium bg-purple-50 text-purple-800 border border-purple-200 px-2 py-0.5 rounded-[2px]">
                      Lab / Workshop
                    </span>
                  </div>

                  <div className="bg-white border border-slate-200 p-3 rounded-[2px] elevation-1 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-1.5 h-8 bg-slate-700" />
                      <div>
                        <div className="text-xs font-bold text-slate-900">Shift Supervisor On-Call Duty</div>
                        <div className="text-[11px] text-slate-500 font-mono">Wed • 08:00 - 02:00 PM • Command Center</div>
                      </div>
                    </div>
                    <span className="text-[11px] font-medium bg-slate-100 text-slate-800 border border-slate-300 px-2 py-0.5 rounded-[2px]">
                      Work Shift
                    </span>
                  </div>
                </div>
              </div>

              {/* Foreground Layer: Messy Paper / Whiteboard Schedule (Clipped by Slider) */}
              <div 
                className="absolute inset-y-0 left-0 overflow-hidden bg-[#FDFBF7] border-r-2 border-[#1A365D] shadow-2xl transition-all duration-75"
                style={{ width: `${sliderPosition}%` }}
              >
                <div className="w-[800px] sm:w-[980px] p-4 sm:p-6 select-none relative font-mono">
                  {/* Paper texture feel */}
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-stone-300">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 bg-amber-200 text-stone-900 text-[11px] font-bold rounded-none">
                        ORIGINAL PAPER ARTIFACT
                      </span>
                      <h3 className="text-xs font-bold text-stone-700 uppercase tracking-wider">
                        Rough Schedule Notes (Handwritten & Printed)
                      </h3>
                    </div>
                    <span className="text-xs text-stone-500 italic">Folded Paper Scan • 300 DPI</span>
                  </div>

                  {/* Messy paper representation */}
                  <div className="space-y-3 bg-[#FCF8EC] p-4 border border-stone-300 shadow-inner rounded-none rotate-[-0.3deg]">
                    <div className="p-2 border-b border-dashed border-stone-400">
                      <div className="text-xs font-bold text-stone-800 line-through decoration-red-400">
                        9:00 - 10:15 Calculus (Rescheduled to rm 302!)
                      </div>
                      <div className="text-sm font-bold text-stone-900 bg-yellow-200 inline-block px-1">
                        -&gt; CS 401: Distributed Systems @ 9:00 - 10:30 SciHall 302
                      </div>
                    </div>

                    <div className="p-2 border-b border-dashed border-stone-400">
                      <div className="text-xs font-semibold text-stone-800">
                        Mon 11:15 Standup in Conf Room Alpha (bring slide deck!!)
                      </div>
                      <div className="text-[11px] text-stone-600 italic">
                        * Note: sync with Elena before 12
                      </div>
                    </div>

                    <div className="p-2 border-b border-dashed border-stone-400">
                      <div className="text-xs font-bold text-stone-800 bg-emerald-100 inline-block px-1">
                        Tuesday 13:00 - 15:30 Hardware LAB (Annex Bay 4)
                      </div>
                      <div className="text-[11px] text-stone-500">
                        [Need safety goggles & sign attendance sheet]
                      </div>
                    </div>

                    <div className="p-2">
                      <div className="text-xs font-bold text-stone-800">
                        Wed 08:00 - 14:00 Ops Command Shift On-Call
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Interactive Slider Controller Handle */}
              <div 
                className="absolute inset-y-0 w-8 -ml-4 flex items-center justify-center cursor-ew-resize z-20"
                style={{ left: `${sliderPosition}%` }}
              >
                <div className="w-7 h-7 bg-[#1A365D] border-2 border-white text-white rounded-[2px] flex items-center justify-center shadow-lg">
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                </div>
              </div>

            </div>

            {/* Interactive Slider Controls Bar */}
            <div className="bg-slate-50 border-t border-slate-200 px-4 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-3">
                <span className="font-semibold text-slate-700">Slide to compare:</span>
                <input 
                  id="mockup-slider-input"
                  type="range" 
                  min="5" 
                  max="95" 
                  value={sliderPosition}
                  onChange={(e) => setSliderPosition(Number(e.target.value))}
                  className="w-36 sm:w-56 accent-[#1A365D] cursor-pointer"
                />
                <span className="text-slate-500 font-mono">{sliderPosition}% Paper / {100 - sliderPosition}% Schedly</span>
              </div>

              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setSliderPosition(90)}
                  className="px-2 py-1 text-slate-600 hover:text-slate-900 border border-slate-200 bg-white rounded-[2px]"
                >
                  View Paper
                </button>
                <button 
                  onClick={() => setSliderPosition(10)}
                  className="px-2 py-1 text-slate-600 hover:text-slate-900 border border-slate-200 bg-white rounded-[2px]"
                >
                  View Digital
                </button>
                <button 
                  onClick={() => setSliderPosition(50)}
                  className="px-2 py-1 text-[#1A365D] font-semibold border border-slate-300 bg-white rounded-[2px]"
                >
                  Reset (50/50)
                </button>
              </div>
            </div>

          </div>
        </div>

      </section>

      {/* 3. Core Capabilities & 3-Step Workflow */}
      <section id="features-section" className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-slate-200">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Engineered for Precision, Speed, and Zero Friction
          </h2>
          <p className="mt-3 text-base text-slate-600 font-normal">
            Schedly replaces tedious manual calendar entry with automated document parsing and structured inline editing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Capture */}
          <div className="bg-white border border-slate-200 p-6 rounded-[2px] elevation-1 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 bg-slate-100 text-[#1A365D] flex items-center justify-center rounded-[2px] font-bold text-base mb-5">
                <ScanLine className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">
                1. Multi-Format Image Ingestion
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Accepts smartphone photos, desk scans, PDFs, and whiteboard photos. Advanced normalization removes shadows, creases, and perspective distortions.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-medium text-slate-500">
              <span>Supports JPG, PNG, PDF, HEIC</span>
              <Check className="w-4 h-4 text-[#1A365D]" />
            </div>
          </div>

          {/* Card 2: AI OCR Extraction */}
          <div className="bg-white border border-slate-200 p-6 rounded-[2px] elevation-1 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 bg-slate-100 text-[#1A365D] flex items-center justify-center rounded-[2px] font-bold text-base mb-5">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">
                2. Semantic Event Parsing & Categorization
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Algorithms isolate course titles, time bounds, days of the week, room numbers, and meeting locations with high precision.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-medium text-slate-500">
              <span>Inline Material UI text editing</span>
              <Check className="w-4 h-4 text-[#1A365D]" />
            </div>
          </div>

          {/* Card 3: Calendar Sync */}
          <div className="bg-white border border-slate-200 p-6 rounded-[2px] elevation-1 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 bg-slate-100 text-[#1A365D] flex items-center justify-center rounded-[2px] font-bold text-base mb-5">
                <CalendarSync className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">
                3. Direct Calendar Sync & ICS Export
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Push all events to Google Calendar and Outlook in a single click, or download standard `.ics` calendar files for mobile devices.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-medium text-slate-500">
              <span>RFC 5545 Compliant .ICS</span>
              <Check className="w-4 h-4 text-[#1A365D]" />
            </div>
          </div>

        </div>
      </section>

      {/* 4. Pre-configured Sample Templates (Try in 1 Click) */}
      <section id="sample-presets-section" className="py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-slate-200 bg-[#F8FAFC]">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#1A365D]">Instant Interactive Prototypes</span>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
              Test with Real-World Physical Schedule Templates
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Select any pre-scanned schedule below to experience the Schedly parsing and editing workflow instantly.
            </p>
          </div>
          <button
            onClick={onGetStarted}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1A365D] hover:underline"
          >
            <span>Or upload your own image</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Preset 1 */}
          <div 
            onClick={() => onSelectSamplePreset('preset-academic')}
            className="bg-white border border-slate-200 p-5 rounded-[2px] hover:border-[#1A365D] elevation-1 cursor-pointer transition-all group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#1A365D] bg-blue-50 px-2 py-0.5 rounded-[2px]">
                University & College
              </span>
              <span className="text-xs text-slate-400 font-mono">5 Courses</span>
            </div>
            <h4 className="text-sm font-bold text-slate-900 group-hover:text-[#1A365D] transition-colors">
              Fall Term Academic Timetable
            </h4>
            <p className="text-xs text-slate-500 mt-1 line-clamp-2">
              Printed course catalog syllabus with lecture halls, lab sessions, and recurring hours.
            </p>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-[#1A365D]">
              <span>Load & Review Parse</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Preset 2 */}
          <div 
            onClick={() => onSelectSamplePreset('preset-medical')}
            className="bg-white border border-slate-200 p-5 rounded-[2px] hover:border-[#1A365D] elevation-1 cursor-pointer transition-all group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-[2px]">
                Healthcare & Shifts
              </span>
              <span className="text-xs text-slate-400 font-mono">4 Rotations</span>
            </div>
            <h4 className="text-sm font-bold text-slate-900 group-hover:text-[#1A365D] transition-colors">
              Hospital Ward Shift Roster
            </h4>
            <p className="text-xs text-slate-500 mt-1 line-clamp-2">
              Handwritten nurse and resident clipboard with day, swing, and overnight on-call coverage.
            </p>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-[#1A365D]">
              <span>Load & Review Parse</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Preset 3 */}
          <div 
            onClick={() => onSelectSamplePreset('preset-conference')}
            className="bg-white border border-slate-200 p-5 rounded-[2px] hover:border-[#1A365D] elevation-1 cursor-pointer transition-all group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-purple-800 bg-purple-50 px-2 py-0.5 rounded-[2px]">
                Corporate Events
              </span>
              <span className="text-xs text-slate-400 font-mono">6 Sessions</span>
            </div>
            <h4 className="text-sm font-bold text-slate-900 group-hover:text-[#1A365D] transition-colors">
              Symposium Program Brochure
            </h4>
            <p className="text-xs text-slate-500 mt-1 line-clamp-2">
              Keynotes, technical tracks, executive lunch roundtables, and breakout workshops.
            </p>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-[#1A365D]">
              <span>Load & Review Parse</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </section>

      {/* 5. Pricing Section (Requested in Header & Brief) */}
      <section id="pricing-section" className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Simple, Transparent Pricing
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600">
            Choose the plan that matches your scheduling volume. Scale up or pause at any time.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          
          {/* Starter Plan */}
          <div className="bg-white border border-slate-200 p-6 rounded-[2px] elevation-1 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-600">Starter</span>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="text-3xl font-extrabold text-slate-900">$0</span>
                <span className="text-xs text-slate-500">/ forever free</span>
              </div>
              <p className="text-xs text-slate-500 mt-2">Perfect for students and occasional schedule digitizing.</p>
              <ul className="mt-6 space-y-2.5 text-xs text-slate-700">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#1A365D]" /> 5 schedule parses per month
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#1A365D]" /> Standard OCR resolution
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#1A365D]" /> Export to .ICS files
                </li>
              </ul>
            </div>
            <button
              onClick={onGetStarted}
              className="mt-8 w-full py-2.5 px-4 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-[2px] transition-colors"
            >
              Get Started Free
            </button>
          </div>

          {/* Pro Plan (Highlighted) */}
          <div className="bg-white border-2 border-[#1A365D] p-6 rounded-[2px] elevation-2 relative flex flex-col justify-between">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#1A365D] text-white text-[10px] font-bold uppercase tracking-widest px-3 py-0.5 rounded-[2px]">
              Most Popular
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#1A365D]">Professional</span>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="text-3xl font-extrabold text-slate-900">$12</span>
                <span className="text-xs text-slate-500">/ user / month</span>
              </div>
              <p className="text-xs text-slate-500 mt-2">Designed for researchers, shift supervisors, and busy professionals.</p>
              <ul className="mt-6 space-y-2.5 text-xs text-slate-700">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#1A365D]" /> 50 schedule parses per month
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#1A365D]" /> Direct 2-Way Google & Outlook Sync
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#1A365D]" /> Multi-page PDF syllabus ingestion
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#1A365D]" /> Priority optical enhancement
                </li>
              </ul>
            </div>
            <button
              onClick={onGetStarted}
              className="mt-8 w-full py-2.5 px-4 text-xs font-semibold text-white bg-[#1A365D] hover:bg-[#2A4365] rounded-[2px] elevation-1 transition-colors"
            >
              Start 14-Day Free Trial
            </button>
          </div>

          {/* Enterprise Plan */}
          <div className="bg-white border border-slate-200 p-6 rounded-[2px] elevation-1 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-600">Enterprise</span>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="text-3xl font-extrabold text-slate-900">$29</span>
                <span className="text-xs text-slate-500">/ seat / month</span>
              </div>
              <p className="text-xs text-slate-500 mt-2">Tailored for healthcare systems, universities, and enterprise teams.</p>
              <ul className="mt-6 space-y-2.5 text-xs text-slate-700">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#1A365D]" /> Unlimited schedule parses
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#1A365D]" /> Custom roster parsing models
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#1A365D]" /> SSO / SAML & Team Management
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#1A365D]" /> Dedicated SLA & HIPAA compliance
                </li>
              </ul>
            </div>
            <button
              onClick={onOpenAuth}
              className="mt-8 w-full py-2.5 px-4 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-[2px] transition-colors"
            >
              Contact Enterprise Sales
            </button>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 bg-[#1A365D] text-white flex items-center justify-center rounded-[2px] text-[10px] font-bold">
            S
          </div>
          <span className="font-semibold text-slate-700">SCHEDLY SYSTEM</span>
          <span>© 2026. All rights reserved.</span>
        </div>
        <div className="flex items-center gap-6">
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-slate-800">Back to Top</button>
          <span>Security & Privacy</span>
          <span>Terms of Service</span>
        </div>
      </footer>

    </div>
  );
};
