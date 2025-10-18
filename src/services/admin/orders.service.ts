import { API_ENDPOINTS } from '@/common/constants/endpoint.constant'
import { apiClient } from '../api/apiClient'

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

export interface OrderListResponse {
  data: OrderListItem[]
  meta: {
    total: number
    page: number
    limit: number
    totalPages: number
  }
}

export interface OrderDetails {
  order: {
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
  user: {
    id: string
    email: string
    firstName: string
    lastName: string
    phoneNumber: string
  }
  items: Array<{
    id: string
    productId: string
    productName: string
    quantity: number
    price: string
    subtotal: string
    variantId?: string | null
    variantName?: string | null
    sku?: string | null
    thumbnail?: string | null
    unitPrice?: string
    totalPrice?: string
    currency?: string
    vendor?: {
      id: string
      name: string
    }
  }>
}

export interface UpdateOrderStatusPayload {
  status: string
}

export interface CancelOrderPayload {
  reason: string
  refund?: boolean
}

export const ordersService = {
  /**
   * Get all orders with pagination and filters
   */
  getOrders: async (params?: OrderListParams): Promise<OrderListResponse> => {
    const queryParams = new URLSearchParams()
    if (params?.page) queryParams.append('page', params.page.toString())
    if (params?.limit) queryParams.append('limit', params.limit.toString())
    if (params?.status) queryParams.append('status', params.status)
    if (params?.sortBy) queryParams.append('sortBy', params.sortBy)
    if (params?.order) queryParams.append('order', params.order)

    const url = `${API_ENDPOINTS.ADMIN.ORDERS}${queryParams.toString() ? `?${queryParams}` : ''}`
    const response = await apiClient.get<OrderListResponse>(url)
    return response.data
  },

  /**
   * Get order details by ID
   */
  getOrderDetails: async (orderId: string): Promise<OrderDetails> => {
    const response = await apiClient.get<OrderDetails>(API_ENDPOINTS.ADMIN.ORDER_DETAILS(orderId))
    return response.data
  },

  /**
   * Update order status
   */
  updateOrderStatus: async (orderId: string, payload: UpdateOrderStatusPayload): Promise<any> => {
    const response = await apiClient.patch(API_ENDPOINTS.ADMIN.ORDER_STATUS(orderId), payload)
    return response.data
  },

  /**
   * Cancel order
   */
  cancelOrder: async (orderId: string, payload: CancelOrderPayload): Promise<any> => {
    const response = await apiClient.patch(API_ENDPOINTS.ADMIN.ORDER_CANCEL(orderId), payload)
    return response.data
  },
}
