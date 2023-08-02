import { useTranslation } from "react-i18next";

import Hero from "../components/userSerttingPage/Hero";
import ShoppingHistory from "../components/userShoppingHistory/ShoppingHistory";

function UserShoppingHistory(){
    const { t: text } = useTranslation();
    return (
        <>
            <Hero text={text("userShoppingHistory")}/>
            <ShoppingHistory/>
        </>
    )
}

export default UserShoppingHistory;