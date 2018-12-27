// react
import i18n from 'i18next';

// i18n
import detector from 'i18next-browser-languagedetector';
import { reactI18nextModule } from 'react-i18next';

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
	.use(reactI18nextModule) // passes i18n down to react-i18next
	.init({
		resources,
		lng: 'en',
		interpolation: { escapeValue: false } // react already safes from xss
	});

export default i18n;
