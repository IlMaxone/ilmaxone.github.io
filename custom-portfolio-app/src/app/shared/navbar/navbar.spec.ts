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
  });
});
