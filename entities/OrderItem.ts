export interface OrderDetails {
  id: number;
  order_date: string;
  user: User;
  shipping_address: Address;
  order_histories: OrderHistory[];
}
export interface OrderItem {
  qty: number;
  product_item: any;
  id: number;
  price: number;
  quantity: number;
  product: {
    name: string;
    product_image: any[];
  };
}

export interface Address {
  address_line1: string;
  city: string;
  province: string;
}

export interface User {
  first_name: string;
  last_name: string;
}

export interface OrderHistory {
  qty: number;
  price: string;
  product_item: OrderItem;
}

export interface OrderSummaryProps {
  subtotal: number;
  shipping: number;
  discount: number;
}
