import { Component, ChangeDetectionStrategy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-intro',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './intro.component.html',
  styleUrl: './intro.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IntroComponent implements OnInit {
  private translate = inject(TranslateService);

  greetingChars: string[] = [];

  ngOnInit() {
    // Get translated greeting and split into characters
    this.translate.get('WELCOME_MESSAGE').subscribe(text => {
      this.greetingChars = text.split('');
    });

    // Update on language change
    this.translate.onLangChange.subscribe(() => {
      this.translate.get('WELCOME_MESSAGE').subscribe(text => {
        this.greetingChars = text.split('');
      });
    });
  }
}
