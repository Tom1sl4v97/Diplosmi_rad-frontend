import { useState } from "react";
import { useTranslation } from "react-i18next";

function SingleItem(props) {
  const [toogleComments, setToogleComments] = useState(false);
  const { t: text } = useTranslation();
  const { data } = props;

  const date = data.dateOfCreation.split("T")[0];

  const avgRating = () => {
    let sum = 0;
    data.comments.forEach((comment) => {
      sum += comment.rating;
    });
    return (sum / data.comments.length).toFixed(2);
  };

  const showCommentsHandler = () => {
    setToogleComments((prev) => !prev);
  };

  var baseButtonStyle =
    "font-medium text-black rounded-full px-4 py-2 transition duration-300";

  if (data.comments.length === 0) {
    baseButtonStyle += " bg-gray-300 cursor-not-allowed";
  } else {
    baseButtonStyle += " bg-cyanLight hover:bg-cyan";
  }

  return (
    <tr className=" hover:bg-gray-100 border-b-2 text-black">
      <td className="px-6 py-4">{data.title}</td>
      <td className="px-6 py-4">
        {data.categories.map((category, index) => {
          if (index === data.categories.length - 1) {
            return category;
          } else {
            return category + ", ";
          }
        })}
      </td>
      <td className="px-6 py-4">{date}</td>
      <td className="px-6 py-4">{data.views}</td>
      <td className="px-6 py-4">
        {((data.views / data.totalViews) * 100).toFixed(2)}%
      </td>
      <td className="px-6 py-4">{avgRating() === "NaN" ? 0 : avgRating()}</td>
      <td className="px-6 py-4">{data.comments.length}</td>
      <td className="px-6 py-4 text-right">
        <button
          onClick={showCommentsHandler}
          className={baseButtonStyle}
          disabled={data.comments.length === 0}
        >
          {text("moderatorShowComments")}
        </button>
        {toogleComments && (
          <div className="mt-[-6px] ml-[-700px] w-[800px] absolute bg-white divide-y divide-gray-100 rounded-lg shadow text-left border-1 border-cyanDark">
            <table className="w-full">
              <tbody>
                {data.comments.map((comment, index) => {
                  return (
                    <tr className="hover:bg-gray-100" key={index}>
                      <td className="px-6 py-4 w-[33%]">{comment.email}</td>
                      <td className="px-6 py-4 w-[7%]">{comment.rating}</td>
                      <td className="px-6 py-4 w-[60%]">{comment.comment}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </td>
    </tr>
  );
}

export default SingleItem;
