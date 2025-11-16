import { EndpointBuilder } from '@reduxjs/toolkit/query/react'
import { ApiResponse } from '@/services/api/type'
import { API_ENDPOINTS } from '@/common/constants/endpoint.constant'
import type { ConversationResponseDto } from '../chat.service'

export interface CreateConversationRequest {
  vendorId: string
}

export const createConversationEndpoint = (builder: EndpointBuilder<any, any, any>) =>
  builder.mutation<ApiResponse<ConversationResponseDto>, CreateConversationRequest>({
    query: (data) => ({
      url: API_ENDPOINTS.CHAT.CONVERSATIONS,
      method: 'POST',
      body: data,
    }),
    invalidatesTags: ['Conversations'],
    transformErrorResponse: (response: any) => {
      console.error('Create conversation error:', response)
      return response
    },
  })

