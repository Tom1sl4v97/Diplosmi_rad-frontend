import { useTranslation } from "react-i18next";
import {
  useLocalStorage,
  defaultPageSettings,
  useSessionStorage,
  defaultSession,
} from "../../hooks/SessionStorage";

import SubmitButton from "../loginPage/SubmitButton";
import AdminDropDown from "./AdminDropDown";
import { useState } from "react";

const serverUrl = process.env.REACT_APP_SERVER_URL;

function AdminForm() {
  const { t: text } = useTranslation();
  const [pageSettings, setPageSettings] = useLocalStorage(
    "pageSettings",
    defaultPageSettings
  );

  const [error, setError] = useState(null);
  const [userData, setUserData] = useSessionStorage("userData", defaultSession);
  const [allContentDisplay, setAllContentDisplay] = useState(
    pageSettings.allContentPageSkip
  );
  const [mostPopularDisplay, setMostPopularDisplay] = useState(
    pageSettings.mostPopularPageSkip
  );
  const [bestScoredDisplay, setBestScoredDisplay] = useState(
    pageSettings.bestScoredPageSkip
  );
  const [searchComponentDisplay, setSearchComponentDisplay] = useState(
    pageSettings.searchComponentPageSkip
  );
  const [userReccomendationDisplay, setUserReccomendationDisplay] = useState(
    pageSettings.userReccomendationPageSkip
  );
  const [shopAppDisplay, setShopAppDisplay] = useState(
    pageSettings.shopAppPaginationSkip
  );

  const allContentSubmitHandler = (number) => {
    setAllContentDisplay(number);
  };

  const mostPopularSubmitHandler = (number) => {
    setMostPopularDisplay(number);
  };

  const bestScoredSubmitHandler = (number) => {
    setBestScoredDisplay(number);
  };

  const searchComponentSubmitHandler = (number) => {
    setSearchComponentDisplay(number);
  };

  const userReccomendationSubmitHandler = (number) => {
    setUserReccomendationDisplay(number);
  };

  const shopAppSubmitHandler = (number) => {
    setShopAppDisplay(number);
  };

  const submitHandler = async () => {
    const url = `${serverUrl}/pageSettings`;

    const body = {
      allContentPageSkip: allContentDisplay,
      mostPopularPageSkip: mostPopularDisplay,
      bestScoredPageSkip: bestScoredDisplay,
      searchComponentPageSkip: searchComponentDisplay,
      userReccomendationPageSkip: userReccomendationDisplay,
      shopAppPaginationSkip: shopAppDisplay,
    };

    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userData.tokenKey}`,
        },
        body: JSON.stringify(body),
      });

      if (response.status) {
        setPageSettings({
          allContentPageSkip: allContentDisplay,
          mostPopularPageSkip: mostPopularDisplay,
          bestScoredPageSkip: bestScoredDisplay,
          searchComponentPageSkip: searchComponentDisplay,
          userReccomendationPageSkip: userReccomendationDisplay,
          shopAppPaginationSkip: shopAppDisplay,
          defaultPageSettings: false,
        });
        window.location.reload();
      } else {
        const data = await response.json();
        setError(data.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="w-full flex justify-center">
      <form className="w-[1000px]">
        {error !== null && (
          <div className="text-red-500 text-center">{error}</div>
        )}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <AdminDropDown
            text={text("pageSettingsAllContentDisplay")}
            defaultValue={allContentDisplay}
            changeHandler={allContentSubmitHandler}
          />

          <AdminDropDown
            text={text("pageSettingsMostPopularPostsDisplay")}
            defaultValue={mostPopularDisplay}
            changeHandler={mostPopularSubmitHandler}
          />

          <AdminDropDown
            text={text("pageSettingsBestScorePostsDisplay")}
            defaultValue={bestScoredDisplay}
            changeHandler={bestScoredSubmitHandler}
          />

          <AdminDropDown
            text={text("pageSettingsSearchComponentDisplay")}
            defaultValue={searchComponentDisplay}
            changeHandler={searchComponentSubmitHandler}
          />

          <AdminDropDown
            text={text("pageSettingsUserRecommendationsDisplay")}
            defaultValue={userReccomendationDisplay}
            changeHandler={userReccomendationSubmitHandler}
          />

          <AdminDropDown
            text={text("pageSettingsShopAppDisplay")}
            defaultValue={shopAppDisplay}
            changeHandler={shopAppSubmitHandler}
          />
        </div>

        <SubmitButton
          text={text("saveSettings")}
          value="save"
          onClick={submitHandler}
          color="black"
        />

        <br />
        <br />
        <br />
      </form>
    </div>
  );
}

export default AdminForm;
