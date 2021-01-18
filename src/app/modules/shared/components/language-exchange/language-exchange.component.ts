import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-language-exchange',
  template: `
    <mat-form-field appearance="fill">
      <mat-select
        [(value)]="selected"
        (selectionChange)="onLanguageChange($event)"
      >
        <mat-option *ngFor="let lang of translate.getLangs()" [value]="lang">
          {{ languages[lang] }}
        </mat-option>
      </mat-select>
    </mat-form-field>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LanguageExchangeComponent {
  selected: 'tr-TR' | 'en-US' = 'en-US';

  languages = {
    'tr-TR': 'Türkçe',
    'en-US': 'English',
  };

  constructor(public translate: TranslateService) {
    translate.addLangs(['en-US', 'tr-TR']);
    translate.setDefaultLang('en-US');

    const browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/tr|tr-TR/) ? 'tr-TR' : 'en-US');
  }

  onLanguageChange($lang: MatSelectChange): void {
    this.translate.use($lang.value);
  }
}
