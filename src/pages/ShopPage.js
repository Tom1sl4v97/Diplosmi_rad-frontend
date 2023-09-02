import {
  useFetchCategories,
  useFetchProductFromCommerceTools,
  useFetchProductGetAccessToken,
} from "../hooks/fetchProductCommTol";

import LoadingCom from "../components/pomocno/LoadingCom";
import ShopContent from "../components/shopPage/ShopContent";
import ShopTitle from "../components/shopPage/ShopTitle";
import { useState } from "react";
import { defaultPageSettings, useLocalStorage } from "../hooks/SessionStorage";

const commercetoolsAuthClientId = process.env.REACT_APP_COMMERCETOOLS_CLIENT_ID;
const commercetoolsAuthClientSecret =
  process.env.REACT_APP_COMMERCETOOLS_SECRET;

function ShopPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSettings, setPageSettings] = useLocalStorage(
    "pageSettings",
    defaultPageSettings
  );
  const skipPage = pageSettings.shopAppPaginationSkip;

  const accessToken = useFetchProductGetAccessToken(
    commercetoolsAuthClientId,
    commercetoolsAuthClientSecret
  );
  const {
    products,
    loading: productLoading,
    totalCount,
  } = useFetchProductFromCommerceTools(
    accessToken,
    skipPage,
    currentPage * skipPage - skipPage
  );
  const { categories } = useFetchCategories(accessToken);

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
      <ShopTitle />
      {productLoading ? (
        <LoadingCom />
      ) : (
        <ShopContent
          productList={products}
          categories={categories}
          nextPage={nextPage}
          prevPage={prevPage}
          goToPage={goToPage}
          currentPage={currentPage}
          totalCount={totalCount}
          skipPage={skipPage}
        />
      )}
    </div>
  );
}

export default ShopPage;
