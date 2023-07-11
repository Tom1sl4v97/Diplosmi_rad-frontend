import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
    .use(initReactI18next)
    .init({
        debug: true,
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
        },
        // language resources
        resources: {
            en: {
                translation: {
                    homePageTitle: "World in the Clouds",
                    homePageSubTitle: "Blog that brings you the latest news from the world of technology.",
                    login: "Login",
                    logout: "Logout",
                    signup: "Sign Up",
                    homepage: "Homepage",
                    about: "About",
                }
            },
            cro: {
                translation: {
                    homePageTitle: "Sviijet u Oblacima",
                    homePageSubTitle: "Blog koji Vam dostavlja najnovije vijesti iz svijeta tehnologije.",
                    login: "Prijava",
                    logout: "Odjava",
                    signup: "Registracija",
                    homepage: "Početna",
                    about: "O nama",
                }
            },
        }
    });

export default i18n;