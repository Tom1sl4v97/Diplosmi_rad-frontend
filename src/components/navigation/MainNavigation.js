import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSessionStorage } from "../../hooks/SessionStorage";
import { auth } from "../../config/Firebase";
import { signOut } from "firebase/auth";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { useSelector } from "react-redux";

import LanguageComponent from "./LanguageComponent";
import logo from "../../assets/images/logo.png";

function MainNavigation() {
  const [userData, setUserData] = useSessionStorage("userData", {
    role: "un-register",
    user: {
      username: null,
      email: null,
      image: null,
    },
    tokenKey: null,
  });
  const sessionData = useSelector((state) => state.auth);

  const [menuOpen, setMenuOpen] = useState(false);
  const { t: text } = useTranslation();
  const isActive = userData.role !== "un-register";
  const user = userData.user;
  const userImage =
    user.image !== null
      ? user.image
      : "https://img.icons8.com/?size=512&id=118243&format=png";

  if (sessionData.isAuthenticated) {
    window.location.reload();
  }

  const logoutHandler = async () => {
    setUserData({
      role: "un-register",
      user: {
        username: null,
        email: null,
        image: null,
      },
      tokenKey: null,
    });

    try {
      await signOut(auth);
    } catch (err) {
      console.error(err);
    }
  };

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
        to="/AboutPage"
        className={({ isActive }) => (isActive ? aktivniStilovi : stilovi)}
      >
        {text("about")}
      </NavLink>
      <NavLink
        to="/shop"
        className={({ isActive }) => (isActive ? aktivniStilovi : stilovi)}
      >
        {text("shopPage")}
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

  const dijeloviUlogiranogKorisnika = (
    <>
      <div className="flex items-center pr-2 sm:static sm:inset-auto">
        <Menu as="div" className="relative">
          <div>
            <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
              <img
                className="h-12 w-12 rounded-full hidden lg:block"
                src={userImage}
                alt={user.username}
              />
              <div className="lg:hidden font-bold text-white text-lg py-2 px-4">
                {text("userMenuOpenProfile")}
              </div>
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="px-4 py-3">
                <span className="block text-sm text-gray-900">
                  {user.username}
                </span>
                <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">
                  {user.email}
                </span>
              </div>
              <NavLink
                to="/shop/userCart"
                className="hover:bg-gray-100 block px-4 py-2 text-sm text-gray-700"
              >
                {text("shopPageYourCart")}
              </NavLink>
              <NavLink
                to="/shop/userShoppingHistory"
                className="hover:bg-gray-100 block px-4 py-2 text-sm text-gray-700"
              >
                {text("userShoppingHistory")}
              </NavLink>
              <NavLink
                to="/userSetting"
                className="hover:bg-gray-100 block px-4 py-2 text-sm text-gray-700"
              >
                {text("userMenuYourProfile")}
              </NavLink>
              {userData.role === "admin" && (
                <NavLink
                  to="/pageSettings"
                  className="hover:bg-gray-100 block px-4 py-2 text-sm text-gray-700"
                >
                  {text("userMenuSettings")}
                </NavLink>
              )}
              {userData.role === "moderator" && (
                <NavLink
                  to="/modStatistics"
                  className="hover:bg-gray-100 block px-4 py-2 text-sm text-gray-700"
                >
                  {text("userMenuModStatistics")}
                </NavLink>
              )}
              <a
                href="/"
                onClick={logoutHandler}
                className="hover:bg-gray-100 block px-4 py-2 text-sm text-gray-700 w-full"
              >
                {text("userMenuLogout")}
              </a>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </>
  );

  const toggleMenuHandler = () => {
    setMenuOpen((prevState) => !prevState);
  };

  return (
    <div className="flex-row print:hidden">
      <nav className="relative container mx-auto p-6 text-xl ">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-20">
            <img src={logo} alt="" className="h-10" />
            <div className="hidden items-center space-x-8 font-bold lg:flex">
              {dioNavigacije}
            </div>
          </div>

          <div className="hidden items-center space-x-6 lg:flex">
            {isActive ? dijeloviUlogiranogKorisnika : dijeloviLoginNavigacije}
          </div>

          <button
            id="menu-btn"
            className={
              (menuOpen ? "open " : "") +
              "flex flex-col items-center hamburger lg:hidden focus:outline-none h-7"
            }
            type="button"
            onClick={toggleMenuHandler}
          >
            <span className="hamburger-top"></span>
            <span className="hamburger-middle"></span>
            <span className="hamburger-bottom"></span>
          </button>
        </div>

        {menuOpen && (
          <div
            id="menu"
            className="flex p-6 mt-8 rounded-tl-[120px] rounded-br-[80px] rounded-tr-[40px] rounded-bl-[60px] bg-darkViolet"
          >
            <div className="flex flex-col items-center justify-center w-full space-y-6 font-bold text-white rounded-sm">
              {dioNavigacije}
              {!isActive && dijeloviLoginNavigacije}
              {isActive && dijeloviUlogiranogKorisnika}
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
