import { EndpointBuilder } from '@reduxjs/toolkit/query/react'
import { VendorResponse } from '../../../types/vendor.types'

export const getMyVendorProfileEndpoint = (builder: EndpointBuilder<any, any, any>) =>
  builder.query<VendorResponse, void>({
    query: () => ({
      url: '/vendors/my-profile',
      method: 'GET',
    }),
    providesTags: ['Vendor'],
  })
