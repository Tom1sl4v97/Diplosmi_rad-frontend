import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  defaultSession,
  useLocalStorage,
  useSessionStorage,
} from "../../hooks/SessionStorage";
import {
  useFetchProductGetAccessToken,
  useFetchProductReviews,
} from "../../hooks/fetchProductCommTol";

import ImageGallery from "./ImageGallery";
import ProductReviews from "./ProductReviews";
import LoadingCom from "../../components/pomocno/LoadingCom";
import StarRating from "../detailPage/StarRating";

const commercetoolsAuthClientId = process.env.REACT_APP_COMMERCETOOLS_CLIENT_ID;
const commercetoolsAuthClientSecret =
  process.env.REACT_APP_COMMERCETOOLS_SECRET;

function ProductDetails(props) {
  const { t: text } = useTranslation();
  const { productDetail } = props;
  const [wrongNumber, setWrongNumber] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [activeStyleVariant, setActiveStyleVariant] = useState(0);
  const [userCart, setUserCart] = useLocalStorage("userCart", []);
  const [userDataSession] = useSessionStorage("userData", defaultSession);
  const [productData, setProductData] = useState(productDetail.productData);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 975);
  const [totalRating, setTotalRating] = useState(0);

  const accessTokenCT = useFetchProductGetAccessToken(
    commercetoolsAuthClientId,
    commercetoolsAuthClientSecret
  );
  const { reviews, loading: reviewLoading } = useFetchProductReviews(
    accessTokenCT,
    productDetail.productData.id
  );

  useEffect(() => {
    if (reviews.length > 0) {
      var totalRatingCalc = 0;
      for (var i = 0; i < reviews.length; i++) {
        totalRatingCalc += reviews[i].rating;
      }
      setTotalRating(Math.round(totalRatingCalc / reviews.length));
    }
  }, [reviews]);

  const changeVarientsHandler = (index) => {
    return () => {
      setActiveStyleVariant(index);
      setProductData(productDetail.productData.varients[index - 1]);
    };
  };

  const changeVarientsToMainHandler = () => {
    setActiveStyleVariant(0);
    setProductData(productDetail.productData);
  };

  const buyButtonHendler = () => {
    if (quantity > productData.quantity || quantity < 1) {
      setWrongNumber(true);
      return;
    }
    setUserCart((prev) => {
      var itemForCart = JSON.parse(JSON.stringify(productData));
      var itemInCart = false;
      if (prev.length > 0) {
        for (var i = 0; i < prev.length; i++) {
          if (
            prev[i].id === itemForCart.id &&
            prev[i].variantId === itemForCart.variantId
          ) {
            if (
              prev[i].quantityInCart + parseInt(quantity) >
              prev[i].quantity
            ) {
              alert(text("shopDetailPageNotEnoughPieces"));
              return [...prev];
            }
            itemInCart = true;
            prev[i].quantityInCart += parseInt(quantity);
            break;
          }
        }
      }

      if (!itemInCart) {
        itemForCart.quantityInCart = parseInt(quantity);
        prev.push(itemForCart);
      }

      alert(text("shopPageAddedToCart"));
      return [...prev];
    });
  };

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 975);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  var quantityCSS = "text-md ";

  if (wrongNumber) quantityCSS += "text-rose-700";
  else quantityCSS += "text-gray-500";

  const getVarientsButtonCSS = (index) => {
    if (index === activeStyleVariant) {
      return "text-cyanDark font-bold text-xl border-b-2 border-cyanDark";
    } else {
      return "text-gray-500 font-bold text-xl";
    }
  };

  return (
    <>
      <section className="text-gray-700">
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-full mx-auto flex flex-col lg:flex-row">
            <div className="lg:w-1/2 w-full">
              <div className="h-180 bg-gray-400 rounded-3xl">
                <ImageGallery imageList={productData.otherImages} />
              </div>

              {isLargeScreen &&
                (reviewLoading ? (
                  <LoadingCom />
                ) : (
                  <div className="">
                    <ProductReviews
                      reviews={reviews}
                      userDataSession={userDataSession}
                      productId={productData.id}
                      variantId={productData.variantId}
                    />
                  </div>
                ))}
            </div>
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              {productDetail.productData.varients.length > 0 && (
                <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                  {text("shopDetailPageProductVarients")}
                </h1>
              )}
              {productDetail.productData.varients.length > 0 && (
                <div className="flex flex-row justify-between px-6 py-3 rounded-3xl">
                  <>
                    <button
                      className={getVarientsButtonCSS(0)}
                      onClick={changeVarientsToMainHandler}
                    >
                      {productDetail.productData.name}
                    </button>
                    {productDetail.productData.varients.map(
                      (varient, index) => (
                        <button
                          className={getVarientsButtonCSS(index + 1)}
                          onClick={changeVarientsHandler(index + 1)}
                          key={index}
                        >
                          {varient.name}
                        </button>
                      )
                    )}
                  </>
                </div>
              )}

              <h2 className="text-sm title-font text-gray-500 tracking-widest uppercase mt-3">
                {text("shopDetailPageProductName")}
              </h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                {productData.name}
              </h1>

              <div className="my-4 flex flex-wrap">
                {productData.category.map((categoryName, index) => (
                  <span
                    key={index}
                    className="inline-block rounded-full bg-cyanLight px-3 py-1 text-sm uppercase font-bold text-gray-700 mr-2 mb-2"
                  >
                    {categoryName}
                  </span>
                ))}
              </div>

              {totalRating > 0 && (
                <div className="flex flex-row items-center">
                  <StarRating
                    ratingText={text("detailPageCommentsEvaluation")}
                    selectedStars={totalRating}
                    onRateHandler={() => {}}
                  />
                  <span className="text-gray-600 ml-3 flex flex-col items-center mb-[21px]">
                    {reviews.length} {text("detailPageCommentsReviews")}
                  </span>
                </div>
              )}

              <p className="leading-relaxed">
                {productDetail.productData.description}
              </p>

              <div className="flex flex-row mt-3">
                <div className="flex flex-col mr-10">
                  <span className="text-xl font-bold text-gray-700 mb-2">
                    {productData.price}
                    {productData.currency}
                  </span>
                  <span className="text-md text-black">
                    {text("shopPagePrice")}
                  </span>
                </div>

                <div className="flex flex-col items-center mr-4">
                  <span className="text-xl font-bold text-gray-700 mb-2">
                    {productData.quantity}
                  </span>
                  <span className="text-md text-gray-500">
                    {text("shopPageLeftPieces")}
                  </span>
                </div>
              </div>

              <div className="flex flex-row mt-8">
                <div className="flex flex-col items-center mr-4">
                  <span className="text-xl font-bold text-gray-700 mb-2">
                    <input
                      type="number"
                      max={productData.quantity}
                      min={1}
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      className={"w-20 h-10 text-center rounded-full"}
                    />
                  </span>
                  <span className={quantityCSS}>
                    {wrongNumber
                      ? text("shopDetailPageWrongQuantity")
                      : text("shopDetailPageQuantityToBuy")}
                  </span>
                </div>

                <button
                  type="button"
                  className="h-full md:h-10 lg:h-full xl:h-10 ml-4 mt-2 inline-block rounded-2xl bg-cyanLight px-4 text-xl font-bold uppercase text-gray-700 shadow-2xl transition duration-300 ease-in-out hover:text-white hover:bg-cyanDark"
                  data-te-ripple-init
                  data-te-ripple-color="light"
                  onClick={buyButtonHendler}
                >
                  {text("shopDetailPageAddToCart")}
                </button>
              </div>

              <h2 className="text-md mt-6 mb-3 title-font text-black tracking-widest uppercase">
                {text("shopDetailPageProductDetails")}:
              </h2>

              <div className="relative overflow-x-auto shadow-md rounded-3xl w-full">
                <table className="w-full text-sm text-left text-black table-fixed border-collapse">
                  <thead className="text-base text-white uppercase bg-cyanDark">
                    <tr>
                      <th scope="col" className="px-6 py-3 w-1/3">
                        {text("shopDetailPageDetailName")}
                      </th>
                      <th scope="col" className="px-6 py-3 w-2/3">
                        {text("shopDetailPageDetailValue")}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {productData.richText.map((detail, index) => {
                      var value = "";

                      if (detail.value.label !== undefined) {
                        value = detail.value.label;
                      } else if (detail.value.centAmount !== undefined) {
                        value =
                          (detail.value.centAmount / 100).toFixed(2) + "€";
                      } else if (detail.value === true) {
                        value = text("shopDetailPageDetailValueTrue");
                      } else if (detail.value === false) {
                        value = text("shopDetailPageDetailValueFalse");
                      } else {
                        value = detail.value;
                      }

                      return (
                        <tr key={index} className="hover:bg-gray-200">
                          <td className="px-4 py-3 whitespace-normal">
                            {detail.name}
                          </td>
                          <td className="px-4 py-3 whitespace-normal">
                            {value}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {!isLargeScreen &&
                (reviewLoading ? (
                  <LoadingCom />
                ) : (
                  <ProductReviews
                    reviews={reviews}
                    userDataSession={userDataSession}
                    productId={productData.id}
                    variantId={productData.variantId}
                  />
                ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ProductDetails;
