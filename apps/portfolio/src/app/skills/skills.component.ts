import { Component, ChangeDetectionStrategy, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Skill } from '../core/models/portfolio.models';
import { ScrollRevealDirective } from '../core/directives/scroll-reveal.directive';
import { SkillsDataService, SkillProgression } from '../core/services/skills-data.service';
import { ExperienceDataService } from '../core/services/experience-data.service';

type SortOption = 'date' | 'strength';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule, TranslateModule, ScrollRevealDirective],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkillsComponent implements OnInit {
  skills = signal<readonly Skill[]>([]);
  sortBy = signal<SortOption>('date');
  private allSkillProgressions: SkillProgression[] = [];

  constructor(
    private skillsDataService: SkillsDataService,
    private experienceDataService: ExperienceDataService,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    // Get all experience skills
    const experiences = this.experienceDataService.getExperiences();
    const experienceSkills = experiences
      .map(exp => exp.skills ? [...exp.skills] : [])
      .filter(skills => skills.length > 0);

    // Calculate max skill levels from experience progression
    this.allSkillProgressions = this.skillsDataService.calculateSkillLevels(experienceSkills);

    // Initial display with date sorting (default from service)
    this.updateSkills();
  }

  /**
   * Update skills based on current sort option
   */
  private updateSkills(): void {
    const sorted = [...this.allSkillProgressions];

    if (this.sortBy() === 'strength') {
      // Sort by skill level (descending), then by name
      sorted.sort((a, b) => {
        if (b.maxLevel !== a.maxLevel) {
          return b.maxLevel - a.maxLevel;
        }
        return a.name.localeCompare(b.name);
      });
    }
    // 'date' sorting is already applied by calculateSkillLevels

    // Convert to Skill format with percentage levels
    this.skills.set(sorted.map(sp => ({
      name: sp.name,
      level: this.skillsDataService.levelToPercentage(sp.maxLevel),
      icon: sp.icon,
      color: sp.color,
      url: sp.url,
    })));
  }

  /**
   * Change sort option
   */
  setSortBy(option: SortOption): void {
    this.sortBy.set(option);
    this.updateSkills();
  }

  /**
   * TrackBy function for ngFor performance
   */
  trackByName(index: number, skill: Skill): string {
    return skill.name;
  }

  /**
   * Get translated tooltip for skill
   */
  getSkillTooltip(skillName: string): string {
    return `${this.translate.instant('SKILLS.OPEN')} ${skillName}`;
  }
}
