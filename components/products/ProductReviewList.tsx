import React, { useEffect, useState } from "react";
import ProductReview from "./ProductReview";
import { Review } from "../../entities/Review";

interface ProductReviewListProps {
  productId: number;
}

const ProductReviewList: React.FC<ProductReviewListProps> = ({ productId }) => {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    async function fetchReviews() {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/products/${productId}`,
      );
      const data = await response.json();
      console.log("Fetched product data:", data);
      const allReviews = data.product_items.flatMap(
        (item: { order_histories: any[] }) =>
          item.order_histories.flatMap((history) => history.user_reviews),
      );
      setReviews(allReviews);
    }
    fetchReviews();
  }, [productId]);

  if (!reviews) {
    return null;
  }

  return (
    <div className="bg-gray-200 p-32 w-[1440px] h-[840px]">
      {reviews.map((review) => (
        <ProductReview key={review.id} review={review} />
      ))}
    </div>
  );
};

export default ProductReviewList;
