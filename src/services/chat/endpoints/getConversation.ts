import { EndpointBuilder } from '@reduxjs/toolkit/query/react'
import { ApiResponse } from '@/services/api/type'
import { API_ENDPOINTS } from '@/common/constants/endpoint.constant'

// Backend: GET /chat/conversations/:id/messages
// ChatController.getMessages

export interface ChatMessageDto {
  id: string
  conversationId: string
  senderId: string
  senderType: 'USER' | 'VENDOR'
  message: string
  attachments?: string[]
  isRead: boolean
  createdAt: string
}

export type ConversationMessagesResponse = ChatMessageDto[]

export const getConversationEndpoint = (builder: EndpointBuilder<any, any, any>) =>
  builder.query<ApiResponse<ConversationMessagesResponse>, string>({
    query: (conversationId) => ({
      url: API_ENDPOINTS.CHAT.MESSAGES(conversationId),
      method: 'GET',
    }),
    providesTags: ['Chat'],
    transformErrorResponse: (response: any) => {
      console.error('Get conversation messages error:', response)
      return response
    },
  })

