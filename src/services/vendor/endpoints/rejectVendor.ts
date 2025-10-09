import { EndpointBuilder } from '@reduxjs/toolkit/query/react'
import { ApiResponse } from '../../api/type'
import { Vendor } from '../vendor.types'

export const rejectVendorEndpoint = (builder: EndpointBuilder<any, any, any>) =>
  builder.mutation<ApiResponse<Vendor>, string>({
    query: (id) => ({
      url: `/vendors/${id}/reject`,
      method: 'PATCH',
    }),
    invalidatesTags: (result, error, id) => [{ type: 'Vendor', id }, 'Vendor'],
  })
