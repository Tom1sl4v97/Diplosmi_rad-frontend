import { useParams } from "react-router-dom";
import { useFetchContent } from "../hooks/fetchContent";

import LoadingCom from "../components/pomocno/LoadingCom";
import Title from "../components/detailPage/Title";
import Image from "../components/detailPage/Image";

function DetailPage() {
  const postID = useParams();
  const { loadingData, data = data, error } = useFetchContent(postID.postID);

  return (
    <>
      {loadingData ? (
        <LoadingCom />
      ) : (
        <>
          <Title
            title={data[0].title}
            author={data[0].author}
            dateOfCreation={data[0].dateOfCreation}
          />
          <Image img={data[0].img} subTitle={data[0].subTitle} />
        </>
      )}
    </>
  );
}

export default DetailPage;