import { EndpointBuilder } from '@reduxjs/toolkit/query/react'
import { API_ENDPOINTS } from '@/common/constants/endpoint.constant'
import { Order } from '../../orders/orders.service'

export interface UpdateVendorOrderStatusRequest {
  status: 'shipping' | 'delivered'
  trackingNumber?: string
  notes?: string
}

export const updateVendorOrderStatusEndpoint = (
  builder: EndpointBuilder<any, any, any>,
) =>
  builder.mutation<{ data: Order }, { orderId: string; body: UpdateVendorOrderStatusRequest }>({
    query: ({ orderId, body }) => ({
      url: API_ENDPOINTS.VENDOR.ORDER_UPDATE_STATUS(orderId),
      method: 'PATCH',
      body,
    }),
    invalidatesTags: ['Vendor'],
  })

