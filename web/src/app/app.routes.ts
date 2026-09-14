import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'landing',
    pathMatch: 'full',
  },
  {
    path: 'landing',
    loadComponent: () =>
      import('./features/landing/landing-page.component').then((m) => m.LandingPageComponent),
    title: 'Schedly - Schedule Management & Optical Ingestion',
  },
  {
    path: 'auth',
    loadComponent: () =>
      import('./features/auth/auth-page.component').then((m) => m.AuthPageComponent),
    title: 'Schedly - Authentication',
  },
  {
    path: 'upload',
    loadComponent: () =>
      import('./features/upload/upload-page.component').then((m) => m.UploadPageComponent),
    title: 'Schedly - Upload Schedule',
  },
  {
    path: 'schedule',
    loadComponent: () =>
      import('./features/schedule/schedule-view.component').then((m) => m.ScheduleViewComponent),
    title: 'Schedly - Active Transformed Schedule',
  },
  {
    path: 'history',
    loadComponent: () =>
      import('./features/history/history-page.component').then((m) => m.HistoryPageComponent),
    title: 'Schedly - Schedule Archives',
  },
  {
    path: 'profile',
    loadComponent: () =>
      import('./features/profile/profile-page.component').then((m) => m.ProfilePageComponent),
    title: 'Schedly - Account Settings & Integrations',
  },
  {
    path: '**',
    redirectTo: 'landing',
  },
];
