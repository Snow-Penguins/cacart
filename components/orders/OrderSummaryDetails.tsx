"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

interface OrderSummaryDetailsProps {
  orderId: number;
}

const OrderSummaryDetails: React.FC<OrderSummaryDetailsProps> = ({
  orderId,
}) => {
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
      <div className="bg-gray-200 p-10 tablet:p-20 mb-12 animate-pulse">
        <div className="tablet:flex justify-between mb-6">
          <div className="tablet:w-1/2">
            <div className="h-6 bg-gray-300 rounded mb-2 w-32"></div>
            <div className="h-4 bg-gray-300 rounded w-40"></div>
          </div>
          <div className="tablet:w-1/2 mt-3 tablet:mt-0">
            <div className="h-6 bg-gray-300 rounded mb-2 w-32 tablet:ml-auto"></div>
            <div className="h-4 bg-gray-300 rounded mb-2 w-40 tablet:ml-auto"></div>
            <div className="h-4 bg-gray-300 rounded mb-2 w-40 tablet:ml-auto"></div>
            <div className="h-4 bg-gray-300 rounded mb-2 w-40 tablet:ml-auto"></div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-md">
          <div className="tablet:flex items-center justify-between mb-4">
            <div className="tablet:flex items-center tablet:w-2/4">
              <div className="w-20 h-20 bg-gray-300 rounded"></div>
              <div className="tablet:ml-4 mt-2 tablet:mt-0">
                <div className="h-4 bg-gray-300 rounded w-24"></div>
              </div>
            </div>
            <div className="tablet:w-1/4 mt-2 tablet:mt-0">
              <div className="h-4 bg-gray-300 rounded w-16 tablet:float-right"></div>
            </div>
            <div className="tablet:w-1/4 mt-2 tablet:mt-0">
              <div className="h-4 bg-gray-300 rounded w-16 tablet:float-right"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-200 p-10 tablet:p-20 mb-12">
      <div className="tablet:flex justify-between mb-6">
        <div className="tablet:w-1/2">
          <h3 className="font-medium text-lg mb-2">Note:</h3>
          <p className="text-primary_text text-md">
            Your order has been confirmed and will be shipping soon.
          </p>
        </div>
        <div className="tablet:w-1/2 tablet:text-right mt-3 tablet:mt-0">
          <h3 className="font-medium text-lg mb-2">Receiver Details</h3>
          <p className="text-primary_text mb-1">
            Name: {order.user.first_name} {order.user.last_name}
          </p>
          <p className="text-primary_text mb-1">
            Email: {order.user.email_address}
          </p>
          <p className="text-primary_text mb-1">
            Address:{" "}
            {`${order.shipping_address.address_line1}, ${order.shipping_address.city}, ${order.shipping_address.province}`}
          </p>
        </div>
      </div>
      <div className="bg-white p-4 rounded-md">
        {order.order_histories.map((history: any) => (
          <div
            key={history.product_item.id}
            className="tablet:flex items-center justify-between"
          >
            <div className="tablet:flex items-center tablet:w-2/4 mb-2 mt-2">
              <Image
                src={`${process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL}${history.product_item.product.product_image}`}
                alt={history.product_item.product.name}
                width={80}
                height={80}
                className="w-20 h-20 object-cover rounded"
              />
              <div className="tablet:ml-4 mt-2 tablet:mt-0">
                <p className="font-medium">
                  {history.product_item.product.name}
                </p>
              </div>
            </div>
            <p className="tablet:w-1/4 tablet:text-right font-medium">
              Qty: {history.qty}
            </p>
            <p className="tablet:w-1/4 tablet:text-right font-medium">
              ${history.price}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderSummaryDetails;
