import React from "react";
import OrderItemDetail from "./OrderItemDetail";
import { OrderItem } from "@/entities/OrderItem";

interface OrderItemListProps {
  items: OrderItem[];
}

const OrderItemList: React.FC<OrderItemListProps> = ({ items }) => {
  return (
    <div>
      {items.map((item) => (
        <OrderItemDetail key={item.id} item={item} />
      ))}
    </div>
  );
};

export default OrderItemList;
