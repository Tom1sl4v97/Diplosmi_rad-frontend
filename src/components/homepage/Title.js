import homePageImage from "../../assets/images/TechnologyWatch.jpg";

function HomePageTitle() {
  return (
    <section id="hero">
      <div className="container flex flex-col-reverse mx-auto p-6 lg:flex-row">
        <div className="flex flex-col space-y-10 mb-24 lg:mt-16 lg:w-1/2 xl:mb-32">
          <h1 className="text-5xl font-bold text-center lg:text-6xl lg:max-w-md lg:text-left">
            Svijet u oblacima
          </h1>
          <p className="text-2xl text-center text-gray-400 lg:max-w-md lg:text-left">
            Blog koji Vam dostavlja najnovije vijesti iz svijeta tehnologije.
          </p>
        </div>
        <div className="mb-14 mx-auto md:w-180 lg:mb-0 lg:w-1/2 pt-6">
          <img src={homePageImage} alt="" className="rounded-full shadow-2xl" />
        </div>
      </div>
    </section>
  );
}

export default HomePageTitle;
