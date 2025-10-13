// Order Types and Enums

export enum OrderStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  SHIPPING = 'shipping',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled',
  REFUNDED = 'refunded',
}

export enum PaymentStatus {
  PENDING = 'pending',
  PAID = 'paid',
  FAILED = 'failed',
  REFUNDED = 'refunded',
}

export enum PaymentMethod {
  COD = 'cod',
  BANK_TRANSFER = 'bank_transfer',
  CREDIT_CARD = 'credit_card',
  E_WALLET = 'e_wallet',
}

export interface OrderItem {
  id: string;
  productId: string;
  variantId?: string;
  productName: string;
  variantName?: string;
  sku?: string;
  thumbnail?: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  currency: string;
  product?: any;
  variant?: any;
}

export interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentMethod: PaymentMethod;
  subtotal: number;
  shippingFee: number;
  taxAmount: number;
  discountAmount: number;
  totalAmount: number;
  currency: string;
  shippingName: string;
  shippingPhone: string;
  shippingAddress: string;
  shippingCity?: string;
  shippingDistrict?: string;
  shippingWard?: string;
  shippingPostalCode?: string;
  trackingNumber?: string;
  estimatedDelivery?: string;
  actualDelivery?: string;
  notes?: string;
  customerNotes?: string;
  items: OrderItem[];
  createdAt: string;
  updatedAt: string;
  user?: any;
}

export interface CreateOrderItemDto {
  productId: string;
  variantId?: string;
  quantity: number;
}

export interface CreateOrderDto {
  items: CreateOrderItemDto[];
  paymentMethod: PaymentMethod;
  shippingName: string;
  shippingPhone: string;
  shippingAddress: string;
  shippingCity?: string;
  shippingDistrict?: string;
  shippingWard?: string;
  shippingPostalCode?: string;
  customerNotes?: string;
}

export interface UpdateOrderStatusDto {
  status: OrderStatus;
  trackingNumber?: string;
  notes?: string;
}

export interface UpdatePaymentStatusDto {
  paymentStatus: PaymentStatus;
}

export interface OrderFilterDto {
  status?: OrderStatus;
  paymentStatus?: PaymentStatus;
  userId?: string;
  orderNumber?: string;
  page?: number;
  limit?: number;
}

export interface OrdersResponse {
  success: boolean;
  message: string;
  data: Order[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface OrderResponse {
  success: boolean;
  message: string;
  data: Order;
}

export interface OrderStatistics {
  total: number;
  byStatus: {
    pending: number;
    processing: number;
    shipping: number;
    delivered: number;
    cancelled: number;
  };
}

export interface OrderStatisticsResponse {
  success: boolean;
  message: string;
  data: OrderStatistics;
}
