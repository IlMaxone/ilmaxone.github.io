import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { NavbarComponent } from './navbar';

describe('Navbar', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarComponent],
      providers: [provideRouter([])],
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('opens references from the IlMaxone name without the GM logo', () => {
    const root = fixture.nativeElement as HTMLElement;
    const brand = root.querySelector<HTMLAnchorElement>('.brand');

    expect(brand?.getAttribute('href')).toBe('/riferimenti');
    expect(brand?.textContent).toContain('IlMaxone');
    expect(root.querySelector('.brand__sun')).toBeNull();
  });

  it('provides arrow controls for both mobile menus', () => {
    const arrows = fixture.nativeElement.querySelectorAll('.mobile-rail__arrow');

    expect(arrows).toHaveLength(4);
    expect(fixture.nativeElement.querySelectorAll('.stellar-arrow-shape')).toHaveLength(4);
  });

  it('provides the comet shortcut back to the landing', () => {
    const root = fixture.nativeElement as HTMLElement;
    const comet = root.querySelector<HTMLAnchorElement>('.home-comet');

    expect(comet?.getAttribute('href')).toBe('/');
    expect(comet?.getAttribute('aria-label')).toContain('landing');
  });

  it('hides the directional arrow at each end of a mobile menu', () => {
    const palette = fixture.nativeElement.querySelector('.palette-list') as HTMLElement;
    Object.defineProperty(palette, 'clientWidth', { configurable: true, value: 200 });
    Object.defineProperty(palette, 'scrollWidth', { configurable: true, value: 500 });

    palette.scrollLeft = 0;
    component.updateScrollState('palette');
    expect(component.paletteCanScrollLeft).toBe(false);
    expect(component.paletteCanScrollRight).toBe(true);

    palette.scrollLeft = 300;
    component.updateScrollState('palette');
    expect(component.paletteCanScrollLeft).toBe(true);
    expect(component.paletteCanScrollRight).toBe(false);
  });
});
