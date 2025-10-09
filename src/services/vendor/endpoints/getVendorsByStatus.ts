import { EndpointBuilder } from '@reduxjs/toolkit/query/react'
import { ApiResponse } from '../../api/type'
import { Vendor } from '../vendor.types'

export const getVendorsByStatusEndpoint = (builder: EndpointBuilder<any, any, any>) =>
  builder.query<ApiResponse<Vendor[]>, 'pending' | 'approved' | 'rejected' | 'suspended'>({
    query: (status) => ({
      url: `/vendors?status=${status}`,
      method: 'GET',
    }),
    providesTags: ['Vendor'],
  })
