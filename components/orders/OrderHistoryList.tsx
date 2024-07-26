"use client";

import React, { useEffect, useState } from "react";
import OrderHistoryCard from "./OrderHistoryCard";

const SkeletonLoader: React.FC = () => {
  return (
    <div className="border border-gray-200 rounded-lg mb-6 shadow-sm animate-pulse">
      <div className="bg-gray-100 p-4 rounded-t-lg flex justify-between items-center">
        <div className="h-4 bg-gray-300 rounded w-1/3"></div>
        <div className="h-4 bg-gray-300 rounded w-1/4"></div>
      </div>
      <div className="py-6 px-12">
        <div className="flex justify-between items-start mb-4">
          <div className="pb-2 w-full">
            <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-1/4"></div>
          </div>
        </div>
        <div className="flex items-start justify-between space-x-4 mb-4">
          <div className="flex items-start space-x-4 w-full">
            <div className="w-20 h-20 bg-gray-300 rounded mr-6"></div>
            <div className="w-full">
              <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-1/4"></div>
            </div>
          </div>
          <div className="text-right w-1/4">
            <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

const OrderHistoryList: React.FC = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [userId, setUserId] = useState<number | null>(null);
  const [visibleCount, setVisibleCount] = useState<number>(2);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("cacartUser");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUserId(parsedUser.user_id);
    }
  }, []);

  useEffect(() => {
    if (userId !== null) {
      const fetchOrders = async () => {
        try {
          setIsLoading(true);
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/order/user/${userId}`,
          );
          const data = await response.json();
          console.log("Fetched orders:", data);

          const sortedOrders = Array.isArray(data)
            ? data.sort(
                (a, b) =>
                  new Date(b.order_date).getTime() -
                  new Date(a.order_date).getTime(),
              )
            : [];

          setOrders(sortedOrders);
        } catch (error) {
          console.error("Failed to fetch orders", error);
          setOrders([]);
        } finally {
          setIsLoading(false);
        }
      };

      fetchOrders();
    }
  }, [userId]);

  const handleShowMore = () => {
    setVisibleCount((prevCount) => prevCount + 2);
  };

  return (
    <div>
      {isLoading ? (
        <>
          <SkeletonLoader />
          <SkeletonLoader />
        </>
      ) : orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <>
          {orders.slice(0, visibleCount).map((order) => (
            <OrderHistoryCard key={order.id} order={order} />
          ))}
          {visibleCount < orders.length && (
            <button
              onClick={handleShowMore}
              className="text-blue-500 hover:text-blue-700"
            >
              Show more
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default OrderHistoryList;
