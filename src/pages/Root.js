import { Outlet } from "react-router-dom";

import MainNavigation from "../components/navigation/MainNavigation";
import classes from "./Root.module.css";
import Footer from "../components/navigation/Footer";

function RootLayout() {
  return (
    <div className={classes["main-container"]}>
      <MainNavigation />
      <Outlet />
      <Footer />
    </div>
  );
}

export default RootLayout;
