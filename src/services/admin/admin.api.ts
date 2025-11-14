import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithReauth } from '../api/baseQuery'
import { API_ENDPOINTS } from '@/common/constants/endpoint.constant'
import type { 
  DashboardStats, 
  RevenueReportItem, 
  RevenueReportParams 
} from './dashboard.service'

// Admin API
export const adminApi = createApi({
  reducerPath: 'adminApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Dashboard', 'Analytics', 'Orders', 'Users', 'Products', 'Withdrawals'],
  endpoints: (builder) => ({
    // Dashboard
    getDashboardStats: builder.query<DashboardStats, void>({
      query: () => API_ENDPOINTS.ADMIN.DASHBOARD_STATS,
      providesTags: ['Dashboard'],
    }),

    getRevenueReport: builder.query<RevenueReportItem[], RevenueReportParams>({
      query: (params) => {
        const queryParams = new URLSearchParams({
          startDate: params.startDate,
          endDate: params.endDate,
          ...(params.groupBy && { groupBy: params.groupBy }),
        })
        return `${API_ENDPOINTS.ADMIN.REVENUE_REPORT}?${queryParams}`
      },
      providesTags: ['Dashboard'],
    }),

    // Analytics
    getUserAnalytics: builder.query<any, void>({
      query: () => API_ENDPOINTS.ADMIN.USER_ANALYTICS,
      providesTags: ['Analytics'],
    }),

    getProductAnalytics: builder.query<any, void>({
      query: () => API_ENDPOINTS.ADMIN.PRODUCT_ANALYTICS,
      providesTags: ['Analytics'],
    }),

    // Orders
    getOrders: builder.query<any, any>({
      query: (params) => {
        const queryParams = new URLSearchParams()
        if (params?.page) queryParams.append('page', params.page.toString())
        if (params?.limit) queryParams.append('limit', params.limit.toString())
        if (params?.status) queryParams.append('status', params.status)
        if (params?.sortBy) queryParams.append('sortBy', params.sortBy)
        if (params?.order) queryParams.append('order', params.order)
        
        const url = `${API_ENDPOINTS.ADMIN.ORDERS}${queryParams.toString() ? `?${queryParams}` : ''}`
        return url
      },
      providesTags: ['Orders'],
    }),

    getOrderDetails: builder.query<any, string>({
      query: (orderId) => API_ENDPOINTS.ADMIN.ORDER_DETAILS(orderId),
      providesTags: ['Orders'],
    }),

    updateOrderStatus: builder.mutation<any, { orderId: string; status: string }>({
      query: ({ orderId, status }) => ({
        url: API_ENDPOINTS.ADMIN.ORDER_STATUS(orderId),
        method: 'PATCH',
        body: { status },
      }),
      invalidatesTags: ['Orders', 'Dashboard'],
    }),

    cancelOrder: builder.mutation<any, { orderId: string; reason: string; refund?: boolean }>({
      query: ({ orderId, reason, refund }) => ({
        url: API_ENDPOINTS.ADMIN.ORDER_CANCEL(orderId),
        method: 'PATCH',
        body: { reason, refund },
      }),
      invalidatesTags: ['Orders', 'Dashboard'],
    }),

    // Users
    getUsers: builder.query<any, any>({
      query: (params) => {
        const queryParams = new URLSearchParams()
        if (params?.page) queryParams.append('page', params.page.toString())
        if (params?.limit) queryParams.append('limit', params.limit.toString())
        if (params?.role) queryParams.append('role', params.role)
        if (params?.isActive !== undefined)
          queryParams.append('isActive', params.isActive.toString())
        if (params?.sortBy) queryParams.append('sortBy', params.sortBy)
        if (params?.order) queryParams.append('order', params.order)

        const url = `${API_ENDPOINTS.ADMIN.USERS}${queryParams.toString() ? `?${queryParams}` : ''}`
        return url
      },
      providesTags: ['Users'],
    }),

    getUserActivity: builder.query<any, string>({
      query: (userId) => API_ENDPOINTS.ADMIN.USER_ACTIVITY(userId),
      providesTags: ['Users'],
    }),

    banUser: builder.mutation<any, { userId: string; isActive: boolean; reason: string }>({
      query: ({ userId, isActive, reason }) => ({
        url: API_ENDPOINTS.ADMIN.USER_BAN(userId),
        method: 'PATCH',
        body: { isActive, reason },
      }),
      invalidatesTags: ['Users'],
    }),

    changeUserRole: builder.mutation<any, { userId: string; role: string; reason: string }>({
      query: ({ userId, role, reason }) => ({
        url: API_ENDPOINTS.ADMIN.USER_ROLE(userId),
        method: 'PATCH',
        body: { role, reason },
      }),
      invalidatesTags: ['Users'],
    }),

    // Products
    getProducts: builder.query<any, any>({
      query: (params) => {
        const queryParams = new URLSearchParams()
        if (params?.page) queryParams.append('page', params.page.toString())
        if (params?.limit) queryParams.append('limit', params.limit.toString())
        if (params?.stockLevel) queryParams.append('stockLevel', params.stockLevel)
        if (params?.isActive !== undefined)
          queryParams.append('isActive', params.isActive.toString())
        if (params?.sortBy) queryParams.append('sortBy', params.sortBy)
        if (params?.order) queryParams.append('order', params.order)

        const url = `${API_ENDPOINTS.ADMIN.PRODUCTS}${queryParams.toString() ? `?${queryParams}` : ''}`
        return url
      },
      providesTags: ['Products'],
    }),

    updateProductStock: builder.mutation<
      any,
      { productId: string; stockQuantity: number; reason: string }
    >({
      query: ({ productId, stockQuantity, reason }) => ({
        url: API_ENDPOINTS.ADMIN.PRODUCT_STOCK(productId),
        method: 'PATCH',
        body: { stockQuantity, reason },
      }),
      invalidatesTags: ['Products', 'Dashboard'],
    }),

    // Vendor Withdrawals
    getWithdrawalRequests: builder.query<any, { page?: number; limit?: number; status?: string; vendorId?: string }>({
      query: (params) => {
        const queryParams = new URLSearchParams()
        if (params?.page) queryParams.append('page', params.page.toString())
        if (params?.limit) queryParams.append('limit', params.limit.toString())
        if (params?.status) queryParams.append('status', params.status)
        if (params?.vendorId) queryParams.append('vendorId', params.vendorId)
        return `/admin/vendor-withdrawals?${queryParams}`
      },
      providesTags: ['Withdrawals'],
    }),

    approveWithdrawalRequest: builder.mutation<any, { id: string; adminNotes?: string }>({
      query: ({ id, adminNotes }) => ({
        url: `/admin/vendor-withdrawals/${id}/approve`,
        method: 'PATCH',
        body: { adminNotes },
      }),
      invalidatesTags: ['Withdrawals'],
    }),

    rejectWithdrawalRequest: builder.mutation<any, { id: string; adminNotes?: string }>({
      query: ({ id, adminNotes }) => ({
        url: `/admin/vendor-withdrawals/${id}/reject`,
        method: 'PATCH',
        body: { adminNotes },
      }),
      invalidatesTags: ['Withdrawals'],
    }),

    markWithdrawalRequestAsPaid: builder.mutation<any, { id: string; adminNotes?: string }>({
      query: ({ id, adminNotes }) => ({
        url: `/admin/vendor-withdrawals/${id}/mark-paid`,
        method: 'PATCH',
        body: { adminNotes },
      }),
      invalidatesTags: ['Withdrawals'],
    }),
  }),
})

export const {
  useGetDashboardStatsQuery,
  useGetRevenueReportQuery,
  useGetUserAnalyticsQuery,
  useGetProductAnalyticsQuery,
  useGetOrdersQuery,
  useGetOrderDetailsQuery,
  useUpdateOrderStatusMutation,
  useCancelOrderMutation,
  useGetUsersQuery,
  useGetUserActivityQuery,
  useBanUserMutation,
  useChangeUserRoleMutation,
  useGetProductsQuery,
  useUpdateProductStockMutation,
  useGetWithdrawalRequestsQuery,
  useApproveWithdrawalRequestMutation,
  useRejectWithdrawalRequestMutation,
  useMarkWithdrawalRequestAsPaidMutation,
} = adminApi
