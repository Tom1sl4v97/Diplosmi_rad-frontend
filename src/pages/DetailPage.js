import { useParams } from "react-router-dom";
import {
  useFetchCategoriesByPostId,
  useFetchCommentsById,
} from "../hooks/fetchContent";
import useVisitingPage from "../hooks/visitingPage";

import LoadingCom from "../components/pomocno/LoadingCom";
import Title from "../components/detailPage/Title";
import Image from "../components/detailPage/Image";
import Content from "../components/detailPage/Content";
import PostComments from "../components/detailPage/PostComments";

function DetailPage() {
  const postID = useParams().postID;
  const { loadingData, data } = useFetchCategoriesByPostId(postID);
  const { loadingData: commentLoader, data: commentData } =
    useFetchCommentsById(postID);

  useVisitingPage(postID);

  return (
    <>
      {loadingData ? (
        <LoadingCom />
      ) : (
        <div className="mx-6 md:mx-8 lg:mx-20 xl:mx-28">
          <Title
            title={data[0].title}
            author={data[0].author}
            dateOfCreation={data[0].dateOfCreation}
          />
          <Image img={data[0].img} subTitle={data[0].subTitle} />

          <div className="flex flex-row text-center w-full justify-center space-x-5 my-4">
            {data[0].categories.map((category, index) => (
              <div
                key={index}
                className="text-sm md:text-lg lg:text-xl font-serif border-2 border-cyanDark rounded-full px-4 py-1"
              >
                {category}
              </div>
            ))}
          </div>

          <h2 className="text-xl md:text-2xl lg:text-3xl font-serif text-center">
            {data[0].subTitle}
          </h2>
          <Content content={data[0].content} />

          {commentLoader ? (
            <LoadingCom />
          ) : (
            <PostComments
              comments={commentData}
              postId={postID}
              categories={data[0].categories}
            />
          )}
        </div>
      )}
    </>
  );
}

export default DetailPage;
