import i18n from "i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from "react-i18next";

const resources = {
    en: require('./en.json'),
    pt: require('./pt.json')
};

i18n
    .use(initReactI18next)
    .use(LanguageDetector)
    .init({
        debug: false,
        resources,
        fallbackLng: ['en', 'pt'],
        defaultNS: ['common'],
        ns: ['common', 'registration'],
        keySeparator: '.',
        interpolation: {
            escapeValue: false
        },
        react: {
            transSupportBasicHtmlNodes: true,
            wait: true
        },
        detection: {
            order: ['path'],
            lookupFromPathIndex: 0
        }
    });

export default i18n;