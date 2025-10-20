export interface OrderListItem {
  id: string
  userId: string
  userEmail: string
  totalAmount: string
  status: string
  paymentStatus: string
  itemsCount: number
  createdAt: string
}

export interface OrderListParams {
  page?: number
  limit?: number
  status?: string
  sortBy?: string
  order?: 'ASC' | 'DESC'
}

export interface OrderListMeta {
  total: number
  page: number
  limit: number
  totalPages: number
}

export interface OrderVendor {
  id: string
  name: string
}

export interface OrderItem {
  id: string
  productId: string
  productName: string
  quantity: number
  price: string
  subtotal?: string
  variantId?: string | null
  variantName?: string | null
  sku?: string | null
  thumbnail?: string | null
  unitPrice?: string
  totalPrice?: string
  currency?: string
  vendor?: OrderVendor
}

export interface OrderUser {
  id: string
  email: string
  firstName: string
  lastName: string
  phoneNumber: string
}

export interface Order {
  id: string
  userId: string
  totalAmount: string
  status: string
  paymentStatus: string
  paymentMethod: string
  shippingAddress: string
  createdAt: string
  updatedAt: string
  orderNumber?: string
  subtotal?: string
  shippingFee?: string
  taxAmount?: string
  discountAmount?: string
  currency?: string
  shippingName?: string
  shippingPhone?: string
  shippingCity?: string
  shippingDistrict?: string
  shippingWard?: string
  shippingPostalCode?: string
  trackingNumber?: string | null
  estimatedDelivery?: string | null
  actualDelivery?: string | null
  notes?: string | null
  customerNotes?: string | null
}

export interface OrderDetails {
  order: Order
  user: OrderUser
  items: OrderItem[]
}

export type OrderStatus = 'pending' | 'processing' | 'shipping' | 'delivered' | 'cancelled'
export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded'
