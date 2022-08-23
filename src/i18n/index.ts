import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: require('./locales/en.json'),
  },
  vi: {
    translation: require('./locales/vi.json'),
  },
};

i18n.use(initReactI18next).init({
  lng: 'en',
  resources,
});

export default i18n;
