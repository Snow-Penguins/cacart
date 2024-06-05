"use client";

import React, { useEffect, useState } from "react";
import OrderHistoryCard from "./OrderHistoryCard";

const OrderHistoryList: React.FC = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const userId = 5;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/order/user/${userId}`,
        );
        const data = await response.json();
        setOrders(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to fetch orders", error);
        setOrders([]);
      }
    };

    fetchOrders();
  }, [userId]);

  return (
    <div>
      {orders.map((order) => (
        <OrderHistoryCard key={order.id} order={order} />
      ))}
    </div>
  );
};

export default OrderHistoryList;
