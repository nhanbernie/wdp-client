import { EndpointBuilder } from '@reduxjs/toolkit/query/react'
import { CreateVendorRequest, VendorResponse } from '../../../types/vendor.types'

export const updateVendorEndpoint = (builder: EndpointBuilder<any, any, any>) =>
  builder.mutation<VendorResponse, { id: string; data: Partial<CreateVendorRequest> }>({
    query: ({ id, data }) => ({
      url: `/vendors/${id}`,
      method: 'PATCH',
      body: data,
    }),
    invalidatesTags: (result, error, { id }) => [{ type: 'Vendor', id }, 'Vendor'],
  })
