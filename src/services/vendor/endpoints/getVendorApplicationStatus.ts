import { EndpointBuilder } from '@reduxjs/toolkit/query/react'
import { VendorProfileResponse } from '../vendor.types'
import { API_ENDPOINTS } from '@/common/constants/endpoint.constant'

export const getVendorApplicationStatusEndpoint = (builder: EndpointBuilder<any, any, any>) =>
  builder.query<VendorProfileResponse, void>({
    query: () => ({
      url: API_ENDPOINTS.VENDOR.APPLICATION_STATUS,
      method: 'GET',
    }),
    providesTags: ['Vendor'],
  })
