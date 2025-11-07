import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithReauth } from '../api/baseQuery'
import { API_ENDPOINTS } from '@/common/constants/endpoint.constant'

// Types for Orders API
export interface CheckoutFromCartRequest {
  paymentMethod: 'cod' | 'bank_transfer' | 'credit_card' | 'e_wallet'
  shippingName: string
  shippingPhone: string
  shippingAddress: string
  shippingCity: string
  shippingDistrict: string
  shippingWard: string
  shippingPostalCode: string
  customerNotes?: string
}

export interface OrderItem {
  id: string
  productName: string
  variantName?: string
  sku: string
  quantity: number
  unitPrice: string
  totalPrice: string
}

export interface Order {
  id: string
  orderNumber: string
  status:
    | 'pending'
    | 'admin_confirmed'
    | 'shipping'
    | 'delivered'
    | 'completed'
    | 'processing'
    | 'cancelled'
    | 'refunded'
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded'
  paymentMethod: string
  subtotal: string
  shippingFee: string
  taxAmount: string
  discountAmount: string
  totalAmount: string
  projectedFees?: string
  platformFee?: string
  vendorPayoutAmount?: string
  currency: string
  shippingName: string
  shippingPhone: string
  shippingAddress: string
  shippingCity: string
  shippingDistrict: string
  shippingWard: string
  shippingPostalCode: string
  estimatedDelivery: string
  customerNotes?: string
  items: OrderItem[]
  createdAt?: string
  updatedAt?: string
  adminConfirmedAt?: string
  shippingStartedAt?: string
  deliveredByVendorAt?: string
  completedAt?: string
}

export interface UpdateOrderStatusRequest {
  status: Order['status']
  trackingNumber?: string
  notes?: string
}

export interface OrdersListResponse {
  data: Order[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export interface OrderStatistics {
  totalOrders: number
  pendingOrders: number
  completedOrders: number
  totalSpent: number
  averageOrderValue: number
}

export interface GetOrdersParams {
  page?: number
  limit?: number
  status?: string
  paymentStatus?: string
}

export const ordersApi = createApi({
  reducerPath: 'ordersApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Order', 'OrderStats'],
  endpoints: (builder) => ({
    // Checkout from cart (create order)
    checkoutFromCart: builder.mutation<{ data: Order }, CheckoutFromCartRequest>({
      query: (body) => ({
        url: API_ENDPOINTS.ORDERS.FROM_CART,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Order'],
    }),

    // Get all orders (user's orders)
    getOrders: builder.query<OrdersListResponse, GetOrdersParams>({
      query: (params = {}) => ({
        url: API_ENDPOINTS.ORDERS.LIST,
        method: 'GET',
        params,
      }),
      providesTags: ['Order'],
    }),

    // Get order by ID
    getOrderById: builder.query<{ data: Order }, string>({
      query: (orderId) => ({
        url: API_ENDPOINTS.ORDERS.DETAILS.replace(':id', orderId),
        method: 'GET',
      }),
      providesTags: (result, error, id) => [{ type: 'Order', id }],
    }),

    // Get order by order number
    getOrderByNumber: builder.query<{ data: Order }, string>({
      query: (orderNumber) => ({
        url: API_ENDPOINTS.ORDERS.BY_NUMBER.replace(':orderNumber', orderNumber),
        method: 'GET',
      }),
      providesTags: (result, error, orderNumber) => [{ type: 'Order', id: orderNumber }],
    }),

    // Get order statistics
    getOrderStatistics: builder.query<{ data: OrderStatistics }, void>({
      query: () => ({
        url: API_ENDPOINTS.ORDERS.STATISTICS,
        method: 'GET',
      }),
      providesTags: ['OrderStats'],
    }),

    // Cancel order
    cancelOrder: builder.mutation<void, string>({
      query: (orderId) => ({
        url: API_ENDPOINTS.ORDERS.CANCEL.replace(':id', orderId),
        method: 'PATCH',
      }),
      invalidatesTags: ['Order'],
    }),

    // Admin confirm order
    adminConfirmOrder: builder.mutation<{ data: Order }, string>({
      query: (orderId) => ({
        url: API_ENDPOINTS.ORDERS.ADMIN_CONFIRM(orderId),
        method: 'PATCH',
      }),
      invalidatesTags: ['Order'],
    }),

    // Admin complete order
    completeOrder: builder.mutation<{ data: Order }, string>({
      query: (orderId) => ({
        url: API_ENDPOINTS.ORDERS.COMPLETE(orderId),
        method: 'PATCH',
      }),
      invalidatesTags: ['Order'],
    }),

    // Update order status (admin)
    updateOrderStatus: builder.mutation<
      { data: Order },
      { orderId: string; body: UpdateOrderStatusRequest }
    >({
      query: ({ orderId, body }) => ({
        url: API_ENDPOINTS.ORDERS.DETAILS.replace(':id', orderId) + '/status',
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['Order'],
    }),
  }),
})

export const {
  useCheckoutFromCartMutation,
  useGetOrdersQuery,
  useGetOrderByIdQuery,
  useGetOrderByNumberQuery,
  useGetOrderStatisticsQuery,
  useCancelOrderMutation,
  useAdminConfirmOrderMutation,
  useCompleteOrderMutation,
  useUpdateOrderStatusMutation,
} = ordersApi
