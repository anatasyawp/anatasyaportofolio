import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import enTranslation from './locales/en.json';
import idTranslation from './locales/id.json';

const resources = {
    en: {
        translation: enTranslation,
    },
    id: {
        translation: idTranslation,
    },
};

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: 'en',
        supportedLngs: ['en', 'id'],
        load: 'languageOnly',
        nonExplicitSupportedLngs: true,
        detection: {
            order: ['localStorage', 'navigator', 'htmlTag'],
            lookupLocalStorage: 'portfolio_language',
            caches: ['localStorage'],
        },
        interpolation: {
            escapeValue: false, // React already escapes values
        },
    });

// Ensure HTML lang attribute updates on language change
if (typeof document !== 'undefined') {
    document.documentElement.lang = i18n.language?.startsWith('id') ? 'id' : 'en';
    i18n.on('languageChanged', (lng) => {
        document.documentElement.lang = lng.startsWith('id') ? 'id' : 'en';
    });
}

export default i18n;
