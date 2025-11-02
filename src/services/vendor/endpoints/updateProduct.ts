import { EndpointBuilder } from '@reduxjs/toolkit/query/react'
import { ProductResponse } from '../vendor.types'
import { API_ENDPOINTS } from '@/common/constants/endpoint.constant'

export const updateProductEndpoint = (builder: EndpointBuilder<any, any, any>) =>
  builder.mutation<ProductResponse, { id: string; data: FormData }>({
    query: ({ id, data }) => ({
      url: API_ENDPOINTS.VENDOR.PRODUCTS.UPDATE(id),
      method: 'PATCH',
      body: data,
    }),
    invalidatesTags: ['Vendor'],
  })
