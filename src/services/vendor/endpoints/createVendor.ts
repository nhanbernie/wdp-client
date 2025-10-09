import { EndpointBuilder } from '@reduxjs/toolkit/query/react'
import { ApiResponse } from '../../api/type'
import { CreateVendorRequest, Vendor } from '../vendor.types'

export const createVendorEndpoint = (builder: EndpointBuilder<any, any, any>) =>
  builder.mutation<ApiResponse<Vendor>, CreateVendorRequest>({
    query: (vendorData) => ({
      url: '/vendors',
      method: 'POST',
      body: vendorData,
    }),
    invalidatesTags: ['Vendor'],
  })
