import StarRating from "./StarRating";
import { useTranslation } from "react-i18next";

const serverURL = process.env.REACT_APP_SERVER_URL;

function CommentContent(props) {
  const { comment, canDelete, userSession } = props;
  const { t: text } = useTranslation();

  const removeCommentHandler = async () => {
    const url = serverURL + "/pageCommentsUpload?postCommentId=" + comment.postCommentId;

    const headers = new Headers();
    headers.append("Authorization", "Bearer " + userSession.tokenKey);
    headers.append("Content-Type", "application/json");

    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers: headers,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

        window.location.reload();
    }catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <article className="p-6 mb-6 text-base bg-white rounded-lg dark:bg-gray-900">
        <footer className="flex justify-between items-center mb-2">
          <div className="flex items-center">
            <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
              {comment.userName}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <time
                pubdate="pubdate"
                dateTime="2022-02-08"
                title="February 8th, 2022"
              >
                {comment.postedDate}
              </time>
            </p>
          </div>
          {canDelete && (
            <button
              id="dropdownComment1Button"
              onClick={removeCommentHandler}
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
                {text("detailPageCommentsRemoveComment")}
              </p>
            </button>
          )}
        </footer>

        <p className="text-gray-500 mb-2">{comment.comment}</p>

        <StarRating
          ratingText={text("detailPageCommentsEvaluation")}
          selectedStars={comment.rating}
          onRateHandler={() => {}}
        />
      </article>
    </>
  );
}

export default CommentContent;
