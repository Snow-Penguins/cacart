"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { OrderDetails } from "@/entities/OrderItem";

interface OrderHistoryCardProps {
  order: OrderDetails;
}

const IMAGE_URL = `${process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL}`;

const OrderHistoryCard: React.FC<OrderHistoryCardProps> = ({ order }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <Link href={`/order-summary/${order.id}`}>
      <div className="border border-gray-200 rounded-lg mb-6 shadow-sm">
        <div className="bg-gray-100 p-4 rounded-t-lg flex justify-between items-center">
          <p className="text-primary_text">
            Ordered on {formatDate(order.order_date)}
          </p>
          <button className="text-sm text-gray-600 border border-gray-500 px-3 py-1 bg-white rounded-lg">
            Write a product review
          </button>
        </div>
        <div className="py-6 px-12">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="mb-2 font-semibold text-ml">{`${order.user.first_name} ${order.user.last_name}`}</p>
              <p className="font-semibold text-ml">#{order.id}</p>
            </div>
            <div className="text-right">
              <p className="text-primary_text mb-1 text-sm">
                Ordered on {formatDate(order.order_date)}
              </p>
              <p className="text-primary_text text-sm">
                Standard Shipping (CAD $ 8.00)
              </p>
            </div>
          </div>
          {order.order_histories.map((history, index) => (
            <div
              key={index}
              className="flex items-start justify-between space-x-4 mb-4"
            >
              <div className="flex items-start space-x-4">
                <Image
                  src={`${IMAGE_URL}${history.product_item.product.product_image}`}
                  alt={history.product_item.product.name}
                  width={80}
                  height={80}
                  className="w-20 h-20 object-cover mr-6 rounded"
                />
                <div>
                  <p className="text-ml mb-1 font-medium">
                    {history.product_item.product.name}
                  </p>
                  <p className="text-ml mb-1 font-medium">
                    ${(parseFloat(history.price) * history.qty).toFixed(2)}
                  </p>
                  <p className="text-sm text-primary_text">
                    Quantity: {history.qty}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Link>
  );
};

export default OrderHistoryCard;
