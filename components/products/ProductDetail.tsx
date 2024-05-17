import React from "react";
import { Product } from "@/entities/Product";
import { useEffect, useState } from "react";
import Image from "next/image";

interface ProductDetailProps {
  productId: string;
}

const IMAGE_URL = `${process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL}`;

const ProductDetail: React.FC<ProductDetailProps> = ({ productId }) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProduct() {
      try {
        // const response = await fetch(
        //   `${process.env.NEXT_PUBLIC_API_URL}/products/${productId}`,
        // );
        // const data = await response.json();
        // setProduct(data);
        const mockProduct: Product = {
          id: 1,
          name: "Product Name",
          description: "Product Description",
          category: {
            name: "Category Name",
            options: [
              {
                id: 1,
                option_name: "Color",
              },
            ],
          },
          product_items: [
            {
              id: 1,
              price: 100,
              option_values: [
                {
                  id: 1,
                  option_value: {
                    id: 1,
                    value: "Red",
                  },
                },
              ],
            },
          ],
          category_id: 0,
          product_image: [],
          created_at: new Date(),
        };
        setProduct(mockProduct);
      } catch (error) {
        console.error("Failed to fetch product:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [productId]);

  const SkeletonLoader = () => (
    <div className="product-container flex bg-gray-200 p-20 w-[1440px] h-[840px] items-center animate-pulse">
      <div className="product-info flex-1">
        <div className="h-6 bg-gray-400 rounded w-3/4 mb-5"></div>
        <div className="flex mb-10">
          <div className="h-8 bg-gray-400 rounded w-1/2 mr-10"></div>
          <div className="h-8 bg-gray-400 rounded w-1/4"></div>
        </div>
        <div className="h-5 bg-gray-400 rounded w-full mb-10"></div>
        <div className="flex flex-col space-y-3">
          <div className="h-5 bg-gray-400 rounded w-1/4 mb-2"></div>
          <div className="h-12 bg-gray-400 rounded w-[421px]"></div>
        </div>
        <div className="mt-10 flex">
          <div className="btn bg-gray-400 rounded-full w-[190px] mr-10 h-10"></div>
          <div className="btn bg-gray-400 rounded-full w-[190px] h-10"></div>
        </div>
      </div>
      <div className="product-image flex-2 ml-32 bg-gray-400 rounded w-[600px] h-[450px]"></div>
    </div>
  );

  if (loading) {
    return <SkeletonLoader />;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  const values = product.product_items.flatMap(
    (item) => item.option_values?.map((ov) => ov.option_value.value) || [],
  );

  const imageUrl = product.product_image?.[0]
    ? `${IMAGE_URL}${product.product_image[0]}`
    : "/images/imageNA.png";

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
      <div className="product-image flex-2 ml-32 relative w-[600px] h-[450px]">
        <Image src={imageUrl} alt="Product Image" fill />
      </div>
    </div>
  );
};

export default ProductDetail;
