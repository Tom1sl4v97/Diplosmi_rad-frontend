import { Link } from "react-router-dom";
import PrvaSlikaKategirije from "./PrikazKategorija";
import { format } from "date-fns";

function HomePagePrvaSika(props) {
  const { img, author, dateOfCreation, title, subTitle, categories, id } =
    props.najnovijiPost;

  const datumObjave = format(new Date(dateOfCreation), "dd.MM.yyyy");

  return (
    <Link to={`detailPage/${id}`}>
      <section id="prvaSlika">
        <div className="lg:p-12 w-10/12 mx-auto mb-16">
          <div className="group relative overflow-hidden shadow-2xl rounded-3xl">
            <img
              src={img}
              alt=""
              className="w-full h-auto duration-200 group-hover:scale-110"
            />
            <div className="absolute top-0 bottom-0 right-0 left-0 bg-gradient-to-b from-transparent to-gray-800 group-hover:from-gray-50 group-hover:to-white group-hover:opacity-40"></div>
            <div className="text-white font-bold tracking-widest px-10">
              <p className="text-md lg:text-2xl absolute duration-200 w-auto bottom-36 lg:bottom-44 group-hover:text-black ">
                {author} · {datumObjave}
              </p>
              <p className="text-2xl lg:text-4xl absolute duration-200 w-auto bottom-24 lg:bottom-32 group-hover:text-black">
                {title}
              </p>
              <p className="text-md lg:text-2xl truncate ... absolute duration-200 w-full pr-16 bottom-16 lg:bottom-20 group-hover:text-black">
                {subTitle}
              </p>

              <div className="absolute bottom-4 flex flex-row duration-200 group-hover:text-black text-md lg:text-2xl">
                {categories.map((category, index) => (
                  <PrvaSlikaKategirije
                    key={index}
                    category={category}
                    hover={true}
                  />
                ))}
              </div>

              <div className=""></div>
            </div>
          </div>
        </div>
      </section>
    </Link>
  );
}

export default HomePagePrvaSika;
