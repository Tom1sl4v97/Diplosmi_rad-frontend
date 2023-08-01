import { useParams } from "react-router-dom";
import { useFetchContentBySearch } from "../hooks/fetchContent";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocalStorage, defaultPageSettings } from "../hooks/SessionStorage";

import LoadingCom from "../components/pomocno/LoadingCom";
import FullContent from "../components/homepage/FullContent";
import noContentGifUrl from "../assets/images/no_content.gif";

function SearchedContentPage() {
  const { t: text } = useTranslation();
  const { searchedContent } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSettings, setPageSettings] = useLocalStorage(
    "pageSettings",
    defaultPageSettings
  );

  const skipPage = parseInt(pageSettings.searchComponentPageSkip);

  const { loadingData, data, totalCount } = useFetchContentBySearch(
    searchedContent,
    skipPage,
    currentPage * skipPage - skipPage
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
    <div>
      {loadingData ? (
        <LoadingCom />
      ) : (
        <>
          {data.length === 0 ? (
            <div className="flex flex-col justify-center items-center">
              <h2 className="text-2xl text-gray-800 mt-20 mb-8">
                {text("searchArticlesNoContent")}: "{searchedContent}"
              </h2>
              <img src={noContentGifUrl} alt="No content" className="" />
            </div>
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
    </div>
  );
}

export default SearchedContentPage;
