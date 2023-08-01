import React from "react";

const Star = ({ selected, onClick }) => (
  <svg
    onClick={onClick}
    xmlns="http://www.w3.org/2000/svg"
    className={`h-6 w-6 cursor-pointer mb-4 ${
      selected
        ? "text-cyan fill-current"
        : "text-gray-300 fill-current hover:text-cyanLight"
    }`}
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M10 1l2.32 6.55h6.19l-4.99 3.96 1.92 6.55L10 14.66l-6.44 4.4 1.92-6.55L1.49 7.55h6.19L10 1z"
      clipRule="evenodd"
    />
  </svg>
);

const StarRating = ({ ratingText, selectedStars, onRateHandler }) => {
  const stars = Array.from({ length: 5 }, (_, index) => (
    <Star
      key={index}
      selected={index < selectedStars}
      onClick={() => onRateHandler(index + 1)}
    />
  ));

  return (
    <div className="flex flex-row">
      <p className="text-gray-400 text-lg pr-4">{ratingText}</p>   
      <div className="flex">{stars}</div>
    </div>
  );
};

export default StarRating;
