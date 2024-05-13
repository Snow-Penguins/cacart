export interface Product {
  id: number;
  category_id: number;
  name: string;
  description?: string;
  product_image?: string[];
  created_at: Date;
  category: { name: string };
  product_items: { price: number }[];
}
