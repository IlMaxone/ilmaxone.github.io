import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'storia',
    pathMatch: 'full',
  },
  {
    path: 'storia',
    loadComponent: () =>
      import('./pages/story/story-page').then(m => m.StoryPageComponent),
  },
  {
    path: 'lavori',
    loadComponent: () =>
      import('./pages/works/works-page').then(m => m.WorksPageComponent),
  },
  {
    path: '**',
    redirectTo: 'storia',
  },
];
