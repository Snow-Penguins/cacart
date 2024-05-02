import ProductCard from "@/components/products/ProductCard";
import getProducts from "@/util/products/getProducts";
import React from "react";

export default async function NewRelease() {
  const productUrl = "products/by-date";
  const products = (await getProducts(productUrl)) || [];

  return (
    <div className="flex flex-wrap justify-center gap-4 pt-10">
      {products?.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
