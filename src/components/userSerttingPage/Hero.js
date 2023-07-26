import { useTranslation } from "react-i18next";

function Hero() {
  const { t: text } = useTranslation();

  return (
    <>
      <div className="relative">
        <div className="w-100 mx-auto px-6 sm:max-w-2xl md:max-w-3xl md:px-12 lg:max-w-5xl xl:max-w-7xl xl:px-32 pt-8">
          <div className="text-center">
            <div className="block px-6 md:px-12">
              <h1 className="mt-6 mb-16 text-5xl font-bold tracking-tight md:text-6xl xl:text-7xl">
                {text("users")} <br />
                <span className="text-cyan">{text("settings")}</span>
              </h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Hero;
