import { EndpointBuilder } from '@reduxjs/toolkit/query/react'
import { API_ENDPOINTS } from '@/common/constants/endpoint.constant'

export const deleteProductEndpoint = (builder: EndpointBuilder<any, any, any>) =>
  builder.mutation<{ success: boolean; message: string }, string>({
    query: (id) => ({
      url: API_ENDPOINTS.PRODUCTS.DELETE(id),
      method: 'DELETE',
    }),
    invalidatesTags: ['Vendor'],
  })
