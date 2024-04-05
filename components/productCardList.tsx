import React from "react";
import ProductCard from "./productCard";
import { Product } from "./product";

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
