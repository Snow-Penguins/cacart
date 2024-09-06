import React, { useState, useEffect } from "react";
import { Product } from "@/entities/Product";
import Image from "next/image";

interface ProductDetailProps {
  productId: string;
  onBuyItNow: (product: any) => void;
}

const IMAGE_URL = `${process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL}`;

const ProductDetail: React.FC<ProductDetailProps> = ({
  productId,
  onBuyItNow,
}) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false);

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
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [productId]);

  const addToCart = async () => {
    const userString = localStorage.getItem("cacartUser");
    if (!userString) {
      alert("Please log in first.");
      return;
    }

    const user = JSON.parse(userString);
    const token = user?.access_token;
    const userId = user?.user_id;

    console.log("User ID:", userId);
    console.log("Token:", token);

    if (!userId || !token) {
      alert("Please log in first.");
      return;
    }

    let cartId = localStorage.getItem("cart_id");

    if (!cartId) {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/cart/${userId}/add`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              productItemId: product?.product_items[0].id,
              quantity: 1,
            }),
          },
        );

        if (response.ok) {
          const cart = await response.json();
          localStorage.setItem("cart_id", cart.id);
          alert("Item added to cart!");
          setShowPopup(true);
        } else {
          alert("Failed to add item to cart.");
        }
      } catch (error) {
        console.error("Failed to add item to cart:", error);
      }
    } else {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/cart/${userId}/add`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              productItemId: product?.product_items[0].id,
              quantity: 1,
            }),
          },
        );

        if (response.ok) {
          alert("Item added to cart!");
          setShowPopup(true);
        } else {
          alert("Failed to add item to cart.");
        }
      } catch (error) {
        console.error("Failed to add item to cart:", error);
      }
    }
  };

  const handleContinueShopping = () => {
    setShowPopup(false);
  };

  const handleGoToCart = () => {
    window.location.href = "/cart";
  };

  const SkeletonLoader = () => (
    <div className="product-container flex tablet:flex-row-reverse flex-wrap bg-gray-200 p-2 max-w-[1440px] justify-evenly items-center animate-pulse">
      <div className="product-image bg-gray-400 rounded w-full tablet:w-[600px] h-[450px] tablet:m-10"></div>
      <div className="product-info w-full max-w-[600px] my-10 tablet:m-10">
        <div className="h-6 bg-gray-400 rounded w-3/4 mb-5"></div>
        <div className="flex mb-10 justify-between gap-2.5">
          <div className="h-8 bg-gray-400 rounded w-1/2 mr-10"></div>
          <div className="h-8 bg-gray-400 rounded w-1/4"></div>
        </div>
        <div className="h-5 bg-gray-400 rounded w-full mb-10"></div>
        <div className="mt-5 flex flex-wrap justify-around">
          <div className="btn bg-gray-400 rounded-full w-2/5 min-w-[190px] mt-5 h-10"></div>
          <div className="btn bg-gray-400 rounded-full w-2/5 min-w-[190px] mt-5 h-10"></div>
        </div>
      </div>
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
    <div className="product-container flex tablet:flex-row-reverse flex-wrap bg-gray-200 p-2 max-w-[1440px] justify-evenly items-center">
      <div className="product-image relative w-full tablet:w-[600px] h-[450px] tablet:m-10">
        <Image
          src={imageUrl}
          alt="Product Image"
          fill
          className="object-cover"
          priority
          sizes="100%"
        />
      </div>
      <div className="product-info w-full max-w-[600px] my-10 tablet:m-10">
        <h2 className="text-secondary_text text-lg mb-5 font-medium">
          {product.category.name}
        </h2>
        <div className="flex mb-10 justify-between gap-2.5">
          <h3 className="text-h5 mr-10 font-bold">{product.name}</h3>
          <p className="text-h5">
            ${Number(product.product_items[0].price).toFixed(2)}
          </p>
        </div>
        <p className="text-md text-primary_text font-light mb-10">
          {product.description}
        </p>
        <div className="mt-5 flex flex-wrap justify-around">
          <button
            className="btn btn-outline text-primary rounded-full w-2/5 min-w-[190px] mt-5"
            onClick={() => onBuyItNow(product)}
          >
            Buy it Now
          </button>
          <button
            className="btn btn-outline text-primary rounded-full w-2/5 min-w-[190px] mt-5"
            onClick={addToCart}
          >
            Add to Basket
          </button>
        </div>
      </div>
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md mx-auto text-center">
            <h3 className="text-md font-semibold text-black mb-4">
              Would you like to continue shopping or go to the cart page?
            </h3>
            <div className="text-md flex space-x-4 justify-center">
              <button
                onClick={handleContinueShopping}
                className="px-4 py-2 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200"
              >
                Continue Shopping
              </button>
              <button
                onClick={handleGoToCart}
                className="px-4 py-2 bg-cyan-400 text-white rounded-md"
              >
                Go to Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
