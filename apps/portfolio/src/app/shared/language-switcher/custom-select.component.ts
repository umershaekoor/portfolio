import { Component, EventEmitter, Input, Output, HostListener, ElementRef, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Language } from '../../core/models/portfolio.models';

@Component({
  selector: 'app-custom-select',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="custom-select-container" [class.open]="isOpen">
      <div class="custom-select-button" (click)="toggleDropdown()" tabindex="0" (keydown.enter)="toggleDropdown()" (keydown.space)="toggleDropdown()" [attr.aria-expanded]="isOpen" role="combobox">
        <span class="selected-value">{{ selectedLanguage?.flag }} {{ selectedLanguage?.label }}</span>
        <span class="arrow" [class.rotate]="isOpen">▼</span>
      </div>
      <ul class="custom-select-dropdown" *ngIf="isOpen" role="listbox">
        <li *ngFor="let lang of languages"
            (click)="selectLanguage(lang)"
            (keydown.enter)="selectLanguage(lang)"
            [class.selected]="lang.code === currentLang"
            tabindex="0"
            role="option"
            [attr.aria-selected]="lang.code === currentLang">
          {{ lang.flag }} {{ lang.label }}
        </li>
      </ul>
    </div>
  `,
  styles: [`
    .custom-select-container {
      position: relative;
      width: 100%;
      max-width: 200px;
    }

    .custom-select-button {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: var(--spacing-xs) var(--spacing-sm);
      background: rgba(255, 255, 255, 0.05);
      backdrop-filter: blur(12px);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: var(--radius-md);
      color: var(--color-text-primary);
      cursor: pointer;
      font-size: var(--font-size-xs);
      font-weight: var(--font-weight-medium);
      transition: all var(--transition-base);
      user-select: none;

      &:hover {
        background: rgba(255, 255, 255, 0.08);
        border-color: rgba(255, 255, 255, 0.2);
      }

      &:focus {
        outline: 2px solid var(--color-primary);
        outline-offset: 2px;
      }
    }

    .selected-value {
      flex: 1;
    }

    .arrow {
      margin-left: var(--spacing-xs);
      font-size: 10px;
      transition: transform var(--transition-base);

      &.rotate {
        transform: rotate(180deg);
      }
    }

    .custom-select-dropdown {
      position: absolute;
      top: calc(100% + 4px);
      left: 0;
      right: 0;
      background: rgba(18, 18, 18, 0.98);
      backdrop-filter: blur(12px);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: var(--radius-md);
      list-style: none;
      margin: 0;
      padding: var(--spacing-xs) 0;
      z-index: 1000;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
      animation: slideDown 0.2s ease-out;

      li {
        padding: var(--spacing-sm) var(--spacing-md);
        color: var(--color-text-primary);
        cursor: pointer;
        transition: all var(--transition-fast);
        font-size: var(--font-size-xs);
        font-weight: var(--font-weight-medium);

        &:hover {
          background: rgba(233, 69, 96, 0.1);
          color: var(--color-primary);
        }

        &.selected {
          background: rgba(233, 69, 96, 0.15);
          color: var(--color-primary);
        }

        &:focus {
          outline: 2px solid var(--color-primary);
          outline-offset: -2px;
          background: rgba(233, 69, 96, 0.1);
        }
      }
    }

    @keyframes slideDown {
      from {
        opacity: 0;
        transform: translateY(-8px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomSelectComponent {
  @Input() languages: readonly Language[] = [];
  @Input() currentLang: string = 'en';
  @Output() languageChange = new EventEmitter<string>();

  isOpen = false;

  constructor(private elementRef: ElementRef) {}

  get selectedLanguage(): Language | undefined {
    return this.languages.find(lang => lang.code === this.currentLang);
  }

  toggleDropdown(): void {
    this.isOpen = !this.isOpen;
  }

  selectLanguage(lang: Language): void {
    this.languageChange.emit(lang.code);
    this.isOpen = false;
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isOpen = false;
    }
  }
}

