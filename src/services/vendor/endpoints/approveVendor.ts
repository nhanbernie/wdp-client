import { EndpointBuilder } from '@reduxjs/toolkit/query/react'
import { VendorResponse } from '../../../types/vendor.types'

export const approveVendorEndpoint = (builder: EndpointBuilder<any, any, any>) =>
  builder.mutation<VendorResponse, string>({
    query: (id) => ({
      url: `/vendors/${id}/approve`,
      method: 'PATCH',
    }),
    invalidatesTags: (result, error, id) => [{ type: 'Vendor', id }, 'Vendor'],
  })
