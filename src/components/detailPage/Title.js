import { format } from "date-fns";

function Title(prosp) {
  const { title, dateOfCreation, author } = prosp;

  const publishedDate = format(new Date(dateOfCreation), "dd.MM.yyyy");

  return (
    <div className="md:mx-20 my-8">
      <div className="flex flex-col justify-between text-lg font-serif font-bold md:text-xl lg:text-2xl md:flex-row">
        <div className="mb-8 lg:mb-16">Autor · {author}</div>
        <div className="mb-8">Objavljeno · {publishedDate}</div>
      </div>

      <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif text-center">{title}</h1>
    </div>
  );
}

export default Title;
