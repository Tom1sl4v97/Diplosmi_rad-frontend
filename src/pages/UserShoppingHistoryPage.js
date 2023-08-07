import { useTranslation } from "react-i18next";

import Hero from "../components/userSerttingPage/Hero";
import ShoppingHistory from "../components/userShoppingHistory/ShoppingHistory";

function UserShoppingHistoryPage(){
    const { t: text } = useTranslation();
    return (
        <>
            <Hero text={text("userShoppingHistoryCSS")}/>
            <ShoppingHistory/>
        </>
    )
}

export default UserShoppingHistoryPage;