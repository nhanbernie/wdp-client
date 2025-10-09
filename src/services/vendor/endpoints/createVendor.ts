import { EndpointBuilder } from '@reduxjs/toolkit/query/react'
import { CreateVendorRequest, VendorResponse } from '../../../types/vendor.types'

export const createVendorEndpoint = (builder: EndpointBuilder<any, any, any>) =>
  builder.mutation<VendorResponse, CreateVendorRequest>({
    query: (vendorData) => ({
      url: '/vendors',
      method: 'POST',
      body: vendorData,
    }),
    invalidatesTags: ['Vendor'],
  })
