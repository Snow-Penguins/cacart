import ProductCard from "./ProductCard";
import { Product } from "../../entities/Product";

// fetch function
async function getProducts() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`);
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const products: Product[] = await res.json();
    return products;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

export default async function ProductCardList() {
  const products = await getProducts();
  return (
    <div className="flex flex-wrap justify-center gap-4 pt-10">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
