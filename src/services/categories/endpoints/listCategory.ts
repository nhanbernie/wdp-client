import { EndpointBuilder } from '@reduxjs/toolkit/query/react'
import { ApiResponse } from '@/services/api/type'
import { API_ENDPOINTS } from '@/common/constants/endpoint.constant'
import { CategoryDto, CategorySearchParams } from '../category.type'

export const categoriesEndpoint = (builder: EndpointBuilder<any, any, any>) =>
  builder.query<ApiResponse<{ items: CategoryDto[]; pagination: any }>, CategorySearchParams>({
    query: (params) => ({
      url: API_ENDPOINTS.CATEGORIES.LIST,
      method: 'GET',
      params,
    }),
    providesTags: ['Categories'],
    transformResponse: (response: ApiResponse<{ items: CategoryDto[]; pagination: any }>) => {
      return response
    },
  })
