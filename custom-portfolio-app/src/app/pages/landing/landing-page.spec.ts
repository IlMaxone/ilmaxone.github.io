import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { HomePageComponent } from './landing-page';
import { createOrbitShells, isPlanetExpanded } from './orbital-scene';

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

  it('uses numbered JSON as planets and ignores JSON prefixed with a dash', () => {
    const projects = component.atlas.find(section => section.slug === 'progetti');
    const works = component.atlas.find(section => section.slug === 'lavori');
    const capabilities = component.atlas.find(section => section.slug === 'capacita');

    expect(projects?.items).toHaveLength(1);
    expect(projects?.items[0].id).toBe('01');
    expect(projects?.items[0].shortLabel).toBe('Portfolio Planet');
    expect(works?.items).toHaveLength(1);
    expect(capabilities?.items).toHaveLength(0);
  });

  it('shows the requested landing statement', () => {
    const text = fixture.nativeElement.textContent;

    expect(component.pageHead.name).toBe('landing');
    expect(text).toContain('Portfolio Orbitale · WebGL');
    expect(text).toContain('Benvenuto nel mio Universo Lavorativo');
    expect(text).toContain('La raccolta definitiva delle abilità professionali e non.');
  });

  it('uses the planet itself as the transparent background for its label', () => {
    const labels = fixture.nativeElement.querySelectorAll(
      '.orbit-label',
    ) as NodeListOf<HTMLButtonElement>;

    expect(labels[0].querySelector('small')).toBeNull();
    expect(labels[0].textContent?.trim()).toBe(component.experiences[0].shortLabel);
  });

  it('keeps one base planet diameter clear between every pair of orbital shells', () => {
    const shells = createOrbitShells(8);
    const basePlanetDiameter = shells[0].size * 2;

    shells.forEach((shell, index) => {
      shells.slice(0, index).forEach((innerShell) => {
        const surfaceGap =
          shell.radius - innerShell.radius - shell.maxRadius - innerShell.maxRadius;
        expect(surfaceGap).toBeGreaterThanOrEqual(basePlanetDiameter - 1e-10);
      });
    });
  });

  it('expands the first planet only when its zero index is hovered', () => {
    expect(isPlanetExpanded(0, null)).toBe(false);
    expect(isPlanetExpanded(0, 0)).toBe(true);
    expect(isPlanetExpanded(1, 0)).toBe(false);
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
