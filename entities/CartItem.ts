export interface CartItem {
  product_item: {
    price: number;
  };
  id: number;
  name: string;
  option: string;
  image: string;
  price: number;
  qty: number;
  product: {
    name: string;
    product_image: any[];
  };
}
