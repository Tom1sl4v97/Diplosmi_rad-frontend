import { NavLink } from "react-router-dom";
import { set } from "date-fns";
import { useState } from "react";

import logo from "../../assets/images/logo.png";

function MainNavigation() {
  const [menuOpen, setMenuOpen] = useState(false);

  const stilovi =
    "font-bold text-grayishViolet hover:text-veryDarkViolet no-underline";
  const aktivniStilovi =
    "px-8 py-3 font-bold text-white bg-cyan rounded-full hover:opacity-70 no-underline";

  const dioNavigacije = (
    <>
      <NavLink
        to="/"
        className={({ isActive }) => (isActive ? aktivniStilovi : stilovi)}
      >
        HomePage
      </NavLink>
      <NavLink
        to="/drugaStranica"
        className={({ isActive }) => (isActive ? aktivniStilovi : stilovi)}
      >
        About
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
        Login
      </NavLink>
      <NavLink to="/register" className={aktivniStilovi}>
        Sign Up
      </NavLink>
    </>
  );

  const toggleMenuHandler = () => {
    setMenuOpen((prevState) => !prevState);
  };

  return (
    <nav className="relative container mx-auto p-6 text-2xl">
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
        <div id="menu" className="flex p-6 mt-8 rounded-full bg-darkViolet">
          <div className="flex flex-col items-center justify-center w-full space-y-6 font-bold text-white rounded-sm">
            {dioNavigacije}
            {dijeloviLoginNavigacije}
          </div>
        </div>
      )}
    </nav>
  );
}

export default MainNavigation;