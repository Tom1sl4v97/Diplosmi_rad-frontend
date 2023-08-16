import { useTranslation } from "react-i18next";
import {
  useFetchCategories,
  useFetchProductFromCommerceTools,
  useFetchProductGetAccessToken,
} from "../hooks/fetchProductCommTol";
import { useSessionStorage } from "../hooks/SessionStorage";

import LoadingCom from "../components/pomocno/LoadingCom";
import ShopContent from "../components/shopPage/ShopContent";
import ShopTitle from "../components/shopPage/ShopTitle";

function ShopPage() {
  const { t: text } = useTranslation();

  const accessToken = useFetchProductGetAccessToken();
  const {
    products,
    loading: productLoading,
    expired,
  } = useFetchProductFromCommerceTools(accessToken);
  const { categories, loading: categoriesLoader } =
    useFetchCategories(accessToken);
  const [commercetoolsStorage] = useSessionStorage("commercetoolsStorage", {
    accessToken: null,
  });

  return (
    <div>
      <ShopTitle />
      {productLoading ? (
        <LoadingCom />
      ) : (
        <ShopContent productList={products} categories={categories} />
      )}
    </div>
  );
}

export default ShopPage;
