import { Component, ChangeDetectionStrategy, HostListener, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { Experience } from '../core/models/portfolio.models';
import { ScrollRevealDirective } from '../core/directives/scroll-reveal.directive';
import { MapService } from '../core/services/map.service';
import { ExperienceDataService } from '../core/services/experience-data.service';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule, TranslateModule, ScrollRevealDirective],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExperienceComponent {
  constructor(
    private mapService: MapService,
    private cdr: ChangeDetectorRef,
    private experienceDataService: ExperienceDataService
  ) {}

  private hoverTimeout: ReturnType<typeof setTimeout> | null = null;
  private readonly HOVER_DELAY_MS = 300; // 300ms delay before expanding

  get experiences(): readonly Experience[] {
    return this.experienceDataService.getExperiences();
  }

  expandedCardIndex: number | null = null;

  /**
   * Check if current viewport is mobile/tablet (768px or less)
   */
  get isMobileView(): boolean {
    return typeof window !== 'undefined' && window.innerWidth <= 768;
  }

  /**
   * TrackBy function for ngFor performance optimization
   */
  trackByIndex(index: number): number {
    return index;
  }

  private setExpanded(index: number | null): void {
    this.expandedCardIndex = index;
  }

  private isHoverCapable(): boolean {
    return typeof window !== 'undefined' && window.matchMedia?.('(hover: hover) and (pointer: fine)').matches === true;
  }

  expandOnHover(index: number): void {
    if (!this.isHoverCapable()) {
      return;
    }

    // Clear any pending expansion
    if (this.hoverTimeout) {
      clearTimeout(this.hoverTimeout);
    }

    // Set a delay before expanding
    this.hoverTimeout = setTimeout(() => {
      this.setExpanded(index);
      this.hoverTimeout = null;
      this.cdr.markForCheck(); // Trigger change detection
    }, this.HOVER_DELAY_MS);
  }

  collapseOnLeave(index: number): void {
    // Clear pending expansion if mouse leaves before delay completes
    if (this.hoverTimeout) {
      clearTimeout(this.hoverTimeout);
      this.hoverTimeout = null;
    }

    if (this.expandedCardIndex === index) {
      this.setExpanded(null);
      this.cdr.markForCheck(); // Trigger change detection
    }
  }

  expandOnFocus(index: number): void {
    this.setExpanded(index);
  }

  collapseOnBlur(event: FocusEvent, index: number): void {
    const nextTarget = event.relatedTarget as HTMLElement | null;
    const currentTarget = event.currentTarget as HTMLElement | null;
    if (!currentTarget || !nextTarget) {
      this.collapse(index);
      return;
    }
    if (!currentTarget.contains(nextTarget)) {
      this.collapse(index);
    }
  }

  toggleExpansion(index: number): void {
    this.expandedCardIndex = this.expandedCardIndex === index ? null : index;
    this.cdr.markForCheck(); // Trigger change detection
  }

  collapse(index?: number): void {
    if (index === undefined || this.expandedCardIndex === index) {
      this.setExpanded(null);
      this.cdr.markForCheck(); // Trigger change detection
    }
  }

  isExpanded(index: number): boolean {
    return this.expandedCardIndex === index;
  }

  onCardKeyUp(event: KeyboardEvent, index: number): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.toggleExpansion(index);
      this.cdr.markForCheck(); // Trigger change detection
    }
  }

  getCountryPath(countryCode: string): string {
    return this.mapService.getCountryPath(countryCode);
  }

  getViewBox(countryCode: string): string {
    return this.mapService.getViewBox(countryCode);
  }

  /**
   * Generate skill level indicator array for display
   * @param level - Skill level from 0-3 (can be decimal like 1.5, 2.5)
   * @returns Array of 3 objects indicating full, half, or empty dashes
   */
  getSkillLevelIndicators(level: number): Array<{ type: 'full' | 'half' | 'empty' }> {
    const indicators: Array<{ type: 'full' | 'half' | 'empty' }> = [];

    for (let i = 1; i <= 3; i++) {
      if (level >= i) {
        indicators.push({ type: 'full' });
      } else if (level >= i - 0.5) {
        indicators.push({ type: 'half' });
      } else {
        indicators.push({ type: 'empty' });
      }
    }

    return indicators;
  }

  @HostListener('document:keydown.escape')
  handleEscape(): void {
    if (this.expandedCardIndex !== null) {
      this.collapse();
    }
  }
}
