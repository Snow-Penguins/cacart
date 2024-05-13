import ProductCard from "@/components/products/ProductCard";
import ProductCardList from "@/components/products/ProductCardList";
import getProducts from "@/util/products/getProducts";

export default async function Page() {
  const productUrl = "products/sold-qty";
  const products = (await getProducts(productUrl)) || [];
  return (
    <ProductCardList products={products} />
    // <div className="flex flex-wrap justify-center gap-4 pt-10">
    //   {products?.map((product) => (
    //     <ProductCard key={product.id} product={product} />
    //   ))}
    // </div>
  );
}
