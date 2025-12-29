import { Injectable } from '@angular/core';
import { ExperienceSkill } from '../models/portfolio.models';

export interface SkillProgression {
  name: string;
  maxLevel: number; // 0-3 scale from experience cards
  icon: string;
  color: string;
  category: 'frontend' | 'backend' | 'database' | 'devops' | 'testing' | 'other';
  url: string; // Documentation or homepage URL
}

@Injectable({
  providedIn: 'root'
})
export class SkillsDataService {

  /**
   * Central skills registry with metadata
   * This is the single source of truth for all skills
   */
  private readonly skillsRegistry: Record<string, Omit<SkillProgression, 'maxLevel'>> = {
    // Frontend
    'HTML': { name: 'HTML', icon: 'fab fa-html5', color: '#E34F26', category: 'frontend', url: 'https://developer.mozilla.org/en-US/docs/Web/HTML' },
    'CSS': { name: 'CSS', icon: 'fab fa-css3-alt', color: '#1572B6', category: 'frontend', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS' },
    'JavaScript': { name: 'JavaScript', icon: 'fab fa-js', color: '#F7DF1E', category: 'frontend', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript' },
    'Angular': { name: 'Angular', icon: 'fab fa-angular', color: '#DD0031', category: 'frontend', url: 'https://angular.io/docs' },
    'Vue.js': { name: 'Vue.js', icon: 'fab fa-vuejs', color: '#4FC08D', category: 'frontend', url: 'https://vuejs.org/guide/introduction.html' },
    'Ember.js': { name: 'Ember.js', icon: 'fab fa-ember', color: '#E04E39', category: 'frontend', url: 'https://guides.emberjs.com/' },

    // Backend
    'Java': { name: 'Java', icon: 'fab fa-java', color: '#f89820', category: 'backend', url: 'https://docs.oracle.com/en/java/' },
    'Spring Boot': { name: 'Spring Boot', icon: 'fas fa-leaf', color: '#6DB33F', category: 'backend', url: 'https://spring.io/projects/spring-boot' },
    'Spring': { name: 'Spring', icon: 'fas fa-leaf', color: '#6DB33F', category: 'backend', url: 'https://spring.io/projects/spring-framework' },
    'Quarkus': { name: 'Quarkus', icon: 'fas fa-cube', color: '#4695EB', category: 'backend', url: 'https://quarkus.io/get-started/' },
    'PHP': { name: 'PHP', icon: 'fab fa-php', color: '#777BB4', category: 'backend', url: 'https://www.php.net/docs.php' },

    // Database
    'SQL': { name: 'SQL', icon: 'fas fa-database', color: '#4479A1', category: 'database', url: 'https://www.w3schools.com/sql/' },
    'MongoDB': { name: 'MongoDB', icon: 'fas fa-server', color: '#4DB33D', category: 'database', url: 'https://www.mongodb.com/docs/' },

    // DevOps
    'Git': { name: 'Git', icon: 'fab fa-git-alt', color: '#F05032', category: 'devops', url: 'https://git-scm.com/doc' },
    'GitLab': { name: 'GitLab', icon: 'fab fa-gitlab', color: '#FC6D26', category: 'devops', url: 'https://docs.gitlab.com/' },
    'GitLab CI/CD': { name: 'GitLab CI/CD', icon: 'fas fa-sync-alt', color: '#FC6D26', category: 'devops', url: 'https://docs.gitlab.com/ee/ci/' },
    'Maven': { name: 'Maven', icon: 'fas fa-box', color: '#C71A36', category: 'devops', url: 'https://maven.apache.org/guides/' },
    'Gradle': { name: 'Gradle', icon: 'fas fa-cubes', color: '#02303A', category: 'devops', url: 'https://docs.gradle.org/' },
    'Jenkins': { name: 'Jenkins', icon: 'fab fa-jenkins', color: '#D24939', category: 'devops', url: 'https://www.jenkins.io/doc/' },
    'AWS': { name: 'AWS', icon: 'fab fa-aws', color: '#FF9900', category: 'devops', url: 'https://docs.aws.amazon.com/' },
    'Shell': { name: 'Shell', icon: 'fas fa-terminal', color: '#4EAA25', category: 'devops', url: 'https://www.gnu.org/software/bash/manual/' },
    'Ansible': { name: 'Ansible', icon: 'fas fa-cog', color: '#EE0000', category: 'devops', url: 'https://docs.ansible.com/' },
    'Argo CD': { name: 'Argo CD', icon: 'fas fa-ship', color: '#EF7B4D', category: 'devops', url: 'https://argo-cd.readthedocs.io/' },
    'OpenShift': { name: 'OpenShift', icon: 'fas fa-cloud', color: '#EE0000', category: 'devops', url: 'https://docs.openshift.com/' },

    // Testing
    'JUnit': { name: 'JUnit', icon: 'fas fa-vial', color: '#25A162', category: 'testing', url: 'https://junit.org/junit5/docs/current/user-guide/' },

    // API & Documentation
    'Swagger': { name: 'Swagger', icon: 'fas fa-book', color: '#85EA2D', category: 'other', url: 'https://swagger.io/docs/' },
    'OpenAPI Generator': { name: 'OpenAPI Generator', icon: 'fas fa-file-code', color: '#6BA539', category: 'other', url: 'https://openapi-generator.tech/docs/usage/' },

    // Other
    'FOSSology': { name: 'FOSSology', icon: 'fas fa-search', color: '#00A1E0', category: 'other', url: 'https://www.fossology.org/get-started/' },
    'OpenStreetMap': { name: 'OpenStreetMap', icon: 'fas fa-map', color: '#7EBC6F', category: 'other', url: 'https://wiki.openstreetmap.org/' },
  };

  /**
   * Calculate the highest skill level from experience progression
   * @param experienceSkills Array of skills from all experiences (in chronological order)
   * @returns Array of skills with max levels achieved, sorted chronologically
   */
  calculateSkillLevels(experienceSkills: ExperienceSkill[][]): SkillProgression[] {
    const skillLevels = new Map<string, number>();
    const skillFirstAppearance = new Map<string, number>(); // Track when skill first appeared

    // Flatten all skills and find max level for each, track first appearance
    experienceSkills.forEach((skills, experienceIndex) => {
      skills.forEach(skill => {
        const currentMax = skillLevels.get(skill.name) || 0;
        skillLevels.set(skill.name, Math.max(currentMax, skill.level));

        // Record first appearance if not yet tracked
        if (!skillFirstAppearance.has(skill.name)) {
          skillFirstAppearance.set(skill.name, experienceIndex);
        }
      });
    });

    // Build final skills array with metadata
    const skills: SkillProgression[] = [];
    skillLevels.forEach((maxLevel, skillName) => {
      const metadata = this.skillsRegistry[skillName];
      if (metadata) {
        skills.push({
          ...metadata,
          maxLevel,
        });
      }
    });

    // Sort by first appearance (chronological order)
    skills.sort((a, b) => {
      const aIndex = skillFirstAppearance.get(a.name) || 0;
      const bIndex = skillFirstAppearance.get(b.name) || 0;
      return aIndex - bIndex;
    });

    return skills;
  }

  /**
   * Convert 0-3 skill level to 0-100 percentage
   */
  levelToPercentage(level: number): number {
    return Math.round((level / 3) * 100);
  }

  /**
   * Get skill metadata by name
   */
  getSkillMetadata(skillName: string) {
    return this.skillsRegistry[skillName];
  }
}

