import { format } from "date-fns";
import { Link, useNavigate } from "react-router-dom";
import { useDraggable } from "react-use-draggable-scroll";
import { useRef } from "react";
import { useTranslation } from "react-i18next";

import PrikazKategorija from "./PrikazKategorija";

function SinglePost(props) {
  const navigate = useNavigate();
  const { t: text } = useTranslation();
  const {
    img,
    author,
    dateOfCreation,
    title,
    subTitle,
    categories,
    avgScore = null,
  } = props.item;

  const ref = useRef();
  const { events } = useDraggable(ref);

  const openContentHandler = () => {
    navigate(`/detailPage/${props.item.id}`);
  };

  return (
    <button
      onClick={openContentHandler}
      className="text-left"
    >
      <div className="group wrapper antialiased text-gray-900">
        <img
          src={img}
          alt={title}
          className="w-full object-cover h-56 object-center rounded-3xl border-2 border-black shadow-md group-hover:shadow-2xl group-hover:scale-110 transition duration-500 ease-in-out"
        />

        <div className="relative px-4 -mt-16">
          <div className="bg-white p-6 rounded-lg shadow-lg h-64">
            <div
              id="categories"
              className="flex cursor-grab overflow-hidden text-sm"
              {...events}
              ref={ref}
            >
              {categories.map((category, index) => (
                <PrikazKategorija
                  key={index}
                  category={category}
                  hover={false}
                />
              ))}
            </div>

            <span className="font-bold text-sm">
              {author} - {format(new Date(dateOfCreation), "dd.MM.yyyy")}
            </span>

            <h4 className="mt-3 text-xl font-semibold uppercase leading-tight truncate">
              {title}
            </h4>
            <div className="mt-1 line-clamp-3 overflow-hidden">{subTitle}</div>

            {avgScore !== null && (
              <div className="text-md pt-2 font-bold">
                {text("detailPageCommentsAverageScore")} {avgScore.toFixed(1)} / 5.0
              </div>
            )}
          </div>
        </div>
      </div>
    </button>
  );
}

export default SinglePost;
