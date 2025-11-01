import { EndpointBuilder } from '@reduxjs/toolkit/query/react'
import { ApiResponse } from '../../api/type'
import { CreateVendorRequest, Vendor } from '../vendor.types'

export const updateVendorEndpoint = (builder: EndpointBuilder<any, any, any>) =>
  builder.mutation<ApiResponse<Vendor>, { id: string; data: Partial<CreateVendorRequest> }>({
    query: ({ id, data }) => ({
      url: `/vendors/${id}/my-profile`,
      method: 'PATCH',
      body: data,
    }),
    invalidatesTags: (result, error, { id }) => [{ type: 'Vendor', id }, 'Vendor'],
  })
