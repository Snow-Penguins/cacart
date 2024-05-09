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
      }
    }
    fetchProduct();
  }, [productId]);

  if (!product) {
    return null;
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
