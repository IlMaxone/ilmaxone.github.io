import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { GENERATED_ATLAS } from '../../generated/atlas.generated';
import { PaletteId, PaletteService } from '../../theme/palette';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class NavbarComponent {
  readonly sections = GENERATED_ATLAS;
  @ViewChild('paletteScroller') private paletteScroller?: ElementRef<HTMLElement>;
  @ViewChild('navigationScroller') private navigationScroller?: ElementRef<HTMLElement>;

  constructor(readonly paletteService: PaletteService) {}

  selectPalette(id: PaletteId): void {
    this.paletteService.setPalette(id);
  }

  scrollMenu(menu: 'palette' | 'navigation', direction: -1 | 1): void {
    const element = menu === 'palette'
      ? this.paletteScroller?.nativeElement
      : this.navigationScroller?.nativeElement;
    if (!element) {
      return;
    }
    element.scrollBy({
      behavior: 'smooth',
      left: direction * Math.max(180, element.clientWidth * 0.72),
    });
  }
}
