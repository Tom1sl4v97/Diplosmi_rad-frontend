import { useState } from "react";
import HomePageTitle from "../components/homepage/Title";
import HomePagePrvaSlika from "../components/homepage/PrvaSlika";
import LoadingCom from "../components/pomocno/LoadingCom";
import FullContent from "../components/homepage/FullContent";
import { useFetchContent } from "../hooks/fetchContent";

const skipPage = 6;

function HomePage(props) {
  const {
    loadingData: firstLoading,
    data: firstData,
    totalCount,
    error,
  } = useFetchContent(null, 1, 0);

  if (error !== null) {
    console.log("Error on home page: ", error);
  }

  const [currentPage, setCurrentPage] = useState(1);
  const { loadingData, data } = useFetchContent(
    null,
    skipPage,
    currentPage * skipPage - skipPage + 1
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
            <FullContent
              contentData={data}
              nextPage={nextPage}
              prevPage={prevPage}
              currentPage={currentPage}
              totalCount={totalCount - 1}
              skipPage={skipPage}
              goToPage={goToPage}
            />
          )}
        </>
      )}
    </>
  );
}

export default HomePage;
