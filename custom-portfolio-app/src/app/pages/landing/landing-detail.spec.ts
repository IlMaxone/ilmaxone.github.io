import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, provideRouter } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { HomePageComponent } from './landing-page';

describe('HomePageComponent planet detail', () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;
  let routeParams: BehaviorSubject<ReturnType<typeof convertToParamMap>>;

  beforeEach(async () => {
    routeParams = new BehaviorSubject(convertToParamMap({ section: 'progetti' }));
    await TestBed.configureTestingModule({
      imports: [HomePageComponent],
      providers: [
        provideRouter([]),
        {
          provide: ActivatedRoute,
          useValue: { paramMap: routeParams.asObservable() },
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

  it('renders the section header from its head JSON', () => {
    const text = fixture.nativeElement.textContent;

    expect(component.pageHead.name).toBe('progetti');
    expect(text).toContain('Microcosmo dei progetti lavorativi GitHub personali');
    expect(text).toContain('Qui trovi i miei Progetti personali GitHub');
    expect(fixture.nativeElement.querySelector('.atlas-hero__back')).toBeNull();
  });

  it('updates the section immediately when navigation changes only the route parameter', () => {
    routeParams.next(convertToParamMap({ section: 'lavori' }));
    fixture.detectChanges();

    expect(component.pageHead.name).toBe('lavori');
    expect(component.experiences).toHaveLength(1);
    expect(component.selectedExperience?.shortLabel).toBe('CDP');
    expect(fixture.nativeElement.textContent).toContain('Esperienze lavorative');
  });

  it('opens the selected planet in a modal and pauses cosmic motion', async () => {
    expect(component.isLanding).toBe(false);
    expect(fixture.nativeElement.querySelector('.experience-modal-backdrop')).toBeNull();

    const labels = fixture.nativeElement.querySelectorAll('.orbit-label') as NodeListOf<HTMLButtonElement>;
    labels[0].click();
    await fixture.whenStable();

    const dialog = fixture.nativeElement.querySelector('[role="dialog"]') as HTMLElement;
    expect(component.selectedExperience?.shortLabel).toBe('Portfolio Planet');
    expect(component.detailOpen).toBe(true);
    expect(component.motionPaused).toBe(true);
    expect(component.cosmosStatus).toBe('Cosmo in pausa');
    expect(dialog.textContent).toContain('Il pilastro portante del Portfolio');
    expect(dialog.querySelector<HTMLAnchorElement>('.experience-detail__link')?.target).toBe('_blank');
  });

  it('keeps motion paused for two seconds after closing the modal', async () => {
    const labels = fixture.nativeElement.querySelectorAll('.orbit-label') as NodeListOf<HTMLButtonElement>;
    labels[0].click();
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
    labels[0].click();
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

  it('restarts the full countdown after a rapid reopen and close', () => {
    vi.useFakeTimers();
    try {
      component.openDetail();
      component.closeDetail();
      expect(component.resumeSeconds).toBe(2);

      vi.advanceTimersByTime(500);
      component.openDetail();
      expect(component.resumeSeconds).toBe(0);

      vi.advanceTimersByTime(1500);
      expect(component.resumeSeconds).toBe(0);

      component.closeDetail();
      expect(component.resumeSeconds).toBe(2);

      vi.advanceTimersByTime(1000);
      expect(component.resumeSeconds).toBe(1);

      vi.advanceTimersByTime(1000);
      expect(component.resumeSeconds).toBe(0);
    } finally {
      vi.useRealTimers();
    }
  });
});
