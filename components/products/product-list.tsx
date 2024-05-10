"use client";

import { Product } from "@/entities/Product";
import ProductCard from "./ProductCard";
import { useState } from "react";
import getProducts from "@/util/products/getProducts";

interface ProductListPros {
  initialProduts: Product[];
}

export default function ProductList({ initialProduts }: ProductListPros) {
  const [products, setProducts] = useState(initialProduts);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);

  const productUrl = "products/sold-qty";
  const onLoadMoreClick = async () => {
    setIsLoading(true);
    const newPage = page + 1;
    const newProducts = (await getProducts(productUrl, newPage)) || [];
    setProducts((prev) => [...prev, ...newProducts]);
    setPage(newPage);
    setIsLoading(false);
  };
  return (
    <div className="flex flex-wrap justify-center gap-4 pt-10">
      {products?.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
      <button
        onClick={onLoadMoreClick}
        disabled={isLoading}
        className="text-sm font-semibold bg-primary w-fit h-fit mx-auto px-3 py-2 rounded-md hover:opacity-90 active:scale-95"
      >
        {isLoading ? "Loading..." : "Load More"}
      </button>
    </div>
  );
}
