export interface Product {
  id: number;
  name: string;
  description: string;
  product_image: any[];
  category: Category;
  product_items: ProductItem[];
}

export interface Category {
  options: any;
  name: string;
}

export interface ProductItem {
  id: number;
  price: string;
  option_values: ProductItemOptionValue[];
}

export interface ProductItemOptionValue {
  option_value: OptionValue;
}

export interface OptionValue {
  value: string;
}
