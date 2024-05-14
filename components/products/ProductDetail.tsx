import React from "react";
import { Product } from "@/entities/Product";
import { useEffect, useState } from "react";

interface ProductDetailProps {
  productId: string;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ productId }) => {
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/products/${productId}`,
        );
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Failed to fetch product:", error);
      }
    }
    fetchProduct();
  }, [productId]);

  if (!product) {
    return null;
  }

  const values = product.product_items.flatMap(
    (item) => item.option_values?.map((ov) => ov.option_value.value) || [],
  );

  return (
    <div className="product-container flex bg-gray-200 p-20 w-[1440px] h-[840px] items-center">
      <div className="product-info flex-1">
        <h2 className="text-secondary_text text-lg mb-5 font-medium">
          {product.category.name}
        </h2>
        <div className="flex mb-10">
          <h3 className="text-h5 mr-10 font-bold">{product.name}</h3>
          <p className="text-h5">
            ${Number(product.product_items[0].price).toFixed(2)}
          </p>
        </div>
        <p className="text-md text-primary_text font-light mb-10">
          {product.description}
        </p>
        <div className="flex flex-col space-y-3">
          <label htmlFor="color-selection" className="text-md font-light">
            {product.category.options[0].option_name}
          </label>
          <select
            id="color-selection"
            className="select select-bordered w-[421px]"
          >
            {values.map((value, index) => (
              <option key={index} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>
        <div className="mt-10 flex">
          <button className="btn btn-outline text-primary rounded-full w-[190px] mr-10 text-md">
            Buy it Now
          </button>
          <button className="btn btn-outline text-primary rounded-full w-[190px]">
            Add to Basket
          </button>
        </div>
      </div>
      <div className="product-image flex-2 ml-32">
        {/* <Image
          src={product.imageUrl || "/images/default-product.jpg"}
          alt="Product Image"
          width={600}
          height={450}
          layout="fixed"
        /> */}
      </div>
    </div>
  );
};

export default ProductDetail;
