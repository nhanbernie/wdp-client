import { EndpointBuilder } from '@reduxjs/toolkit/query/react'
import { ApiResponse } from '@/services/api/type'
import { API_ENDPOINTS } from '@/common/constants/endpoint.constant'

export interface ProfileResponse {
  userId: string
  email: string
  roles: string[]
  approvedStatus?: string | null
}

export const profileEndpoint = (builder: EndpointBuilder<any, any, any>) =>
  builder.query<ApiResponse<ProfileResponse>, void>({
    query: () => ({
      url: API_ENDPOINTS.AUTH.PROFILE,
      method: 'GET',
    }),

    providesTags: ['User', 'Profile'],
    transformResponse: (response: ApiResponse<ProfileResponse>) => {
      return response
    },
    transformErrorResponse: (response: any) => {
      console.error('Profile error:', response)
      return response
    },
  })
