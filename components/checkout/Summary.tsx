import React from "react";
import { CartItem } from "@/entities/CartItem";
import OrderItemList from "@/components/orders/OrderItemList";
import OrderSummary from "@/components/orders/OrderSummary";

interface SummaryProps {
  cartItems: CartItem[];
  totalAmount: number;
}

const Summary: React.FC<SummaryProps> = ({ cartItems, totalAmount }) => {
  const items = cartItems.map((item) => ({
    // map the cart items to order items to make the prop same structure with OrderItemDetail
    price: item.product_item.price,
    qty: item.qty,
    product: item.product_item.product,
    product_item: item.product_item,
    id: item.id,
    quantity: item.qty,
  }));

  const shippingCost = 8.0;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Summary</h2>
      <OrderItemList items={items} />

      <div className="flex justify-end mt-10">
        <OrderSummary subtotal={totalAmount} shipping={shippingCost} />
      </div>
    </div>
  );
};

export default Summary;
