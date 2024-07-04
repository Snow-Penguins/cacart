export interface CartItem {
  product_item: any;
  id: number;
  name: string;
  option: string;
  image: string;
  price: number;
  quantity: number;
  product: {
    name: string;
    product_image: any[];
  };
}
