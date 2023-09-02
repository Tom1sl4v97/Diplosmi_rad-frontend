import SinglePost from "./SinglePost";
import Pagination from "../navigation/Pagination";

function FullContent(props) {
  const { contentData, prevPage, nextPage, currentPage, totalCount, skipPage, goToPage, listing} = props;

  return (
    <div className="container mx-auto my-12 lg:mt-0">
      <div className="sm:p-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
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
        listing={listing}
      />
    </div>
  );
}

export default FullContent;
