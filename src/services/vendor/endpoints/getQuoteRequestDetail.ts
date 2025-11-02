import { EndpointBuilder } from '@reduxjs/toolkit/query/react'
import { QuoteRequestResponse } from '../vendor.types'
import { API_ENDPOINTS } from '@/common/constants/endpoint.constant'

export const getQuoteRequestDetailEndpoint = (builder: EndpointBuilder<any, any, any>) =>
  builder.query<QuoteRequestResponse, string>({
    query: (id) => ({
      url: API_ENDPOINTS.VENDOR.QUOTE_REQUEST_DETAIL(id),
      method: 'GET',
    }),
    providesTags: ['Vendor'],
  })
