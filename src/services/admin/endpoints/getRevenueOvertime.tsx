import { API_ENDPOINTS } from '@/common/constants/endpoint.constant'
import { ApiResponse } from '@/services/api/type'
import { EndpointBuilder } from '@reduxjs/toolkit/query'

interface RevenueOvertimeResponseDto {
  data: RevenueOvertimeDto[]
  granularity: string
}

export const revenueOvertimeEndpoint = (builder: EndpointBuilder<any, any, any>) =>
  builder.query<
    ApiResponse<RevenueOvertimeResponseDto>,
    | {
        month?: number
        year?: number
      }
    | undefined
  >({
    query: (arg) => ({
      url: API_ENDPOINTS.ADMIN.REVENUE_OVERTIME,
      method: 'GET',
      params: {
        month: arg ? arg.month : undefined,
        year: arg ? arg.year : undefined,
      },
    }),
    providesTags: ['Admin', 'RevenueOvertime'],
    transformResponse: (response: ApiResponse<RevenueOvertimeResponseDto>) => {
      return response
    },
  })
