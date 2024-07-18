"use client";
import React from "react";
import { useRouter } from "next/navigation";
import ProductDetail from "../../../../components/products/ProductDetail";
import ProductDescription from "../../../../components/products/ProductDescription";
import ProductReviewList from "../../../../components/products/ProductReviewList";

type Props = {
  params: { id: string };
};

export default function Page({ params }: Props) {
  const router = useRouter();

  const handleBuyItNow = (product: any) => {
    const buyNowProduct = {
      productId: product.id,
      name: product.name,
      price: product.product_items[0].price,
      image: product.product_image[0],
      category: product.category.name,
      quantity: 1,
    };

    localStorage.setItem("buyNowProduct", JSON.stringify(buyNowProduct));
    router.push("/checkout");
  };

  return (
    <div>
      <ProductDetail productId={params.id} onBuyItNow={handleBuyItNow} />
      <ProductDescription productId={params.id} />
      <ProductReviewList productId={Number(params.id)} />
    </div>
  );
}
