"use client";

import React, { useEffect, useState } from "react";
import ShippingAddress from "@/components/checkout/ShippingAddress";
import Summary from "@/components/checkout/Summary";
import dynamic from "next/dynamic";
import { Address } from "@/entities/OrderItem";
import { CartItem } from "@/entities/CartItem";

const StripePayment = dynamic(
  () => import("@/components/checkout/StripePayment"),
  { ssr: false },
);

export default function Checkout() {
  const [shippingAddress, setShippingAddress] = useState<Partial<Address>>({});
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [showPopup, setShowPopup] = useState<boolean>(false);

  const handleSetShippingAddress = (address: Partial<Address>) => {
    setShippingAddress(address);
  };

  useEffect(() => {
    async function fetchCartItems() {
      const buyNowProductString = localStorage.getItem("buyNowProduct");
      if (buyNowProductString) {
        const buyNowProduct = JSON.parse(buyNowProductString);
        setTotalAmount(buyNowProduct.price * buyNowProduct.quantity);
        setCartItems([
          {
            id: 0,
            qty: buyNowProduct.quantity,
            product_item: {
              id: buyNowProduct.productId,
              price: buyNowProduct.price,
              product: {
                name: buyNowProduct.name,
                product_image: [buyNowProduct.image],
              },
            },
          },
        ]);
        setCountdown(300);
      } else {
        const cartId = localStorage.getItem("cart_id");
        if (!cartId) {
          console.error("No cart ID found in local storage.");
          return;
        }

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/payments/get-cart-items`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ cartId: parseInt(cartId, 10) }),
          },
        );
        const data = await response.json();
        //hardcode for testing - will be removed when backend is merged
        data.cartItems = [
          {
            id: 8,
            cart_id: 5,
            product_item_id: 4,
            qty: 1,
            product_item: {
              id: 4,
              product_id: 4,
              SKU: "PRINT001",
              qty_in_stock: 20,
              qty_sold: 0,
              price: "150",
              created_at: "2024-05-05T22:59:21.013Z",
              updated_at: "2024-05-05T22:59:21.013Z",
              product: {
                id: 4,
                category_id: 47,
                name: "Abstract Art Print",
                description: "Modern Wall Art, Large Abstract Painting Print",
                product_image: ["abstract_art_print.jpg"],
                created_at: "2024-05-05T22:59:20.891Z",
                updated_at: "2024-05-24T05:52:37.514Z",
              },
            },
          },
          {
            id: 18,
            cart_id: 4,
            product_item_id: 1,
            qty: 2,
            product_item: {
              id: 1,
              product_id: 1,
              SKU: "NECKLACE001",
              qty_in_stock: 20,
              qty_sold: 0,
              price: "55.2",
              created_at: "2024-05-05T22:59:15.199Z",
              updated_at: "2024-05-05T22:59:15.199Z",
              product: {
                id: 1,
                category_id: 18,
                name: "Tiny Freshwater Pearl Necklace",
                description: "A dainty freshwater pearl necklace",
                product_image: ["tiny_freshwater_pearl_necklace.jpg"],
                created_at: "2024-05-05T22:59:15.060Z",
                updated_at: "2024-05-24T05:52:35.384Z",
              },
            },
          },
        ];

        console.log("Fetched cart items:", data.cartItems);
        setCartItems(data.cartItems);
        const total = data.cartItems.reduce((sum: number, item: CartItem) => {
          console.log(
            `Item price: ${item.product_item.price}, quantity: ${item.qty}`,
          );
          return sum + item.product_item.price * item.qty;
        }, 0);
        console.log("Calculated total amount:", total);
        setTotalAmount(total);
      }
    }

    fetchCartItems();
  }, []);

  useEffect(() => {
    if (countdown !== null) {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev !== null && prev <= 1) {
            clearInterval(timer);
            localStorage.removeItem("buyNowProduct");
            setShowPopup(true);
            return null;
          }
          return prev !== null ? prev - 1 : null;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [countdown]);

  const handleClosePopup = () => {
    setShowPopup(false);
    window.location.href = "/";
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  return (
    <div className="flex divide-x">
      <div className="w-1/2 p-4 m grid gap-8">
        <ShippingAddress
          onSetShippingAddress={handleSetShippingAddress}
          address={shippingAddress}
        />
        <hr></hr>
        <Summary cartItems={cartItems} totalAmount={totalAmount} />
      </div>
      <div className="w-1/2 p-4">
        <StripePayment
          shippingAddress={shippingAddress}
          cartItems={cartItems}
          totalAmount={totalAmount}
        />

        {countdown !== null && countdown > 0 && (
          <div className="text-red-500">
            Please complete the payment within {formatTime(countdown)}.
          </div>
        )}

        {showPopup && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-lg">
              <h3 className="text-red-500 text-md">
                Time expired. Please try again.
              </h3>
              <div className="flex justify-center">
                <button
                  onClick={handleClosePopup}
                  className="mt-4 px-4 py-2 bg-cyan-400 text-gray-300 rounded-md"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
