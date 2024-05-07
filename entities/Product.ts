export interface Product {
  id: number;
  name: string;
  description: string;
  product_image: any[];
  category: Category;
  product_items: ProductItem[];
}

export interface Category {
  id: number;
  option_id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface ProductItem {
  id: number;
  product_id: number;
  SKU: string;
  qty_in_stock: number;
  qty_sold: number;
  price: string;
  created_at: string;
  updated_at: string;
  option_values: ProductItemOptionValue[];
}

export interface ProductItemOptionValue {
  product_items_id: number;
  option_values_id: number;
  created_at: string;
  updated_at: string;
  option_value: OptionValue;
}

export interface OptionValue {
  value: string;
}
