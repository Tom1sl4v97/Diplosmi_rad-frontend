import { format } from "date-fns";
import PrikazKategorija from "./PrikazKategorija";
import { Link } from "react-router-dom";

import { useRef } from "react";
import { useDraggable } from "react-use-draggable-scroll";

function SinglePost(props) {
  const { img, author, dateOfCreation, title, subTitle, categories } =
    props.item;

  const ref = useRef();
  const { events } = useDraggable(ref);

  return (
    <Link to={`detailPage/${props.item.id}`}>
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
          </div>
        </div>
      </div>
    </Link>
  );
}

export default SinglePost;
