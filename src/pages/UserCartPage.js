import { useTranslation } from "react-i18next";

import Hero from "../components/userSerttingPage/Hero";
import CartList from "../components/userShoppingCart/CartList";

function UserCartPage() {
  const { t: text } = useTranslation();

  return (
    <>
      <Hero text={text("shopPageYourCartCSS")} />
      <CartList />
    </>
  );
}

export default UserCartPage;
