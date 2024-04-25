"use client";

import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { Product } from "../../entities/Product";
import { FetchProducts } from "@/app/apis/products";

interface ProductCardListProps {
  products?: Product[];
}

const ProductCardList: React.FC<ProductCardListProps> = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    if (!apiUrl) {
      console.error("API URL is not defined");
      return;
    }
    FetchProducts(apiUrl).then(setProducts).catch(console.error);
  }, []);

  return (
    <div className="flex flex-wrap justify-center gap-4 pt-10">
      {products.map(
        (product) => (
          console.log("print test1", product),
          (<ProductCard key={product.id} product={product} />)
        ),
      )}
    </div>
  );
};

export default ProductCardList;
