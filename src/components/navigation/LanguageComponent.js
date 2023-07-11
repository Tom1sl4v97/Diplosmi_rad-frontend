import { useTranslation } from "react-i18next";

const lngs = [
    { code: "en", native: "En" },
    { code: "cro", native: "Cro" },
];

function LanguageComponent(props) {
    const { t, i18n } = useTranslation();

    const handleTrans = (code) => {
        i18n.changeLanguage(code);
    };

    return (
        <>
            {lngs.map((lng, i) => {
                const { code, native } = lng;
                return <button onClick={() => handleTrans(code)}>{native}</button>;
            })}
        </>

    );
}

export default LanguageComponent;