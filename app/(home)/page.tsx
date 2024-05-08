import ProductCardList from "../../components/products/ProductCardList";

export default function Home() {
  const products = [
    {
      id: 1,
      category: "T-shirt",
      name: "Men's regular fit sando t-shirt",
      price: 10,
    },
    { id: 2, category: "Shoes", name: "Women flat chunky canvas", price: 20 },
    {
      id: 3,
      category: "Winter Clothings",
      name: "Women winter sweater",
      price: 20,
    },
    {
      id: 1,
      category: "T-shirt",
      name: "Men's regular fit sando t-shirt",
      price: 10,
    },
    { id: 2, category: "Shoes", name: "Women flat chunky canvas", price: 20 },
    {
      id: 3,
      category: "Winter Clothings",
      name: "Women winter sweater",
      price: 20,
    },
  ];
  return (
    <main>
      <ProductCardList products={products} />
    </main>
  );
}
