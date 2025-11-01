import { EndpointBuilder } from '@reduxjs/toolkit/query/react'
import { OrderResponse } from '../vendor.types'
import { API_ENDPOINTS } from '@/common/constants/endpoint.constant'

export const getOrderDetailEndpoint = (builder: EndpointBuilder<any, any, any>) =>
  builder.query<OrderResponse, string>({
    query: (id) => ({
      url: API_ENDPOINTS.VENDOR.ORDER_DETAIL(id),
      method: 'GET',
    }),
    providesTags: ['Vendor'],
  })
