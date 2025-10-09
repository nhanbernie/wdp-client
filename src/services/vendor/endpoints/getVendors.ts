import { EndpointBuilder } from '@reduxjs/toolkit/query/react'
import { ApiResponse } from '../../api/type'
import { Vendor, VendorFilters } from '../vendor.types'

export const getVendorsEndpoint = (builder: EndpointBuilder<any, any, any>) =>
  builder.query<ApiResponse<Vendor[]>, VendorFilters | void>({
    query: (filters = {}) => ({
      url: '/vendors',
      method: 'GET',
      params: filters,
    }),
    providesTags: ['Vendor'],
  })
