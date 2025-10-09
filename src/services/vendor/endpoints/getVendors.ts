import { EndpointBuilder } from '@reduxjs/toolkit/query/react'
import { Vendor, VendorFilters } from '../../../types/vendor.types'

export const getVendorsEndpoint = (builder: EndpointBuilder<any, any, any>) =>
  builder.query<{
    success: boolean
    data: Vendor[]
    pagination: {
      page: number
      limit: number
      total: number
      totalPages: number
    }
  }, VendorFilters | void>({
    query: (filters = {}) => ({
      url: '/vendors',
      method: 'GET',
      params: filters,
    }),
    providesTags: ['Vendor'],
  })
