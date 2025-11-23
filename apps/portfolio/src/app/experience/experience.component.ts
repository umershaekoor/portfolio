import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { Experience } from '../core/models/portfolio.models';
import { ScrollRevealDirective } from '../core/directives/scroll-reveal.directive';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule, TranslateModule, ScrollRevealDirective],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExperienceComponent {
  readonly experiences: readonly Experience[] = [
    {
      cityKey: 'EXPERIENCE.BERN.CITY',
      roleKey: 'EXPERIENCE.BERN.ROLE',
      periodKey: 'EXPERIENCE.BERN.PERIOD',
      descriptionKey: 'EXPERIENCE.BERN.DESCRIPTION',
    },
    {
      cityKey: 'EXPERIENCE.MUNICH.CITY',
      roleKey: 'EXPERIENCE.MUNICH.ROLE',
      periodKey: 'EXPERIENCE.MUNICH.PERIOD',
      descriptionKey: 'EXPERIENCE.MUNICH.DESCRIPTION',
    },
    {
      cityKey: 'EXPERIENCE.BIELEFELD.CITY',
      roleKey: 'EXPERIENCE.BIELEFELD.ROLE',
      periodKey: 'EXPERIENCE.BIELEFELD.PERIOD',
      descriptionKey: 'EXPERIENCE.BIELEFELD.DESCRIPTION',
    },
  ] as const;

  /**
   * TrackBy function for ngFor performance optimization
   */
  trackByIndex(index: number): number {
    return index;
  }
}
