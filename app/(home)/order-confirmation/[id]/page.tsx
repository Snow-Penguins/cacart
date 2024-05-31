import React from "react";
import OrderConfirmationComponent from "@/components/orders/OrderConfirmation";

type Props = {
  params: { id: string };
};
export default function OrderConfirmation({ params }: Props) {
  return <OrderConfirmationComponent orderId={parseInt(params.id)} />;
}
