import React from "react";
import { Review } from "./review";

interface ProductReviewProps {
  review: Review;
}

const productReview: React.FC<ProductReviewProps> = ({ review }) => {
  return (
    <div className="bg-white rounded-md w-[1170px] h-[270px] mb-10 p-10">
      <div className="flex items-center justify-between mb-4">
        <div className="flex">
          <div className="avatar">
            <div className="w-[56px] h-[56px] rounded-full ring-offset-base-100 ring-offset-2 mr-5">
              <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-md font-medium">{review.name}</span>
            <span className="text-sm text-primary_text">{review.date}</span>
          </div>
        </div>
        <span className="text-sm">
          Rating: {review.rating.toFixed(1)}{" "}
          <div className="ml-2 rating rating-xs">
            <input
              type="radio"
              name="rating-4"
              className="mask mask-star-2 bg-orange-400"
              style={{ backgroundColor: "#ff9900" }}
            />
            <input
              type="radio"
              name="rating-4"
              className="mask mask-star-2 bg-orange-400"
              style={{ backgroundColor: "#ff9900" }}
              checked
            />
            <input
              type="radio"
              name="rating-4"
              className="mask mask-star-2 bg-orange-400"
              style={{ backgroundColor: "#ff9900" }}
            />
            <input
              type="radio"
              name="rating-4"
              className="mask mask-star-2 bg-orange-400"
              style={{ backgroundColor: "#ff9900" }}
            />
            <input
              type="radio"
              name="rating-4"
              className="mask mask-star-2 bg-orange-400"
              style={{ backgroundColor: "#ff9900" }}
            />
          </div>
        </span>
      </div>
      <h2 className="border-b border-gray-300"></h2>
      <h3 className="mt-4 mb-4 text-lg font-semibold">{review.title}</h3>
      <p className="text-sm text-primary_text font-normal">{review.content}</p>
    </div>
  );
};

export default productReview;
