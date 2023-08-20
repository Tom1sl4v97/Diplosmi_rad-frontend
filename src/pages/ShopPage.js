import {
  useFetchCategories,
  useFetchProductFromCommerceTools,
  useFetchProductGetAccessToken,
} from "../hooks/fetchProductCommTol";

import LoadingCom from "../components/pomocno/LoadingCom";
import ShopContent from "../components/shopPage/ShopContent";
import ShopTitle from "../components/shopPage/ShopTitle";

const commercetoolsAuthClientId = process.env.REACT_APP_COMMERCETOOLS_CLIENT_ID;
const commercetoolsAuthClientSecret =
  process.env.REACT_APP_COMMERCETOOLS_SECRET;

function ShopPage() {
  const accessToken = useFetchProductGetAccessToken(commercetoolsAuthClientId, commercetoolsAuthClientSecret);
  const { products, loading: productLoading } =
    useFetchProductFromCommerceTools(accessToken);
  const { categories } = useFetchCategories(accessToken);

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
