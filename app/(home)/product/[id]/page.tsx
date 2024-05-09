"use client";
import React, { useEffect, useState } from "react";
import ProductDetail from "../../../../components/products/ProductDetail";
import ProductDescription from "../../../../components/products/ProductDescription";

type Props = {
  params: { id: string };
};

export default function Page({ params }: Props) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const setLoadingStates = async () => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    };

    setLoadingStates();
  }, [params.id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <ProductDetail productId={params.id} />
      <ProductDescription productId={params.id} />
    </div>
  );
}
