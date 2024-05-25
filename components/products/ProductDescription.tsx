import React, { useEffect, useState } from "react";
import { Product } from "../../entities/Product";

interface ProductDescriptionProps {
  productId: string;
}

const ProductDescription: React.FC<ProductDescriptionProps> = ({
  productId,
}) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedContent, setSelectedContent] = useState<string>("description");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/products/${productId}`,
        );
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Failed to fetch product:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [productId]);

  const SkeletonLoader = () => (
    <div className="flex p-36 animate-pulse">
      <div className="w-1/4">
        <ul>
          <li className="h-6 bg-gray-400 rounded w-3/4 mb-5"></li>
          <li className="h-6 bg-gray-400 rounded w-3/4 mb-5"></li>
        </ul>
      </div>
      <div className="w-3/4 border-l-4 pl-10 border-gray-400">
        <div className="space-y-4">
          <div className="h-4 bg-gray-400 rounded w-full"></div>
          <div className="h-4 bg-gray-400 rounded w-5/6"></div>
          <div className="h-4 bg-gray-400 rounded w-2/3"></div>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return <SkeletonLoader />;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="flex p-36">
      <div className="w-1/4">
        <ul>
          <li
            onClick={() => setSelectedContent("description")}
            className={
              selectedContent === "description"
                ? "text-lg font-semibold text-primary mb-5 cursor-pointer"
                : "text-lg font-semibold text-primary_text mb-5 cursor-pointer"
            }
          >
            Description
          </li>
          <li
            onClick={() => setSelectedContent("shipping")}
            className={
              selectedContent === "shipping"
                ? "text-lg font-semibold text-primary mb-5 cursor-pointer"
                : "text-lg font-semibold text-primary_text mb-5 cursor-pointer"
            }
          >
            Shipping & Return Information
          </li>
        </ul>
      </div>
      <div className="w-3/4 border-l-4 pl-10 border-gray-400">
        {selectedContent === "description" && (
          <div>
            <p>{product.description}</p>
          </div>
        )}
        {selectedContent === "shipping" && (
          <div>
            <p>Shipping & Return Information</p>
            <p>Details not available yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDescription;
