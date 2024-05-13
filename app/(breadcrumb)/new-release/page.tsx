import ProductCardList from "@/components/products/ProductCardList";
import getProducts from "@/util/products/getProducts";

export default async function Page() {
  const productUrl = "products/by-date";
  const products = (await getProducts(productUrl)) || [];

  return (
    <div>
      <ProductCardList products={products} />
    </div>
  );
}
