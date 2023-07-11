import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import LanguageComponent from "./LanguageComponent";


import logo from "../../assets/images/logo.png";

function MainNavigation() {
  const [menuOpen, setMenuOpen] = useState(false);

  const { t: text, i18n } = useTranslation();

  const stilovi =
    "font-bold text-grayishViolet hover:text-veryDarkViolet no-underline";
  const aktivniStilovi =
    "px-4 py-2 font-bold text-white bg-cyan rounded-full hover:opacity-70 no-underline";

  const dioNavigacije = (
    <>
      <NavLink
        to="/"
        className={({ isActive }) => (isActive ? aktivniStilovi : stilovi)}
      >
        {text("homepage")}
      </NavLink>
      <NavLink
        to="/drugaStranica"
        className={({ isActive }) => (isActive ? aktivniStilovi : stilovi)}
      >
        {text("about")}
      </NavLink>
      <NavLink
        to="/trecaStranica"
        className={({ isActive }) => (isActive ? aktivniStilovi : stilovi)}
      >
        Treća stranica
      </NavLink>
    </>
  );

  const dijeloviLoginNavigacije = (
    <>
      <NavLink to="/login" className={stilovi}>
        {text("login")}
      </NavLink>
      <NavLink to="/registration" className={aktivniStilovi}>
        {text("signup")}
      </NavLink>
    </>
  );

  const toggleMenuHandler = () => {
    setMenuOpen((prevState) => !prevState);
  };

  return (
    <div className="flex-row">
      <nav className="relative container mx-auto p-6 text-xl">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-20">
            <img src={logo} alt="" className="h-10" />
            <div className="hidden items-center space-x-8 font-bold lg:flex">
              {dioNavigacije}
            </div>
          </div>

          <div className="hidden items-center space-x-6 lg:flex">
            {dijeloviLoginNavigacije}
          </div>

          <button
            id="menu-btn"
            className={(menuOpen ? "open " : "") + "flex flex-col items-center hamburger lg:hidden focus:outline-none h-7"}
            type="button"
            onClick={toggleMenuHandler}
          >
            <span className="hamburger-top"></span>
            <span className="hamburger-middle"></span>
            <span className="hamburger-bottom"></span>
          </button>
        </div>

        {menuOpen && (
          <div id="menu" className="flex p-6 mt-8 rounded-tl-[120px] rounded-br-[80px] rounded-tr-[40px] rounded-bl-[60px] bg-darkViolet">
            <div className="flex flex-col items-center justify-center w-full space-y-6 font-bold text-white rounded-sm">
              {dioNavigacije}
              {dijeloviLoginNavigacije}
            </div>
          </div>
        )}
      </nav>

      <div className="flex justify-between pr-4">
        <div className="md:px-12 lg:px-16 xl:px-20 w-full">
          <LanguageComponent />
        </div>
      </div>

    </div>
  );
}

export default MainNavigation;
