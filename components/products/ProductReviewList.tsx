import React from "react";
import ProductReview from "./ProductReview";
import { Review } from "../../entities/Review";

interface ProductReviewListProps {
  reviews: Review[];
}

const ProductReviewList: React.FC<ProductReviewListProps> = ({ reviews }) => {
  return (
    <div className="bg-gray-200 p-32 w-[1440px] h-[840px]">
      {reviews.map((review) => (
        <ProductReview key={review.id} review={review} />
      ))}
    </div>
  );
};

export default ProductReviewList;
