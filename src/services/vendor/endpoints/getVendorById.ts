import { EndpointBuilder } from '@reduxjs/toolkit/query/react'
import { VendorResponse } from '../../../types/vendor.types'

export const getVendorByIdEndpoint = (builder: EndpointBuilder<any, any, any>) =>
  builder.query<VendorResponse, string>({
    query: (id) => ({
      url: `/vendors/${id}`,
      method: 'GET',
    }),
    providesTags: (result, error, id) => [{ type: 'Vendor', id }],
  })
