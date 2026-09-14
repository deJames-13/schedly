# Schedly — Claude Code Reference

## Monorepo Commands
```bash
# Frontend (Angular 22)
cd web && pnpm start                  # Start dev server at http://localhost:4200
cd web && pnpm run test --watch=false # Run Vitest unit test suite
cd web && pnpm run build              # Production build

# Backend (NestJS 11)
cd server && pnpm run start:dev       # Start NestJS backend in watch mode
cd server && pnpm run test            # Run backend unit tests
cd server && pnpm run build           # Production build
```

## Architecture Summary
- **Frontend (`/web`)**: Angular 22 standalone components, Signals reactivity (`ScheduleStore`, `AuthStore`), Vertical Slice Architecture, Tailwind CSS v4, Lucide icons (`@lucide/angular`).
- **Backend (`/server`)**: NestJS 11 REST API prefixed with `/api/v1`, Google Gemini 2.0 Flash Vision OCR, Calendar integrations (Google Calendar v3, Microsoft Graph, Apple CalDAV).
- **Guidelines**: Follow 4-Tier Product Design Plugin hierarchy, strict file-based SRP, and 5-state completeness on all UI components.
- For complete architecture, routing schemas, and models, see [AGENTS.md](file:///home/dej/Projects/projectx/schedly/AGENTS.md).
