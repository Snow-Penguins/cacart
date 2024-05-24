export interface Product {
  id: number;
  category_id: number;
  name: string;
  description: string;
  product_image: any[];
  created_at: Date;
  category: {
    name: string;
    options?: any;
  };
  product_items: {
    id: number;
    price: number;
    option_values: {
      id: number;
      option_value: {
        id: number;
        value: string;
      };
    }[];
  }[];
}
