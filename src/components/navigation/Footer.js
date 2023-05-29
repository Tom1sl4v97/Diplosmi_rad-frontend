import logo from "../../assets/images/logo.png";
function Footer() {
  return (
    <footer className="py-16 bg-veryDarkViolet rounded-t-3xl">
      <div className="container flex flex-col items-center justify-between mx-auto space-y-16 md:flex-row md:space-y-0 md:items-start">
        <img src={logo} alt="" className="h-20 w-auto" />

        <div className="flex flex-col space-y-16 md:space-x-20 md:flex-row md:space-y-0">
          <div className="flex flex-col items-center w-full md:items-start">
            <div className="mb-5 font-bold text-white capitalize">Features</div>
            <div className="flex flex-col items-center space-y-3 md:items-start">
              <p className="capitalize text-grayishViolet hover:text-cyan">
                Nesto
              </p>
              <p className="capitalize text-grayishViolet hover:text-cyan">
                Nešto drugo
              </p>
              <p className="capitalize text-grayishViolet hover:text-cyan">
                Još nešto
              </p>
            </div>
          </div>
        </div>

        <div className="flex space-x-6"></div>
      </div>
    </footer>
  );
}

export default Footer;
