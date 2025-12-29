import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { Skill } from '../core/models/portfolio.models';
import { ScrollRevealDirective } from '../core/directives/scroll-reveal.directive';
import { SkillsDataService, SkillProgression } from '../core/services/skills-data.service';
import { ExperienceDataService } from '../core/services/experience-data.service';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule, TranslateModule, ScrollRevealDirective],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkillsComponent implements OnInit {
  skills: readonly Skill[] = [];

  constructor(
    private skillsDataService: SkillsDataService,
    private experienceDataService: ExperienceDataService
  ) {}

  ngOnInit(): void {
    // Get all experience skills
    const experiences = this.experienceDataService.getExperiences();
    const experienceSkills = experiences
      .map(exp => exp.skills ? [...exp.skills] : [])
      .filter(skills => skills.length > 0);

    // Calculate max skill levels from experience progression
    const skillProgressions = this.skillsDataService.calculateSkillLevels(experienceSkills);

    // Convert to Skill format with percentage levels
    this.skills = skillProgressions.map(sp => ({
      name: sp.name,
      level: this.skillsDataService.levelToPercentage(sp.maxLevel),
      icon: sp.icon,
      color: sp.color,
      url: sp.url, // Add documentation/homepage URL
    }));
  }

  /**
   * TrackBy function for ngFor performance
   */
  trackByName(index: number, skill: Skill): string {
    return skill.name;
  }
}
