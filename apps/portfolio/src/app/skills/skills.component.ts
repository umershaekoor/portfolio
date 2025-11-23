import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { Skill } from '../core/models/portfolio.models';
import { ScrollRevealDirective } from '../core/directives/scroll-reveal.directive';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule, TranslateModule, ScrollRevealDirective],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkillsComponent {
  readonly skills: readonly Skill[] = [
    { name: 'JavaScript', level: 90, icon: 'fab fa-js', color: '#F7DF1E' },
    { name: 'Java', level: 85, icon: 'fab fa-java', color: '#f89820' },
    { name: 'SQL', level: 80, icon: 'fas fa-database', color: '#4479A1' },
    { name: 'NoSQL', level: 75, icon: 'fas fa-server', color: '#4DB33D' },
    { name: 'CI/CD', level: 70, icon: 'fas fa-sync-alt', color: '#6B46C1' },
    { name: 'Angular', level: 95, icon: 'fab fa-angular', color: '#DD0031' },
  ] as const;

  /**
   * TrackBy function for ngFor performance
   */
  trackByName(index: number, skill: Skill): string {
    return skill.name;
  }
}
