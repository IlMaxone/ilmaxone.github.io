import { RenderMode, ServerRoute } from '@angular/ssr';
import { GENERATED_ATLAS } from './generated/atlas.generated';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'universo/:section',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      return GENERATED_ATLAS.map(section => ({ section: section.slug }));
    },
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
