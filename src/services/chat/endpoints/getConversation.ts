import { EndpointBuilder } from '@reduxjs/toolkit/query/react'
import { ApiResponse } from '@/services/api/type'
import { API_ENDPOINTS } from '@/common/constants/endpoint.constant'
import type { ChatMessage } from '../chat.service'

export interface ConversationMessagesResponse {
  messages: ChatMessage[]
}

export const getConversationEndpoint = (builder: EndpointBuilder<any, any, any>) =>
  builder.query<ApiResponse<ConversationMessagesResponse>, string>({
    query: (conversationId) => ({
      url: API_ENDPOINTS.CHAT.CONVERSATION(conversationId),
      method: 'GET',
    }),
    providesTags: ['Chat'],
    transformErrorResponse: (response: any) => {
      console.error('Get conversation error:', response)
      return response
    },
  })

