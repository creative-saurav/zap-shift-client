import React from "react";
import { FaQuoteLeft, FaStar } from "react-icons/fa";

const ReviewsCard = ({ review }) => {
  const {
    name,
    image,
    rating,
    review: reviewText,
  } = review;

  return (
    <div className="bg-white rounded-[24px] p-8 w-[390px] h-[360px] shadow-sm flex flex-col">

      {/* Quote */}
      <FaQuoteLeft className="text-[#D8E7EB] text-4xl mb-6" />

      {/* Review */}
      <p className="text-[#606060] text-[16px] leading-8 flex-1">
        {reviewText}
      </p>

      {/* Divider */}
      <div className="border-t border-dashed border-[#8FB2B8] my-6"></div>

      {/* User */}
      <div className="flex items-center gap-4">

        <img
          src={image}
          alt={name}
          className="w-14 h-14 rounded-full object-cover"
        />

        <div>
          <h3 className="text-[20px] font-bold text-[#03373D]">
            {name}
          </h3>

         <div className="flex items-center gap-1">
            {[...Array(5)].map((_, index) => (
              <FaStar
                key={index}
                className={
                  index < rating
                    ? "text-[#FFC107] text-sm"
                    : "text-[#D9D9D9] text-sm"
                }
              />
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};

export default ReviewsCard;