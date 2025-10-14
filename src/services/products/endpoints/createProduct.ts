import { EndpointBuilder } from '@reduxjs/toolkit/query/react'
import { ApiResponse } from '@/services/api/type'
import { CreateProductDto, CreateProductResponse } from '../product.types'

export const createProductEndpoint = (builder: EndpointBuilder<any, any, any>) =>
  builder.mutation<ApiResponse<CreateProductResponse>, CreateProductDto>({
    query: (body) => ({
      url: '/products',
      method: 'POST',
      body,
    }),
    invalidatesTags: ['Products'],
  })
