import ProductCard from "@/components/products/ProductCard";
import ProductList from "@/components/products/product-list";
import getProducts from "@/util/products/getProducts";

export default async function Page() {
  const productUrl = "products/sold-qty";
  // const products = (await getProducts(productUrl)) || [];
  const initialProducts = (await getProducts(productUrl, 3)) || [];
  return (
    // <div className="flex flex-wrap justify-center gap-4 pt-10">
    //   {products?.map((product) => (
    //     <ProductCard key={product.id} product={product} />
    //   ))}
    // </div>
    <div>
      <ProductList initialProduts={initialProducts} />
    </div>
  );
}
