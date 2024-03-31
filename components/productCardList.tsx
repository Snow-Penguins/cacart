import React from "react";
import ProductCard from "./productCard";

interface Product {
  id: number;
  category: string;
  name: string;
  price: number;
}

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
