"use client";
import React from "react";
import ProductDetail from "../../../../components/products/ProductDetail";
import ProductDescription from "../../../../components/products/ProductDescription";
import ProductReviewList from "../../../../components/products/ProductReviewList";
type Props = {
  params: { id: string };
};

export default function Page({ params }: Props) {
  return (
    <div>
      <ProductDetail productId={params.id} />
      <ProductDescription productId={params.id} />
      <ProductReviewList productId={Number(params.id)} />
    </div>
  );
}
