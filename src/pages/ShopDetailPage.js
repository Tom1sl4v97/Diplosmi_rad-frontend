import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import ProductDetails from "../components/shopDetailPage/ProductDetails";

function ShopDetailPage() {
  const navigate = useNavigate();
  const productDetail = useSelector((state) => state.productDetail);

  const canBeDisplayed = productDetail.isProductSet;

  useEffect(() => {
    if (!canBeDisplayed) {
      navigate("/shop", { replace: true });
    }
  }, [productDetail, navigate, canBeDisplayed]);

  return (
    <div>
      {canBeDisplayed && <ProductDetails productDetail={productDetail} />}
    </div>
  );
}

export default ShopDetailPage;
