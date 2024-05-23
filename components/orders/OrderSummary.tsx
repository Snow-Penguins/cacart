import React from "react";
import type { OrderSummary } from "@/entities/OrderItem";

const OrderSummary: React.FC<OrderSummary> = ({
  subtotal,
  shipping,
  discount,
}) => {
  const total = subtotal + shipping - discount;

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
      <div className="flex justify-between mb-2">
        <div className="text-ml font-semibold">Discount(-)</div>
        <div className="text-ml font-semibold">${discount.toFixed(2)}</div>
      </div>
      <hr className="border-gray-300 mb-4 mt-4" />
      <div className="flex justify-between text-lg font-semibold">
        <div className="text-ml font-semibold">Total Payable</div>
        <div className="text-ml font-semibold">${total.toFixed(2)}</div>
      </div>
    </div>
  );
};

export default OrderSummary;
