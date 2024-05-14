export interface Product {
  id: number;
  category_id: number;
  name: string;
  description?: string;
  product_image?: string[] | any[];
  created_at: Date;
  category: {
    name: string;
    options?: any;
  };
  product_items: {
    id?: number;
    price: number | string;
    option_values?: {
      option_value: {
        value: string;
      };
    }[];
  }[];
}
