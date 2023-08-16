import { useTranslation } from "react-i18next";
import imageUrl from "../../assets/images/shopGif.gif";

function ShopTitle() {
  const { t: text } = useTranslation();

  return (
    <section id="hero">
      <div className="container flex flex-col mx-auto p-6 lg:flex-row-reverse">
        <div className="flex flex-col space-y-10 mb-24 lg:mt-16 lg:w-1/2 xl:mb-32">
          <h1 className="text-5xl font-bold text-center lg:text-6xl lg:max-w-md lg:text-left">
            {text("shopPageWelcome")}
          </h1>
          <p className="text-2xl text-center text-gray-400 lg:max-w-md lg:text-left">
            {text("shopPageWelcomeText")}
          </p>
          <p className="text-2xl text-center text-gray-400 lg:max-w-md lg:text-left">
            {text("shopPageWelcomeClickOnProductForMoreInfo")}
          </p>
        </div>
        <div className="mb-14 mx-auto md:w-180 lg:mb-0 lg:w-1/2 pt-6">
          <img src={imageUrl} alt="" className="h-96 rounded-full shadow-2xl" />
        </div>
      </div>
    </section>
  );
}

export default ShopTitle;
