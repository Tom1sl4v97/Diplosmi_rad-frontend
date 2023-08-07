import { useTranslation } from "react-i18next";
import Hero from "../components/userSerttingPage/Hero";

function UserCartPage() {
  const { t: text } = useTranslation();

  return (
    <>
      <Hero text={text("shopPageYourCartCSS")}/>
      <h2>
        <p>Cart Page</p>
      </h2>
    </>
  );
}

export default UserCartPage;
