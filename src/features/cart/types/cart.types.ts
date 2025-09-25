export interface CartItem {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  quantity: number;
  image: string;
  category: string;
  brand: string;
  weight?: number;
  dimensions?: string;
  inStock: boolean;
  maxQuantity: number;
}

export interface CartSummary {
  subtotal: number;
  shipping: number;
  tax: number;
  discount: number;
  total: number;
  itemCount: number;
}

export interface CartState {
  items: CartItem[];
  summary: CartSummary;
}
