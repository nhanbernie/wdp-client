import { EndpointBuilder } from '@reduxjs/toolkit/query/react'
import { ApiResponse } from '@/services/api/type'

export const deleteProductEndpoint = (builder: EndpointBuilder<any, any, any>) =>
  builder.mutation<ApiResponse<{ id: string }>, string>({
    query: (id) => ({
      url: `/products/${id}`,
      method: 'DELETE',
    }),
    invalidatesTags: ['Products'],
  })
