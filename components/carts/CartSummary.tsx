"use client";

import formatter from "@/utils/formatter";

interface CartSummaryProps {
  subtotal: number;
  shippingCost: number;
  discount: number;
}

const CartSummary: React.FC<CartSummaryProps> = ({
  subtotal,
  shippingCost,
  discount,
}) => {
  const total = subtotal + shippingCost - discount;

  return (
    <div className="w-[300px] desktop:w-96 mt-20 mx-5 desktop:mx-8">
      <div className="border-2 border-gray-200 rounded-lg">
        <div className="p-3 bg-gray-200 font-medium">Order Summary</div>

        <div className="px-4 pt-6 flex justify-between">
          <div>Subtotal</div>
          <div className="font-medium">{formatter.format(subtotal)}</div>
        </div>

        <div className="px-4 pt-5 flex justify-between">
          <div>Shipping Cost (+)</div>
          <div className="font-medium">{formatter.format(shippingCost)}</div>
        </div>

        <div className="px-4 py-5 flex justify-between">
          <div>Discount (-)</div>
          <div className="font-medium">{formatter.format(discount)}</div>
        </div>

        <div className="px-4 py-6 border-t-2 border-gray-200 flex justify-between">
          <div>Total Payable</div>
          <div className="font-medium">{formatter.format(total)}</div>
        </div>
      </div>

      <button className="w-full mt-5 py-3 bg-primary rounded-lg text-center font-medium text-white">
        Checkout
      </button>
    </div>
  );
};

export default CartSummary;
