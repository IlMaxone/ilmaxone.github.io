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

  it('uses the planet itself as the transparent background for its label', () => {
    const labels = fixture.nativeElement.querySelectorAll(
      '.orbit-label',
    ) as NodeListOf<HTMLButtonElement>;

    expect(labels[0].querySelector('small')).toBeNull();
    expect(labels[0].textContent?.trim()).toBe(component.experiences[0].shortLabel);
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

  it('toggles manual cosmic pause from the orbital controls', async () => {
    const pauseButton = fixture.nativeElement.querySelector(
      '.scene-controls__motion',
    ) as HTMLButtonElement;

    expect(pauseButton.getAttribute('aria-label')).toBe('Metti in pausa la rotazione cosmica');
    pauseButton.click();
    await fixture.whenStable();

    expect(component.manualPaused).toBe(true);
    expect(component.motionPaused).toBe(true);
    expect(component.cosmosStatus).toBe('Cosmo in pausa manuale');
    expect(pauseButton.classList).toContain('scene-controls__motion--paused');
    expect(pauseButton.getAttribute('aria-label')).toBe('Riprendi la rotazione cosmica');

    pauseButton.click();
    await fixture.whenStable();
    expect(component.manualPaused).toBe(false);
    expect(component.motionPaused).toBe(false);
  });
});
