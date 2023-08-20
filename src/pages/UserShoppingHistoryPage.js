import { useTranslation } from "react-i18next";
import { defaultSession, useSessionStorage } from "../hooks/SessionStorage";
import { useFetchUserOrdersList } from "../hooks/fetchContent";
import { useState } from "react";

import Hero from "../components/userSerttingPage/Hero";
import ShoppingHistory from "../components/userShoppingHistory/ShoppingHistory";
import LoadingCom from "../components/pomocno/LoadingCom";
import Pagination from "../components/navigation/Pagination";

function UserShoppingHistoryPage() {
  const { t: text } = useTranslation();
  const [userData] = useSessionStorage("userData", defaultSession);
  const [currentPage, setCurrentPage] = useState(1);
  const skipPage = 5;

  const { userOrdersList, loadingData, totalCount } = useFetchUserOrdersList(
    userData.user.email,
    userData.tokenKey,
    currentPage * skipPage - skipPage,
    skipPage
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
      <Hero text={text("userShoppingHistoryCSS")} />
      {loadingData ? (
        <LoadingCom />
      ) : (
        <>
          <ShoppingHistory userOderList={userOrdersList} />

          <Pagination
            prevPage={prevPage}
            nextPage={nextPage}
            currentPage={currentPage}
            totalCount={totalCount}
            skipPage={skipPage}
            goToPage={goToPage}
          />
        </>
      )}
    </>
  );
}

export default UserShoppingHistoryPage;
