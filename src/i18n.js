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
                    loginLabel: "Enter your login details",
                    loginPassword: "Password",
                    logout: "Logout",
                    signup: "Sign Up",
                    homepage: "Homepage",
                    about: "About",
                    en: "English",
                    cro: "Croatian",
                    de: "German",
                }
            },
            cro: {
                translation: {
                    homePageTitle: "Sviijet u Oblacima",
                    homePageSubTitle: "Blog koji Vam dostavlja najnovije vijesti iz svijeta tehnologije.",
                    login: "Prijava",
                    loginLabel: "Unesite svoje podatke za prijavu",
                    loginPassword: "Lozinka",
                    logout: "Odjava",
                    signup: "Registracija",
                    homepage: "Početna",
                    about: "O nama",
                    en: "Engleski",
                    cro: "Hrvatski",
                    de: "Njemački",
                }
            },
            de: {
                translation: {
                    homePageTitle: "Welt in den Wolken",
                    homePageSubTitle: "Blog, der Ihnen die neuesten Nachrichten aus der Welt der Technologie bringt.",
                    login: "Anmeldung",
                    loginLabel: "Geben Sie Ihre Anmeldeinformationen ein",
                    loginPassword: "Passwort",
                    logout: "Ausloggen",
                    signup: "Anmelden",
                    homepage: "Startseite",
                    about: "Über",
                    en: "Englisch",
                    cro: "Kroatisch",
                    de: "Deutsch",
                }
            },
        }
    });

export default i18n;