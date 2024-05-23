export interface OrderItem {
  id: number;
  image: string;
  name: string;
  color: string;
  size: string;
  quantity: number;
  price: number;
}

export interface OrderItemList {
  items: OrderItem[];
}

export interface OrderSummary {
  subtotal: number;
  shipping: number;
  discount: number;
}
