import { useCallback, useEffect, useState } from "react";
import { useFetchContent, useFetchFirstContent } from "../hooks/fetchContent";
import { useTranslation } from "react-i18next";
import {
  useLocalStorage,
  defaultPageSettings,
  useSessionStorage,
  defaultSession,
} from "../hooks/SessionStorage";

import HomePageTitle from "../components/homepage/Title";
import HomePagePrvaSlika from "../components/homepage/PrvaSlika";
import LoadingCom from "../components/pomocno/LoadingCom";
import FullContent from "../components/homepage/FullContent";
import SelectCategorys from "../components/homepage/SelectCategorys";
import MostPopularPosts from "../components/mostPopularPosts/MostPopularPosts";
import BestScoredPost from "../components/mostPopularPosts/BestScoredPost";
import UserReccomendation from "../components/mostPopularPosts/UserRecommendation";

const serverURL = process.env.REACT_APP_SERVER_URL;

function HomePage(props) {
  const { t: text } = useTranslation();
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSettings, setPageSettings] = useLocalStorage(
    "pageSettings",
    defaultPageSettings
  );

  const [userSession, setUserSession] = useSessionStorage(
    "userData",
    defaultSession
  );

  const getPageSettings = useCallback(async () => {
    const response = await fetch(serverURL + "/pageSettings", {
      method: "GET",
    });

    const data = await response.json();

    if (response.ok) {
      setPageSettings({ ...data, defaultPageSettings: false });
    }
  }, [setPageSettings]);

  useEffect(() => {
    if (pageSettings.defaultPageSettings) {
      getPageSettings();
    }
  }, [getPageSettings, pageSettings]);

  const skipPage = pageSettings.allContentPageSkip;

  const { loadingData: firstLoading, data: firstData } = useFetchFirstContent();
  const { loadingData, data, totalCount } = useFetchContent(
    skipPage,
    currentPage * skipPage -
      skipPage +
      (selectedCategories.length === 0 ? 1 : 0),
    selectedCategories
  );

  const nextPage = () => {
    if (currentPage * skipPage < totalCount) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  const handleCategoryChange = (categoryList) => {
    setSelectedCategories(categoryList);
    setCurrentPage(1);
  };

  return (
    <>
      <HomePageTitle />
      {firstLoading ? (
        <LoadingCom />
      ) : (
        <>
          <HomePagePrvaSlika najnovijiPost={firstData[0]} />
          {loadingData ? (
            <LoadingCom />
          ) : (
            <>
              <div className="flex flex-col md:flex-row md:justify-between w-[80%] m-auto">
                <div className="flex flex-col h-12 justify-center items-center">
                  <h1 className="text-3xl font-bold font-sans w-64 mb-8 md:mb-0">
                    {text("homePageAllPosts")}
                  </h1>
                </div>
                <SelectCategorys handleCategoryChange={handleCategoryChange} />
              </div>

              <FullContent
                contentData={data}
                nextPage={nextPage}
                prevPage={prevPage}
                currentPage={currentPage}
                totalCount={totalCount - 1}
                skipPage={skipPage}
                goToPage={goToPage}
              />
            </>
          )}
          <h1 className="text-3xl font-bold font-sans w-[80%] m-auto">
            {text("homePageMostPopularPosts")}
          </h1>
          <MostPopularPosts />

          <h1 className="text-3xl font-bold font-sans w-[80%] m-auto">
            {text("homePageBestScorePost")}
          </h1>

          <BestScoredPost />

          {userSession.role !== "un-register" && (
            <>
              <UserReccomendation />
            </>
          )}
        </>
      )}
    </>
  );
}

export default HomePage;
