"use client";

import { useMemo, useState } from "react";
import { CartItem } from "@/entities/CartItem";
import CartItemCard from "./CartItemCard";
import CartSummary from "./CartSummary";

interface CartProps {
  initialCartItems: CartItem[];
}

// Temporary data for the shipping cost and discount amount
const shippingCost = 10.85;
const discount = 9;

const Cart: React.FC<CartProps> = ({ initialCartItems }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);

  // Update the quantity of a specific cart item
  const updateQuantity = (cartItem: CartItem, newQuantity: number) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item.id === cartItem.id) {
        return { ...item, quantity: newQuantity };
      }

      return item;
    });

    setCartItems(updatedCartItems);
  };

  // Remove a specific cart item from the cart
  const removeCartItem = (cartItem: CartItem) => {
    const updatedCartItems = cartItems.filter(
      (item) => item.id !== cartItem.id,
    );
    setCartItems(updatedCartItems);
  };

  // Calculate the subtotal based on cart items
  const subtotal = useMemo(() => {
    return cartItems.reduce(
      (sum, cartItem) => sum + cartItem.quantity * cartItem.price,
      0,
    );
  }, [cartItems]);

  return (
    <div className="mt-24 mb-44">
      {/* Cart page title */}
      <div className="text-center text-h3">YOUR CART</div>

      <div className="flex flex-wrap justify-center">
        {/* Cart item table */}
        <div className="w-3/5 min-w-[320px] max-w-4xl desktop:w-1/2 mt-14">
          {/* Cart item table header */}
          <div className="pb-1.5 flex flex-wrap border-b border-secondary_text font-medium text-body-lg text-primary_text">
            <div className="w-[300px] grow">PRODUCT</div>
            <div className="w-20 desktop:w-24">PRICE</div>
            <div className="w-[124px] desktop:w-[140px]">QUANTITY</div>
            <div className="w-20 desktop:w-24">TOTAL</div>
            <div className="w-4"></div>
          </div>

          {/* Render individual cart items as card columns */}
          {cartItems.map((cartItem) => {
            return (
              <CartItemCard
                key={cartItem.id}
                cartItem={cartItem}
                updateQuantity={updateQuantity}
                removeCartItem={removeCartItem}
              />
            );
          })}
        </div>

        {/* Cart Items Summary */}
        <CartSummary
          subtotal={subtotal}
          shippingCost={shippingCost}
          discount={discount}
        />
      </div>
    </div>
  );
};

export default Cart;
