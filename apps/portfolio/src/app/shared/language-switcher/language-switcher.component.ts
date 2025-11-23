import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { I18nService } from '../../core/services/i18n.service';
import { Language } from '../../core/models/portfolio.models';

@Component({
  selector: 'app-language-switcher',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './language-switcher.component.html',
  styleUrl: './language-switcher.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LanguageSwitcherComponent {
  private readonly i18nService = inject(I18nService);

  readonly languages: readonly Language[] = this.i18nService.getSupportedLanguages();

  get currentLang(): string {
    return this.i18nService.getCurrentLanguage();
  }

  switchLanguage(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.i18nService.changeLanguage(target.value);
  }
}
