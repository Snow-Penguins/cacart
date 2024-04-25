export interface Product {
  id: number;
  category_id: string;
  name: string;
  description?: string;
  product_image?: string[];
  category: { name: string };
  product_items: {
    price: string;
  }[];
}
