import React from "react";
import ProductCard from "./ProductCard";
import { Product } from "./Product";

interface ProductCardListProps {
  products: Product[];
}

const ProductCardList: React.FC<ProductCardListProps> = ({ products }) => {
  return (
    <div className="flex flex-wrap justify-center gap-4 pt-10">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductCardList;
