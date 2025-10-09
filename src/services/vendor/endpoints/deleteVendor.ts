import { EndpointBuilder } from '@reduxjs/toolkit/query/react'

export const deleteVendorEndpoint = (builder: EndpointBuilder<any, any, any>) =>
  builder.mutation<{ success: boolean; message: string }, string>({
    query: (id) => ({
      url: `/vendors/${id}`,
      method: 'DELETE',
    }),
    invalidatesTags: ['Vendor'],
  })
