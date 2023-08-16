import { useTranslation } from "react-i18next";

import Hero from "../components/userSerttingPage/Hero";
import UserData from "../components/userSerttingPage/UserData";

function UserSettingPage() {
  const { t: text } = useTranslation();
  return (
    <div>
      <Hero text={text("usersSettings")}/>
      <UserData />
    </div>
  );
}

export default UserSettingPage;
