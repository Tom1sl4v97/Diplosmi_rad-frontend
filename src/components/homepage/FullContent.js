import SinglePost from "./SinglePost";
import Pagination from "../navigation/Pagination";

function FullContent(props) {
  const { contentData, prevPage, nextPage, currentPage, totalCount, skipPage, goToPage} = props;

  return (
    <div className="container mx-auto my-12 lg:mt-0">
      <div className="p-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
        {contentData.map((item, index) => (
          <SinglePost key={index} item={item} />
        ))}
      </div>
      <Pagination
        prevPage={prevPage}
        nextPage={nextPage}
        currentPage={currentPage}
        totalCount={totalCount}
        skipPage={skipPage}
        goToPage={goToPage}
      />
    </div>
  );
}

export default FullContent;
