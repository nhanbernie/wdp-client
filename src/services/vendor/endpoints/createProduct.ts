import { EndpointBuilder } from '@reduxjs/toolkit/query/react'
import { ProductResponse, CreateProductRequest } from '../vendor.types'
import { API_ENDPOINTS } from '@/common/constants/endpoint.constant'

export const createProductEndpoint = (builder: EndpointBuilder<any, any, any>) =>
  builder.mutation<ProductResponse, FormData>({
    query: (formData) => ({
      url: API_ENDPOINTS.VENDOR.PRODUCTS.CREATE,
      method: 'POST',
      body: formData,
    }),
    invalidatesTags: ['Vendor'],
  })
