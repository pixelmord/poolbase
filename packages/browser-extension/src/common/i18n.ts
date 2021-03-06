import i18n from 'i18next';

import LanguageDetector from 'i18next-browser-languagedetector';
// init i18n and inject hardcoded translations
import resources from 'app/locales';

export const defaultOptions = {
  fallbackLng: 'en',
  debug: process.env.Node_ENV !== 'production' && false,
  ns: ['common'],
  defaultNS: 'common',
  resources,
  interpolation: {
    escapeValue: false, // not needed for react as it escapes by default
  },
};

i18n
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector);

export default i18n;
