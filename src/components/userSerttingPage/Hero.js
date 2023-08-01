function Hero(props) {
  const splitedText = props.text.split(" ");
  const firstText = splitedText[0];
  const secondText = splitedText[1];

  return (
    <>
      <div className="relative">
        <div className="w-100 mx-auto px-6 sm:max-w-2xl md:max-w-3xl md:px-12 lg:max-w-5xl xl:max-w-7xl xl:px-32 pt-8">
          <div className="text-center">
            <div className="block px-6 md:px-12">
              <h1 className="mt-6 mb-16 text-5xl font-bold tracking-tight md:text-6xl xl:text-7xl">
                {firstText}
                <br />
                <span className="text-cyan">{secondText}</span>
              </h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Hero;
