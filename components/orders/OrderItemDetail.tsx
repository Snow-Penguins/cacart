import React from "react";
import Image from "next/image";
import { OrderItem } from "@/entities/OrderItem";

const OrderItemDetail: React.FC<OrderItem> = ({
  image,
  name,
  color,
  size,
  quantity,
  price,
}) => {
  return (
    <div className="flex justify-between items-center border-b border-gray-300 py-8">
      <div className="flex items-center">
        <Image
          src={image}
          alt="Order Item Image"
          width={80}
          height={80}
          className="w-20 h-20 object-cover mr-6 rounded"
        />
        <div>
          <h3 className="text-ml font-semibold">{name}</h3>
          <div className="flex space-x-4 mt-1">
            <div className="text-sm text-primary_text">Color: {color}</div>
            <div className="text-sm text-primary_text">Size: {size}</div>
          </div>
        </div>
      </div>
      <div className="flex items-center">
        <div className="text-center mr-28">
          <div className="text-ml font-semibold">Qty: {quantity}</div>
        </div>
        <div className="text-right">
          <div className="text-ml font-semibold">${price.toFixed(2)}</div>
        </div>
      </div>
    </div>
  );
};

export default OrderItemDetail;
