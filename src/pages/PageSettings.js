import { useTranslation } from "react-i18next";

import Hero from "../components/userSerttingPage/Hero";
import AdminForm from "../components/userSerttingPage/AdminForm";
import NewModerator from "../components/userSerttingPage/NewModerator";
import ShopOrders from "../components/userSerttingPage/ShopOrders";

function PageSettings() {
  const { t: text } = useTranslation();

  return (
    <div>
      <Hero text={text("pagesSettings")} />
      <AdminForm />
      <NewModerator />
      <ShopOrders />
    </div>
  );
}

export default PageSettings;
