import React from "react";
import { Product } from "./product";

const PRODUCT_IMAGES = [
  "/images/product1.jpg",
  "/images/product2.jpg",
  "/images/product3.jpg",
];

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const productImage = PRODUCT_IMAGES[(product.id - 1) % PRODUCT_IMAGES.length];
  return (
    <div className="border border-gray-200 rounded-md w-[450px] h-[450px] mb-10">
      <div className="w-[450px] h-[300px]">
        <img
          src={productImage}
          alt="Product Image"
          className="w-full h-full object-cover object-center"
        />
      </div>
      <div className="mt-6 ml-6">
        <h6 className="text-secondary_text text-sm mb-5">{product.category}</h6>
        <h2 className="font-semibold text-black text-lg mb-2">
          {product.name}
        </h2>
        <h6 className="font-semibold text-black text-sm mb-2">
          ${product.price.toFixed(2)}
        </h6>
      </div>
    </div>
  );
};

export default ProductCard;
