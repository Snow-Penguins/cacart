import React from "react";
import ItemsListComponent from "./OrderItemList";
import OrderSummary from "./OrderSummary";

const OrderConfirmationComponent: React.FC = () => {
  const name = "Musharoff";
  const date = "25 March, 2025";
  const orderNumber = "127853";
  const paymentMethod = "Visa - 3324";
  const shippingAddress = "New York, USA 2707 Davis Avenue";
  const items = [
    {
      id: 1,
      image: "/images/product1.jpg",
      name: "Mist Black Triblend",
      color: "White",
      size: "Medium",
      quantity: 1,
      price: 199.0,
    },
    {
      id: 2,
      image: "/images/product2.jpg",
      name: "Yellow Hollow Port",
      color: "Yellow",
      size: "Small",
      quantity: 1,
      price: 59.0,
    },
  ];

  const subtotal = items.reduce((acc, item) => acc + item.price, 0);
  const shipping = 10.85;
  const discount = 9.0;

  return (
    <div className="bg-gray-200 py-8 px-20">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-h5 text-gray-800 mb-4">Your Order Confirmed!</h1>
          <p className="mb-2 text-ml">Hi, {name}!</p>
          <p className="text-primary_text mb-8 text-ml">
            Your order has been confirmed and will be shipping soon.
          </p>
        </div>
        <div className="text-right max-w-sm">
          <p className="text-primary_text">
            We&apos;ll send you shipping confirmation when your item(s) are on
            the way!
          </p>
          <p className="text-xl mt-2 font-semibold">Thank You!</p>
        </div>
      </div>
      <div className="mt-8 mb-12">
        <div className="flex justify-start gap-16">
          <div className="flex flex-col">
            <div className="text-ml font-semibold">Order Date</div>
            <div className="text-primary_text">{date}</div>
          </div>
          <div className="flex flex-col">
            <div className="text-ml font-semibold">Order Number</div>
            <div className="text-primary_text">#{orderNumber}</div>
          </div>
          <div className="flex flex-col">
            <div className="text-ml font-semibold">Payment</div>
            <div className="text-primary_text">{paymentMethod}</div>
          </div>
          <div className="flex flex-col">
            <div className="text-ml font-semibold">Shipping Address</div>
            <div className="text-primary_text">{shippingAddress}</div>
          </div>
        </div>
      </div>
      <hr className="border-gray-300" />
      <ItemsListComponent items={items} />
      <div className="flex justify-end mt-10">
        <OrderSummary
          subtotal={subtotal}
          shipping={shipping}
          discount={discount}
        />
      </div>
    </div>
  );
};

export default OrderConfirmationComponent;
