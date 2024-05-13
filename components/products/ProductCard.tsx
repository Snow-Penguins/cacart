import React from "react";
import { Product } from "../../entities/Product";
import Link from "next/link";
import Image from "next/image";
import { formatToTimeAgo } from "@/lib/dataProcessing/formatToTimeAgo";

interface ProductCardProps {
  product: Product;
}

const IMAGE_URL = `${process.env.SUPABASE_STORAGE_URL}`;

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  // const imageUrl = product.product_image?.[0]
  //   ? `${IMAGE_URL}${product.product_image[0]}`
  //   : "Image not available";
  const imageUrl = product.product_image?.[0]
    ? `${IMAGE_URL}${product.product_image[0]}`
    : "/images/imageNA.png";

  return (
    <Link href={`/product`}>
      <div className="border border-gray-200 rounded-md w-[450px] h-[450px] mb-10">
        <div className="w-full h-[300px] relative">
          <Image
            src={imageUrl}
            alt="Product Image"
            layout="fill"
            objectFit="cover"
            objectPosition="center"
          />
        </div>
        <div className="mt-6 mx-6">
          <div className="flex flex-row justify-between">
            <h6 className="text-secondary_text text-sm mb-5">
              {product.category.name}
            </h6>
            <h6 className="text-secondary_text text-sm mb-5">
              {formatToTimeAgo(product.created_at.toLocaleString())}
            </h6>
          </div>
          <h2 className="font-semibold text-black text-lg mb-2">
            {product.name}
          </h2>
          <h6 className="font-semibold text-black text-sm mb-2">
            ${product.product_items[0].price}
          </h6>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
