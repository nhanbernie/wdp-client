import { EndpointBuilder } from '@reduxjs/toolkit/query/react'
import { QuoteRequestResponse, RespondQuoteRequest } from '../vendor.types'
import { API_ENDPOINTS } from '@/common/constants/endpoint.constant'

export const respondToQuoteEndpoint = (builder: EndpointBuilder<any, any, any>) =>
  builder.mutation<QuoteRequestResponse, { id: string; data: RespondQuoteRequest }>({
    query: ({ id, data }) => ({
      url: API_ENDPOINTS.VENDOR.QUOTE_RESPOND(id),
      method: 'PATCH',
      body: data,
    }),
    invalidatesTags: ['Vendor'],
  })
