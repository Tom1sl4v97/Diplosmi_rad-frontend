import { useState } from "react";
import { useFetchContent, useFetchFirstContent } from "../hooks/fetchContent";
import { useTranslation } from "react-i18next";

import HomePageTitle from "../components/homepage/Title";
import HomePagePrvaSlika from "../components/homepage/PrvaSlika";
import LoadingCom from "../components/pomocno/LoadingCom";
import FullContent from "../components/homepage/FullContent";
import SelectCategorys from "../components/homepage/SelectCategorys";
import MostPopularPosts from "../components/mostPopularPosts/MostPopularPosts";

const skipPage = 6;

function HomePage(props) {
  const { t: text } = useTranslation();
  const [selectedCategories, setSelectedCategories] = useState([]);
  const { loadingData: firstLoading, data: firstData } = useFetchFirstContent();

  const [currentPage, setCurrentPage] = useState(1);
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
              <div className="flex flex-row justify-between w-[80%] m-auto">
                <div className="flex flex-col h-12 justify-center items-center">
                  <h1 className="text-3xl font-bold font-sans w-64">
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
        </>
      )}
    </>
  );
}

export default HomePage;
