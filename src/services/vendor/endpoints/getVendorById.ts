import { EndpointBuilder } from '@reduxjs/toolkit/query/react'
import { ApiResponse } from '../../api/type'
import { Vendor } from '../vendor.types'

export const getVendorByIdEndpoint = (builder: EndpointBuilder<any, any, any>) =>
  builder.query<ApiResponse<Vendor>, string>({
    query: (id) => ({
      url: `/vendors/${id}`,
      method: 'GET',
    }),
    providesTags: (result, error, id) => [{ type: 'Vendor', id }],
  })
