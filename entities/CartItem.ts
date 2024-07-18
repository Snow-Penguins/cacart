export interface CartItem {
  id: number;
  qty: number;
  product_item: {
    id: number;
    price: number;
    product: {
      name: string;
      product_image: string[];
    };
  };
}
