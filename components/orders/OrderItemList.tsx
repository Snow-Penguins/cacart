import React from "react";
import OrderItemDetail from "./OrderItemDetail";
import type { OrderItemList } from "@/entities/OrderItem";

const OrderItemList: React.FC<OrderItemList> = ({ items }) => {
  return (
    <div>
      {items.map((item) => (
        <OrderItemDetail
          key={item.id}
          image={item.image}
          name={item.name}
          color={item.color}
          size={item.size}
          quantity={item.quantity}
          price={item.price}
          id={0}
        />
      ))}
    </div>
  );
};

export default OrderItemList;
