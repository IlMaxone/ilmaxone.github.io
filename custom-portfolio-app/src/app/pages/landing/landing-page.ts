import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import type { AtlasSection, ExperienceContent } from '../../content/experience.model';
import { GENERATED_ATLAS } from '../../generated/atlas.generated';
import { PaletteService } from '../../theme/palette';
import { OrbitalSceneComponent } from './orbital-scene';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [RouterLink, OrbitalSceneComponent],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.scss',
})
export class HomePageComponent {
  readonly atlas = GENERATED_ATLAS;
  readonly section: AtlasSection | undefined;
  readonly experiences: ExperienceContent[];
  selectedIndex = 0;

  constructor(
    route: ActivatedRoute,
    private readonly router: Router,
    readonly paletteService: PaletteService,
  ) {
    const slug = route.snapshot.paramMap.get('section');
    this.section = slug ? this.atlas.find(section => section.slug === slug) : undefined;
    this.experiences = slug ? (this.section?.items ?? []) : this.atlas;

    if (slug && !this.section) {
      void this.router.navigateByUrl('/');
    }
  }

  get isLanding(): boolean {
    return !this.section;
  }

  get selectedExperience(): ExperienceContent | undefined {
    return this.experiences[this.selectedIndex];
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

  private normalizeIndex(index: number): number {
    return ((index % this.experiences.length) + this.experiences.length) % this.experiences.length;
  }
}
