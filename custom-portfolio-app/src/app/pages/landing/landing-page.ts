import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import type { Subscription } from 'rxjs';
import type {
  AtlasSection,
  ExperienceContent,
  PageHeadContent,
} from '../../content/experience.model';
import { GENERATED_ATLAS, GENERATED_LANDING_HEAD } from '../../generated/atlas.generated';
import { PaletteService } from '../../theme/palette';
import { OrbitalSceneComponent } from './orbital-scene';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [OrbitalSceneComponent],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.scss',
})
export class HomePageComponent implements OnDestroy {
  @ViewChild('modalClose') private modalClose?: ElementRef<HTMLButtonElement>;

  readonly atlas = GENERATED_ATLAS;
  section: AtlasSection | undefined;
  experiences: ExperienceContent[] = this.atlas;
  pageHead: PageHeadContent = GENERATED_LANDING_HEAD;
  detailOpen = false;
  manualPaused = false;
  resumeSeconds = 0;
  selectedIndex = 0;
  private previouslyFocused?: HTMLElement;
  private resumeTimers: ReturnType<typeof setTimeout>[] = [];
  private readonly routeSubscription: Subscription;
  private wasManuallyPausedBeforeDetail = false;

  constructor(
    route: ActivatedRoute,
    private readonly router: Router,
    private readonly changeDetector: ChangeDetectorRef,
    readonly paletteService: PaletteService,
  ) {
    this.routeSubscription = route.paramMap.subscribe(params => {
      this.loadSection(params.get('section'));
    });
  }

  get isLanding(): boolean {
    return !this.section;
  }

  get selectedExperience(): ExperienceContent | undefined {
    return this.experiences[this.selectedIndex];
  }

  get motionPaused(): boolean {
    return this.detailOpen || this.resumeSeconds > 0 || this.manualPaused;
  }

  get cosmosStatus(): string {
    if (this.detailOpen) {
      return 'Cosmo in pausa';
    }
    if (this.resumeSeconds > 0) {
      return `Ripresa fra ${this.resumeSeconds} ${this.resumeSeconds === 1 ? 'secondo' : 'secondi'}`;
    }
    if (this.manualPaused) {
      return 'Cosmo in pausa manuale';
    }
    return 'Cosmo in rotazione';
  }

  ngOnDestroy(): void {
    this.cancelResume();
    this.routeSubscription.unsubscribe();
  }

  @HostListener('document:keydown.escape')
  closeDetailFromKeyboard(): void {
    if (this.detailOpen) {
      this.closeDetail();
    }
  }

  handlePlanetSelection(index: number): void {
    if (this.isLanding) {
      const destination = this.experiences[index]?.route;
      if (destination) {
        void this.router.navigateByUrl(destination);
      }
      return;
    }
    this.selectExperience(index);
    this.openDetail();
  }

  openDetail(): void {
    this.wasManuallyPausedBeforeDetail = this.manualPaused;
    this.cancelResume();
    this.detailOpen = true;
    this.resumeSeconds = 0;
    if (typeof document !== 'undefined' && document.activeElement instanceof HTMLElement) {
      this.previouslyFocused = document.activeElement;
    }
    this.resumeTimers.push(setTimeout(() => this.modalClose?.nativeElement.focus()));
  }

  closeDetail(): void {
    if (!this.detailOpen) {
      return;
    }
    this.cancelResume();
    this.detailOpen = false;
    const previous = this.previouslyFocused;
    this.resumeTimers.push(setTimeout(() => previous?.focus()));

    if (this.wasManuallyPausedBeforeDetail) {
      this.resumeSeconds = 0;
      return;
    }

    this.resumeSeconds = 2;
    this.resumeTimers.push(
      setTimeout(() => {
        this.resumeSeconds = 1;
        this.changeDetector.markForCheck();
      }, 1000),
    );
    this.resumeTimers.push(
      setTimeout(() => {
        this.resumeSeconds = 0;
        this.changeDetector.markForCheck();
      }, 2000),
    );
  }

  setManualPause(paused: boolean): void {
    this.manualPaused = paused;
  }

  selectExperience(index: number): void {
    if (this.experiences.length === 0) {
      this.selectedIndex = 0;
      return;
    }
    this.selectedIndex = this.normalizeIndex(index);
  }

  previousExperience(): void {
    this.selectExperience(this.selectedIndex - 1);
  }

  nextExperience(): void {
    this.selectExperience(this.selectedIndex + 1);
  }

  formatNumber(value: number): string {
    return value.toString().padStart(2, '0');
  }

  isExternalLink(link: string): boolean {
    return /^https?:\/\//i.test(link);
  }

  private normalizeIndex(index: number): number {
    return ((index % this.experiences.length) + this.experiences.length) % this.experiences.length;
  }

  private loadSection(slug: string | null): void {
    const section = slug ? this.atlas.find(candidate => candidate.slug === slug) : undefined;

    this.cancelResume();
    this.detailOpen = false;
    this.resumeSeconds = 0;
    this.selectedIndex = 0;
    this.previouslyFocused = undefined;
    this.section = section;
    this.experiences = slug ? (section?.items ?? []) : this.atlas;
    this.pageHead = section?.head ?? GENERATED_LANDING_HEAD;
    this.changeDetector.markForCheck();

    if (slug && !section) {
      void this.router.navigateByUrl('/');
    }
  }

  private cancelResume(): void {
    this.resumeTimers.forEach(timer => clearTimeout(timer));
    this.resumeTimers = [];
  }
}
