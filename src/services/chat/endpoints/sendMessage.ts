import { EndpointBuilder } from '@reduxjs/toolkit/query/react'
import { ApiResponse } from '@/services/api/type'
import { API_ENDPOINTS } from '@/common/constants/endpoint.constant'

export interface SendMessageRequest {
  message: string
  conversationId?: string
}

export interface SendMessageResponse {
  message: string
  conversationId: string
}

export const sendMessageEndpoint = (builder: EndpointBuilder<any, any, any>) =>
  builder.mutation<ApiResponse<SendMessageResponse>, SendMessageRequest>({
    query: (data) => ({
      url: API_ENDPOINTS.CHAT.SEND_MESSAGE,
      method: 'POST',
      body: data,
    }),
    invalidatesTags: ['Chat', 'Conversations'],
    transformErrorResponse: (response: any) => {
      console.error('Send message error:', response)
      return response
    },
  })

