import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-lan-selector',
  templateUrl: './lan-selector.component.html',
  styleUrls: ['./lan-selector.component.scss']
})
export class LanSelectorComponent {
  siteLanguage = 'English';
  languageList = [
    { code: 'en', label: 'English' },
    { code: 'es', label: 'Spanish' },
  ];
  constructor(private translate: TranslateService) { }
  changeSiteLanguage(localeCode: string): void {
    const selectedLanguage = this.languageList
      .find((language) => language.code === localeCode)
      ?.label.toString();
    if (selectedLanguage) {
      this.siteLanguage = selectedLanguage;
      this.translate.use(localeCode);
    }
    const currentLanguage = this.translate.currentLang;
    console.log('currentLanguage', currentLanguage);
  }
}
