"use client";

import { useEffect, useState, useRef } from "react";
import { OrderItem } from "@/entities/OrderItem";
import CartItemCard from "./CartItemCard";
import CartSummary from "./CartSummary";

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<OrderItem[]>([]);
  const [loading, setLoading] = useState(true);
  const hasRedirected = useRef(false);

  useEffect(() => {
    if (hasRedirected.current) return;

    const user = localStorage.getItem("cacartUser");
    const cartId = localStorage.getItem("cart_id");
    console.log(`Fetching cart items for cart ID: ${cartId}`);

    if (!user) {
      hasRedirected.current = true;
      alert("Please login to access this page.");
      window.location.href = "/auth/signin";
      return;
    }

    if (cartId) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart/${cartId}`)
        .then((response) => response.json())
        .then((data) => {
          setCartItems(data.cart_items);
          console.log(`Cart items fetched:`, data.cart_items);
        })
        .catch((error) => console.error("Error fetching cart items:", error))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const updateQuantity = (updatedItem: OrderItem, newQuantity: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === updatedItem.id ? { ...item, qty: newQuantity } : item,
      ),
    );
  };

  const removeCartItem = (removedItem: OrderItem) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== removedItem.id),
    );
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mt-24 mb-44">
      <div className="text-center text-h3">YOUR CART</div>
      <div className="flex flex-wrap justify-center">
        <div className="w-3/5 min-w-[320px] max-w-4xl desktop:w-1/2 mt-14">
          <div className="pb-1.5 flex flex-wrap border-b border-secondary_text font-medium text-body-lg text-primary_text">
            <div className="w-[300px] grow">PRODUCT</div>
            <div className="w-20 desktop:w-24">PRICE</div>
            <div className="w-[124px] desktop:w-[140px]">QUANTITY</div>
            <div className="w-20 desktop:w-24">TOTAL</div>
            <div className="w-4"></div>
          </div>
          {cartItems.map((cartItem) => (
            <CartItemCard
              key={cartItem.id}
              cartItem={cartItem}
              updateQuantity={updateQuantity}
              removeCartItem={removeCartItem}
            />
          ))}
        </div>
        <CartSummary cartItems={cartItems} />
      </div>
    </div>
  );
};

export default Cart;
