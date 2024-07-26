"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

interface OrderSummaryFooterProps {
  orderId: number;
}

const OrderSummaryFooter: React.FC<OrderSummaryFooterProps> = ({ orderId }) => {
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
      <div className="p-6 rounded-lg animate-pulse">
        <div className="flex justify-between mb-6">
          <div className="w-1/3">
            <div className="h-6 bg-gray-300 rounded mb-4 w-32"></div>
            <div className="h-4 bg-gray-300 rounded w-48"></div>
          </div>
          <div className="w-1/3">
            <div className="h-6 bg-gray-300 rounded mb-4 w-32"></div>
            <div className="h-4 bg-gray-300 rounded w-48"></div>
          </div>
          <div className="mt-2 w-1/3 max-w-sm">
            <div className="flex justify-between mb-2">
              <div className="h-4 bg-gray-300 rounded w-24"></div>
              <div className="h-4 bg-gray-300 rounded w-16"></div>
            </div>
            <div className="flex justify-between mb-2">
              <div className="h-4 bg-gray-300 rounded w-32"></div>
              <div className="h-4 bg-gray-300 rounded w-16"></div>
            </div>
            <div className="flex justify-between mb-2">
              <div className="h-4 bg-gray-300 rounded w-24"></div>
              <div className="h-4 bg-gray-300 rounded w-16"></div>
            </div>
            <hr className="border-gray-300 mb-4 mt-4" />
            <div className="flex justify-between text-lg font-semibold">
              <div className="h-4 bg-gray-300 rounded w-32"></div>
              <div className="h-4 bg-gray-300 rounded w-16"></div>
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <div className="h-10 bg-gray-300 rounded w-32"></div>
        </div>
      </div>
    );
  }
  const subtotal = order.order_histories.reduce(
    (acc: number, history: any) =>
      acc + parseFloat(history.price) * history.qty,
    0,
  );
  const shipping = 8.0;

  return (
    <div className="p-6 rounded-lg">
      <div className="flex justify-between mb-6">
        <div className="w-1/3">
          <h2 className="font-medium text-lg mb-2">Shipping Method</h2>
          <p className="text-gray-600">FedEx - Take up to 3 working days</p>
        </div>
        <div className="w-1/3">
          <h2 className="font-medium text-lg mb-2">Payment Method</h2>
          <p className="text-gray-600">Apply Pay Mastercard</p>
        </div>
        <div className="mt-2 w-1/3 max-w-sm">
          <div className="flex justify-between mb-2">
            <div className="text-ml font-medium text-gray-600">Subtotal</div>
            <div className="text-ml font-medium">${subtotal.toFixed(2)}</div>
          </div>
          <div className="flex justify-between mb-2">
            <div className="text-ml font-medium text-gray-600">
              Shipping Cost(+)
            </div>
            <div className="text-ml font-medium">${shipping.toFixed(2)}</div>
          </div>
          <hr className="border-gray-300 mb-4 mt-4" />

          <div className="flex justify-between text-lg font-semibold">
            <div className="text-ml font-medium text-gray-600">Total Paid</div>
            <p>
              <span className="text-ml font-medium">
                ${(subtotal + shipping).toFixed(2)}
              </span>
            </p>
          </div>
        </div>
      </div>
      <Link href="/">
        <div className="flex justify-end">
          <button className="bt-white border border-primary w-1/3 text-primary px-4 py-2 rounded">
            Continue Shopping
          </button>
        </div>
      </Link>
    </div>
  );
};

export default OrderSummaryFooter;
