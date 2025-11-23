import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

export type ButtonVariant = 'primary' | 'secondary';
export type ButtonSize = 'small' | 'medium' | 'large';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      [class]="getButtonClasses()"
      [type]="type"
      [disabled]="disabled">
      <ng-content></ng-content>
    </button>
  `,
  styles: [`
    :host {
      display: inline-block;
    }

    button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.75rem;
      font-weight: 600;
      border-radius: 12px;
      text-decoration: none;
      transition: all 0.3s ease;
      position: relative;
      overflow: hidden;
      cursor: pointer;
      border: none;
      font-family: inherit;

      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
        transition: left 0.5s ease;
      }

      &:hover:not(:disabled)::before {
        left: 100%;
      }

      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }

      &.variant-primary {
        background: linear-gradient(135deg, #e94560 0%, #d63651 100%);
        color: #fff;
        box-shadow: 0 4px 20px rgba(233, 69, 96, 0.4);

        &:hover:not(:disabled) {
          transform: translateY(-3px);
          box-shadow: 0 6px 30px rgba(233, 69, 96, 0.6);
        }
      }

      &.variant-secondary {
        background: rgba(255, 255, 255, 0.08);
        color: #fff;
        border: 1px solid rgba(255, 255, 255, 0.2);
        backdrop-filter: blur(10px);

        &:hover:not(:disabled) {
          background: rgba(255, 255, 255, 0.15);
          border-color: rgba(255, 255, 255, 0.3);
          transform: translateY(-3px);
        }
      }

      &.size-small {
        padding: 0.5rem 1.25rem;
        font-size: 0.875rem;
      }

      &.size-medium {
        padding: 1rem 2.5rem;
        font-size: 1rem;
      }

      &.size-large {
        padding: 1.25rem 3rem;
        font-size: 1.125rem;
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  @Input() variant: ButtonVariant = 'primary';
  @Input() size: ButtonSize = 'medium';
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() disabled = false;

  getButtonClasses(): string {
    return `variant-${this.variant} size-${this.size}`;
  }
}
