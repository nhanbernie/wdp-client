import { EndpointBuilder } from '@reduxjs/toolkit/query/react'
import { ApiResponse } from '@/services/api/type'
import { ProductDto } from '@/services/api/product.type'

export const getProductBySlugEndpoint = (builder: EndpointBuilder<any, any, any>) =>
  builder.query<ApiResponse<ProductDto>, string>({
    query: (slug) => ({
      url: `/products/by-slug/${slug}`,
      method: 'GET',
    }),
    providesTags: ['Products'],
  })
