import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithReauth } from '../api/baseQuery'
import { revenueOvertimeEndpoint } from './endpoints/getRevenueOvertime'

export const adminApi = createApi({
  reducerPath: 'adminApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['admin'],
  endpoints: (builder) => ({
    revenueOvertimeEndpoint: revenueOvertimeEndpoint(builder),
  }),
})

export const { useRevenueOvertimeEndpointQuery } = adminApi
