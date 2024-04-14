import React from "react";
import ProductCard from "./ProductCards";
import { Product } from "./Product";

interface ProductCardListProps {
  products: Product[];
}

const ProductCardLists: React.FC<ProductCardListProps> = ({ products }) => {
  return (
    <div className="flex flex-wrap justify-center gap-4 pt-10">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductCardLists;
