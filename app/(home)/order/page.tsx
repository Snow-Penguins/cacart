import React from "react";
import OrderHistoryList from "@/components/orders/OrderHistoryList";

export default function Page() {
  return (
    <div className="px-32 py-10">
      <h1 className="text-2xl font-semibold mb-6">Your Orders</h1>
      <OrderHistoryList />
    </div>
  );
}
