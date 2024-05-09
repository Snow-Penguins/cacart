import Cart from "@/components/carts/Cart";

export default function Page() {
  // Temporary data for the cart items
  const cartItems = [
    {
      id: 1,
      name: "Men's regular fit sando t-shirt",
      option: "Black",
      image: "/images/product1.jpg",
      price: 10,
      quantity: 1,
    },
    {
      id: 2,
      name: "Women flat chunky canvas",
      option: "Black",
      image: "/images/product2.jpg",
      price: 20,
      quantity: 2,
    },
    {
      id: 3,
      name: "Women winter sweater",
      option: "Black",
      image: "/images/product3.jpg",
      price: 20.5,
      quantity: 1,
    },
  ];

  return <Cart initialCartItems={cartItems} />;
}
