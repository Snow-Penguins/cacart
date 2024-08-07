"use client";

import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { CartItem } from "@/entities/CartItem";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY ?? "",
);

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState<string>("");
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [paymentSuccess, setPaymentSuccess] = useState<boolean>(false);
  const shippingCost = 8.0;

  useEffect(() => {
    async function fetchCartItems() {
      const buyNowProductString = localStorage.getItem("buyNowProduct");
      if (buyNowProductString) {
        const buyNowProduct = JSON.parse(buyNowProductString);
        setTotalAmount(buyNowProduct.price * buyNowProduct.quantity);
        setCountdown(300);
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
    async function createPaymentIntent() {
      if (totalAmount > 0) {
        const amountInCents =
          Math.round(totalAmount * 100) + Math.round(shippingCost * 100);
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/payments/create-payment-intent`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ amount: amountInCents, currency: "usd" }),
            },
          );
          const data = await response.json();
          console.log("Payment Intent Response:", data);
          setClientSecret(data.clientSecret);
        } catch (error) {
          console.error("Failed to create payment intent:", error);
        }
      }
    }

    createPaymentIntent();
  }, [totalAmount]);

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

  const handlePayment = async () => {
    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement)!;

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
        billing_details: {
          name: "John Doe",
        },
      },
    });

    if (result.error) {
      console.log(result.error.message);
    } else {
      if (result.paymentIntent.status === "succeeded") {
        console.log("Payment succeeded!");
        setPaymentSuccess(true);
        alert("Payment successful!");

        try {
          const cacartUser = JSON.parse(
            localStorage.getItem("cacartUser") || "{}",
          );
          const userId = cacartUser.user_id;
          if (!userId) {
            throw new Error("User ID not found in localStorage");
          }

          const items = cartItems.map((item) => {
            console.log("Processing cart item:", item);
            return {
              productId: item.product_item.id,
              quantity: item.qty,
              price: item.product_item.price,
            };
          });

          console.log("Prepared items for order:", items);

          const orderData = {
            userId: userId,
            totalAmount: totalAmount + shippingCost,
            shippingMethodId: 1,
            orderStatusId: 1,
            shippingAddress: {
              address_line1: "123 Main St",
              city: "Calgary",
              province: "AB",
              postal_code: "A1B2C3 ",
            },
            items: items,
          };

          console.log("Sending order data:", JSON.stringify(orderData));

          const orderResponse = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/order/create`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(orderData),
            },
          );

          if (!orderResponse.ok) {
            throw new Error("Failed to create order");
          }

          const orderResult = await orderResponse.json();
          console.log("Order creation result:", orderResult);
          const orderId = orderResult.id;

          localStorage.removeItem("buyNowProduct");
          await clearCartItems();
          setTimeout(() => {
            console.log(`Redirecting to /order-confirmation/${orderId}`);
            window.location.href = `/order-confirmation/${orderId}`;
          }, 2000);
        } catch (error) {
          console.error("Error creating order:", error);
        }
      }
    }
  };

  const clearCartItems = async () => {
    const cartId = localStorage.getItem("cart_id");
    if (!cartId) {
      console.error("No cart ID found in local storage.");
      return;
    }

    try {
      for (const item of cartItems) {
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart/item/${item.id}`, {
          method: "DELETE",
        });
      }
      localStorage.removeItem("cart_id");
    } catch (error) {
      console.error("Failed to clear cart items:", error);
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    window.location.href = "/";
  };

  return (
    <div className="max-w-md p-12">
      <h3 className="text-gray-600 mb-2">Contact information</h3>
      <div className="shadow-md">
        <input
          type="email"
          placeholder="email@example.com"
          className="w-full p-1 border border-gray-300 rounded-md border-b-0"
        />
      </div>
      <div className="mb-4 shadow-md">
        <input
          type="tel"
          placeholder="(201) 555-0123"
          className="w-full p-1 border border-gray-300 rounded-md"
        />
      </div>
      <h3 className="text-gray-600 mb-2">Card information</h3>
      <CardElement className="p-2 border border-gray-300 rounded-md mb-8 shadow-md" />
      <div className="mb-4">
        <button
          onClick={handlePayment}
          disabled={!stripe}
          className="w-full py-2 bg-cyan-400 text-gray-300 rounded-md"
        >
          Pay ${(totalAmount + shippingCost).toFixed(2)}
        </button>
      </div>
      {countdown !== null && (
        <>
          {countdown > 0 && (
            <div className="text-red-500">
              Please complete the payment within {formatTime(countdown)}.
            </div>
          )}
        </>
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
  );
};

const StripePayment = () => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
};

export default StripePayment;
