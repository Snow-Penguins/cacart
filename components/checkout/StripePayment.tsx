"use client";

import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY ?? "",
);

interface CartItem {
  qty: number;
  product_item: {
    price: number;
  };
}

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState<string>("");
  const [totalAmount, setTotalAmount] = useState<number>(0);

  useEffect(() => {
    // Fetch cart items and calculate the total amount
    async function fetchCartItems() {
      try {
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
        const total = data.cartItems.reduce((sum: number, item: CartItem) => {
          console.log(
            `Item price: ${item.product_item.price}, quantity: ${item.qty}`,
          );
          return sum + item.product_item.price * item.qty;
        }, 0);
        console.log("Calculated total amount:", total);
        setTotalAmount(total);
      } catch (error) {
        console.error("Failed to fetch cart items:", error);
      }
    }

    fetchCartItems();
  }, []);

  useEffect(() => {
    // Create a payment intent with the total amount
    async function createPaymentIntent() {
      if (totalAmount > 0) {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/payments/create-payment-intent`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ amount: totalAmount, currency: "usd" }),
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
        alert("Payment successful!");
      }
    }
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
          Pay ${totalAmount.toFixed(2)}
        </button>
      </div>
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
