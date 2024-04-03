import React from 'react';

const RatingStars = ({ rating } : {rating: Number}) => {
  // Calculate the rounded rating to the nearest 0.5
  const roundedRating = Math.round(rating as number * 2) / 2;

  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, index) => {
        // Determine the class based on the rating and index
        let starClass = "text-gray-400";
        if (roundedRating >= index + 1) {
          starClass = "text-yellow-400";
        } else if (roundedRating >= index + 0.5) {
          starClass = "text-yellow-400";
        }

        // Check if the star should be half-filled
        const isHalfFilled = roundedRating % 1 !== 0 && Math.ceil(roundedRating) === index + 1;

        return (
          <span key={index} className="text-xl md:text-2xl ">
            <div className='rounded  px-1 h-7 flex justify-center items-center'>
                <span className={`${starClass} star `}>
                {isHalfFilled ? "☆"   : "★"}
                </span>
            </div>

          </span>
        );
      })}
    </div>
  );
};

export default RatingStars;
