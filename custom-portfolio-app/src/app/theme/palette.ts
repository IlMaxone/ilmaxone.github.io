import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID, signal } from '@angular/core';

export type PaletteId = 'terracotta' | 'night' | 'cobalt' | 'sage' | 'amethyst';

export interface PaletteDefinition {
  id: PaletteId;
  label: string;
  swatches: [string, string, string];
  space: string;
  surface: string;
  text: string;
  muted: string;
  accent: string;
  hot: string;
  secondary: string;
  planetColors: string[];
}

export const PALETTES: readonly PaletteDefinition[] = [
  {
    id: 'terracotta',
    label: 'Terra Cotta',
    swatches: ['#f4eee2', '#e35a2c', '#f2ae48'],
    space: '#2b1714',
    surface: '#f4eee2',
    text: '#34231f',
    muted: '#7d645d',
    accent: '#e35a2c',
    hot: '#f2ae48',
    secondary: '#9b4c38',
    planetColors: ['#e35a2c', '#f2ae48', '#b94b38', '#d98752', '#805044'],
  },
  {
    id: 'night',
    label: 'Oro notturno',
    swatches: ['#090d18', '#f0b84b', '#526b8d'],
    space: '#090d18',
    surface: '#101725',
    text: '#f4ead6',
    muted: '#9ca8b8',
    accent: '#f0b84b',
    hot: '#ffe09a',
    secondary: '#526b8d',
    planetColors: ['#f0b84b', '#526b8d', '#c87d3f', '#7894b5', '#d9a35d'],
  },
  {
    id: 'cobalt',
    label: 'Cobalto corallo',
    swatches: ['#e9f0f3', '#ff6b4a', '#1e7695'],
    space: '#0c2f3d',
    surface: '#e9f0f3',
    text: '#16323d',
    muted: '#5b737c',
    accent: '#ff6b4a',
    hot: '#ffb19f',
    secondary: '#1e7695',
    planetColors: ['#ff6b4a', '#1e7695', '#e94c64', '#51a3b8', '#f59b62'],
  },
  {
    id: 'sage',
    label: 'Salvia rame',
    swatches: ['#ecf0e4', '#b75d39', '#74866b'],
    space: '#263129',
    surface: '#ecf0e4',
    text: '#29332a',
    muted: '#687366',
    accent: '#b75d39',
    hot: '#dfa06f',
    secondary: '#74866b',
    planetColors: ['#b75d39', '#74866b', '#d28b5b', '#526c57', '#a97a55'],
  },
  {
    id: 'amethyst',
    label: 'Ametista solare',
    swatches: ['#171020', '#ff7a45', '#b898ff'],
    space: '#12091b',
    surface: '#1d1028',
    text: '#f7e9d7',
    muted: '#aa96ae',
    accent: '#ff7047',
    hot: '#ffd05f',
    secondary: '#b898ff',
    planetColors: ['#e06450', '#8e65b8', '#ff9950', '#6e416f', '#d95566', '#a47bd1'],
  },
] as const;

@Injectable({ providedIn: 'root' })
export class PaletteService {
  readonly palettes = PALETTES;
  readonly activePalette = signal<PaletteId>('amethyst');
  private readonly isBrowser: boolean;

  constructor(
    @Inject(DOCUMENT) private readonly document: Document,
    @Inject(PLATFORM_ID) platformId: object,
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
    let initial: PaletteId = 'amethyst';
    if (this.isBrowser) {
      const saved = window.localStorage.getItem('portfolio-palette');
      if (PALETTES.some(palette => palette.id === saved)) {
        initial = saved as PaletteId;
      }
    }
    this.setPalette(initial, this.isBrowser);
  }

  setPalette(id: PaletteId, persist = true): void {
    this.activePalette.set(id);
    if (this.isBrowser) {
      this.document.documentElement.dataset['palette'] = id;
    }
    if (persist && this.isBrowser) {
      window.localStorage.setItem('portfolio-palette', id);
    }
  }
}
