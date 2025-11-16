import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithReauth } from '../api/baseQuery'
import { API_ENDPOINTS } from '@/common/constants/endpoint.constant'
import type { ApiResponse } from '../api/type'

export interface AiConversationTurn {
  role: 'user' | 'assistant'
  content: string
}

export interface AiAssistantRequestDto {
  message: string
  conversationHistory?: AiConversationTurn[]
}

export interface AiAssistantResponseDto {
  message: string
  action: string
  data?: any
  needsMoreInfo?: boolean
  missingParams?: string[]
}

export const aiApi = createApi({
  reducerPath: 'aiApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['AI'],
  endpoints: (builder) => ({
    assistant: builder.mutation<ApiResponse<AiAssistantResponseDto>, AiAssistantRequestDto>({
      query: (body) => ({
        url: API_ENDPOINTS.AI.ASSISTANT,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['AI'],
    }),
  }),
})

export const { useAssistantMutation } = aiApi


