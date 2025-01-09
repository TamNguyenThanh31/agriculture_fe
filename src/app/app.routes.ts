import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/welcome' },
  { path: 'welcome', loadChildren: () => import('./pages/welcome/welcome.routes').then(m => m.WELCOME_ROUTES)},
  {
    path: 'weather',
    loadComponent: () => import('./features/weather/weather.component').then(c => c.WeatherComponent)
  },
  {
    path: 'chatbot',
    loadComponent: () => import('./features/chatbot/chatbot.component').then(c => c.ChatbotComponent)
  },
  {
    path: 'season',
    loadComponent: () => import('./features/season/season.component').then(c => c.SeasonComponent)
  },
  {
    path: 'season/:seasonId/tasks',
    loadComponent: () => import('./features/season/CropTask/crop-task.component').then(c => c.CropTaskComponent)
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./features/dashboard/dashboard.component').then(c => c.DashboardComponent)
  },
  {
    path: 'dashboard-weather1',
    loadComponent: () => import('./features/dashboard-weather/dashboard-weather.component').then(c => c.DashboardWeatherComponent)
  }
];
