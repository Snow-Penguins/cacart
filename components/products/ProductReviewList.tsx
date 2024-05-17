import React, { useEffect, useState } from "react";
import ProductReview from "./ProductReview";
import { Review } from "../../entities/Review";

interface ProductReviewListProps {
  productId: number;
}

const ProductReviewList: React.FC<ProductReviewListProps> = ({ productId }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchReviews() {
      try {
        // const response = await fetch(
        //   `${process.env.NEXT_PUBLIC_API_URL}/products/${productId}`,
        // );
        // const data = await response.json();
        // const allReviews = data.product_items.flatMap(
        //   (item: { order_histories: any[] }) =>
        //     item.order_histories.flatMap((history) => history.user_reviews),
        // );
        // setReviews(allReviews);
        const mockReviews: Review[] = [
          {
            id: 1,
            user: {
              id: 1,
              firstname: "John",
              lastname: "Doe",
            },
            rating_value: 4,
            comment: "Great product! Highly recommend it.",
            created_at: new Date("2024-05-01T12:00:00Z"),
          },
          {
            id: 2,
            user: {
              id: 2,
              firstname: "Jane",
              lastname: "Smith",
            },
            rating_value: 5,
            comment: "Excellent quality and fast shipping.",
            created_at: new Date("2024-05-01T12:00:00Z"),
          },
        ];
        setReviews(mockReviews);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchReviews();
  }, [productId]);

  const SkeletonLoader = () => (
    <div className="bg-white rounded-md w-[1170px] h-[270px] mb-10 p-10 animate-pulse">
      <div className="flex items-center justify-between mb-4">
        <div className="flex">
          <div className="avatar">
            <div className="w-[56px] h-[56px] bg-gray-300 rounded-full ring-offset-base-100 ring-offset-2 mr-5"></div>
          </div>
          <div className="flex flex-col">
            <span className="h-4 bg-gray-300 rounded w-32 mb-2"></span>
            <span className="h-3 bg-gray-300 rounded w-24"></span>
          </div>
        </div>
        <div className="flex items-center">
          <span className="h-4 bg-gray-300 rounded w-20"></span>
          <div
            className="ml-2 rating rating-xs"
            style={{ display: "inline-block" }}
          >
            {[...Array(5)].map((_, index) => (
              <span
                key={index}
                className="h-4 w-4 bg-gray-300 rounded-full inline-block mx-1"
              ></span>
            ))}
          </div>
        </div>
      </div>
      <div className="border-b border-gray-300"></div>
      <div className="mt-4 mb-4 h-4 bg-gray-300 rounded w-3/4"></div>
      <div className="h-3 bg-gray-300 rounded w-full mb-2"></div>
      <div className="h-3 bg-gray-300 rounded w-full mb-2"></div>
      <div className="h-3 bg-gray-300 rounded w-4/5"></div>
    </div>
  );

  if (loading) {
    const skeletonCount = Math.max(reviews.length, 1);
    return (
      <div className="bg-gray-200 p-32 w-[1440px] h-[840px]">
        {Array.from({ length: skeletonCount }).map((_, index) => (
          <SkeletonLoader key={index} />
        ))}
      </div>
    );
  }

  if (reviews.length === 0) {
    return <div>No reviews available</div>;
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
