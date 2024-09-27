import React from "react";
import OrderSummaryHeader from "@/components/orders/OrderSummaryHeader";
import OrderSummaryDetails from "@/components/orders/OrderSummaryDetails";
import OrderSummaryFooter from "@/components/orders/OrderSummaryFooter";

type Props = {
  params: { orderId: string };
};

export default function OrderSummaryPage({ params }: Props) {
  const orderId = parseInt(params.orderId, 10);

  return (
    <div className="px-32 py-10 mb-32">
      <OrderSummaryHeader orderId={orderId} />
      <OrderSummaryDetails orderId={orderId} />
      <OrderSummaryFooter orderId={orderId} />
    </div>
  );
}
