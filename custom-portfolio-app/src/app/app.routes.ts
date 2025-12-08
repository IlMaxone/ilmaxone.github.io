import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/landing/landing-page').then(m => m.HomePageComponent),
  },
  {
    path: 'story',
    loadComponent: () =>
      import('./pages/story/story-page').then(m => m.StoryPageComponent),
  },
  {
    path: 'works',
    loadComponent: () =>
      import('./pages/works/works-page').then(m => m.WorksPageComponent),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
