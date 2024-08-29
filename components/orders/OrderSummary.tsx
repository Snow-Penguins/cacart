import React from "react";
import { OrderSummaryProps } from "@/entities/OrderItem";

const OrderSummary: React.FC<OrderSummaryProps> = ({ subtotal, shipping }) => {
  const total = subtotal + shipping;

  return (
    <div className="mt-2 w-full max-w-sm">
      <div className="flex justify-between mb-2">
        <div className="text-ml font-semibold">Subtotal</div>
        <div className="text-ml font-semibold">${subtotal.toFixed(2)}</div>
      </div>
      <div className="flex justify-between mb-2">
        <div className="text-ml font-semibold">Shipping Cost(+)</div>
        <div className="text-ml font-semibold">${shipping.toFixed(2)}</div>
      </div>
      <hr className="border-gray-300 mb-4 mt-4" />
      <div className="flex justify-between text-lg font-semibold">
        <div className="text-ml font-semibold">Total</div>
        <div className="text-ml font-semibold">${total.toFixed(2)}</div>
      </div>
    </div>
  );
};

export default OrderSummary;
