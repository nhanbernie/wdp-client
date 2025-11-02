import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithReauth } from '../api/baseQuery'
import {
  QuoteRequest,
  QuoteRequestResponse,
  QuoteRequestListResponse,
  CreateQuoteRequestData,
  QuoteRequestStatus,
} from './types'

export const quoteRequestsApi = createApi({
  reducerPath: 'quoteRequestsApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['QuoteRequest'],
  endpoints: (builder) => ({
    // Create quote request
    createQuoteRequest: builder.mutation<QuoteRequestResponse, CreateQuoteRequestData>({
      query: (data) => ({
        url: '/quote-requests',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['QuoteRequest'],
    }),

    // Get my quote requests (user view)
    getMyQuoteRequests: builder.query<
      QuoteRequestListResponse,
      { status?: QuoteRequestStatus } | void
    >({
      query: (params) => {
        const queryParams = params?.status ? `?status=${params.status}` : ''
        return {
          url: `/quote-requests/my-requests${queryParams}`,
          method: 'GET',
        }
      },
      providesTags: ['QuoteRequest'],
    }),

    // Get quote request by ID
    getQuoteRequestById: builder.query<QuoteRequestResponse, string>({
      query: (id) => ({
        url: `/quote-requests/${id}`,
        method: 'GET',
      }),
      providesTags: ['QuoteRequest'],
    }),

    // Update quote request (only when pending)
    updateQuoteRequest: builder.mutation<
      QuoteRequestResponse,
      { id: string; data: Partial<CreateQuoteRequestData> }
    >({
      query: ({ id, data }) => ({
        url: `/quote-requests/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['QuoteRequest'],
    }),

    // Accept quote
    acceptQuote: builder.mutation<QuoteRequestResponse, string>({
      query: (id) => ({
        url: `/quote-requests/${id}/accept`,
        method: 'PATCH',
      }),
      invalidatesTags: ['QuoteRequest'],
    }),

    // Reject quote
    rejectQuote: builder.mutation<QuoteRequestResponse, string>({
      query: (id) => ({
        url: `/quote-requests/${id}/reject`,
        method: 'PATCH',
      }),
      invalidatesTags: ['QuoteRequest'],
    }),

    // Cancel quote request
    cancelQuoteRequest: builder.mutation<QuoteRequestResponse, string>({
      query: (id) => ({
        url: `/quote-requests/${id}/cancel`,
        method: 'DELETE',
      }),
      invalidatesTags: ['QuoteRequest'],
    }),

    // Delete quote request
    deleteQuoteRequest: builder.mutation<QuoteRequestResponse, string>({
      query: (id) => ({
        url: `/quote-requests/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['QuoteRequest'],
    }),
  }),
})

export const {
  useCreateQuoteRequestMutation,
  useGetMyQuoteRequestsQuery,
  useGetQuoteRequestByIdQuery,
  useUpdateQuoteRequestMutation,
  useAcceptQuoteMutation,
  useRejectQuoteMutation,
  useCancelQuoteRequestMutation,
  useDeleteQuoteRequestMutation,
} = quoteRequestsApi
