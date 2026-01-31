import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IntroComponent } from './intro/intro.component';
import { ExperienceComponent } from './experience/experience.component';
import { SkillsComponent } from './skills/skills.component';
import { ContactComponent } from './contact/contact.component';
import { LanguageSwitcherComponent } from './shared/language-switcher/language-switcher.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  imports: [
    RouterModule,
    CommonModule,
    IntroComponent,
    ExperienceComponent,
    SkillsComponent,
    ContactComponent,
    LanguageSwitcherComponent,
    TranslateModule
  ],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit, OnDestroy {
  activeSection = 'intro';
  isScrolled = false;
  private titleInterval?: number;
  private titles = ['voncode', 'Umer Shakoor'];
  private currentTitleIndex = 0;

  ngOnInit() {
    // Scroll to top on page load to ensure intro section is visible
    window.scrollTo({ top: 0, behavior: 'instant' });

    // Start title switching
    this.startTitleRotation();
  }

  ngOnDestroy() {
    // Clean up interval when component is destroyed
    if (this.titleInterval) {
      clearInterval(this.titleInterval);
    }
  }

  private startTitleRotation() {
    // Set initial title
    document.title = this.titles[this.currentTitleIndex];

    // Switch title every 5 seconds
    this.titleInterval = window.setInterval(() => {
      this.currentTitleIndex = (this.currentTitleIndex + 1) % this.titles.length;
      document.title = this.titles[this.currentTitleIndex];
    }, 5000);
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 50;
    this.updateActiveSection();
  }

  scrollTo(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      this.activeSection = sectionId;
    }
  }

  private updateActiveSection() {
    const sections = ['intro', 'experience', 'skills', 'contact'];
    for (const section of sections) {
      const element = document.getElementById(section);
      if (element) {
        const rect = element.getBoundingClientRect();
        if (rect.top >= 0 && rect.top < window.innerHeight / 2) {
          this.activeSection = section;
          break;
        }
      }
    }
  }
}
