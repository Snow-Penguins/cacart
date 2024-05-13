import ProductCardList from "../../components/products/ProductCardList";
import getProducts from "@/util/products/getProducts";

export default async function Home() {
  const productUrl = "products";
  const products = (await getProducts(productUrl)) || [];

  return (
    <main>
      <ProductCardList products={products} />
    </main>
  );
}
