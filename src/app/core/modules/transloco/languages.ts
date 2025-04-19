export const SITE_LANGUAGES = [
  {key: 'en', value: 'English'},
  {key: 'hi', value: 'हिन्दी'},
];

export function languageCodeNormalizer(languageCode) {
  let [navigatorParam] = languageCode.split('-');
  if (navigatorParam === 'zh') {
    // Handle simplified (china) vs traditional (hong kong, taiwan) chinese
    navigatorParam = ['zh-CN', 'zh-Hans'].includes(languageCode) ? 'zh-CN' : 'zh-HK';
  }
  if (navigatorParam === 'pt') {
    // Handle brazilian vs european portuguese
    navigatorParam = languageCode;
  }
  if (navigatorParam === 'iw') {
    // Handle Hebrew
    navigatorParam = 'he';
  }
  return navigatorParam;
}
