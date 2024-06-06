import React from "react";
import ShippingAddress from "@/components/checkout/ShippingAddress";

export default function Checkout() {
  return (
    <div className="columns-2 divide-x">
      <div>
        <div>
          <ShippingAddress />
        </div>
        <div>Summary</div>
      </div>
      <div>Stripe</div>
    </div>
  );
}
