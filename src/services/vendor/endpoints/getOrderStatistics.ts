import { EndpointBuilder } from '@reduxjs/toolkit/query/react'
import { OrderStatisticsResponse } from '../vendor.types'
import { API_ENDPOINTS } from '@/common/constants/endpoint.constant'

export const getOrderStatisticsEndpoint = (builder: EndpointBuilder<any, any, any>) =>
  builder.query<OrderStatisticsResponse, void>({
    query: () => ({
      url: API_ENDPOINTS.VENDOR.ORDER_STATISTICS,
      method: 'GET',
    }),
    providesTags: ['Vendor'],
  })
