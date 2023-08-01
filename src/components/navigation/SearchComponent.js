import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

function SearchComponent() {
  const { t: text } = useTranslation();
  const native = useNavigate();
    const [searchedData, setSearchedData] = useState("");

  const onSearchChangeHandler = (e) => {
    setSearchedData(e.target.value);
  };

  const submitSearchHandler = () => {
    if (searchedData !== "") {
      const searchedComponents = searchedData.split(" ");
      const goodSearch = searchedComponents.join(", ");
      
        native(`/searchedContent/${goodSearch}`);
    }
  };

  return (
    <div className="xs:mt-4 md:mt-0">
      <form className="flex items-center">
        <label htmlFor="simple-search" className="sr-only">
          Search
        </label>
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-cyanDark"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="text"
            id="simple-search"
            className="bg-gray-50 border-1 border-cyan text-gray-900 text-sm rounded-xl focus:border-cyan block w-full pl-10 p-2.5"
            placeholder={text("searchArticlesPlaceholder")}
            required
            onChange={onSearchChangeHandler}
          />
        </div>
        {searchedData !== "" && (
          <button
            type="button"
            onClick={submitSearchHandler}
            className="p-2.5 ml-2 text-sm font-bold text-white bg-cyan rounded-lg transition duration-200 ease-in hover:bg-cyanDark"
          >
            <svg
              className="w-4 h-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
            <span className="sr-only">Search</span>
          </button>
        )}
      </form>
    </div>
  );
}

export default SearchComponent;
