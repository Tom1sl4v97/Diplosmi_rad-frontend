import { useState } from "react";
import { useFetchContentByUserRecomendation } from "../../hooks/fetchContent";
import {
  useLocalStorage,
  defaultPageSettings,
  defaultSession,
  useSessionStorage,
} from "../../hooks/SessionStorage";
import { useTranslation } from "react-i18next";

import FullContent from "../homepage/FullContent";
import LoadingCom from "../pomocno/LoadingCom";

function UserReccomendation() {
  const { t: text } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSettings, setPageSettings] = useLocalStorage(
    "pageSettings",
    defaultPageSettings
  );

  const [userSession, setUserSession] = useSessionStorage(
    "userData",
    defaultSession
  );

  const skipPage = parseInt(pageSettings.userReccomendationPageSkip);

  const { loadingData, data, totalCount } = useFetchContentByUserRecomendation(
    userSession.user.email,
    skipPage,
    currentPage * skipPage - skipPage,
    userSession.tokenKey
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
        data.length > 0 && (
          <>
            <h1 className="text-3xl font-bold font-sans w-[80%] m-auto">
              {text("homePageUserRecommendations")}
            </h1>
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
        )
      )}
    </>
  );
}

export default UserReccomendation;
