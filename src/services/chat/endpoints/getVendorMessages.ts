import { EndpointBuilder } from '@reduxjs/toolkit/query/react'
import { ApiResponse } from '@/services/api/type'
import { API_ENDPOINTS } from '@/common/constants/endpoint.constant'

// NOTE:
// Backend: GET /chat/vendors/:vendorId/messages?limit=100
// ChatController.getVendorMessages

export interface GetVendorMessagesRequest {
  vendorId: string
  limit?: number
}

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

export const getVendorMessagesEndpoint = (builder: EndpointBuilder<any, any, any>) =>
  builder.query<ApiResponse<ChatMessageDto[]>, GetVendorMessagesRequest>({
    query: ({ vendorId, limit }) => ({
      url: API_ENDPOINTS.CHAT.VENDOR_MESSAGES(vendorId),
      method: 'GET',
      params: limit ? { limit } : undefined,
    }),
    providesTags: ['Chat'],
    transformErrorResponse: (response: any) => {
      console.error('Get vendor messages error:', response)
      return response
    },
  })


