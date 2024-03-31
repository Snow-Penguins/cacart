import React from "react";
import styles from "../styles/productCard.module.css";

interface Product {
  id: number;
  category: string;
  name: string;
  price: number;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const productImages = [
    "/images/product1.jpg",
    "/images/product2.jpg",
    "/images/product3.jpg",
  ];
  const productImage = productImages[(product.id - 1) % productImages.length];
  return (
    <div className="border border-gray-200 rounded-md w-[450px] h-[450px] mb-10">
      <div className={styles["image-container"]}>
        <img src={productImage} alt="Product Image" />
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
