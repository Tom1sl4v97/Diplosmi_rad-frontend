import { useTranslation } from "react-i18next";
import {
  useCreateProductReview,
  useFetchProductGetAccessToken,
} from "../../hooks/fetchProductCommTol";
import { useEffect, useState } from "react";

import AddNewProductReview from "./AddNewProductReview";
import ProductComment from "./ProductComment";

const reviewClientId = process.env.REACT_APP_COMMERCETOOLS_REVIEW_CLIENT_ID;
const reviewClientSecret = process.env.REACT_APP_COMMERCETOOLS_REVIEW_SECRET;

function ProductReviews(props) {
  const { t: text } = useTranslation();
  const { reviews, userDataSession, productId, variantId } = props;
  const [userReview, setUserReview] = useState(null);
  const accessToken = useFetchProductGetAccessToken(
    reviewClientId,
    reviewClientSecret
  );
  const { loading, error, success } = useCreateProductReview(
    accessToken,
    productId,
    variantId,
    userReview
  );

  const submitReviewHandler = (userReview) => {
    const userUsername = userDataSession.user.email;
    userReview.authorName = userUsername;
    setUserReview(userReview);
  };

  useEffect(() => {
    if (success && !loading) {
      window.location.reload();
    }
  }, [success]);

  return (
    <>
      {userDataSession.role !== "un-register" && (
        <>
          <h2 className="text-sm title-font text-gray-500 tracking-widest uppercase mt-10 mb-3">
            {text("shopDetailProductReviewProductReviewsAdd")}
          </h2>

          <AddNewProductReview submitReviewHandler={submitReviewHandler} />
        </>
      )}
      <h2 className="text-sm title-font text-gray-500 tracking-widest uppercase mt-10 mb-2">
        {text("shopDetailProductReviewProductReviews")}
      </h2>

      {reviews.length > 0 ? (
        reviews.map((review) => (
          <ProductComment
            key={review.id}
            comment={review}
            userDataSession={userDataSession}
          />
        ))
      ) : (
        <p className="text-gray-500 w-full text-center uppercase py-4 tracking-widest">
          {text("shopDetailProductReviewProductReviewsEmpty")}
        </p>
      )}
    </>
  );
}

export default ProductReviews;
