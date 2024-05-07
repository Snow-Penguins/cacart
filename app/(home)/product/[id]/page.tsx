"use client";

import React from "react";
import ProductDetail from "../../../../components/products/ProductDetail";
import ProductDescription from "../../../../components/products/ProductDescription";

type Props = {
  params: { id: string };
};

export default function Page({ params }: Props) {
  return (
    <div>
      <ProductDetail productId={params.id} />
      <ProductDescription productId={params.id} />
    </div>
  );
}
