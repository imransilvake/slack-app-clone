// react
import i18n from 'i18next';

// i18n
import detector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

// app
import translationEN from './locales/en';
import translationDE from './locales/de';

// add translations
const resources = {
	en: { translation: translationEN },
	de: { translation: translationDE }
};

// init i18n
i18n
	.use(detector)
	.use(initReactI18next)
	.init({
		resources,
		lng: 'en',
		interpolation: { escapeValue: false } // react already safes from xss
	})
	.then();

export default i18n;
