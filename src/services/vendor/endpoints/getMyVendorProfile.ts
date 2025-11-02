import { EndpointBuilder } from '@reduxjs/toolkit/query/react'
import { VendorProfileResponse } from '../vendor.types'
import { API_ENDPOINTS } from '@/common/constants/endpoint.constant'

export const getMyVendorProfileEndpoint = (builder: EndpointBuilder<any, any, any>) =>
  builder.query<VendorProfileResponse, void>({
    query: () => ({
      url: API_ENDPOINTS.VENDOR.MY_PROFILE,
      method: 'GET',
    }),
    providesTags: (result) =>
      result ? [{ type: 'Vendor', id: 'MY_PROFILE' }, 'Vendor'] : ['Vendor'],
  })
