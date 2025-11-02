import { EndpointBuilder } from '@reduxjs/toolkit/query/react'
import { ProductResponse } from '../vendor.types'
import { API_ENDPOINTS } from '@/common/constants/endpoint.constant'

export const getProductDetailEndpoint = (builder: EndpointBuilder<any, any, any>) =>
  builder.query<ProductResponse, string>({
    query: (id) => ({
      url: API_ENDPOINTS.VENDOR.PRODUCTS.DETAILS(id),
      method: 'GET',
    }),
    providesTags: ['Vendor'],
  })
