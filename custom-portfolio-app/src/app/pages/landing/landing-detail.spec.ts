import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, provideRouter } from '@angular/router';
import { HomePageComponent } from './landing-page';

describe('HomePageComponent planet detail', () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomePageComponent],
      providers: [
        provideRouter([]),
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: { get: () => 'capacita' } } },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('opens the selected planet in a modal and pauses cosmic motion', async () => {
    expect(component.isLanding).toBe(false);
    expect(fixture.nativeElement.querySelector('.experience-modal-backdrop')).toBeNull();

    const labels = fixture.nativeElement.querySelectorAll('.orbit-label') as NodeListOf<HTMLButtonElement>;
    labels[1].click();
    await fixture.whenStable();

    const dialog = fixture.nativeElement.querySelector('[role="dialog"]') as HTMLElement;
    expect(component.selectedExperience?.shortLabel).toBe('Angular');
    expect(component.detailOpen).toBe(true);
    expect(component.motionPaused).toBe(true);
    expect(component.cosmosStatus).toBe('Cosmo in pausa');
    expect(dialog.textContent).toContain('Interfacce che spiegano il prodotto');
  });

  it('keeps motion paused for two seconds after closing the modal', async () => {
    const labels = fixture.nativeElement.querySelectorAll('.orbit-label') as NodeListOf<HTMLButtonElement>;
    labels[1].click();
    await fixture.whenStable();

    const closeButton = fixture.nativeElement.querySelector('.experience-detail__close') as HTMLButtonElement;
    closeButton.click();
    await fixture.whenStable();

    expect(component.detailOpen).toBe(false);
    expect(component.motionPaused).toBe(true);
    expect(component.cosmosStatus).toBe('Ripresa fra 2 secondi');
    expect(fixture.nativeElement.querySelector('.scene-status__motion').textContent).toContain(
      'Ripresa fra 2 secondi',
    );

    await new Promise(resolve => setTimeout(resolve, 1050));
    await fixture.whenStable();
    expect(component.motionPaused).toBe(true);
    expect(component.cosmosStatus).toBe('Ripresa fra 1 secondo');
    expect(fixture.nativeElement.querySelector('.scene-status__motion').textContent).toContain(
      'Ripresa fra 1 secondo',
    );

    await new Promise(resolve => setTimeout(resolve, 1050));
    await fixture.whenStable();
    expect(component.motionPaused).toBe(false);
    expect(component.cosmosStatus).toBe('Cosmo in rotazione');
    expect(fixture.nativeElement.querySelector('.scene-status__motion').textContent).toContain(
      'Cosmo in rotazione',
    );
  });

  it('does not show the countdown when motion was already paused', async () => {
    const pauseButton = fixture.nativeElement.querySelector(
      '.scene-controls__motion',
    ) as HTMLButtonElement;
    pauseButton.click();
    await fixture.whenStable();

    const labels = fixture.nativeElement.querySelectorAll('.orbit-label') as NodeListOf<HTMLButtonElement>;
    labels[1].click();
    await fixture.whenStable();

    const closeButton = fixture.nativeElement.querySelector('.experience-detail__close') as HTMLButtonElement;
    closeButton.click();
    await fixture.whenStable();

    expect(component.detailOpen).toBe(false);
    expect(component.resumeSeconds).toBe(0);
    expect(component.motionPaused).toBe(true);
    expect(component.cosmosStatus).toBe('Cosmo in pausa manuale');
    expect(fixture.nativeElement.querySelector('.scene-status__motion').textContent).toContain(
      'Cosmo in pausa manuale',
    );
  });
});
