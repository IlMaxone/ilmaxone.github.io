import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { HomePageComponent } from './landing-page';

describe('HomePageComponent', () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomePageComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('creates an eight-planet WebGL atlas', () => {
    const labels = fixture.nativeElement.querySelectorAll('.orbit-label');

    expect(component.experiences).toHaveLength(8);
    expect(labels).toHaveLength(8);
    expect(fixture.nativeElement.querySelector('canvas.orbital-canvas')).toBeTruthy();
  });

  it('selects and opens the next experience', () => {
    component.nextExperience();

    expect(component.selectedExperience.id).toBe('angular');
  });

  it('wraps backwards to the final experience', () => {
    component.previousExperience();

    expect(component.selectedExperience.id).toBe('portfolio');
  });

  it('selects an experience from the orbital labels', () => {
    const labels = fixture.nativeElement.querySelectorAll('.orbit-label') as NodeListOf<HTMLButtonElement>;
    labels[3].click();
    fixture.detectChanges();

    expect(component.selectedExperience.id).toBe('gcp');
    expect(fixture.nativeElement.querySelector('.experience-detail h2').textContent).toContain(
      'Infrastruttura al servizio dei dati',
    );
  });
});
