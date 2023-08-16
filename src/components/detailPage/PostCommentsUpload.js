import { useTranslation } from "react-i18next";
import { useState } from "react";

import StarRating from "./StarRating";

function PostCommentsUpload(props) {
  const { userSession, postId, categories } = props;
  const [rating, setRating] = useState(0);
  const { t: text } = useTranslation();
  const [error, setError] = useState(null);
  const [comment, setComment] = useState("");
  const serverURL = process.env.REACT_APP_SERVER_URL;

  const ratingHandler = (ratingStar) => {
    setRating(ratingStar);
  };

  const commentHandler = (event) => {
    setComment(event.target.value);
  };

  const submitHandler = () => {
    if (rating === 0 || comment.trim().length === 0) {
      setError(text("detailPageCommentsPleaseFillComment"));
      return;
    } else {
      console.log("createNewComment");
      createNewComment();
    }

    window.location.reload();
  };

  const createNewComment = async () => {
    const commentData = {
      rating: rating,
      comment: comment,
      postCategory: categories,
      postId: postId,
      userName: userSession.user.username,
      email: userSession.user.email,
    };

    const serverUrl = serverURL + "/pageCommentsUpload";

    let headers = new Headers();
    headers.append("Authorization", "Bearer " + userSession.tokenKey);
    headers.append("Content-Type", "application/json");

    try {
      const response = await fetch(serverUrl, {
        method: "POST",
        body: JSON.stringify(commentData),
        headers: headers,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <form className="mb-6">
        <StarRating
          ratingText={text("detailPageCommentsRateThisPost")}
          selectedStars={rating}
          onRateHandler={ratingHandler}
        />

        <div className="py-2 px-4 mb-4 bg-white rounded-lg border-1 border-cyan">
          <label htmlFor="comment" className="sr-only">
            {text("detailPageCommentsWriteComment")}
          </label>
          <textarea
            id="comment"
            rows="6"
            className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none "
            placeholder={text("detailPageCommentsWriteComment")}
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
          {text("detailPageCommentsPostComment")}
        </button>
      </form>
    </>
  );
}

export default PostCommentsUpload;
