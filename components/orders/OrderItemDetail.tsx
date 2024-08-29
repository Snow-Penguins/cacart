import React from "react";
import Image from "next/image";
import { OrderItem } from "@/entities/OrderItem";

interface OrderItemDetailProps {
  item: OrderItem;
}

const IMAGE_URL = `${process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL}`;

const OrderItemDetail: React.FC<OrderItemDetailProps> = ({ item }) => {
  const imageUrl = item.product.product_image?.[0]
    ? `${IMAGE_URL}${item.product.product_image[0]}`
    : "/images/imageNA.png";

  return (
    <div className="flex justify-between items-center border-b border-gray-300 py-8">
      <div className="flex items-center">
        <Image
          src={imageUrl}
          alt={item.product.name}
          width={80}
          height={80}
          className="w-20 h-20 object-cover mr-6 rounded"
        />
        <div>
          <h3 className="text-ml font-semibold">{item.product.name}</h3>
        </div>
      </div>
      <div className="flex items-center justify-between w-1/3">
        <div className="text-center">
          <div className="text-ml font-semibold">Qty: {item.quantity}</div>
        </div>
        <div className="flex flex-col items-end text-right">
          <div className="text-ml font-semibold">
            ${Number(item.price * item.quantity).toFixed(2)}
          </div>
          {item.quantity > 1 && (
            <div className="text-md text-gray-600">
              (each: ${Number(item.price).toFixed(2)})
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderItemDetail;
