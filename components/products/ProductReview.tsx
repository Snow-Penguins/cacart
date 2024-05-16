import React from "react";
// import Image from "next/image";
import { Review } from "../../entities/Review";

interface ProductReviewProps {
  review: Review;
}

const ProductReview: React.FC<ProductReviewProps> = ({ review }) => {
  return (
    <div className="bg-white rounded-md w-[1170px] h-[270px] mb-10 p-10">
      <div className="flex items-center justify-between mb-4">
        <div className="flex">
          <div className="avatar">
            <div className="w-[56px] h-[56px] rounded-full ring-offset-base-100 ring-offset-2 mr-5">
              {/* <Image
                src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                width={56}
                height={56}
                alt="User Image"
              /> */}
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-md font-medium">
              {review.user.firstname} {review.user.lastname}
            </span>
            <span className="text-sm text-primary_text">
              {new Date(review.created_at).toLocaleDateString()}
            </span>
          </div>
        </div>
        <span className="text-sm">
          Rating: {review.rating_value.toFixed(1)}{" "}
          <div
            className="ml-2 rating rating-xs"
            style={{ display: "inline-block" }}
          >
            {[...Array(5)].map((_, index) => (
              <span
                key={index}
                className={`star ${index < review.rating_value ? "filled" : "empty"}`}
                style={{
                  color: index < review.rating_value ? "#ff9900" : "#ccc",
                }}
              >
                ★
              </span>
            ))}
          </div>
        </span>
      </div>
      <h2 className="border-b border-gray-300"></h2>
      <h3 className="mt-4 mb-4 text-lg font-semibold">{review.comment}</h3>
      <p className="text-sm text-primary_text font-normal">{review.comment}</p>
    </div>
  );
};

export default ProductReview;
