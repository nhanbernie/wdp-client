import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '@/services/api/baseQuery';
import type {
  Order,
  OrdersResponse,
  OrderResponse,
  OrderStatisticsResponse,
  CreateOrderDto,
  UpdateOrderStatusDto,
  UpdatePaymentStatusDto,
  OrderFilterDto,
} from '@/services/orders/types';

export const ordersApiSlice = createApi({
  reducerPath: 'ordersApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Order', 'OrderStatistics'],
  endpoints: (builder) => ({
    // Create a new order
    createOrder: builder.mutation<OrderResponse, CreateOrderDto>({
      query: (data) => ({
        url: '/orders',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Order', 'OrderStatistics'],
    }),

    // Get all orders (with filters)
    getOrders: builder.query<OrdersResponse, OrderFilterDto | undefined>({
      query: (params) => ({
        url: '/orders',
        method: 'GET',
        params: params || {},
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ id }) => ({ type: 'Order' as const, id })),
              { type: 'Order', id: 'LIST' },
            ]
          : [{ type: 'Order', id: 'LIST' }],
    }),

    // Get order by ID
    getOrderById: builder.query<OrderResponse, string>({
      query: (id) => ({
        url: `/orders/${id}`,
        method: 'GET',
      }),
      providesTags: (result, error, id) => [{ type: 'Order', id }],
    }),

    // Get order by order number
    getOrderByNumber: builder.query<OrderResponse, string>({
      query: (orderNumber) => ({
        url: `/orders/number/${orderNumber}`,
        method: 'GET',
      }),
      providesTags: (result) =>
        result ? [{ type: 'Order', id: result.data.id }] : [],
    }),

    // Get order statistics
    getOrderStatistics: builder.query<OrderStatisticsResponse, void>({
      query: () => ({
        url: '/orders/statistics',
        method: 'GET',
      }),
      providesTags: ['OrderStatistics'],
    }),

    // Update order status (admin/vendor only)
    updateOrderStatus: builder.mutation<OrderResponse, { id: string; data: UpdateOrderStatusDto }>({
      query: ({ id, data }) => ({
        url: `/orders/${id}/status`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Order', id },
        { type: 'Order', id: 'LIST' },
        'OrderStatistics',
      ],
    }),

    // Update payment status (admin only)
    updatePaymentStatus: builder.mutation<OrderResponse, { id: string; data: UpdatePaymentStatusDto }>({
      query: ({ id, data }) => ({
        url: `/orders/${id}/payment-status`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Order', id },
        { type: 'Order', id: 'LIST' },
        'OrderStatistics',
      ],
    }),

    // Cancel order
    cancelOrder: builder.mutation<OrderResponse, string>({
      query: (id) => ({
        url: `/orders/${id}/cancel`,
        method: 'PATCH',
      }),
      invalidatesTags: (result, error, id) => [
        { type: 'Order', id },
        { type: 'Order', id: 'LIST' },
        'OrderStatistics',
      ],
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetOrdersQuery,
  useGetOrderByIdQuery,
  useGetOrderByNumberQuery,
  useGetOrderStatisticsQuery,
  useUpdateOrderStatusMutation,
  useUpdatePaymentStatusMutation,
  useCancelOrderMutation,
  useLazyGetOrdersQuery,
  useLazyGetOrderByIdQuery,
} = ordersApiSlice;
