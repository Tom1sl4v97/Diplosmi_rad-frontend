import { useTranslation } from "react-i18next";
import StarRating from "../detailPage/StarRating";
import {
  useRemoveReview,
  useFetchProductGetAccessToken,
} from "../../hooks/fetchProductCommTol";
import { useEffect } from "react";

const reviewClientId = process.env.REACT_APP_COMMERCETOOLS_REVIEW_CLIENT_ID;
const reviewClientSecret = process.env.REACT_APP_COMMERCETOOLS_REVIEW_SECRET;

function ProductComment(props) {
  const { t: text } = useTranslation();
  const { comment, userDataSession } = props;

  const accessToken = useFetchProductGetAccessToken(
    reviewClientId,
    reviewClientSecret
  );
  const { removeReviewHandler, error, success } = useRemoveReview(
    accessToken,
    comment.id,
    comment.version
  );

  const date = new Date(comment.createdAt);
  const month = date.toLocaleString("default", { month: "short" });
  const day = date.getDate();
  const year = date.getFullYear();
  const formattedDate = `${month} ${day}, ${year}`;

  const removeProductReviewHandler = async () => {
    removeReviewHandler();
  };

  useEffect(() => {
    if (success) {
      window.location.reload();
    }
  }, [success]);

  return (
    <>
      <article className="p-6 mb-6 text-base bg-white rounded-lg dark:bg-gray-900">
        <footer className="flex justify-between items-center mb-2">
          <div className="flex flex-row justify-between w-full items-center">
            <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
              {comment.authorName}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <time
                pubdate="pubdate"
                dateTime="2022-02-08"
                title="February 8th, 2022"
              >
                {formattedDate}
              </time>
            </p>
          </div>
          {userDataSession.user.email === comment.authorName && (
            <button
              id="dropdownComment1Button"
              onClick={removeProductReviewHandler}
              className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-400 bg-white hover:text-red"
              type="button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                className="bi bi-trash"
                viewBox="0 0 16 16"
              >
                {" "}
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />{" "}
                <path
                  fillRule="evenodd"
                  d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                />{" "}
              </svg>

              <p className="uppercase">
                {text("shopDetailProductReviewRemoveReview")}
              </p>
            </button>
          )}
        </footer>

        {comment.title !== "" && (
          <h3 className="text-md text-gray-500 mb-2">
            <b>{comment.title}</b>
          </h3>
        )}
        {comment.text !== "" && (
          <p className="text-gray-500 mb-2">{comment.text}</p>
        )}

        {comment.rating !== 0 && (
          <StarRating
            ratingText={text("detailPageCommentsEvaluation")}
            selectedStars={comment.rating}
            onRateHandler={() => {}}
          />
        )}
      </article>
    </>
  );
}

export default ProductComment;
