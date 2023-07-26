import { useTranslation } from "react-i18next";
import { useSessionStorage } from "../../hooks/SessionStorage";

function LanguageComponent(props) {
  const { t: text, i18n } = useTranslation();
  const [languageStorage, setLanguageStorage] = useSessionStorage(
    "language",
    "en-US"
  );

  const lngs = [
    {
      code: "en-US",
      native: text("en"),
      link: "https://img.icons8.com/?size=512&id=t3NE3BsOAQwq&format=png",
    },
    {
      code: "hr",
      native: text("cro"),
      link: "https://img.icons8.com/?size=512&id=vA8EHSmuIeHt&format=png",
    },
    {
      code: "de",
      native: text("de"),
      link: "https://img.icons8.com/?size=512&id=hTMPE6ntTofO&format=png",
    },
  ];

  const handleTrans = (code) => {
    var language = code;
    if (code === "de") language = "en-US";
    setLanguageStorage(language);
    i18n.changeLanguage(code);
    window.location.reload();
  };

  return (
    <div className="flex flex-col items-center md:flex-row md:justify-between">
      <div className="flex flex-col md:flex-row items-center right-1 ">
        {lngs.map((lng, i) => {
          const { code, native, link } = lng;
          return (
            <button
              key={i}
              onClick={() => handleTrans(code)}
              className="p-2 flex flex-row items-center text-sm font-medium text-gray-700 hover:bg-gray-100"
            >
              <span className="text-md">{native}</span>
              <span className="ml-1">
                {" "}
                <img src={link} className="w-5 h-5" alt={code} />
              </span>
            </button>
          );
        })}
      </div>
      <div className="items-center p-2">TODO Search component</div>
    </div>
  );
}

export default LanguageComponent;
