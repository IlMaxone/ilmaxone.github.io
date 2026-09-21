import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import type { ExperienceContent } from '../../content/experience.model';
import { GENERATED_EXPERIENCES } from '../../generated/experiences.generated';
import { OrbitalSceneComponent } from './orbital-scene';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [RouterLink, OrbitalSceneComponent],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.scss',
})
export class HomePageComponent {
  readonly experiences: ExperienceContent[] = GENERATED_EXPERIENCES;
  selectedIndex = 0;

  get selectedExperience(): ExperienceContent {
    return this.experiences[this.selectedIndex];
  }

  selectExperience(index: number): void {
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
