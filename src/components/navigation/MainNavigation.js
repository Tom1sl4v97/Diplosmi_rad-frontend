import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSessionStorage } from "../../hooks/SessionStorage";
import { auth } from "../../config/Firebase";
import { signOut } from "firebase/auth";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { useSelector } from "react-redux";

import LanguageComponent from "./LanguageComponent";
import logo from "../../assets/images/logo.png";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

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
  const navigate = useNavigate();
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
    console.log("Logout");

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
    //redirect user to homepage
    navigate("/", { replace: true });
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

  const dijeloviUlogiranogKorisnika = (
    <>
      <div className="inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
        {/* Profile dropdown */}
        <Menu as="div" className="relative ml-3">
          <div>
            <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
              <img
                className="h-12 w-12 rounded-full"
                src={userImage}
                alt={user.username}
              />
              <div className="lg:hidden font-bold text-white pl-2 pr-6 py-3 text-lg">
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
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="#"
                    className={classNames(
                      active ? "bg-gray-100" : "",
                      "block px-4 py-2 text-sm text-gray-700"
                    )}
                  >
                    {text("userMenuYourProfile")}
                  </a>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="/userSetting"
                    className={classNames(
                      active ? "bg-gray-100" : "",
                      "block px-4 py-2 text-sm text-gray-700"
                    )}
                  >
                    {text("userMenuSettings")}
                  </a>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="#"
                    onClick={logoutHandler}
                    className={classNames(
                      active ? "bg-gray-100" : "",
                      "block px-4 py-2 text-sm text-gray-700"
                    )}
                  >
                    {text("userMenuLogout")}
                  </a>
                )}
              </Menu.Item>
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
