import React from "react";
import ShippingAddress from "@/components/checkout/ShippingAddress";
import dynamic from "next/dynamic";

const StripePayment = dynamic(
  () => import("@/components/checkout/StripePayment"),
  { ssr: false },
);

export default function Checkout() {
  return (
    <div className="flex divide-x">
      <div className="w-1/2 p-4 m grid gap-8">
        <ShippingAddress />
        <div>Summary</div>
      </div>
      <div className="w-1/2 p-4">
        <StripePayment />
      </div>
    </div>
  );
}
