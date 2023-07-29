import { useState } from "react";
import { useFetchContent, useFetchFirstContent } from "../hooks/fetchContent";

import HomePageTitle from "../components/homepage/Title";
import HomePagePrvaSlika from "../components/homepage/PrvaSlika";
import LoadingCom from "../components/pomocno/LoadingCom";
import FullContent from "../components/homepage/FullContent";
import SelectCategorys from "../components/homepage/SelectCategorys";
import MostPopularPosts from "../components/mostPopularPosts/MostPopularPosts";

const skipPage = 6;

function HomePage(props) {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const {
    loadingData: firstLoading,
    data: firstData,
  } = useFetchFirstContent();

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
              <SelectCategorys handleCategoryChange={handleCategoryChange} />

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

          <MostPopularPosts />
        </>
      )}
    </>
  );
}

export default HomePage;
