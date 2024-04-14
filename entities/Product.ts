export interface Product {
  id: number;
  category: string;
  name: string;
  price: number;
}

export interface ProductList {
  products: Product[];
}
