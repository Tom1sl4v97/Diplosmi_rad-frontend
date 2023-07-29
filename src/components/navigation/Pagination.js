function Pagination(props) {
  const {
    prevPage,
    nextPage,
    currentPage,
    totalCount,
    skipPage,
    goToPage,
    listing = true,
  } = props;

  const prevPageCSS =
    (currentPage > 1 ? "hover:bg-cyan " : "") +
    "h-12 w-12 mr-1 flex justify-center items-center rounded-full bg-gray-200 cursor-pointer";

  const nextPageCSS =
    (currentPage * skipPage < totalCount ? "hover:bg-cyan " : "") +
    "h-12 w-12 ml-1 flex justify-center items-center rounded-full bg-gray-200 cursor-pointer";

  const totalPages = Math.ceil(totalCount / skipPage);

  const getPageNumbers = () => {
    const pages = [];

    if (listing)
      if (totalPages <= 9) {
        for (let i = 1; i <= totalPages; i++) {
          const pageNumberCSS = `w-12 flex justify-center items-center cursor-pointer leading-5 transition duration-150 ease-in rounded-full hover:bg-cyan ${
            i === currentPage
              ? "bg-cyan text-white"
              : "bg-gray-200 text-gray-700"
          }`;
          const pageButton = (
            <div
              key={i}
              className={pageNumberCSS}
              onClick={() => handlePageClick(i)}
            >
              {i}
            </div>
          );
          pages.push(pageButton);
        }
      } else {
        pages.push(
          <div
            key={1}
            className={`w-12 flex justify-center items-center cursor-pointer leading-5 transition duration-150 ease-in rounded-full hover:bg-cyan ${
              1 === currentPage
                ? "bg-cyan text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => handlePageClick(1)}
          >
            1
          </div>
        );
        pages.push(
          <div
            key={2}
            className={`w-12 flex justify-center items-center cursor-pointer leading-5 transition duration-150 ease-in rounded-full hover:bg-cyan ${
              2 === currentPage
                ? "bg-cyan text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => handlePageClick(2)}
          >
            2
          </div>
        );

        if (currentPage > 3 && currentPage < totalPages - 2) {
          pages.push(
            <div
              key="dots"
              className="w-12 flex justify-center items-center cursor-pointer leading-5 transition duration-150 ease-in rounded-full bg-gray-200"
            >
              ...
            </div>
          );
        }

        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          const pageNumberCSS = `w-12 flex justify-center items-center cursor-pointer leading-5 transition duration-150 ease-in rounded-full hover:bg-cyan ${
            i === currentPage
              ? "bg-cyan text-white"
              : "bg-gray-200 text-gray-700"
          }`;
          if (i > 2 && i < totalPages - 1) {
            const pageButton = (
              <div
                key={i}
                className={pageNumberCSS}
                onClick={() => handlePageClick(i)}
              >
                {i}
              </div>
            );
            pages.push(pageButton);
          }
        }

        if (currentPage < totalPages - 2) {
          pages.push(
            <div
              key="dots-end"
              className="w-12 flex justify-center items-center cursor-pointer leading-5 transition duration-150 ease-in rounded-full bg-gray-200"
            >
              ...
            </div>
          );
        }

        pages.push(
          <div
            key={totalPages - 1}
            className={`w-12 flex justify-center items-center cursor-pointer leading-5 transition duration-150 ease-in rounded-full hover:bg-cyan ${
              totalPages - 1 === currentPage
                ? "bg-cyan text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => handlePageClick(totalPages - 1)}
          >
            {totalPages - 1}
          </div>
        );
        pages.push(
          <div
            key={totalPages}
            className={`w-12 flex justify-center items-center cursor-pointer leading-5 transition duration-150 ease-in rounded-full hover:bg-cyan ${
              totalPages === currentPage
                ? "bg-cyan text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => handlePageClick(totalPages)}
          >
            {totalPages}
          </div>
        );
      }

    return pages;
  };

  const handlePageClick = (pageNumber) => {
    if (pageNumber !== currentPage) {
      if (pageNumber > 0 && pageNumber <= totalPages) {
        goToPage(pageNumber);
      }
    }
  };

  return (
    <div className="flex flex-col items-center my-12">
      <div className="flex text-gray-700">
        <div onClick={prevPage} className={prevPageCSS}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-chevron-left w-6 h-6"
          >
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </div>
        <div className="flex h-12 font-medium rounded-full bg-gray-200">
          {getPageNumbers()}
        </div>
        <div onClick={nextPage} className={nextPageCSS}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-chevron-right w-6 h-6"
          >
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </div>
      </div>
    </div>
  );
}

export default Pagination;
