import { EndpointBuilder } from '@reduxjs/toolkit/query/react'
import { OrderListResponse, OrderFilters } from '../vendor.types'
import { API_ENDPOINTS } from '@/common/constants/endpoint.constant'

export const getVendorOrdersEndpoint = (builder: EndpointBuilder<any, any, any>) =>
  builder.query<OrderListResponse, OrderFilters | void>({
    query: (filters) => {
      const params = new URLSearchParams()

      if (filters && filters.status) params.append('status', filters.status)
      if (filters && filters.paymentStatus) params.append('paymentStatus', filters.paymentStatus)
      if (filters && filters.fromDate) params.append('fromDate', filters.fromDate)
      if (filters && filters.toDate) params.append('toDate', filters.toDate)
      if (filters && filters.page) params.append('page', filters.page.toString())
      if (filters && filters.limit) params.append('limit', filters.limit.toString())

      return {
        url: `${API_ENDPOINTS.VENDOR.ORDERS}?${params.toString()}`,
        method: 'GET',
      }
    },
    providesTags: ['Vendor'],
  })
