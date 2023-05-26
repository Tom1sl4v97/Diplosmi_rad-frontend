import SinglePost from "./SinglePost";
import Pagination from "../navigation/Pagination";

function FullContent(props) {
  const contextData = props.contentData;

  // const [blogPosts, setBlogPosts] = useState([]);
  // const [currentPage, setCurrentPage] = useState(1);
  // const [postsPerPage] = useState(3);

  // const indexOfLastPost = currentPage * postsPerPage;
  // const indexOfFirstPost = indexOfLastPost - postsPerPage;
  // const currentPosts = blogPosts.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <div className="container mx-auto my-12 lg:mt-0">
      <div className="p-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
        {contextData.map((item, index) => (
          <SinglePost key={index} item={item} />
        ))}
      </div>
      <Pagination />
    </div>
  );
}

export default FullContent;
