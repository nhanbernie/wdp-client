import { EndpointBuilder } from '@reduxjs/toolkit/query/react'
import { ApiResponse } from '@/services/api/type'
import { API_ENDPOINTS } from '@/common/constants/endpoint.constant'

// Backend: GET /chat/unread-count
// ChatController.getUnreadCount

export interface UnreadCountResponse {
  count: number
}

export const getUnreadCountEndpoint = (builder: EndpointBuilder<any, any, any>) =>
  builder.query<ApiResponse<UnreadCountResponse>, void>({
    query: () => ({
      url: API_ENDPOINTS.CHAT.UNREAD_COUNT,
      method: 'GET',
    }),
    providesTags: ['Chat', 'Conversations'],
    transformErrorResponse: (response: any) => {
      console.error('Get unread count error:', response)
      return response
    },
  })


