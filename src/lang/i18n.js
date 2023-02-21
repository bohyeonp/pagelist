import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import TranslationEn from "./resources/translation.en.json";
import TranslationKo from "./resources/translation.ko.json";

const resource = {
    en: {
        translations: TranslationEn
    },
    ko: {
        translations: TranslationKo
    }
}

i18n
    .use(initReactI18next)
    .init({
        resources:resource,
        // 초기 설정 언어
        lng: "ko",
        fallbackLng: "ko",
        debug: true,
        defaultNS: "translations",
        ns: "translations",
        keySeparator: false,
        interpolation: {
            escapeValue: false
        }
    })

export default i18n;
