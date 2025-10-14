import { EndpointBuilder } from '@reduxjs/toolkit/query/react'
import { ApiResponse } from '@/services/api/type'
import { UpdateProductDto, UpdateProductResponse } from '../product.types'

export const updateProductEndpoint = (builder: EndpointBuilder<any, any, any>) =>
  builder.mutation<ApiResponse<UpdateProductResponse>, { id: string; data: UpdateProductDto }>({
    query: ({ id, data }) => ({
      url: `/products/${id}`,
      method: 'PATCH',
      body: data,
    }),
    invalidatesTags: ['Products'],
  })
