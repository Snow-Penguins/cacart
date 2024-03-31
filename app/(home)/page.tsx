import ProductCardList from '../../components/productCardList';

export default function Home() {
  const products = [
    { id: 1, category: 'T-shirt', name: "Men's regular fit sando t-shirt", price: 10 },
    { id: 2, category: 'Shoes', name: 'Women flat chunky canvas', price: 20 },
    { id: 3, category: 'Winter Clothings', name: 'Women winter sweater', price: 20 },
    { id: 1, category: 'T-shirt', name: "Men's regular fit sando t-shirt", price: 10 },
    { id: 2, category: 'Shoes', name: 'Women flat chunky canvas', price: 20 },
    { id: 3, category: 'Winter Clothings', name: 'Women winter sweater', price: 20 },
 
    
  ]
  return (
    <main>
      <h1 className="text-h1">Welcome to CaCart Ecommerce Platform!!</h1>
      <a>Test</a>
      <ProductCardList products = {products}/>
    </main>
  );
}
