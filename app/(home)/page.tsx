"use client";

import { useCategory } from "@/contexts/CategoryContext";
import ProductCardList from "../../components/products/ProductCardList";
import getProducts from "@/util/products/getProducts";
import { useEffect, useState } from "react";
import { Product } from "@/entities/Product";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const productUrl = "products";
  const { selectedCategory } = useCategory();

  useEffect(() => {
    const fetchProducts = async () => {
      if (selectedCategory.option_id !== undefined) {
        const fetchedProducts = await getProducts(
          productUrl,
          selectedCategory.option_id,
        );
        setProducts(fetchedProducts || []);
      }
    };

    fetchProducts();
  }, [selectedCategory]);
  // const products = (await getProducts(productUrl)) || [];

  return (
    <main>
      <ProductCardList products={products} />
    </main>
  );
}
