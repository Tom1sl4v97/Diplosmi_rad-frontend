import logo from "../../assets/images/logo.png";
import ContentfulLogo from "../../assets/images/ContentfulLogo.png";
import CommerceToolsLogo from "../../assets/images/ComerceToolsLogo.png";
import FirebaseLogo from "../../assets/images/FirebaseLogo.png";

import { useTranslation } from "react-i18next";

function Footer() {
  const { t: text } = useTranslation();
  return (
    <footer className="py-8 bg-veryDarkViolet rounded-t-3xl">
      <p className="text-center text-white">{text("poweredBy")}:</p>
      <div className="container pt-9 flex flex-row justify-center">
        <div className="mb-9 flex flex-col justify-center">
          <div className="mr-9 text-neutral-800 dark:text-neutral-200">
            <div className="rounded-3xl p-1 bg-white">
              <img src={logo} alt="" className="w-16" />
            </div>
          </div>
        </div>
        <div className="mb-9 flex flex-col justify-center">
          <a
            href="https://www.contentful.com"
            target="_blank"
            rel="noreferrer"
            className="mr-9 text-neutral-800 dark:text-neutral-200"
          >
            <div className="rounded-3xl p-2 bg-white">
              <img src={ContentfulLogo} alt="" className="w-32" />
            </div>
          </a>
        </div>
        <div className="mb-9 flex flex-col justify-center">
          <a
            href="https://commercetools.com"
            target="_blank"
            rel="noreferrer"
            className="mr-9 text-neutral-800 dark:text-neutral-200"
          >
            <div className="rounded-3xl px-2 bg-white">
              <img src={CommerceToolsLogo} alt="" className="w-40" />
            </div>
          </a>
        </div>
        <div className="mb-9 flex flex-col justify-center">
          <a
            href="https://firebase.google.com"
            target="_blank"
            rel="noreferrer"
            className="mr-9 text-neutral-800 dark:text-neutral-200"
          >
            <div className="rounded-3xl p-2 bg-white">
              <img src={FirebaseLogo} alt="" className="w-32" />
            </div>
          </a>
        </div>
      </div>
      <div className="p-4 text-center text-white">
        © 2023 Copyright: TT, {text("homePageTitle")}
      </div>
    </footer>
  );
}

export default Footer;
