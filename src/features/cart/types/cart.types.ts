// Legacy types for backward compatibility
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

// API-based types
export interface CartVariant {
  id: string;
  sku: string;
  optionValues: Array<{
    optionName: string;
    value: string;
  }>;
}

export interface CartProduct {
  id: string;
  name: string;
  images: string[];
}

export interface ApiCartItem {
  id: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  product: CartProduct;
  variant?: CartVariant;
}

export interface ApiCart {
  items: ApiCartItem[];
  totalItems: number;
  totalQuantity: number;
  subtotal: number;
  total: number;
}
