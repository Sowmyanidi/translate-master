import { ComponentFixture, TestBed } from '@angular/core/testing';
import { axe, toHaveNoViolations } from 'jasmine-axe';
import { LanguageSelectorComponent } from './language-selector.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { provideStore } from '@ngxs/store';
import { SettingsState } from '../../../modules/settings/settings.state';
import { ngxsConfig } from '../../../app.config';
import { TranslateState } from '../../../modules/translate/translate.state';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideIonicAngular } from '@ionic/angular/standalone';
import { AppTranslocoTestingModule } from '../../../core/modules/transloco/transloco-testing.module';

describe('LanguageSelectorComponent', () => {
  let component: LanguageSelectorComponent;
  let fixture: ComponentFixture<LanguageSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppTranslocoTestingModule, NoopAnimationsModule, LanguageSelectorComponent],
      providers: [
        provideIonicAngular(),
        provideHttpClient(),
        provideHttpClientTesting(),
        provideStore([SettingsState, TranslateState], ngxsConfig),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LanguageSelectorComponent);
    component = fixture.componentInstance;
    component.translationKey = 'languages';
    component.languages = ['en', 'fr', 'de'];
    component.hasLanguageDetection = false; // Added this line to prevent undefined issues
    component.language = 'en'; // Default language for testing
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default detected language as Indian Sign Language (ins)', () => {
    expect(component.detectedLanguage).toBe('ins');
  });

  it('should not change language when selecting the same index', () => {
    const { language, topLanguages } = component;
    component.selectLanguageIndex(component.selectedIndex);
    expect(component.language).toEqual(language);
    expect(component.topLanguages).toEqual(topLanguages);
  });

  it('should set index to 0 when selecting language detection', () => {
    component.hasLanguageDetection = true;
    component.language = 'unk';
    component.selectLanguage(null);
    expect(component.selectedIndex).toEqual(0);
  });

  it('should set index to 0 when selecting first language without detection', () => {
    component.hasLanguageDetection = false;
    component.language = 'unk';
    component.selectLanguage(component.topLanguages[0]);
    expect(component.selectedIndex).toEqual(0);
  });

  it('should set index to 1 when selecting first language with detection', () => {
    component.hasLanguageDetection = true;
    component.language = 'unk';
    component.selectLanguage(component.topLanguages[0]);
    expect(component.selectedIndex).toEqual(1);
  });

  it('should move unknown language to top when selected', () => {
    component.hasLanguageDetection = false;
    const topLanguagesCount = component.topLanguages.length;
    component.selectLanguage('unk');
    expect(component.language).toEqual('unk');
    expect(component.topLanguages[0]).toEqual('unk');
    expect(component.selectedIndex).toEqual(0);
    expect(component.topLanguages.length).toEqual(topLanguagesCount);
  });

  it('should set selected language to null when selecting index 0 with detection', () => {
    component.hasLanguageDetection = true;
    const spy = spyOn(component, 'selectLanguage');
    component.selectLanguageIndex(0);
    expect(spy).toHaveBeenCalledOnceWith(null);
  });

  it('should select the first language when selecting index 0 without detection', () => {
    component.hasLanguageDetection = false;
    const spy = spyOn(component, 'selectLanguage');
    const topLanguage = component.topLanguages[0];
    component.selectLanguageIndex(0);
    expect(spy).toHaveBeenCalledOnceWith(topLanguage);
  });

  it('should select the first language when selecting index 1 with detection', () => {
    component.hasLanguageDetection = true;
    const spy = spyOn(component, 'selectLanguage');
    const topLanguage = component.topLanguages[0];
    component.selectLanguageIndex(1);
    expect(spy).toHaveBeenCalledOnceWith(topLanguage);
  });
});
