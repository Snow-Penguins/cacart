"use client";

import React from "react";
import { Product } from "../../entities/Product";
import Link from "next/link";
import Image from "next/image";

interface ProductCardProps {
  product: Product;
}

const IMAGE_URL = `${process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL}`;

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  console.log("print test2", product);
  const imageUrl = product.product_image?.[0]
    ? `${IMAGE_URL}${product.product_image[0]}`
    : "Image not available";

  const price = product.product_items[0]?.price
    ? `${parseFloat(product.product_items[0].price).toFixed(2)}`
    : "Price not available";

  return (
    <Link href={`/product`}>
      <div className="border border-gray-200 rounded-md w-[450px] h-[450px] mb-10">
        <div className="w-full h-[300px] relative">
          {product.product_image && product.product_image.length > 0 && (
            <Image
              src={imageUrl}
              alt="Product Image"
              layout="fill"
              objectFit="cover"
              objectPosition="center"
            />
          )}
        </div>
        <div className="mt-6 ml-6">
          <h6 className="text-secondary_text text-sm mb-5">
            {product.category.name}
          </h6>
          <h2 className="font-semibold text-black text-lg mb-2">
            {product.name}
          </h2>
          <h6 className="font-semibold text-black text-sm mb-2">${price}</h6>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
