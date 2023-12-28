import i18n from "i18next";
import {initReactI18next} from "react-i18next";

i18n.use(initReactI18next).init({
    fallbackLng: "en",
    resources: {
        en: {
            translation: {
                navbar: {
                    today: "Today",
                    forecast: "Forecast"
                }
            }
        },
        fr: {
            translation: {
                navbar: {
                    today: "Aujourd'hui",
                    forecast: "Prévisions"
                }
            }
        }
    }
});

export default i18n;