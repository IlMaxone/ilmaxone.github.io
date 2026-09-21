import { AfterViewInit, Component, ElementRef, HostListener, ViewChild } from '@angular/core';
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
export class NavbarComponent implements AfterViewInit {
  readonly sections = GENERATED_ATLAS;
  @ViewChild('paletteScroller') private paletteScroller?: ElementRef<HTMLElement>;
  @ViewChild('navigationScroller') private navigationScroller?: ElementRef<HTMLElement>;
  paletteCanScrollLeft = false;
  paletteCanScrollRight = false;
  navigationCanScrollLeft = false;
  navigationCanScrollRight = false;

  constructor(readonly paletteService: PaletteService) {}

  ngAfterViewInit(): void {
    queueMicrotask(() => this.updateAllScrollStates());
  }

  @HostListener('window:resize')
  onResize(): void {
    this.updateAllScrollStates();
  }

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

  updateScrollState(menu: 'palette' | 'navigation'): void {
    const element = menu === 'palette'
      ? this.paletteScroller?.nativeElement
      : this.navigationScroller?.nativeElement;
    if (!element) {
      return;
    }

    const canScrollLeft = element.scrollLeft > 1;
    const canScrollRight = element.scrollLeft < element.scrollWidth - element.clientWidth - 1;
    if (menu === 'palette') {
      this.paletteCanScrollLeft = canScrollLeft;
      this.paletteCanScrollRight = canScrollRight;
    } else {
      this.navigationCanScrollLeft = canScrollLeft;
      this.navigationCanScrollRight = canScrollRight;
    }
  }

  private updateAllScrollStates(): void {
    this.updateScrollState('palette');
    this.updateScrollState('navigation');
  }
}
