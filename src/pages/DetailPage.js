import { useParams } from "react-router-dom";
import { useFetchCategoriesByPostId } from "../hooks/fetchContent";
import useVisitingPage from "../hooks/visitingPage";

import LoadingCom from "../components/pomocno/LoadingCom";
import Title from "../components/detailPage/Title";
import Image from "../components/detailPage/Image";
import Content from "../components/detailPage/Content";

function DetailPage() {
  const postID = useParams().postID;
  console.log("postID: ", postID);
  const { loadingData, data } = useFetchCategoriesByPostId(postID);

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
          <Content content={data[0].content} />
        </div>
      )}
    </>
  );
}

export default DetailPage;
