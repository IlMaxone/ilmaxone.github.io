import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { HomePageComponent } from './landing-page';

describe('HomePageComponent', () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomePageComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('creates one landing planet for every content folder', () => {
    const labels = fixture.nativeElement.querySelectorAll('.orbit-label');

    expect(component.isLanding).toBe(true);
    expect(component.experiences).toHaveLength(4);
    expect(labels).toHaveLength(4);
    expect(fixture.nativeElement.querySelector('canvas.orbital-canvas')).toBeTruthy();
  });

  it('shows the requested landing statement', () => {
    const text = fixture.nativeElement.textContent;

    expect(text).toContain('Benvenuto nel mio Universo Lavorativo.');
    expect(text).toContain('La raccolta definitiva delle abilità professionali e non.');
  });

  it('opens the corresponding section when a planet is selected', () => {
    const navigation = vi.spyOn(router, 'navigateByUrl').mockResolvedValue(true);
    const labels = fixture.nativeElement.querySelectorAll('.orbit-label') as NodeListOf<HTMLButtonElement>;

    labels[1].click();

    expect(navigation).toHaveBeenCalledWith('/universo/capacita');
  });

  it('uses Ametista solare as the default palette', () => {
    expect(component.paletteService.activePalette()).toBe('amethyst');
  });
});
