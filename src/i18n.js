import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import detector from "i18next-browser-languagedetector";

import translationEN from "./config/language/translationEN.json";
import translationCRO from "./config/language/translationCRO.json";
import translationDE from "./config/language/translationDE.json";

const resources = {
  "en-US": {
    translation: translationEN,
  },
  hr: {
    translation: translationCRO,
  },
  de: {
    translation: translationDE,
  },
};

i18n
  .use(initReactI18next)
  .use(detector)
  .init({
    debug: false,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
    resources,
  });

export default i18n;
