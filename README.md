# Schedly

<p align="center">
  <strong>Transform messy paper schedules, whiteboard rosters, and printed syllabi into structured, editable digital calendars with instant two-way sync.</strong>
</p>

<p align="center">
  <a href="https://angular.dev"><img src="https://img.shields.io/badge/Angular-22-DD0031?style=flat-square&logo=angular&logoColor=white" alt="Angular 22" /></a>
  <a href="https://nestjs.com"><img src="https://img.shields.io/badge/NestJS-11-E0234E?style=flat-square&logo=nestjs&logoColor=white" alt="NestJS" /></a>
  <a href="https://www.typescriptlang.org"><img src="https://img.shields.io/badge/TypeScript-5.8%2B-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" /></a>
  <a href="https://tailwindcss.com"><img src="https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" /></a>
  <a href="https://lucide.dev"><img src="https://img.shields.io/badge/Lucide-Icons-F56565?style=flat-square" alt="Lucide Icons" /></a>
  <a href="https://vitest.dev"><img src="https://img.shields.io/badge/Vitest-Tested-729B1B?style=flat-square&logo=vitest&logoColor=white" alt="Vitest" /></a>
  <a href="https://ai.google.dev"><img src="https://img.shields.io/badge/Google-Gemini_Vision-4285F4?style=flat-square&logo=google&logoColor=white" alt="Gemini Vision" /></a>
</p>

---

## 📖 Overview

**Schedly** solves the friction of manually transcribing physical schedules into digital calendars. Whether you are a student snapping a printed lecture timetable, a healthcare worker photographing an ICU shift whiteboard, or a professional with a folded conference brochure, Schedly extracts calendar events, provides instant inline editing, and publishes directly to **Google Calendar**, **Microsoft Outlook**, and **Apple Calendar**.

### 🌟 Key Highlights
- 📸 **Multi-Format Ingestion**: Upload smartphone photos, multi-page PDFs, or scans in JPG, PNG, and WebP formats.
- ⚡ **Semantic Optical Parsing**: Identifies course titles, start/end time windows, dates, room numbers, and event categories with high confidence.
- ✏️ **Inline Material Editing**: Edit day, time, title, notes, and locations directly in table cells with real-time local buffering.
- 🗓️ **Dual Schedule Perspectives**: Toggle between a dense **Structured Table** and a 7-day **Weekly Calendar Grid**.
- 🔄 **Two-Way Calendar Synchronization**: Connect your Google and Microsoft accounts to sync events in one click.
- 📥 **RFC 5545 .ICS Export**: Download standard iCalendar files compatible with Apple Calendar, macOS, iOS, and Android.
- 🎚️ **Interactive Split Preview Slider**: Compare your raw paper photo directly against the digitized schedule output.
- 🏛️ **Vertical Slice Architecture**: Built with modern Angular 22 Signals and clean Single Responsibility Principle (SRP) separation.

---

## 🎨 Design & UX Philosophy

Schedly adheres to a refined **minimalist corporate editorial** visual language:
- **Palette**: Grounded in deep corporate navy (`#1A365D`), subtle slate borders (`#E2E8F0`), and soft background canvases (`#F8FAFC`).
- **Precision Geometry**: Sharp `2px` border radiuses for a disciplined, high-density professional tool rather than bubbly consumer templates.
- **5 Mandatory UI States**: Every screen handles **Initial**, **Loading** (progressive OCR animation), **Empty** (actionable CTAs), **Error** (inline recovery), and **Success/Filled** (feedback toasts).
- **Accessibility**: Built to WCAG 2.1 AA standards with visible keyboard focus rings (`*:focus-visible`), ARIA switch roles, and keyboard dialog controls.

---

## 🛠️ Technology Stack

| Layer | Technology | Description |
| :--- | :--- | :--- |
| **Frontend Framework** | [Angular 22](https://angular.dev) | Modern standalone components, Signals reactivity (`signal`, `computed`), OnPush change detection, and lazy-loaded routes. |
| **Styling & Design Tokens** | [Tailwind CSS v4](https://tailwindcss.com) | Utility-first styling with custom elevation shadows, CSS variables, and 8pt spatial grid rhythm. |
| **Icon System** | [Lucide Angular](https://lucide.dev) | Clean, consistent, tree-shakeable SVG icons via `@lucide/angular`. |
| **State Management** | [Angular Signals](https://angular.dev/guide/signals) | Granular reactivity in `ScheduleStore` and `AuthStore` with resilient `LocalStorage` hydration. |
| **Frontend Testing** | [Vitest](https://vitest.dev) | Ultra-fast unit testing with Angular TestBed and JSDOM. |
| **Backend Framework** | [NestJS 11](https://nestjs.com) | Progressive Node.js framework with modular TypeScript architecture. |
| **AI / OCR Engine** | [Google Gemini 2.0 Flash](https://ai.google.dev) | Multimodal visual understanding for handwriting recognition and tabular calendar extraction. |
| **Package Management** | [pnpm](https://pnpm.io) | Fast, disk-space-efficient workspace package management. |

---

## 📂 Repository Structure

```
schedly/
├── AGENTS.md                         # Architecture guide & routing context for AI pairing
├── README.md                         # Project documentation & roadmap
├── .gitignore                        # Global ignore configuration
├── web/                              # Angular 22 Frontend Application
│   ├── src/
│   │   ├── app/
│   │   │   ├── core/                 # Models, Signals Stores, Ingestion & ICS services
│   │   │   │   ├── models/           # ScheduleEntry, ScheduleDocument, UserProfile
│   │   │   │   ├── stores/           # ScheduleStore, AuthStore
│   │   │   │   ├── data/             # Initial mock data and preset templates
│   │   │   │   └── services/         # StorageService, ScheduleIngestionService, IcsExportService
│   │   │   ├── layout/               # Header navigation & mobile drawer
│   │   │   ├── shared/               # Global toast alerts & pipes
│   │   │   └── features/             # Vertical Feature Slices
│   │   │       ├── landing/          # Hero, interactive comparison slider, presets, pricing
│   │   │       ├── auth/             # Reactive login/signup form & demo profiles
│   │   │       ├── upload/           # Drag-and-drop dropzone & 4-stage OCR timeline
│   │   │       ├── schedule/         # Transformed table, weekly grid, and add event modal
│   │   │       ├── history/          # Processed document archives & re-export
│   │   │       └── profile/          # User profile, calendar switches, subscription quotas
│   │   ├── styles.css                # Tailwind imports, elevation tokens, focus rings
│   │   └── main.ts                   # Angular application bootstrap
│   └── package.json
├── server/                           # NestJS 11 Backend Workspace
│   ├── src/                          # Controllers, services, and modules
│   └── package.json
└── .draft/                           # Original React reference draft
```

---

## 🚀 Quick Start

### Prerequisites
- [Node.js](https://nodejs.org) >= 20.x
- [pnpm](https://pnpm.io) >= 9.x

### 1. Installation
Clone the repository and install dependencies:

```bash
git clone https://github.com/your-username/schedly.git
cd schedly

# Install web dependencies
cd web && pnpm install

# Install server dependencies
cd ../server && pnpm install
```

### 2. Running the Angular Frontend
Start the local development server:

```bash
cd web
pnpm start
```
Open [http://localhost:4200](http://localhost:4200) in your browser.

### 3. Running Frontend Tests
Execute the Vitest unit test suite:

```bash
cd web
pnpm run test --watch=false
```

### 4. Building for Production
Create an optimized production bundle:

```bash
cd web
pnpm run build
```

---

## 🗺️ Product Roadmap

### Phase 1: Prototype & Frontend Architecture *(Completed)*
- [x] Create initial proof-of-concept and UI drafts.
- [x] Migrate frontend to Angular 22 with strict Vertical Slice Architecture.
- [x] Implement Angular Signals state management (`ScheduleStore`, `AuthStore`).
- [x] Build interactive before-and-after conversion comparison slider.
- [x] Develop 4-stage simulated OCR ingestion timeline with pre-configured templates.
- [x] Implement inline editable table and weekly 7-day calendar grid views.
- [x] Client-side RFC 5545 `.ics` export generation and download.
- [x] Complete 5-state UI coverage (Initial, Loading, Empty, Error, Success).

### Phase 2: Live Backend & Gemini Vision Ingestion *(Current Focus)*
- [ ] Connect NestJS server with Google Gemini 2.0 Flash multimodal vision API.
- [ ] Implement server-side multi-part image upload with contrast and perspective normalization.
- [ ] Provide WebSocket or SSE streaming for real-time OCR parsing status updates.
- [ ] Add PostgreSQL / Prisma database persistence for user schedules and archives.

### Phase 3: Calendar Integrations & Two-Way Sync *(Upcoming)*
- [ ] Implement OAuth 2.0 flows for Google Calendar API v3 and Microsoft Graph.
- [ ] Add bi-directional sync webhooks to detect external event updates and conflicts.
- [ ] Apple iCloud CalDAV subscription server integration.
- [ ] Automated reminders and schedule modification push notifications.

### Phase 4: Collaboration & Enterprise Governance *(Planned)*
- [ ] Team shift roster sharing and multi-user workspace permissions.
- [ ] Single Sign-On (SSO / SAML) integration for university and healthcare systems.
- [ ] Custom fine-tuned extraction models for proprietary organizational shift sheets.
- [ ] HIPAA and GDPR compliance auditing and data anonymization pipelines.

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

<p align="center">
  <sub>Engineered with care for academics, researchers, and shift workers worldwide.</sub>
</p>
