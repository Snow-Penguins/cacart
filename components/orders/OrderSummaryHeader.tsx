"use client";

import React, { useEffect, useState } from "react";

interface OrderSummaryHeaderProps {
  orderId: number;
}

const OrderSummaryHeader: React.FC<OrderSummaryHeaderProps> = ({ orderId }) => {
  const [order, setOrder] = useState<any>(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/order/${orderId}`,
        );
        const data = await response.json();
        setOrder(data);
      } catch (error) {
        console.error("Failed to fetch order", error);
      }
    };

    fetchOrder();
  }, [orderId]);

  if (!order) {
    return (
      <div className="flex justify-between items-center mb-12 px-16 animate-pulse">
        <div className="h-8 bg-gray-300 rounded w-48"></div>
        <div className="h-8 bg-gray-300 rounded w-24"></div>
      </div>
    );
  }

  return (
    <div className="flex justify-between items-center mb-12 px-16">
      <h1 className="text-2xl font-semibold">Order Summary</h1>
      <p className="text-lg font-medium ">Order #{order.id}</p>
    </div>
  );
};

export default OrderSummaryHeader;
