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
    const secondsInAMinute = 60;
    const minutes = Math.floor(seconds / secondsInAMinute);
    const remainingSeconds = seconds % secondsInAMinute;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  return (
    <div className="tablet:flex divide-x mt-10 mb-20">
      <div className="tablet:w-1/2 p-4 m grid gap-8">
        <ShippingAddress
          onSetShippingAddress={handleSetShippingAddress}
          address={shippingAddress}
        />
        <hr></hr>
        <Summary cartItems={cartItems} totalAmount={totalAmount} />
      </div>
      <div className="tablet:w-1/2 p-4 mt-10 tablet:mt-0">
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
