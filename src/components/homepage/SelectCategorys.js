import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const categoryList = [
  "Desktop",
  "IOS",
  "iPhone",
  "Android",
  "Windows",
  "Linux",
  "Laptop",
  "Playstation",
  "Nintendo",
  "Xbox",
  "The rest",
];

function SelectCategorys(props) {
  const { handleCategoryChange } = props;
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { t: text } = useTranslation();

  const toggleDropdown = () => {
    setDropdownOpen((prevState) => !prevState);
  };

  const addCategoryIfSelectedHandler = (event) => {
    if (event.target.checked) {
      setSelectedCategories((prev) => [...prev, event.target.value]);
    } else {
      setSelectedCategories((prev) =>
        prev.filter((category) => category !== event.target.value)
      );
    }
  };

  const selectAllCategoriesHandler = (event) => {
    if (event.target.checked) {
      setSelectedCategories(categoryList);
    } else {
      setSelectedCategories([]);
    }
  };

  const applyCategoriesHandler = () => {
    handleCategoryChange(selectedCategories);
    toggleDropdown();
    setSelectedCategories([]);
  }

  return (
    <div className="w-[90%] flex justify-end">
      {" "}
      <button
        id="dropdownCheckboxButton"
        onClick={toggleDropdown}
        className="ml-auto p-10 text-white font-bold text-xl bg-cyan hover:bg-cyanDark focus:ring-4 focus:outline-none focus:ring-cyanLight rounded-lg px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
      >
        {text("selecCategories")}
        <svg
          className="w-2.5 h-2.5 ml-2.5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>
      {dropdownOpen && (
        <div
          id="dropdownDefaultCheckbox"
          className="mt-10 mr-4 z-10 w-48 absolute bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
        >
          <ul
            className="p-3 space-y-3 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdownCheckboxButton"
          >
            <li>
              <div className="flex items-center">
                <input
                  id="checkbox-item-select-all"
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  onChange={selectAllCategoriesHandler}
                />
                <label
                  htmlFor="checkbox-item-select-all"
                  className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  {text("selectAll")}
                </label>
              </div>
            </li>
            {categoryList.map((category) => (
              <li key={category}>
                <div className="flex items-center">
                  <input
                    id={`checkbox-item-${category}`}
                    type="checkbox"
                    value={category}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                    onChange={addCategoryIfSelectedHandler}
                  />
                  <label
                    htmlFor={`checkbox-item-${category}`}
                    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    {category}
                  </label>
                </div>
              </li>
            ))}
            <button
              id="dropdownCheckboxButton"
              onClick={applyCategoriesHandler}
              className="text-white bg-cyan hover:bg-cyanDark font-bold rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
              type="button"
            >
              {text("apply")}
            </button>
          </ul>
        </div>
      )}
    </div>
  );
}

export default SelectCategorys;
