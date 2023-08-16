import { useTranslation } from "react-i18next";
import { useSessionStorage, defaultSession } from "../../hooks/SessionStorage";

import PostCommentsUpload from "./PostCommentsUpload";
import CommentContent from "./CommentContent";

function PostComments(props) {
  const { comments, postId, categories } = props;
  const { t: text } = useTranslation();
  const [userSession] = useSessionStorage("userData", defaultSession);

  const noComments = comments.length === 0;

  const avgScore =
    comments.reduce((acc, curr) => {
      return acc + curr.rating;
    }, 0) / comments.length;

  const loggedUser = userSession.role !== "un-register";

  return (
    <>
      <section className="bg-white py-8 lg:py-16">
        <div className="max-w-2xl mx-auto px-4">
          <div className="flex flex-row justify-between items-center mb-6">
            <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
              {text("detailPageCommentsDiscution")}
            </h2>
            <div className="flex flex-row items-center space-x-2 text-lg">
              {!noComments &&
                text("detailPageCommentsAverageScore") +
                  " " +
                  avgScore.toFixed(1)}
            </div>
          </div>

          {loggedUser && (
            <PostCommentsUpload userSession={userSession} postId={postId} categories={categories} />
          )}

          {noComments ? (
            <div className="text-center">
              {text("detailPageCommentsNoComments")}
            </div>
          ) : (
            comments.map((comment) => (
              <CommentContent
                key={comment.postCommentId}
                comment={comment}
                canDelete={userSession.user.email === comment.email}
                userSession={userSession}
              />
            ))
          )}
        </div>
      </section>
    </>
  );
}

export default PostComments;
