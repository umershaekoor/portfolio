import { Injectable, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { Language } from '../models/portfolio.models';

@Injectable({
  providedIn: 'root',
})
export class I18nService {
  private readonly translateService = inject(TranslateService);

  private readonly supportedLanguages: readonly Language[] = [
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
    { code: 'fr', label: 'Français', flag: '🇫🇷' },
    { code: 'it', label: 'Italiano', flag: '🇮🇹' },
  ] as const;

  private currentLanguage = 'en';

  constructor() {
    this.initializeLanguage();
  }

  /**
   * Initialize translation service with browser language detection
   */
  private initializeLanguage(): void {
    const langCodes = this.supportedLanguages.map((lang) => lang.code);
    this.translateService.addLangs(langCodes);
    this.translateService.setDefaultLang('en');

    const browserLang = this.translateService.getBrowserLang();
    const matchedLang = this.supportedLanguages.find(
      (lang) => lang.code === browserLang
    );

    this.currentLanguage = matchedLang ? matchedLang.code : 'en';
    this.translateService.use(this.currentLanguage);
  }

  /**
   * Get all supported languages
   */
  getSupportedLanguages(): readonly Language[] {
    return this.supportedLanguages;
  }

  /**
   * Get current active language code
   */
  getCurrentLanguage(): string {
    return this.currentLanguage;
  }

  /**
   * Change the active language
   * @param langCode Language code to switch to
   * @returns true if language was changed, false if invalid
   */
  changeLanguage(langCode: string): boolean {
    if (!this.isValidLanguage(langCode)) {
      console.warn(`Invalid language code: ${langCode}`);
      return false;
    }

    this.currentLanguage = langCode;
    this.translateService.use(langCode);
    return true;
  }

  /**
   * Get translation for a specific key
   * @param key Translation key
   * @param params Optional interpolation params
   */
  translate(key: string, params?: object): Observable<string> {
    return this.translateService.get(key, params);
  }

  /**
   * Get instant translation (synchronous)
   * Use sparingly, prefer async translate()
   */
  instant(key: string, params?: object): string {
    return this.translateService.instant(key, params);
  }

  /**
   * Check if language code is supported
   */
  private isValidLanguage(code: string): boolean {
    return this.supportedLanguages.some((lang) => lang.code === code);
  }
}
