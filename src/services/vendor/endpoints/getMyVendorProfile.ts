import { EndpointBuilder } from '@reduxjs/toolkit/query/react'
import { ApiResponse } from '../../api/type'
import { Vendor } from '../vendor.types'

export const getMyVendorProfileEndpoint = (builder: EndpointBuilder<any, any, any>) =>
  builder.query<ApiResponse<Vendor>, void>({
    query: () => ({
      url: '/vendors/my-profile',
      method: 'GET',
    }),
    providesTags: ['Vendor'],
  })
