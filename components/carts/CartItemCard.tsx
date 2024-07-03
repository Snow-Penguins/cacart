"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { OrderItem } from "@/entities/OrderItem";
import formatter from "@/utils/formatter";
import { FiMinusCircle, FiPlusCircle } from "react-icons/fi";
import { FaCircleXmark } from "react-icons/fa6";

interface CartItemProps {
  cartItem: OrderItem;
  updateQuantity: (cartItem: OrderItem, newQuantity: number) => void;
  removeCartItem: (cartItem: OrderItem) => void;
}

const IMAGE_URL = `${process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL}`;

const CartItemCard: React.FC<CartItemProps> = ({
  cartItem,
  updateQuantity,
  removeCartItem,
}) => {
  const [quantity, setQuantity] = useState<number>(cartItem.qty || 1);

  useEffect(() => {
    setQuantity(cartItem.qty || 1);
  }, [cartItem.qty]);

  const handleUpdateQuantity = async (newQuantity: number) => {
    if (newQuantity == null) {
      console.error("Quantity is null or undefined");
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/cart/item/${cartItem.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ quantity: newQuantity }),
        },
      );

      if (!response.ok) {
        throw new Error("Failed to update quantity");
      }

      setQuantity(newQuantity);
      updateQuantity(cartItem, newQuantity);
    } catch (error) {
      console.error("Error updating cart item quantity:", error);
    }
  };

  const handleRemoveItem = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/cart/item/${cartItem.id}`,
        {
          method: "DELETE",
        },
      );

      if (!response.ok) {
        throw new Error("Failed to remove item");
      }

      removeCartItem(cartItem);
    } catch (error) {
      console.error("Error removing cart item:", error);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      handleUpdateQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    handleUpdateQuantity(quantity + 1);
  };

  const imageUrl = cartItem.product_item?.product?.product_image?.[0]
    ? `${IMAGE_URL}${cartItem.product_item.product.product_image[0]}`
    : "/images/imageNA.png";

  const itemPrice = cartItem.product_item?.price || 0;
  const totalPrice = itemPrice * quantity;

  return (
    <div className="py-7 flex flex-wrap items-center border-b border-secondary_text">
      <div className="w-[300px] my-4 grow flex items-center">
        <div className="w-[100px] h-[80px] relative ml-1 mr-5 shrink-0">
          <Image
            src={imageUrl}
            alt="Product Image"
            fill
            className="object-cover object-center"
            priority
            sizes="100%"
          />
        </div>
        <div className="mr-1">
          <div className="font-semibold text-body-lg text-primary_text">
            {cartItem.product_item?.product?.name || "No name"}
          </div>
        </div>
      </div>
      <div className="w-20 desktop:w-24 font-medium">
        <div className="ml-1">{formatter.format(itemPrice)}</div>
      </div>
      <div className="w-[124px] desktop:w-[140px]">
        <div className="px-2 inline-flex items-center bg-gray-200 rounded-full">
          <FiMinusCircle
            className="cursor-pointer text-body-lg text-secondary_text"
            onClick={decreaseQuantity}
          />
          <span className="mx-1 font-medium">{quantity}</span>
          <FiPlusCircle
            className="cursor-pointer text-body-lg text-secondary_text"
            onClick={increaseQuantity}
          />
        </div>
      </div>
      <div className="w-20 desktop:w-24 font-medium">
        <div className="ml-1">{formatter.format(totalPrice)}</div>
      </div>
      <div className="w-4">
        <FaCircleXmark
          className="inline-block mb-1 cursor-pointer text-secondary_text"
          onClick={handleRemoveItem}
        />
      </div>
    </div>
  );
};

export default CartItemCard;
