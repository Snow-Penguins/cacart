"use client";

import React, { useEffect, useState } from "react";
import ShippingAddress from "@/components/checkout/ShippingAddress";
import dynamic from "next/dynamic";
import { Address } from "@/entities/OrderItem";

const StripePayment = dynamic(
  () => import("@/components/checkout/StripePayment"),
  { ssr: false },
);

export default function Checkout() {
  const [shippingAddress, setShippingAddress] = useState<Partial<Address>>({});

  const handleSetShippingAddress = (address: Partial<Address>) => {
    setShippingAddress(address);
  };

  useEffect(() => {
    if (shippingAddress !== null) {
      console.log("----updated:", shippingAddress);
    }
  }, [shippingAddress]);

  return (
    <div className="flex divide-x">
      <div className="w-1/2 p-4 m grid gap-8">
        <ShippingAddress
          onSetShippingAddress={handleSetShippingAddress}
          address={shippingAddress}
        />
        <div>Summary</div>
      </div>
      <div className="w-1/2 p-4">
        <StripePayment shippingAddress={shippingAddress} />
      </div>
    </div>
  );
}
