import { EndpointBuilder } from '@reduxjs/toolkit/query/react'
import { ApiResponse } from '@/services/api/type'
import { API_ENDPOINTS } from '@/common/constants/endpoint.constant'
import type { ConversationResponseDto } from '../chat.service'

export const getConversationsEndpoint = (builder: EndpointBuilder<any, any, any>) =>
  builder.query<ApiResponse<ConversationResponseDto[]>, void>({
    query: () => ({
      url: API_ENDPOINTS.CHAT.CONVERSATIONS,
      method: 'GET',
    }),
    providesTags: ['Conversations'],
    transformErrorResponse: (response: any) => {
      console.error('Get conversations error:', response)
      return response
    },
  })
