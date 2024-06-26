"use client";

import Image from "next/image";
import { CartItem } from "@/entities/CartItem";
import formatter from "@/utils/formatter";
import { FiMinusCircle, FiPlusCircle } from "react-icons/fi";
import { FaCircleXmark } from "react-icons/fa6";

interface CartItemProps {
  cartItem: CartItem;
  updateQuantity: (cartItem: CartItem, newQuantity: number) => void;
  removeCartItem: (cartItem: CartItem) => void;
}

const CartItemCard: React.FC<CartItemProps> = ({
  cartItem,
  updateQuantity,
  removeCartItem,
}) => {
  const decreaseQuantity = () => {
    if (cartItem.quantity > 1) {
      const newQuantity = cartItem.quantity - 1;
      updateQuantity(cartItem, newQuantity);
    }
  };

  const increaseQuantity = () => {
    const newQuantity = cartItem.quantity + 1;
    updateQuantity(cartItem, newQuantity);
  };

  const removeItem = () => {
    removeCartItem(cartItem);
  };

  return (
    <div className="py-7 flex flex-wrap items-center border-b border-secondary_text">
      <div className="w-[300px] my-4 grow flex items-center">
        <div className="w-[100px] h-[80px] relative ml-1 mr-5 shrink-0">
          <Image
            src={cartItem.image}
            alt="Cart Item Image"
            fill
            className="object-cover rounded-lg"
          />
        </div>

        <div className="mr-1">
          <div className="font-semibold text-body-lg text-primary_text">
            {cartItem.name}
          </div>
          <div className="text-primary_text">{cartItem.option}</div>
        </div>
      </div>

      <div className="w-20 desktop:w-24 font-medium">
        <div className="ml-1">{formatter.format(cartItem.price)}</div>
      </div>

      <div className="w-[124px] desktop:w-[140px]">
        <div className="px-2 inline-flex items-center bg-gray-200 rounded-full">
          <FiMinusCircle
            className="cursor-pointer text-body-lg text-secondary_text"
            onClick={decreaseQuantity}
          />
          <span className="mx-1 font-medium">{cartItem.quantity}</span>
          <FiPlusCircle
            className="cursor-pointer text-body-lg text-secondary_text"
            onClick={increaseQuantity}
          />
        </div>
      </div>

      <div className="w-20 desktop:w-24 font-medium">
        <div className="ml-1">
          {formatter.format(cartItem.price * cartItem.quantity)}
        </div>
      </div>

      <div className="w-4">
        <FaCircleXmark
          className="inline-block mb-1 cursor-pointer text-secondary_text"
          onClick={removeItem}
        />
      </div>
    </div>
  );
};

export default CartItemCard;
