import { EndpointBuilder } from '@reduxjs/toolkit/query/react'
import { QuoteRequestListResponse } from '../vendor.types'
import { API_ENDPOINTS } from '@/common/constants/endpoint.constant'

type QuoteStatus = 'pending' | 'quoted' | 'accepted' | 'rejected' | 'expired' | 'cancelled'

export const getVendorQuoteRequestsEndpoint = (builder: EndpointBuilder<any, any, any>) =>
  builder.query<QuoteRequestListResponse, { status?: QuoteStatus } | void>({
    query: (filters) => {
      const params = new URLSearchParams()
      if (filters && filters.status) params.append('status', filters.status)

      return {
        url: `${API_ENDPOINTS.VENDOR.QUOTE_REQUESTS}?${params.toString()}`,
        method: 'GET',
      }
    },
    providesTags: ['Vendor'],
  })
