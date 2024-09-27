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
import { Address } from "@/entities/OrderItem";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY ?? "",
);

interface CheckoutFormProps {
  shippingAddress: Partial<Address>;
  cartItems: CartItem[];
  totalAmount: number;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({
  shippingAddress,
  cartItems,
  totalAmount,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState<string>("");
  const [paymentSuccess, setPaymentSuccess] = useState<boolean>(false);
  const [showAddressError, setShowAddressError] = useState<boolean>(false);
  const [isAddressFilled, setIsAddressFilled] = useState<boolean>(false);
  const shippingCost = 8.0;

  useEffect(() => {
    const addressFilled =
      !!shippingAddress.address_line1 &&
      !!shippingAddress.city &&
      !!shippingAddress.province &&
      !!shippingAddress.postal_code;

    setIsAddressFilled(addressFilled);
  }, [shippingAddress]);

  useEffect(() => {
    if (isAddressFilled) {
      setShowAddressError(false);
    } else {
      setShowAddressError(true);
    }
  }, [isAddressFilled]);

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
            shippingAddress: shippingAddress,
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

  return (
    <div className="max-w-md">
      <h2 className="text-xl font-bold mb-4">Payment method</h2>
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
          disabled={!stripe || !isAddressFilled}
          className={`w-full py-2 ${
            !stripe || !isAddressFilled
              ? "bg-gray-200  text-gray-600"
              : "bg-primary text-white"
          } rounded-md`}
        >
          Pay ${(totalAmount + shippingCost).toFixed(2)}
        </button>
      </div>

      {showAddressError && (
        <div className="text-red-500 mb-4">
          Please fill in all required address fields before proceeding with
          payment.
        </div>
      )}
    </div>
  );
};

interface StripePaymentProps {
  shippingAddress: Partial<Address>;
  cartItems: CartItem[];
  totalAmount: number;
}

const StripePayment: React.FC<StripePaymentProps> = ({
  shippingAddress,
  cartItems,
  totalAmount,
}) => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm
        shippingAddress={shippingAddress}
        cartItems={cartItems}
        totalAmount={totalAmount}
      />
    </Elements>
  );
};

export default StripePayment;
