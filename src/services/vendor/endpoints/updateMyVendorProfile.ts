import { EndpointBuilder } from '@reduxjs/toolkit/query/react'
import { VendorProfileResponse, UpdateVendorProfileRequest } from '../vendor.types'
import { API_ENDPOINTS } from '@/common/constants/endpoint.constant'

export const updateMyVendorProfileEndpoint = (builder: EndpointBuilder<any, any, any>) =>
  builder.mutation<VendorProfileResponse, UpdateVendorProfileRequest>({
    query: (data) => ({
      url: API_ENDPOINTS.VENDOR.UPDATE_PROFILE,
      method: 'PATCH',
      body: data,
    }),
    invalidatesTags: ['Vendor'],
  })
