"use client";
import React, { useEffect, useState } from "react";
import OrderItemList from "./OrderItemList";
import OrderSummary from "./OrderSummary";
import { OrderDetails, OrderItem } from "../../entities/OrderItem";

interface OrderConfirmationProps {
  orderId: number;
}

const OrderConfirmation: React.FC<OrderConfirmationProps> = ({ orderId }) => {
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrderDetails() {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/order/${orderId}`,
        );
        const data = await response.json();
        setOrderDetails(data);
      } catch (error) {
        console.error("Failed to fetch order details:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchOrderDetails();
  }, [orderId]);

  const SkeletonLoader = () => (
    <div className="bg-gray-200 py-8 px-20 animate-pulse">
      <div className="flex justify-between items-start mb-8">
        <div>
          <div className="h-8 bg-gray-300 rounded mb-4 w-48"></div>
          <div className="h-6 bg-gray-300 rounded mb-2 w-32"></div>
          <div className="h-6 bg-gray-300 rounded mb-8 w-64"></div>
        </div>
        <div className="text-right max-w-sm">
          <div className="h-6 bg-gray-300 rounded mb-2 w-64"></div>
          <div className="h-8 bg-gray-300 rounded w-24"></div>
        </div>
      </div>
      <div className="mt-8 mb-12">
        <div className="flex justify-start gap-16">
          <div className="flex flex-col">
            <div className="h-6 bg-gray-300 rounded mb-2 w-24"></div>
            <div className="h-6 bg-gray-300 rounded w-32"></div>
          </div>
          <div className="flex flex-col">
            <div className="h-6 bg-gray-300 rounded mb-2 w-24"></div>
            <div className="h-6 bg-gray-300 rounded w-32"></div>
          </div>
          <div className="flex flex-col">
            <div className="h-6 bg-gray-300 rounded mb-2 w-24"></div>
            <div className="h-6 bg-gray-300 rounded w-64"></div>
          </div>
        </div>
      </div>
      <hr className="border-gray-300" />
      <div className="flex justify-between items-center border-b border-gray-300 py-8">
        <div className="flex items-center">
          <div className="w-20 h-20 bg-gray-300 rounded mr-6"></div>
          <div>
            <div className="h-6 bg-gray-300 rounded w-32 mb-2"></div>
          </div>
        </div>
        <div className="flex items-center">
          <div className="text-center mr-28">
            <div className="h-6 bg-gray-300 rounded w-16"></div>
          </div>
          <div className="text-right">
            <div className="h-6 bg-gray-300 rounded w-16"></div>
          </div>
        </div>
      </div>
      <div className="mt-2 w-full max-w-sm ml-auto">
        <div className="flex justify-between mb-2">
          <div className="h-6 bg-gray-300 rounded w-24"></div>
          <div className="h-6 bg-gray-300 rounded w-16"></div>
        </div>
        <div className="flex justify-between mb-2">
          <div className="h-6 bg-gray-300 rounded w-32"></div>
          <div className="h-6 bg-gray-300 rounded w-16"></div>
        </div>
        <div className="flex justify-between mb-2">
          <div className="h-6 bg-gray-300 rounded w-24"></div>
          <div className="h-6 bg-gray-300 rounded w-16"></div>
        </div>
        <hr className="border-gray-300 mb-4 mt-4" />
        <div className="flex justify-between text-lg font-semibold">
          <div className="h-6 bg-gray-300 rounded w-32"></div>
          <div className="h-6 bg-gray-300 rounded w-16"></div>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return <SkeletonLoader />;
  }

  if (!orderDetails) {
    return <div>Order not found</div>;
  }

  const formatDate = (timestamp: Date) => {
    const date = new Date(timestamp);
    return new Intl.DateTimeFormat("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })
      .format(date)
      .replace(",", "");
  };

  const items: OrderItem[] = orderDetails.order_histories.map((history) => ({
    ...history.product_item,
    quantity: history.qty,
    price: parseFloat(history.price),
  }));

  const subtotal = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  const shipping = 8.0;

  return (
    <div className="bg-gray-200 py-8 px-20">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-h5 text-gray-800 mb-4">Your Order Confirmed!</h1>
          <p className="mb-2 text-ml">Hi, {orderDetails.user.first_name}!</p>
          <p className="text-primary_text mb-8 text-ml">
            Your order has been confirmed and will be shipping soon.
          </p>
        </div>
        <div className="text-right max-w-sm">
          <p className="text-primary_text">
            We&apos;ll send you shipping confirmation when your item(s) are on
            the way!
          </p>
          <p className="text-xl mt-2 font-semibold">Thank You!</p>
        </div>
      </div>
      <div className="mt-8 mb-12">
        <div className="flex justify-start gap-16">
          <div className="flex flex-col">
            <div className="text-ml font-semibold">Order Date</div>
            <div className="text-primary_text">
              {" "}
              {formatDate(new Date(orderDetails.order_date))}
            </div>
          </div>
          <div className="flex flex-col">
            <div className="text-ml font-semibold">Order Number</div>
            <div className="text-primary_text">#{orderDetails.id}</div>
          </div>
          <div className="flex flex-col">
            <div className="text-ml font-semibold">Shipping Address</div>
            <div className="text-primary_text">
              {`${orderDetails.shipping_address.address_line1}, ${orderDetails.shipping_address.city}, ${orderDetails.shipping_address.province}`}
            </div>
          </div>
        </div>
      </div>
      <hr className="border-gray-300" />
      <OrderItemList items={items} />
      <div className="flex justify-end mt-10">
        <OrderSummary subtotal={subtotal} shipping={shipping} />
      </div>
    </div>
  );
};

export default OrderConfirmation;
