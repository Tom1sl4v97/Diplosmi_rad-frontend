import { useState } from "react";
import { useTranslation } from "react-i18next";

import StarRating from "../detailPage/StarRating";

function AddNreProductReview(props) {
  const { submitReviewHandler } = props;
  const { t: text } = useTranslation();
  const [error, setError] = useState(null);

  const [title, setTitle] = useState("");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const titleHandler = (event) => {
    setTitle(event.target.value);
  };

  const ratingHandler = (ratingStar) => {
    setRating(ratingStar);
  };

  const commentHandler = (event) => {
    setComment(event.target.value);
  };

  const submitHandler = () => {
    if (
      title.trim().length === 0 &&
      rating === 0 &&
      comment.trim().length === 0
    ) {
      setError(
        text("shopDetailProductReviewProductReviewsPleaseFillAtLeastOneField")
      );
    } else {
      const userReview = {
        title: title,
        text: comment,
        rating: rating,
      };

      submitReviewHandler(userReview);
      setError(null);
    }
  };

  return (
    <>
      <form className="mb-6">
        <div className="py-2 px-4 mb-4 bg-white rounded-lg border-1 border-cyan">
          <label htmlFor="title" className="sr-only">
            {text("shopDetailProductReviewProductReviewsWriteReviewTitle")}
          </label>
          <input
            id="title"
            className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none "
            placeholder={text(
              "shopDetailProductReviewProductReviewsWriteReviewTitle"
            )}
            required
            onChange={titleHandler}
          ></input>
        </div>

        <StarRating
          ratingText={text("shopDetailProductReviewProductReviewsRateProduct")}
          selectedStars={rating}
          onRateHandler={ratingHandler}
        />

        <div className="py-2 px-4 mb-4 bg-white rounded-lg border-1 border-cyan">
          <label htmlFor="comment" className="sr-only">
            {text("shopDetailProductReviewProductReviewsWriteReview")}
          </label>
          <textarea
            id="comment"
            rows="6"
            className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none "
            placeholder={text("shopDetailProductReviewProductReviewsWriteReview")}
            required
            onChange={commentHandler}
          ></textarea>
        </div>
        {error !== null && <p className="text-red mb-2">{error}</p>}
        <button
          type="button"
          onClick={submitHandler}
          className="inline-flex items-center py-2.5 px-4 text-lg font-medium text-center text-white bg-cyan rounded-lg hover:bg-cyanDark"
        >
          {text("shopDetailProductReviewProductReviewsPostReview")}
        </button>
      </form>
    </>
  );
}

export default AddNreProductReview;
