import { useState } from "react";
import { useFetchContentByMultipleId } from "../../hooks/fetchContent";
import FullContent from "../homepage/FullContent";
import LoadingCom from "../pomocno/LoadingCom";

const skipPage = 3;

function MostPopularPosts() {
  const [currentPage, setCurrentPage] = useState(1);

  const { loadingData, data, totalCount } = useFetchContentByMultipleId(
    skipPage,
    currentPage * skipPage - skipPage
  );

  const nextPage = () => {
    if (totalCount === skipPage) setCurrentPage((prev) => prev + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const goToPage = (page) => {
    if (skipPage === totalCount) setCurrentPage(page);
  };

  return (
    <>
      {loadingData ? (
        <LoadingCom />
      ) : (
        <>
          <FullContent
            contentData={data}
            nextPage={nextPage}
            prevPage={prevPage}
            currentPage={currentPage}
            totalCount={totalCount - 1}
            skipPage={skipPage}
            goToPage={goToPage}
            listing={false}
          />
        </>
      )}
    </>
  );
}

export default MostPopularPosts;
